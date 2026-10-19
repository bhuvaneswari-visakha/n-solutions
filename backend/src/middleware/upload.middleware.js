import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { mkdir, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { env } from '../config/env.js';

const storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    const directory = join(env.uploadDirectory, '.staging', randomUUID());
    try {
      await mkdir(directory, { recursive: true });
      callback(null, directory);
    } catch (error) {
      callback(error);
    }
  },
  filename: (request, file, callback) => callback(null, randomUUID())
});

const cleanupStagedFiles = async (request) => {
  const stagingRoot = resolve(env.uploadDirectory, '.staging');
  const files = [
    ...(request.files ? Object.values(request.files).flat() : []),
    ...(request.file ? [request.file] : [])
  ];
  await Promise.all(files.map(async (file) => {
    if (!file.path) return;
    const directory = resolve(dirname(file.path));
    const relativePath = relative(stagingRoot, directory);
    if (!relativePath || relativePath === '..' || relativePath.startsWith(`..${sep}`)) return;
    await rm(directory, { recursive: true, force: true });
  }));
};

const runUpload = (handler, maxTotalBytes, transformError = (error) => error) => (request, response, next) => handler(
  request,
  response,
  (error) => {
    if (!error && maxTotalBytes) {
      const files = request.files ? Object.values(request.files).flat() : request.file ? [request.file] : [];
      const totalBytes = files.reduce((total, file) => total + file.size, 0);
      if (totalBytes > maxTotalBytes) {
        error = new Error('Combined upload size exceeds the allowed limit.');
        error.statusCode = 400;
      }
    }
    response.once('finish', () => cleanupStagedFiles(request).catch((cleanupError) => console.error(`Upload staging cleanup failed: ${cleanupError.message}`)));
    response.once('close', () => cleanupStagedFiles(request).catch((cleanupError) => console.error(`Upload staging cleanup failed: ${cleanupError.message}`)));
    return next(transformError(error));
  }
);

const upload = multer({
  storage,
  limits: { fileSize: 80 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.fieldname === 'video' && file.mimetype.startsWith('video/')) return callback(null, true);
    if (file.mimetype.startsWith('image/')) return callback(null, true);
    const error = new Error('Only image and video files are allowed.');
    error.statusCode = 400;
    return callback(error);
  }
});

export const projectImageUpload = runUpload(upload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'image', maxCount: 1 }
 ]), 80 * 1024 * 1024);
export const mediaImageUpload = runUpload(upload.single('image'), 10 * 1024 * 1024);
export const videoMediaUpload = runUpload(upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'video', maxCount: 1 }
 ]), 90 * 1024 * 1024);

const resumeUploadHandler = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    const extension = file.originalname.toLowerCase().split('.').pop();
    const allowedTypes = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };

    if (allowedTypes[extension] === file.mimetype) return callback(null, true);

    const error = new Error('Resume must be a PDF or DOC file.');
    error.statusCode = 400;
    return callback(error);
  }
});

export const resumeUpload = runUpload(resumeUploadHandler.single('resume'), 5 * 1024 * 1024, (error) => {
  if (error?.code === 'LIMIT_FILE_SIZE') {
    error.statusCode = 400;
    error.message = 'Resume must not exceed 5 MB.';
  }
  return error;
});

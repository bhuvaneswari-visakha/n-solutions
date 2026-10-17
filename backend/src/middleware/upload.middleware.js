import { randomUUID } from 'node:crypto';
import { mkdir, unlink } from 'node:fs/promises';
import { extname, join } from 'node:path';
import multer from 'multer';
import { env } from '../config/env.js';
import { getAllowedFileType } from '../utils/fileValidation.js';

const uploadDirectory = join(env.uploadDirectory, '.staging');
const imageLimit = 10 * 1024 * 1024;
const videoLimit = 80 * 1024 * 1024;
const resumeLimit = 5 * 1024 * 1024;
const projectTotalLimit = 80 * 1024 * 1024;
const videoTotalLimit = 90 * 1024 * 1024;

const fileTypeFor = (file) => {
  if (file.fieldname === 'resume') return 'resume';
  if (file.fieldname === 'video') return 'video';
  return 'image';
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const directory = join(uploadDirectory, fileTypeFor(file));
    mkdir(directory, { recursive: true })
      .then(() => callback(null, directory))
      .catch(callback);
  },
  filename: (request, file, callback) => {
    const allowedType = getAllowedFileType(file.mimetype, fileTypeFor(file));
    const originalExtension = extname(file.originalname).toLowerCase();
    const extension = file.mimetype === 'image/jpeg' && originalExtension === '.jpeg'
      ? '.jpeg'
      : allowedType?.extension;
    callback(null, `${randomUUID()}${extension || ''}`);
  }
});

const createFileFilter = (errorMessage) => (request, file, callback) => {
  const type = fileTypeFor(file);
  const allowedType = getAllowedFileType(file.mimetype, type);
  const extension = extname(file.originalname).toLowerCase();
  const extensionIsValid = allowedType && (
    extension === allowedType.extension ||
    (file.mimetype === 'image/jpeg' && extension === '.jpeg')
  );

  if (extensionIsValid) return callback(null, true);
  const error = new Error(errorMessage);
  error.statusCode = 400;
  return callback(error);
};

const cleanStagedFiles = (request, response) => {
  const files = getUploadedFiles(request);
  if (!files.length) return;
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    Promise.all(files.map((file) => unlink(file.path).catch((error) => {
      if (error.code !== 'ENOENT') console.error(`Temporary upload cleanup failed: ${error.message}`);
    }))).catch((error) => console.error(`Temporary upload cleanup failed: ${error.message}`));
  };
  response.once('finish', cleanup);
  response.once('close', cleanup);
};

const getUploadedFiles = (request) => [
  ...(Array.isArray(request.files) ? request.files : []),
  ...Object.values(request.files || {}).flat(),
  ...(request.file ? [request.file] : [])
];

const middleware = (handler, maxSizeMessage, maxTotalSize, totalSizeMessage) => (request, response, next) => {
  handler(request, response, (error) => {
    if (!error && maxTotalSize && getUploadedFiles(request).reduce((total, file) => total + file.size, 0) > maxTotalSize) {
      error = new Error(totalSizeMessage);
      error.statusCode = 400;
    }
    cleanStagedFiles(request, response);
    if (error?.code === 'LIMIT_FILE_SIZE') {
      error.statusCode = 400;
      error.message = maxSizeMessage;
    } else if (error?.code?.startsWith('LIMIT_')) {
      error.statusCode = 400;
      error.message = 'Upload exceeds the allowed number of files or fields.';
    }
    next(error);
  });
};

const imageUpload = multer({
  storage,
  limits: { fileSize: imageLimit, files: 20, fields: 20, parts: 40, fieldNameSize: 100, fieldSize: 10 * 1024 },
  fileFilter: createFileFilter('Only supported image files are allowed.')
});

export const projectImageUpload = middleware(imageUpload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'image', maxCount: 1 }
]), 'Each project image must not exceed 10 MB.', projectTotalLimit, 'Combined project images must not exceed 80 MB.');

export const mediaImageUpload = middleware(multer({
  storage,
  limits: { fileSize: imageLimit, files: 1, fields: 20, parts: 21, fieldNameSize: 100, fieldSize: 10 * 1024 },
  fileFilter: createFileFilter('Only supported image files are allowed.')
}).single('image'), 'Images must not exceed 10 MB.');

const videoUpload = multer({
  storage,
  limits: { fileSize: videoLimit, files: 2, fields: 20, parts: 22, fieldNameSize: 100, fieldSize: 10 * 1024 },
  fileFilter: (request, file, callback) => {
    const type = fileTypeFor(file);
    const allowed = type === 'video' ? 'Only MP4, MOV, and WebM videos are allowed.' : 'Only supported image files are allowed.';
    return createFileFilter(allowed)(request, file, callback);
  }
});

export const videoMediaUpload = middleware(videoUpload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), 'Video files must not exceed 80 MB.', videoTotalLimit, 'Video and thumbnail uploads must not exceed 90 MB combined.');

export const resumeUpload = middleware(multer({
  storage,
  limits: { fileSize: resumeLimit, files: 1, fields: 20, parts: 21, fieldNameSize: 100, fieldSize: 10 * 1024 },
  fileFilter: createFileFilter('Resume must be a PDF, DOC, or DOCX file.')
}).single('resume'), 'Resume must not exceed 5 MB.');

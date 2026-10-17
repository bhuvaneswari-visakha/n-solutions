import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, open, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { env } from '../config/env.js';
import { getAllowedFileType, validateFileSignature } from '../utils/fileValidation.js';

const publicFolders = new Set(['products', 'projects', 'gallery', 'news', 'clients', 'videos']);
const resumeExtensions = new Set(['.pdf', '.doc', '.docx']);
const mimeTypes = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};
const fileSizeLimits = {
  image: 10 * 1024 * 1024,
  video: 80 * 1024 * 1024,
  resume: 5 * 1024 * 1024
};

const getDestination = (folder, visibility) => {
  if (visibility === 'private' && folder === 'resumes') {
    return join(env.uploadDirectory, 'private', 'resumes');
  }
  if (visibility === 'public' && publicFolders.has(folder)) {
    return join(env.uploadDirectory, 'public', folder);
  }
  throw new Error('Unsupported upload destination.');
};

const invalidFileError = () => {
  const error = new Error('File content does not match an allowed file type.');
  error.statusCode = 400;
  return error;
};

const validateUpload = (buffer, mimeType, type) => {
  if (!validateFileSignature(buffer, mimeType, type)) throw invalidFileError();
  return getAllowedFileType(mimeType, type).extension;
};

const validateFileSize = (size, type) => {
  const limit = fileSizeLimits[type];
  if (!limit) throw new Error('Unsupported upload file type.');
  if (size > limit) {
    const error = new Error('File exceeds the allowed upload size.');
    error.statusCode = 400;
    throw error;
  }
};

const readFilePrefix = async (path) => {
  const handle = await open(path, 'r');
  try {
    const buffer = Buffer.alloc(16);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
};

const storeBuffer = async (buffer, contentType, folder, visibility, type) => {
  validateFileSize(buffer.length, type);
  const extension = validateUpload(buffer.subarray(0, 16), contentType, type);
  const directory = getDestination(folder, visibility);
  const filename = `${randomUUID()}${extension}`;
  const path = join(directory, filename);
  await mkdir(directory, { recursive: true });
  await writeFile(path, buffer, { flag: 'wx' });
  return makeAsset(folder, filename, visibility);
};

const makeAsset = (folder, filename, visibility) => {
  const publicId = `${visibility}/${folder}/${filename}`;
  return {
    url: visibility === 'public' ? `/uploads/${publicId}` : `private://${publicId}`,
    publicId
  };
};

const storeFile = async (file, folder, visibility, type) => {
  validateFileSize(file.size, type);
  const extension = validateUpload(await readFilePrefix(file.path), file.mimetype, type);
  const directory = getDestination(folder, visibility);
  const filename = `${randomUUID()}${extension}`;
  const destination = join(directory, filename);
  await mkdir(directory, { recursive: true });
  await rename(file.path, destination);
  return makeAsset(folder, filename, visibility);
};

export const uploadPublicFile = (file, folder, type = 'image') => storeFile(file, folder, 'public', type);
export const uploadPrivateResume = (file) => storeFile(file, 'resumes', 'private', 'resume');

export const uploadMigratedBuffer = ({ buffer, contentType, folder, visibility, type }) =>
  storeBuffer(buffer, contentType, folder, visibility, type);

export const cleanupStagedUploads = async () => {
  const stagingDirectory = join(env.uploadDirectory, '.staging');
  let directories;
  try {
    directories = await readdir(stagingDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  const expirationTime = Date.now() - 24 * 60 * 60 * 1000;
  for (const directory of directories) {
    if (!directory.isDirectory()) continue;
    const directoryPath = join(stagingDirectory, directory.name);
    const files = await readdir(directoryPath, { withFileTypes: true });
    for (const file of files) {
      if (!file.isFile()) continue;
      const path = join(directoryPath, file.name);
      const metadata = await stat(path);
      if (metadata.mtimeMs < expirationTime) await unlink(path);
    }
  }
};

export const deleteStoredFile = async (key) => {
  if (typeof key !== 'string') return false;
  const [visibility, folder, filename, ...extra] = key.split('/');
  const validPublic = visibility === 'public' && publicFolders.has(folder);
  const validPrivate = visibility === 'private' && folder === 'resumes';
  if (
    extra.length ||
    (!validPublic && !validPrivate) ||
    !/^[0-9a-f-]+\.(jpg|png|webp|gif|mp4|mov|webm|pdf|doc|docx)$/i.test(filename || '') ||
    (validPrivate && !resumeExtensions.has(extname(filename).toLowerCase()))
  ) return false;

  const path = resolve(getDestination(folder, visibility), filename);
  try {
    await unlink(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
};

export const getStoredPrivateFile = async (key) => {
  const match = typeof key === 'string' && key.match(/^private\/resumes\/([0-9a-f-]+\.(?:pdf|doc|docx))$/i);
  if (!match) {
    const error = new Error('Resume file not found.');
    error.statusCode = 404;
    throw error;
  }

  const path = resolve(getDestination('resumes', 'private'), match[1]);
  try {
    const metadata = await stat(path);
    return {
      ContentLength: metadata.size,
      ContentType: mimeTypes[extname(path).toLowerCase()],
      Body: createReadStream(path)
    };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const notFound = new Error('Resume file not found.');
    notFound.statusCode = 404;
    throw notFound;
  }
};

export const verifyStoredFile = async (key) => {
  const [visibility, folder, filename, ...extra] = (key || '').split('/');
  if (
    extra.length ||
    (!(visibility === 'public' && publicFolders.has(folder)) &&
      !(visibility === 'private' && folder === 'resumes')) ||
    !/^[0-9a-f-]+\.(jpg|png|webp|gif|mp4|mov|webm|pdf|doc|docx)$/i.test(filename || '')
  ) {
    const error = new Error('Stored media file not found.');
    error.statusCode = 404;
    throw error;
  }

  const metadata = await stat(join(getDestination(folder, visibility), filename));
  return { ContentLength: metadata.size };
};

const uploadAdapters = {
  uploadProductImage: (file) => uploadPublicFile(file, 'products'),
  uploadProjectImage: (file) => uploadPublicFile(file, 'projects'),
  uploadMediaImage: (file, folder = 'gallery') => uploadPublicFile(file, folder),
  uploadMediaVideo: (file) => uploadPublicFile(file, 'videos', 'video'),
  uploadResume: (file) => uploadPrivateResume(file),
  deleteProductImage: deleteStoredFile,
  deleteProjectImage: deleteStoredFile,
  deleteMediaImage: deleteStoredFile,
  deleteMediaVideo: deleteStoredFile,
  deleteResume: deleteStoredFile
};

export const {
  uploadProductImage,
  uploadProjectImage,
  uploadMediaImage,
  uploadMediaVideo,
  uploadResume,
  deleteProductImage,
  deleteProjectImage,
  deleteMediaImage,
  deleteMediaVideo,
  deleteResume
} = uploadAdapters;

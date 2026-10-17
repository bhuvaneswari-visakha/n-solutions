import assert from 'node:assert/strict';
import { once } from 'node:events';
import { access, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import express from 'express';
import test, { after, before } from 'node:test';
import { mediaImageUpload, projectImageUpload, resumeUpload } from '../src/middleware/upload.middleware.js';
import { validateFileSignature } from '../src/utils/fileValidation.js';

let server;
let baseUrl;
const uploadedPaths = [];

const makeForm = (name, mimeType, bytes) => {
  const form = new FormData();
  form.append(name, new Blob([bytes], { type: mimeType }), `user-file${name === 'resume' ? '.pdf' : '.png'}`);
  return form;
};

before(async () => {
  const app = express();
  app.post('/image', mediaImageUpload, async (request, response) => {
    uploadedPaths.push(request.file.path);
    if (!validateFileSignature(await readFile(request.file.path), request.file.mimetype, 'image')) {
      return response.status(400).json({ message: 'File content does not match its declared type.' });
    }
    response.status(201).json({ name: request.file.filename, size: request.file.size });
  });
  app.post('/projects', projectImageUpload, (request, response) => {
    const files = request.files.images || request.files.image || [];
    uploadedPaths.push(...files.map((file) => file.path));
    response.status(201).json(files.map((file) => file.filename));
  });
  app.post('/resume', resumeUpload, (request, response) => {
    uploadedPaths.push(request.file.path);
    response.status(201).json({ name: request.file.filename, size: request.file.size });
  });
  app.use((error, request, response, next) => {
    response.status(error.statusCode || 500).json({ message: error.message });
  });
  server = createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('stages uniquely named allowed image uploads and multiple project images', async () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  const first = await fetch(`${baseUrl}/image`, { method: 'POST', body: makeForm('image', 'image/png', png) });
  assert.equal(first.status, 201);
  const firstFile = await first.json();
  assert.match(firstFile.name, /^[0-9a-f-]+\.png$/i);

  const project = new FormData();
  project.append('images', new Blob([png], { type: 'image/png' }), 'same-name.png');
  project.append('images', new Blob([png], { type: 'image/png' }), 'same-name.png');
  const result = await fetch(`${baseUrl}/projects`, { method: 'POST', body: project });
  assert.equal(result.status, 201);
  const projectNames = await result.json();
  assert.equal(projectNames.length, 2);
  assert.notEqual(projectNames[0], projectNames[1]);
});

test('rejects mismatched file extensions and enforces the image size limit', async () => {
  const invalid = await fetch(`${baseUrl}/image`, {
    method: 'POST',
    body: makeForm('image', 'image/png', Buffer.from('not an image'))
  });
  assert.equal(invalid.status, 400);

  const disallowedForm = new FormData();
  disallowedForm.append('image', new Blob(['nope'], { type: 'application/x-msdownload' }), 'payload.exe');
  const disallowed = await fetch(`${baseUrl}/image`, { method: 'POST', body: disallowedForm });
  assert.equal(disallowed.status, 400);

  const oversized = await fetch(`${baseUrl}/image`, {
    method: 'POST',
    body: makeForm('image', 'image/png', Buffer.alloc(10 * 1024 * 1024 + 1))
  });
  assert.equal(oversized.status, 400);
  assert.match((await oversized.json()).message, /10 MB/);
});

test('accepts supported PDF resume staging and removes temporary upload files', async () => {
  const response = await fetch(`${baseUrl}/resume`, {
    method: 'POST',
    body: makeForm('resume', 'application/pdf', Buffer.from('%PDF-1.7 test'))
  });
  assert.equal(response.status, 201);
  assert.match((await response.json()).name, /^[0-9a-f-]+\.pdf$/i);

  await new Promise((resolve) => setTimeout(resolve, 30));
  for (const path of uploadedPaths) {
    await assert.rejects(access(path), { code: 'ENOENT' });
  }
});

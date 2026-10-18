import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createServer } from 'node:http';
import test, { after } from 'node:test';

process.env.MONGODB_URI ||= 'mongodb://127.0.0.1/test';
process.env.JWT_SECRET ||= 'test-secret-that-is-long-enough-for-config';
process.env.ADMIN_REGISTRATION_MODE = 'disabled';
process.env.UPLOAD_DIR = await mkdtemp(join(tmpdir(), 'nsolutions-public-uploads-test-'));

const { default: app } = await import('../src/app.js');
const root = process.env.UPLOAD_DIR;
const server = createServer(app);
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const baseUrl = `http://127.0.0.1:${server.address().port}`;

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await rm(root, { recursive: true, force: true });
});

test('serves public uploads but not private resume files or unauthenticated resume downloads', async () => {
  const publicDirectory = join(root, 'public', 'gallery');
  const privateDirectory = join(root, 'private', 'resumes');
  await mkdir(publicDirectory, { recursive: true });
  await mkdir(privateDirectory, { recursive: true });
  await writeFile(join(publicDirectory, '550e8400-e29b-41d4-a716-446655440000.png'), 'public image');
  await writeFile(join(privateDirectory, '550e8400-e29b-41d4-a716-446655440000.pdf'), 'private resume');

  const publicResponse = await fetch(`${baseUrl}/uploads/public/gallery/550e8400-e29b-41d4-a716-446655440000.png`);
  assert.equal(publicResponse.status, 200);
  assert.equal(await publicResponse.text(), 'public image');

  const privateResponse = await fetch(`${baseUrl}/uploads/private/resumes/550e8400-e29b-41d4-a716-446655440000.pdf`);
  assert.equal(privateResponse.status, 404);

  const unauthenticatedResumeResponse = await fetch(`${baseUrl}/api/job-applications/550e8400e29b41d4a7164466/resume/download`);
  assert.equal(unauthenticatedResumeResponse.status, 401);
});

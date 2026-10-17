import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, utimes, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import test, { after } from 'node:test';

process.env.MONGODB_URI ||= 'mongodb://127.0.0.1/test';
process.env.JWT_SECRET ||= 'test-secret-that-is-long-enough-for-config';
process.env.ADMIN_REGISTRATION_MODE = 'disabled';
process.env.UPLOAD_DIR = await mkdtemp(join(tmpdir(), 'nsolutions-media-test-'));

const storage = await import('../src/services/media-storage.service.js');
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0, 0, 0, 0, 0]);
const uploadStageFile = async (name, buffer) => {
  const path = join(process.env.UPLOAD_DIR, '.staging', 'image', name);
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, buffer);
  return { path, size: buffer.length, mimetype: 'image/png' };
};

after(async () => rm(process.env.UPLOAD_DIR, { recursive: true, force: true }));

test('stores public uploads under category folders with unique names and compatible asset records', async () => {
  const first = await storage.uploadMediaImage(await uploadStageFile('first.png', png), 'gallery');
  const second = await storage.uploadMediaImage(await uploadStageFile('second.png', png), 'gallery');

  assert.match(first.publicId, /^public\/gallery\/[0-9a-f-]+\.png$/i);
  assert.equal(first.url, `/uploads/${first.publicId}`);
  assert.notEqual(first.publicId, second.publicId);
  assert.deepEqual(
    await readFile(join(process.env.UPLOAD_DIR, 'public', 'gallery', basename(first.publicId))),
    png
  );
  assert.equal((await storage.verifyStoredFile(first.publicId)).ContentLength, png.length);
  assert.equal(await storage.deleteMediaImage(first.publicId), true);
  assert.equal(await storage.deleteMediaImage(first.publicId), false);
});

test('stores resumes privately and only resolves them through the private storage reader', async () => {
  const resume = Buffer.from('%PDF-1.7 local resume');
  const path = join(process.env.UPLOAD_DIR, '.staging', 'resume', 'resume.pdf');
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, resume);
  const asset = await storage.uploadResume({ path, size: resume.length, mimetype: 'application/pdf' });

  assert.match(asset.publicId, /^private\/resumes\/[0-9a-f-]+\.pdf$/i);
  assert.match(asset.url, /^private:\/\//);
  const stored = await storage.getStoredPrivateFile(asset.publicId);
  assert.equal(stored.ContentType, 'application/pdf');
  assert.equal(stored.ContentLength, resume.length);
  assert.deepEqual(await readFile(join(process.env.UPLOAD_DIR, 'private', 'resumes', basename(asset.publicId))), resume);
  assert.equal(await storage.deleteResume(asset.publicId), true);
  await assert.rejects(storage.getStoredPrivateFile(asset.publicId), { statusCode: 404 });
});

test('stores videos in the public videos folder with a unique local URL', async () => {
  const video = Buffer.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0, 0, 0, 0]);
  const path = join(process.env.UPLOAD_DIR, '.staging', 'video', 'clip.mp4');
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, video);
  const asset = await storage.uploadMediaVideo({ path, size: video.length, mimetype: 'video/mp4' });

  assert.match(asset.publicId, /^public\/videos\/[0-9a-f-]+\.mp4$/i);
  assert.equal(asset.url, `/uploads/${asset.publicId}`);
  assert.deepEqual(await readFile(join(process.env.UPLOAD_DIR, asset.publicId)), video);
});

test('rejects invalid signatures and oversized migrated media and prunes only stale staging files', async () => {
  await assert.rejects(
    storage.uploadMediaImage(await uploadStageFile('invalid.png', Buffer.from('not png')), 'gallery'),
    { statusCode: 400 }
  );
  await assert.rejects(
    storage.uploadMigratedBuffer({
      buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
      contentType: 'image/png',
      folder: 'gallery',
      visibility: 'public',
      type: 'image'
    }),
    { statusCode: 400 }
  );

  const stalePath = join(process.env.UPLOAD_DIR, '.staging', 'image', 'stale.png');
  const recentPath = join(process.env.UPLOAD_DIR, '.staging', 'image', 'recent.png');
  await writeFile(stalePath, png);
  await writeFile(recentPath, png);
  const oldTime = new Date(Date.now() - 48 * 60 * 60 * 1000);
  await utimes(stalePath, oldTime, oldTime);
  await storage.cleanupStagedUploads();
  await assert.rejects(readFile(stalePath), { code: 'ENOENT' });
  assert.deepEqual(await readFile(recentPath), png);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllowedFileType, validateFileSignature } from '../src/utils/fileValidation.js';

test('allows supported images only when the bytes match their MIME type', () => {
  assert.equal(validateFileSignature(Buffer.from([0xff, 0xd8, 0xff, 0x00]), 'image/jpeg', 'image'), true);
  assert.equal(validateFileSignature(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), 'image/png', 'image'), true);
  assert.equal(validateFileSignature(Buffer.from([0xff, 0xd8, 0xff]), 'image/png', 'image'), false);
  assert.equal(validateFileSignature(Buffer.from('not an image'), 'image/jpeg', 'image'), false);
});

test('checks video and document signatures', () => {
  assert.equal(validateFileSignature(Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]), 'video/mp4', 'video'), true);
  assert.equal(validateFileSignature(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), 'video/webm', 'video'), true);
  assert.equal(validateFileSignature(Buffer.from('%PDF-1.7'), 'application/pdf', 'resume'), true);
  assert.equal(validateFileSignature(Buffer.from('not a PDF'), 'application/pdf', 'resume'), false);
  assert.equal(getAllowedFileType('application/x-msdownload', 'resume'), null);
});

test('validates the WebP RIFF signature and marker', () => {
  const validWebp = Buffer.from('524946460000000057454250', 'hex');
  const invalidWebp = Buffer.from('52494646000000004a554e4b', 'hex');
  assert.equal(validateFileSignature(validWebp, 'image/webp', 'image'), true);
  assert.equal(validateFileSignature(invalidWebp, 'image/webp', 'image'), false);
});

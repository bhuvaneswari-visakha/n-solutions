import { connectDatabase, disconnectDatabase } from '../src/config/db.js';
import { Gallery } from '../src/models/Gallery.js';
import { JobApplication } from '../src/models/JobApplication.js';
import { News } from '../src/models/News.js';
import { Product } from '../src/models/Product.js';
import { Project } from '../src/models/Project.js';
import { Video } from '../src/models/Video.js';
import { Client } from '../src/models/Client.js';
import { deleteStoredFile, uploadMigratedBuffer, verifyStoredFile } from '../src/services/media-storage.service.js';

const applyChanges = process.argv.includes('--apply');
const maxDownloadBytes = 200 * 1024 * 1024;
const stats = { scanned: 0, migrated: 0, failed: 0 };

const isLegacyMediaUrl = (value) => {
  if (!value) return false;
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'cloudinary.com' || hostname.endsWith('.cloudinary.com');
  } catch {
    return false;
  }
};

const readResponse = async (response) => {
  const length = Number(response.headers.get('content-length') || 0);
  if (length > maxDownloadBytes) throw new Error('Legacy file exceeds the 200 MB migration limit.');
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > maxDownloadBytes) {
      await reader.cancel();
      throw new Error('Legacy file exceeds the 200 MB migration limit.');
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks, total);
};

const inferContentType = (url, contentType) => {
  if (contentType && contentType !== 'application/octet-stream') return contentType;
  const extension = new URL(url).pathname.toLowerCase().split('.').pop();
  const knownTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    webm: 'video/webm',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return knownTypes[extension] || contentType;
};

const downloadLegacyFile = async (url) => {
  let currentUrl = url;
  for (let redirects = 0; redirects <= 3; redirects += 1) {
    const parsed = new URL(currentUrl);
    if (parsed.protocol !== 'https:' || !isLegacyMediaUrl(currentUrl)) {
      throw new Error('Only HTTPS legacy media URLs are accepted.');
    }
    const response = await fetch(currentUrl, { redirect: 'manual', signal: AbortSignal.timeout(60_000) });
    if (response.status >= 300 && response.status < 400) {
      if (redirects === 3) throw new Error('Legacy file redirected too many times.');
      currentUrl = new URL(response.headers.get('location'), currentUrl).toString();
      continue;
    }
    if (!response.ok || !response.body) throw new Error(`Legacy file download failed with HTTP ${response.status}.`);
    const contentType = (response.headers.get('content-type') || '').split(';')[0].toLowerCase();
    return { buffer: await readResponse(response), contentType: inferContentType(url, contentType) };
  }
  throw new Error('Legacy file download failed.');
};

const migrateAsset = async (asset, folder, visibility, type) => {
  if (!asset?.url || !isLegacyMediaUrl(asset.url)) return asset;
  if (!applyChanges) return { ...asset, url: `pending-migration:${asset.url}` };

  const { buffer, contentType } = await downloadLegacyFile(asset.url);
  const uploaded = await uploadMigratedBuffer({ buffer, contentType, folder, visibility, type });
  try {
    const stored = await verifyStoredFile(uploaded.publicId);
    if (stored.ContentLength !== buffer.length) throw new Error('Stored file size does not match the downloaded asset.');
    return uploaded;
  } catch (error) {
    try {
      await deleteStoredFile(uploaded.publicId);
    } catch (cleanupError) {
      console.error(`Migrated file cleanup failed: ${cleanupError.message}`);
    }
    throw error;
  }
};

const migrateModel = async (Model, label, migrateDocument) => {
  for await (const document of Model.find({}).cursor()) {
    stats.scanned += 1;
    try {
      const changed = await migrateDocument(document);
      if (changed && applyChanges) await document.save();
      if (changed) stats.migrated += 1;
    } catch (error) {
      stats.failed += 1;
      console.error(`${label} ${document._id}: ${error.message}`);
    }
  }
};

const migrateJobApplications = async () => {
  for await (const document of JobApplication.collection.find({})) {
    stats.scanned += 1;
    const resumeUrl = document.resume?.url ||
      (typeof document.resume === 'string' ? document.resume : '') ||
      document.resumeUrl ||
      '';
    if (!isLegacyMediaUrl(resumeUrl)) continue;

    try {
      const resume = await migrateAsset({ url: resumeUrl }, 'resumes', 'private', 'resume');
      if (applyChanges) {
        const filter = { _id: document._id };
        if (Object.hasOwn(document, 'resume')) filter.resume = document.resume;
        else filter.resume = { $exists: false };
        if (document.resumeUrl) filter.resumeUrl = document.resumeUrl;
        const result = await JobApplication.collection.updateOne(filter, {
          $set: { resume, updatedAt: new Date() },
          $unset: { resumeUrl: '' }
        });
        if (result.matchedCount !== 1) throw new Error('Application changed during migration; record was not updated.');
      }
      stats.migrated += 1;
    } catch (error) {
      stats.failed += 1;
      console.error(`Job application ${document._id}: ${error.message}`);
    }
  }
};

const migrate = async () => {
  await connectDatabase();
  try {
    await migrateModel(Product, 'Product', async (document) => {
      const original = document.image?.url;
      const image = await migrateAsset(document.image, 'products', 'public', 'image');
      if (image !== document.image && image.url !== original) document.image = image;
      return image?.url !== original;
    });
    await migrateModel(Project, 'Project', async (document) => {
      let changed = false;
      if (isLegacyMediaUrl(document.image?.url)) {
        document.image = await migrateAsset(document.image, 'projects', 'public', 'image');
        changed = true;
      }
      const images = [];
      for (const image of document.images || []) {
        if (isLegacyMediaUrl(image?.url)) {
          images.push(await migrateAsset(image, 'projects', 'public', 'image'));
          changed = true;
        } else images.push(image);
      }
      if (changed) document.images = images;
      return changed;
    });
    await migrateModel(Gallery, 'Gallery', async (document) => {
      if (!isLegacyMediaUrl(document.image?.url)) return false;
      document.image = await migrateAsset(document.image, 'gallery', 'public', 'image');
      return true;
    });
    await migrateModel(News, 'News', async (document) => {
      if (!isLegacyMediaUrl(document.image?.url)) return false;
      document.image = await migrateAsset(document.image, 'news', 'public', 'image');
      return true;
    });
    await migrateModel(Client, 'Client', async (document) => {
      if (!isLegacyMediaUrl(document.image?.url)) return false;
      document.image = await migrateAsset(document.image, 'clients', 'public', 'image');
      return true;
    });
    await migrateModel(Video, 'Video', async (document) => {
      let changed = false;
      if (isLegacyMediaUrl(document.thumbnail?.url)) {
        document.thumbnail = await migrateAsset(document.thumbnail, 'videos', 'public', 'image');
        changed = true;
      }
      if (isLegacyMediaUrl(document.videoUrl)) {
        const video = await migrateAsset({ url: document.videoUrl }, 'videos', 'public', 'video');
        document.videoUrl = video.url;
        document.videoPublicId = video.publicId;
        changed = true;
      }
      return changed;
    });
    await migrateJobApplications();
  } finally {
    await disconnectDatabase();
  }
};

migrate()
  .then(() => {
    console.log(`${applyChanges ? 'Migration' : 'Dry run'} complete: ${stats.scanned} records scanned, ${stats.migrated} assets ${applyChanges ? 'migrated' : 'identified'}, ${stats.failed} failures.`);
    if (stats.failed) process.exitCode = 1;
    if (!applyChanges) console.log('No files or database records were changed. Re-run with --apply after backing up MongoDB and configuring object storage.');
  })
  .catch((error) => {
    console.error(`Migration failed: ${error.message}`);
    process.exitCode = 1;
  });

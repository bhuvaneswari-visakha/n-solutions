const imageTypes = {
  'image/jpeg': { extension: '.jpg', signatures: [[0xff, 0xd8, 0xff]] },
  'image/png': { extension: '.png', signatures: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]] },
  'image/webp': { extension: '.webp', signatures: [[0x52, 0x49, 0x46, 0x46]] },
  'image/gif': { extension: '.gif', signatures: [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]] }
};

const videoTypes = {
  'video/mp4': { extension: '.mp4', signatures: [[0x66, 0x74, 0x79, 0x70]], offset: 4 },
  'video/quicktime': { extension: '.mov', signatures: [[0x66, 0x74, 0x79, 0x70]], offset: 4 },
  'video/webm': { extension: '.webm', signatures: [[0x1a, 0x45, 0xdf, 0xa3]] }
};

const resumeTypes = {
  'application/pdf': { extension: '.pdf', signatures: [[0x25, 0x50, 0x44, 0x46]] },
  'application/msword': { extension: '.doc', signatures: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extension: '.docx',
    signatures: [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06], [0x50, 0x4b, 0x07, 0x08]]
  }
};

const signatureMatches = (buffer, signatures, offset = 0) => signatures.some((signature) =>
  signature.every((byte, index) => buffer[offset + index] === byte)
);

export const getAllowedFileType = (mimeType, type) => {
  const allowedTypes = type === 'image'
    ? imageTypes
    : type === 'video'
      ? videoTypes
      : type === 'resume'
        ? resumeTypes
        : { ...imageTypes, ...videoTypes, ...resumeTypes };
  return allowedTypes[mimeType] || null;
};

export const validateFileSignature = (buffer, mimeType, type) => {
  const allowedType = getAllowedFileType(mimeType, type);
  return Boolean(
    allowedType &&
    signatureMatches(buffer, allowedType.signatures, allowedType.offset || 0) &&
    (mimeType !== 'image/webp' || buffer.subarray(8, 12).toString('ascii') === 'WEBP')
  );
};

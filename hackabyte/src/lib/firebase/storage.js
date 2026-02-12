import { storage } from '@/app/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function uploadEventThumbnail(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!storage) {
    throw new Error('Firebase Storage is not configured.');
  }

  const safeFileName = sanitizeFileName(file.name || 'thumbnail');
  const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const storageRef = ref(storage, `events/thumbnails/${uniquePrefix}-${safeFileName}`);

  await uploadBytes(storageRef, file, {
    contentType: file.type || 'application/octet-stream'
  });

  return getDownloadURL(storageRef);
}

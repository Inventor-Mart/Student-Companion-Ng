/**
 * Safe LocalStorage and Image Compression Utilities
 * Prevents QuotaExceededError and optimizes image storage
 */

/**
 * Compresses an image file or data URL to a lightweight base64 JPEG (< 25KB)
 * using an in-memory canvas.
 */
export async function compressImage(
  source: File | string,
  maxDimension = 320,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve) => {
    let dataUrlPromise: Promise<string>;

    if (typeof source === 'string') {
      dataUrlPromise = Promise.resolve(source);
    } else {
      dataUrlPromise = new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = () => rej(new Error('Failed to read file'));
        reader.readAsDataURL(source);
      });
    }

    dataUrlPromise
      .then((dataUrl) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };

        img.onerror = () => {
          resolve(dataUrl);
        };

        img.src = dataUrl;
      })
      .catch(() => {
        resolve('');
      });
  });
}

/**
 * Strips huge base64 image strings from serialized JSON objects
 * to ensure profile and student data never exceed quota.
 */
function sanitizePayloadForStorage(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    let modified = false;

    if (parsed && typeof parsed === 'object') {
      if (typeof parsed.avatarUrl === 'string' && parsed.avatarUrl.length > 50000) {
        parsed.avatarUrl = '';
        modified = true;
      }
      if (typeof parsed.uniformPhotoUrl === 'string' && parsed.uniformPhotoUrl.length > 50000) {
        parsed.uniformPhotoUrl = '';
        modified = true;
      }
      if (parsed.studentData && typeof parsed.studentData.uniformPhotoUrl === 'string' && parsed.studentData.uniformPhotoUrl.length > 50000) {
        parsed.studentData.uniformPhotoUrl = '';
        modified = true;
      }
    }

    return modified ? JSON.stringify(parsed) : jsonString;
  } catch {
    return jsonString;
  }
}

/**
 * Safely writes to localStorage with automatic QuotaExceededError recovery,
 * cache eviction, and non-blocking failure fallback.
 */
export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error: any) {
    const isQuotaError =
      error?.name === 'QuotaExceededError' ||
      error?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      error?.code === 22 ||
      error?.code === 1014;

    if (isQuotaError) {
      console.warn(`[Storage] QuotaExceededError on key "${key}". Evicting non-essential cache...`);
      try {
        // Evict volatile/cached non-essential storage keys
        localStorage.removeItem('sc_chats');
        localStorage.removeItem('sc_bookings');
        localStorage.removeItem('sc_exam_results');

        // Sanitize the value if it has oversized base64 strings
        const sanitized = sanitizePayloadForStorage(value);
        localStorage.setItem(key, sanitized);
      } catch (secondErr) {
        console.warn(`[Storage] Storage quota still full after eviction. Preserving state in-memory only.`, secondErr);
      }
    } else {
      console.warn(`[Storage] Failed to set item "${key}":`, error);
    }
  }
}

/**
 * Safely reads from localStorage
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`[Storage] Failed to read item "${key}":`, e);
    return null;
  }
}

/**
 * Safely removes item from localStorage
 */
export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`[Storage] Failed to remove item "${key}":`, e);
  }
}

/**
 * Run on application initialization to clean up oversized entries
 * that may have exceeded quota in previous sessions.
 */
export function cleanupBloatedStorage(): void {
  try {
    const keysToCheck = ['sc_user_profile', 'sc_student', 'sc_chats', 'sc_exam_results'];
    for (const key of keysToCheck) {
      const item = localStorage.getItem(key);
      if (item && item.length > 500000) {
        // Over 500KB is excessively large for simple state
        console.info(`[Storage] Cleaning bloated key "${key}" (${Math.round(item.length / 1024)} KB)`);
        const sanitized = sanitizePayloadForStorage(item);
        if (sanitized !== item) {
          localStorage.setItem(key, sanitized);
        } else if (key === 'sc_chats' || key === 'sc_exam_results') {
          // If volatile cache, clear it
          localStorage.removeItem(key);
        }
      }
    }
  } catch (err) {
    console.warn('[Storage] Cleanup notice:', err);
  }
}

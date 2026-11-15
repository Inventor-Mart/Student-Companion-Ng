import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

const REMOTE_API_ORIGIN = (
  import.meta.env.VITE_API_ORIGIN ||
  'https://ais-pre-6kneqjoxpjhkhbumgktpro-896173298722.europe-west2.run.app'
).replace(/\/+$/, '');
const isBundledAndroidApk =
  typeof window !== 'undefined' && window.location.hostname === 'appassets.androidplatform.net';

if (isBundledAndroidApk && typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      return nativeFetch(`${REMOTE_API_ORIGIN}${input}`, init);
    }
    return nativeFetch(input, init);
  };
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && !isBundledAndroidApk) {
  if ('caches' in window) {
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name === 'sc-shell-v2' || name === 'sc-runtime-v2' || name === 'sc-api-v2')
            .map((name) => caches.delete(name))
        )
      )
      .catch(() => {});
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {
        // Ignore transient SW registration failures inside restricted frames
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

const REMOTE_API_ORIGIN = 'https://ais-pre-2gu2b762mx2v4rebuyqej3-245109150484.europe-west2.run.app';
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
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {
        // Ignore transient SW registration failures inside restricted frames
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

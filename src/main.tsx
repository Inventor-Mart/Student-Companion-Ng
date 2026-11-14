import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

if (import.meta.env.DEV && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // Ignore transient SW registration failures inside restricted preview frames
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

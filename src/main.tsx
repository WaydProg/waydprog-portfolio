import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/section.css';
import { App } from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root is missing in index.html');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// В продакшене страница уже отрендерена при сборке (scripts/prerender.ts), в dev-режиме — нет.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

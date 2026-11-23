import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT_DIR } from './lib/paths.ts';

const SSR_DIR = path.join(ROOT_DIR, 'node_modules', '.cache', 'prerender');
const HTML_FILE = path.join(ROOT_DIR, 'dist', 'index.html');
const ROOT_MARKUP = '<div id="root"></div>';

interface ServerEntry {
  render: () => string;
}

const entry = (await import(
  pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href
)) as ServerEntry;
const html = await readFile(HTML_FILE, 'utf8');

if (!html.includes(ROOT_MARKUP)) {
  throw new Error(`В ${HTML_FILE} не найден ${ROOT_MARKUP}`);
}

await writeFile(HTML_FILE, html.replace(ROOT_MARKUP, `<div id="root">${entry.render()}</div>`));
await rm(SSR_DIR, { recursive: true, force: true });
console.log('dist/index.html: страница отрендерена заранее');

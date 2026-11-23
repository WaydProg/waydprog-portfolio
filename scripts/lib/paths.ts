import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PROJECTS_FILE = path.join(ROOT_DIR, 'src', 'data', 'projects.json');
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

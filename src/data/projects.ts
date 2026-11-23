import { parseProjects } from '../lib/projectSchema';
import rawProjects from './projects.json';

export const projects = parseProjects(rawProjects);

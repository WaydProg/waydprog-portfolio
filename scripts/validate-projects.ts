import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseProjects, ProjectValidationError } from '../src/lib/projectSchema.ts';
import { projectImagePath } from '../src/lib/projectMedia.ts';
import { PROJECTS_FILE, PUBLIC_DIR } from './lib/paths.ts';

async function findMissingMedia(): Promise<string[]> {
  const projects = parseProjects(JSON.parse(await readFile(PROJECTS_FILE, 'utf8')));
  const expected = projects.flatMap((project) =>
    project.images.flatMap((image) =>
      image.widths.map((width) => projectImagePath(project.slug, image.file, width)),
    ),
  );
  const checks = await Promise.all(
    expected.map(async (relativePath) => {
      try {
        await access(path.join(PUBLIC_DIR, relativePath));
        return null;
      } catch {
        return relativePath;
      }
    }),
  );
  return checks.filter((item): item is string => item !== null);
}

try {
  const missing = await findMissingMedia();
  if (missing.length > 0) {
    console.error(
      `Не найдены файлы изображений в public/:\n${missing.map((m) => `  • ${m}`).join('\n')}`,
    );
    process.exit(1);
  }
  console.log('projects.json: схема и медиафайлы в порядке');
} catch (error) {
  console.error(error instanceof ProjectValidationError ? error.message : error);
  process.exit(1);
}

import { access, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { projectImagePath } from '../src/lib/projectMedia.ts';
import {
  parseProjects,
  ProjectValidationError,
  SLUG_PATTERN,
  THUMB_TONES,
  type Project,
  type ProjectImage,
  type ProjectKind,
  type ProjectLink,
  type ProjectType,
} from '../src/lib/projectSchema.ts';
import { optimizeImage } from './lib/optimize-image.ts';
import { PROJECTS_FILE, PUBLIC_DIR } from './lib/paths.ts';
import { InputClosedError, Prompter } from './lib/prompter.ts';
import { slugify } from './lib/slug.ts';

type Draft = Omit<Project, 'images'>;

interface ScreenshotSource {
  readonly sourcePath: string;
  readonly alt: string;
}

const readProjects = async (): Promise<Project[]> =>
  parseProjects(JSON.parse(await readFile(PROJECTS_FILE, 'utf8')));

/** Путь из терминала после drag-and-drop может быть в кавычках или с экранированными пробелами. */
const normalizeDroppedPath = (value: string): string =>
  path.resolve(
    value
      .trim()
      .replace(/^['"]|['"]$/g, '')
      .replace(/\\(.)/g, '$1'),
  );

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};

async function askDraft(prompt: Prompter, existing: readonly Project[]): Promise<Draft> {
  const takenSlugs = new Set(existing.map((project) => project.slug));

  const title = await prompt.required('Название проекта');
  const slug = await prompt.required('Адрес (slug, латиница)', slugify(title), (value) => {
    if (!SLUG_PATTERN.test(value)) return 'только латиница в нижнем регистре, цифры и дефис';
    if (takenSlugs.has(value)) return 'проект с таким slug уже есть';
    return null;
  });
  const type = await prompt.choose<ProjectType>('Тип', [
    { value: 'site', label: 'САЙТ' },
    { value: 'bot', label: 'БОТ' },
  ]);
  const kind = await prompt.choose<ProjectKind>('Метка', [
    { value: 'real', label: 'РЕАЛЬНЫЙ ПРОЕКТ' },
    { value: 'demo', label: 'ДЕМО-ПРОЕКТ' },
  ]);
  const format = await prompt.required(
    'Формат (подпись под превью)',
    type === 'bot' ? 'Telegram-бот' : 'Лендинг',
  );
  const summary = await prompt.required('Короткое описание для списка');
  const description = await prompt.required('Подробное описание для карточки');
  const tasks = await prompt.list('Что сделано — пункты через «;»', ';', 1);
  const stack = await prompt.list('Стек через запятую', ',', 1);
  const status = await prompt.required('Статус', kind === 'demo' ? 'Концепт' : 'Завершён');

  const links = await askLinks(prompt);

  const thumbLabel = await prompt.required(
    'Надпись на миниатюре (до 8 символов)',
    title.split(/\s+/)[0]?.slice(0, 8).toUpperCase() ?? title,
  );
  const tone = THUMB_TONES[existing.length % THUMB_TONES.length] ?? 'lime';

  return {
    slug,
    title,
    type,
    kind,
    format,
    summary,
    description,
    status,
    tasks,
    stack,
    stats: [],
    links,
    thumb: { label: thumbLabel, tone },
  };
}

async function askLinks(prompt: Prompter): Promise<ProjectLink[]> {
  const links: ProjectLink[] = [];
  console.log('Ссылки: адрес проекта, демо или репозитория. Пустая строка — закончить.');
  for (;;) {
    const url = await prompt.text('  URL');
    if (!url) return links;
    if (!isHttpUrl(url)) {
      console.log('  ✗ адрес должен начинаться с http:// или https://');
      continue;
    }
    links.push({ url, label: await prompt.required('  Подпись', 'Открыть проект') });
  }
}

async function askScreenshots(prompt: Prompter, title: string): Promise<ScreenshotSource[]> {
  const screenshots: ScreenshotSource[] = [];
  console.log('Скриншоты: путь к PNG/JPG/WebP (можно перетащить файл в терминал).');
  console.log('Первый скриншот станет обложкой. Пустая строка — закончить.');
  for (;;) {
    const raw = await prompt.text(`  Скриншот ${screenshots.length + 1}`);
    if (!raw) {
      if (screenshots.length > 0) return screenshots;
      console.log('  ✗ нужен хотя бы один скриншот');
      continue;
    }
    const sourcePath = normalizeDroppedPath(raw);
    if (!(await fileExists(sourcePath))) {
      console.log(`  ✗ файл не найден: ${sourcePath}`);
      continue;
    }
    const alt = await prompt.required(
      '  Что на скриншоте (alt)',
      `${title} — скриншот ${screenshots.length + 1}`,
    );
    screenshots.push({ sourcePath, alt });
  }
}

async function saveImages(slug: string, sources: readonly ScreenshotSource[]) {
  const outputDir = path.join(PUBLIC_DIR, path.dirname(projectImagePath(slug, 'x', 1)));
  const images: ProjectImage[] = [];
  for (const [index, source] of sources.entries()) {
    const file = index === 0 ? 'cover' : `shot-${index + 1}`;
    const optimized = await optimizeImage(source.sourcePath, outputDir, file);
    images.push({ file, alt: source.alt, ...optimized });
    console.log(`  ✓ ${file}: ${optimized.widths.map((width) => `${width}px`).join(', ')}`);
  }
  return { images, outputDir };
}

async function main() {
  const existing = await readProjects();
  const prompt = new Prompter();

  try {
    console.log(`\nНовый проект для портфолио (сейчас в списке: ${existing.length})\n`);
    const draft = await askDraft(prompt, existing);
    const screenshots = await askScreenshots(prompt, draft.title);
    const placeFirst = await prompt.confirm('Поставить проект первым в списке?', false);

    console.log(`\n${draft.title} · ${draft.type === 'site' ? 'САЙТ' : 'БОТ'} · ${draft.format}`);
    console.log(
      `${draft.summary}\nСтек: ${draft.stack.join(', ')}\nСкриншотов: ${screenshots.length}`,
    );
    if (!(await prompt.confirm('Сохранить?', true))) {
      console.log('Отменено, ничего не изменено.');
      return;
    }

    const { images, outputDir } = await saveImages(draft.slug, screenshots);
    const project: Project = { ...draft, images };
    const next = placeFirst ? [project, ...existing] : [...existing, project];

    try {
      parseProjects(next);
    } catch (error) {
      await rm(outputDir, { recursive: true, force: true });
      throw error;
    }

    await writeFile(PROJECTS_FILE, `${JSON.stringify(next, null, 2)}\n`);
    console.log(`\n✓ Проект «${draft.title}» добавлен в src/data/projects.json`);
    console.log('Проверьте локально: npm run dev. Опубликовать: npm run deploy');
  } finally {
    prompt.close();
  }
}

try {
  await main();
} catch (error) {
  const isKnown = error instanceof ProjectValidationError || error instanceof InputClosedError;
  console.error(isKnown ? `\n${error.message}` : error);
  process.exit(1);
}

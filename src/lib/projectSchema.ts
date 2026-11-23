export const PROJECT_TYPES = ['site', 'bot'] as const;
export const PROJECT_KINDS = ['real', 'demo'] as const;
export const THUMB_TONES = ['lime', 'lavender', 'sage', 'sky', 'sand', 'ink'] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectKind = (typeof PROJECT_KINDS)[number];
export type ThumbTone = (typeof THUMB_TONES)[number];

export interface ProjectImage {
  readonly file: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly widths: readonly number[];
}

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
}

export interface ProjectStat {
  readonly value: string;
  readonly label: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly type: ProjectType;
  readonly kind: ProjectKind;
  readonly format: string;
  readonly summary: string;
  readonly description: string;
  readonly status: string;
  readonly tasks: readonly string[];
  readonly stack: readonly string[];
  readonly stats: readonly ProjectStat[];
  readonly links: readonly ProjectLink[];
  readonly thumb: { readonly label: string; readonly tone: ThumbTone };
  readonly images: readonly ProjectImage[];
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_PATTERN = /^https?:\/\/[^\s]+$/;

export class ProjectValidationError extends Error {
  readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super(
      `Данные проектов не прошли проверку:\n${issues.map((issue) => `  • ${issue}`).join('\n')}`,
    );
    this.name = 'ProjectValidationError';
    this.issues = issues;
  }
}

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isOneOf = <T extends string>(options: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && (options as readonly string[]).includes(value);

class Reader {
  readonly issues: string[] = [];

  string(record: UnknownRecord, key: string, path: string): string {
    const value = record[key];
    if (typeof value !== 'string' || value.trim() === '') {
      this.issues.push(`${path}.${key}: ожидается непустая строка`);
      return '';
    }
    return value.trim();
  }

  stringList(record: UnknownRecord, key: string, path: string, minItems: number): string[] {
    const value = record[key];
    if (!Array.isArray(value) || value.length < minItems) {
      this.issues.push(`${path}.${key}: ожидается массив строк (минимум ${minItems})`);
      return [];
    }
    return value.flatMap((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        this.issues.push(`${path}.${key}[${index}]: ожидается непустая строка`);
        return [];
      }
      return [item.trim()];
    });
  }

  oneOf<T extends string>(
    record: UnknownRecord,
    key: string,
    path: string,
    options: readonly T[],
  ): T {
    const value = record[key];
    if (!isOneOf(options, value)) {
      this.issues.push(`${path}.${key}: допустимые значения — ${options.join(', ')}`);
      return options[0] as T;
    }
    return value;
  }

  positiveInt(record: UnknownRecord, key: string, path: string): number {
    const value = record[key];
    if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
      this.issues.push(`${path}.${key}: ожидается целое положительное число`);
      return 1;
    }
    return value;
  }

  records(record: UnknownRecord, key: string, path: string, minItems: number): UnknownRecord[] {
    const value = record[key];
    if (!Array.isArray(value) || value.length < minItems) {
      this.issues.push(`${path}.${key}: ожидается массив объектов (минимум ${minItems})`);
      return [];
    }
    return value.flatMap((item, index) => {
      if (!isRecord(item)) {
        this.issues.push(`${path}.${key}[${index}]: ожидается объект`);
        return [];
      }
      return [item];
    });
  }
}

function readImage(reader: Reader, record: UnknownRecord, path: string): ProjectImage {
  const file = reader.string(record, 'file', path);
  if (file && !SLUG_PATTERN.test(file)) {
    reader.issues.push(`${path}.file: только латиница в нижнем регистре, цифры и дефис`);
  }
  const widthsValue = record.widths;
  const widths =
    Array.isArray(widthsValue) &&
    widthsValue.length > 0 &&
    widthsValue.every((width) => typeof width === 'number' && Number.isInteger(width) && width > 0)
      ? (widthsValue as number[])
      : [];
  if (widths.length === 0) {
    reader.issues.push(`${path}.widths: ожидается непустой массив ширин в пикселях`);
  }
  return {
    file,
    alt: reader.string(record, 'alt', path),
    width: reader.positiveInt(record, 'width', path),
    height: reader.positiveInt(record, 'height', path),
    widths,
  };
}

function readLink(reader: Reader, record: UnknownRecord, path: string): ProjectLink {
  const url = reader.string(record, 'url', path);
  if (url && !URL_PATTERN.test(url)) {
    reader.issues.push(`${path}.url: ожидается адрес, начинающийся с http:// или https://`);
  }
  return { label: reader.string(record, 'label', path), url };
}

function readProject(reader: Reader, record: UnknownRecord, path: string): Project {
  const slug = reader.string(record, 'slug', path);
  if (slug && !SLUG_PATTERN.test(slug)) {
    reader.issues.push(`${path}.slug: только латиница в нижнем регистре, цифры и дефис`);
  }
  const thumbValue = record.thumb;
  const thumbRecord = isRecord(thumbValue) ? thumbValue : {};
  if (!isRecord(thumbValue)) {
    reader.issues.push(`${path}.thumb: ожидается объект { label, tone }`);
  }

  return {
    slug,
    title: reader.string(record, 'title', path),
    type: reader.oneOf(record, 'type', path, PROJECT_TYPES),
    kind: reader.oneOf(record, 'kind', path, PROJECT_KINDS),
    format: reader.string(record, 'format', path),
    summary: reader.string(record, 'summary', path),
    description: reader.string(record, 'description', path),
    status: reader.string(record, 'status', path),
    tasks: reader.stringList(record, 'tasks', path, 1),
    stack: reader.stringList(record, 'stack', path, 1),
    stats: reader.records(record, 'stats', path, 0).map((stat, index) => ({
      value: reader.string(stat, 'value', `${path}.stats[${index}]`),
      label: reader.string(stat, 'label', `${path}.stats[${index}]`),
    })),
    links: reader
      .records(record, 'links', path, 0)
      .map((link, index) => readLink(reader, link, `${path}.links[${index}]`)),
    thumb: {
      label: reader.string(thumbRecord, 'label', `${path}.thumb`),
      tone: reader.oneOf(thumbRecord, 'tone', `${path}.thumb`, THUMB_TONES),
    },
    images: reader
      .records(record, 'images', path, 1)
      .map((image, index) => readImage(reader, image, `${path}.images[${index}]`)),
  };
}

export function parseProjects(input: unknown): Project[] {
  const reader = new Reader();
  if (!Array.isArray(input)) {
    throw new ProjectValidationError(['корень файла должен быть массивом проектов']);
  }

  const projects = input.map((item, index) => {
    const path = `projects[${index}]`;
    if (!isRecord(item)) {
      reader.issues.push(`${path}: ожидается объект`);
      return null;
    }
    return readProject(reader, item, path);
  });

  const seen = new Set<string>();
  for (const project of projects) {
    if (!project) continue;
    if (seen.has(project.slug)) {
      reader.issues.push(`slug «${project.slug}» встречается несколько раз`);
    }
    seen.add(project.slug);
  }

  if (reader.issues.length > 0) {
    throw new ProjectValidationError(reader.issues);
  }
  return projects.filter((project): project is Project => project !== null);
}

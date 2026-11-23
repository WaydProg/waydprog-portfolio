export const PROJECT_MEDIA_DIR = 'projects';

export const projectImagePath = (slug: string, file: string, width: number): string =>
  `${PROJECT_MEDIA_DIR}/${slug}/${file}-${width}.webp`;

export const projectImageUrl = (slug: string, file: string, width: number): string =>
  `/${projectImagePath(slug, file, width)}`;

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const LANDSCAPE_WIDTHS = [640, 960, 1280] as const;
const PORTRAIT_WIDTHS = [360, 720] as const;
const WEBP_QUALITY = 78;

export interface OptimizedImage {
  readonly width: number;
  readonly height: number;
  readonly widths: number[];
}

/**
 * Сохраняет картинку в WebP в нескольких ширинах: `<file>-<ширина>.webp`.
 * Ширины больше исходной пропускаются, чтобы не растягивать изображение.
 */
export async function optimizeImage(
  sourcePath: string,
  outputDir: string,
  file: string,
): Promise<OptimizedImage> {
  const metadata = await sharp(sourcePath).metadata();
  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  if (!sourceWidth || !sourceHeight) {
    throw new Error(`Не удалось прочитать размеры изображения: ${sourcePath}`);
  }

  const candidates = sourceWidth >= sourceHeight ? LANDSCAPE_WIDTHS : PORTRAIT_WIDTHS;
  const fitting = candidates.filter((width) => width <= sourceWidth);
  const widths = fitting.length > 0 ? fitting : [sourceWidth];

  await mkdir(outputDir, { recursive: true });
  await Promise.all(
    widths.map((width) =>
      sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toFile(path.join(outputDir, `${file}-${width}.webp`)),
    ),
  );

  const largest = widths[widths.length - 1] ?? sourceWidth;
  return {
    width: largest,
    height: Math.round((sourceHeight * largest) / sourceWidth),
    widths,
  };
}

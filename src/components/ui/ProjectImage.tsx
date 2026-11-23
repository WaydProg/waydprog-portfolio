import { projectImageUrl } from '../../lib/projectMedia';
import type { ProjectImage as ProjectImageData } from '../../lib/projectSchema';

interface ProjectImageProps {
  readonly slug: string;
  readonly image: ProjectImageData;
  readonly sizes: string;
  readonly loading?: 'eager' | 'lazy';
  readonly fetchPriority?: 'high' | 'auto';
  readonly className?: string;
}

export function ProjectImage({
  slug,
  image,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  className,
}: ProjectImageProps) {
  const largestWidth = image.widths[image.widths.length - 1] ?? image.width;
  const srcSet = image.widths
    .map((width) => `${projectImageUrl(slug, image.file, width)} ${width}w`)
    .join(', ');

  return (
    <img
      className={className}
      src={projectImageUrl(slug, image.file, largestWidth)}
      srcSet={srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}

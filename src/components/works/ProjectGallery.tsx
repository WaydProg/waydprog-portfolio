import type { Project } from '../../lib/projectSchema';
import { ProjectImage } from '../ui/ProjectImage';

interface ProjectGalleryProps {
  readonly project: Project;
}

const isPortrait = (image: { width: number; height: number }) => image.height > image.width;

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const wide = project.images.filter((image) => !isPortrait(image));
  const tall = project.images.filter(isPortrait);

  return (
    <section className="project-gallery" aria-label="Скриншоты">
      {wide.map((image) => (
        <figure key={image.file} className="project-gallery__item">
          <ProjectImage slug={project.slug} image={image} sizes="(min-width: 64rem) 60rem, 100vw" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      ))}
      {tall.length > 0 && (
        <div className="project-gallery__phones">
          {tall.map((image) => (
            <figure key={image.file} className="project-gallery__item">
              <ProjectImage
                slug={project.slug}
                image={image}
                sizes="(min-width: 40rem) 18rem, 50vw"
              />
              <figcaption>{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

import { useState } from 'react';
import { projectKindLabel, projectTypeLabel } from '../../lib/projectLabels';
import type { Project } from '../../lib/projectSchema';
import { ProjectImage } from '../ui/ProjectImage';

interface ProjectPreviewProps {
  readonly id: string;
  readonly projects: readonly Project[];
  readonly activeIndex: number;
  readonly isWarm: boolean;
  readonly onOpen: (index: number) => void;
}

const PREVIEW_SIZES = '(min-width: 60rem) 37rem, calc(100vw - 2rem)';

export function ProjectPreview({ id, projects, activeIndex, isWarm, onOpen }: ProjectPreviewProps) {
  // Обложки загружаются, когда посетитель тянется к списку, или при первом показе проекта.
  const [shownIndexes, setShownIndexes] = useState<ReadonlySet<number>>(
    () => new Set([activeIndex]),
  );
  if (!shownIndexes.has(activeIndex)) {
    setShownIndexes(new Set(shownIndexes).add(activeIndex));
  }

  const active = projects[activeIndex];
  if (!active) return null;

  return (
    <figure id={id} className="project-preview">
      <button
        type="button"
        className="project-preview__frame"
        aria-haspopup="dialog"
        aria-label={`Подробнее о проекте «${active.title}»`}
        onClick={() => {
          onOpen(activeIndex);
        }}
      >
        {projects.map((project, index) => {
          const cover = project.images[0];
          if (!cover || !(isWarm || shownIndexes.has(index))) return null;
          return (
            <span
              key={project.slug}
              className="project-preview__layer"
              data-active={index === activeIndex}
            >
              <ProjectImage
                className="project-preview__image"
                slug={project.slug}
                image={cover}
                sizes={PREVIEW_SIZES}
              />
            </span>
          );
        })}
      </button>
      <figcaption className="project-preview__caption" key={active.slug}>
        <span className="project-preview__meta mono">
          <span className="project-preview__name">
            {active.title} / {projectTypeLabel[active.type]} · {active.format} —
          </span>
          <span className="project-preview__stack">{active.stack.slice(0, 3).join(' · ')}</span>
        </span>
        <span className="project-preview__kind mono" data-kind={active.kind}>
          {projectKindLabel[active.kind]}
        </span>
      </figcaption>
    </figure>
  );
}

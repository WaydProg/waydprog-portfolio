import { useRef } from 'react';
import { padNumber } from '../../lib/format';
import { isStackedWorksLayout } from '../../lib/layout';
import { projectRowId } from '../../lib/projectDom';
import { projectKindLabel, projectTypeLabel } from '../../lib/projectLabels';
import type { Project } from '../../lib/projectSchema';
import { ArrowIcon } from '../ui/ArrowIcon';
import { ProjectImage } from '../ui/ProjectImage';
import { ProjectThumb } from './ProjectThumb';

interface ProjectRowProps {
  readonly project: Project;
  readonly index: number;
  readonly isActive: boolean;
  readonly previewId: string;
  readonly onActivate: (index: number) => void;
  readonly onOpen: (index: number) => void;
}

interface Press {
  readonly pointerType: string;
  readonly wasActive: boolean;
}

// Те же sizes, что у превью: на десктопе браузер возьмёт уже загруженный файл.
const COVER_SIZES = '(min-width: 60rem) 37rem, calc(100vw - 2rem)';

export function ProjectRow({
  project,
  index,
  isActive,
  previewId,
  onActivate,
  onOpen,
}: ProjectRowProps) {
  // Состояние строки в момент нажатия: фокус от касания успевает сделать её активной до клика.
  const press = useRef<Press | null>(null);
  const cover = project.images[0];

  const handleClick = () => {
    const current = press.current;
    press.current = null;
    const isTouchPreview =
      current !== null && current.pointerType !== 'mouse' && !current.wasActive;
    if (isTouchPreview && !isStackedWorksLayout()) {
      onActivate(index);
    } else {
      onOpen(index);
    }
  };

  return (
    <button
      type="button"
      id={projectRowId(project.slug)}
      className="project-row"
      data-active={isActive}
      aria-current={isActive ? 'true' : undefined}
      aria-controls={previewId}
      aria-haspopup="dialog"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onActivate(index);
      }}
      onPointerDown={(event) => {
        press.current = { pointerType: event.pointerType, wasActive: isActive };
      }}
      onFocus={() => {
        onActivate(index);
      }}
      onClick={handleClick}
    >
      {cover && (
        <span className="project-row__cover">
          <ProjectImage
            slug={project.slug}
            image={cover}
            sizes={COVER_SIZES}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        </span>
      )}
      <span className="project-row__index mono">{padNumber(index + 1)}</span>
      <ProjectThumb label={project.thumb.label} tone={project.thumb.tone} />
      <span className="project-row__text">
        <span className="project-row__title">{project.title}</span>
        <span className="project-row__summary">{project.summary}</span>
      </span>
      <span className="project-row__meta">
        <span className="project-row__type mono">{projectTypeLabel[project.type]}</span>
        <ArrowIcon className="project-row__arrow-idle" size={16} />
        <ArrowIcon className="project-row__arrow-active" direction="right" size={16} />
      </span>
      <span className="project-row__caption mono">
        <span className="project-row__stack">
          {project.format} — {project.stack.slice(0, 3).join(' · ')}
        </span>
        <span className="project-row__kind" data-kind={project.kind}>
          {projectKindLabel[project.kind]}
        </span>
      </span>
    </button>
  );
}

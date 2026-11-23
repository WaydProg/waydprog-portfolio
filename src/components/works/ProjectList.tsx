import type { KeyboardEvent } from 'react';
import type { Project } from '../../lib/projectSchema';
import { ProjectRow } from './ProjectRow';

interface ProjectListProps {
  readonly projects: readonly Project[];
  readonly activeIndex: number;
  readonly previewId: string;
  readonly onActivate: (index: number) => void;
  readonly onOpen: (index: number) => void;
  readonly onIntent: () => void;
}

const focusRowByOffset = (
  event: KeyboardEvent<HTMLUListElement>,
  offset: number | 'first' | 'last',
) => {
  const rows = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('.project-row'));
  const current = rows.findIndex((row) => row === document.activeElement);
  const target =
    offset === 'first'
      ? 0
      : offset === 'last'
        ? rows.length - 1
        : Math.min(Math.max(current + offset, 0), rows.length - 1);
  rows[target]?.focus();
  event.preventDefault();
};

const keyOffsets: Record<string, number | 'first' | 'last'> = {
  ArrowDown: 1,
  ArrowUp: -1,
  Home: 'first',
  End: 'last',
};

export function ProjectList({
  projects,
  activeIndex,
  previewId,
  onActivate,
  onOpen,
  onIntent,
}: ProjectListProps) {
  return (
    <ul
      className="project-list"
      aria-label="Список проектов"
      onPointerEnter={onIntent}
      onFocus={onIntent}
      onKeyDown={(event) => {
        const offset = keyOffsets[event.key];
        if (offset !== undefined) focusRowByOffset(event, offset);
      }}
    >
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectRow
            project={project}
            index={index}
            isActive={index === activeIndex}
            previewId={previewId}
            onActivate={onActivate}
            onOpen={onOpen}
          />
        </li>
      ))}
    </ul>
  );
}

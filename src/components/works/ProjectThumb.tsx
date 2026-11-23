import type { ThumbTone } from '../../lib/projectSchema';

interface ProjectThumbProps {
  readonly label: string;
  readonly tone: ThumbTone;
}

export function ProjectThumb({ label, tone }: ProjectThumbProps) {
  return (
    <span className="project-thumb" data-tone={tone} aria-hidden="true">
      <span className="project-thumb__label">{label}</span>
      <span className="project-thumb__bars" />
    </span>
  );
}

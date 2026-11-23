import { useEffect, useRef } from 'react';
import type { Project } from '../../lib/projectSchema';
import { ProjectDetails } from './ProjectDetails';

interface ProjectDialogProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      // Фокус на заголовок, а не на кнопку закрытия: читалка начнёт с названия проекта.
      dialog.querySelector<HTMLElement>('#project-dialog-title')?.focus();
    }
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && <ProjectDetails project={project} onClose={onClose} />}
    </dialog>
  );
}

import { projectKindLabel, projectTypeLabel } from '../../lib/projectLabels';
import type { Project } from '../../lib/projectSchema';
import { ArrowIcon } from '../ui/ArrowIcon';
import { TagList } from '../ui/TagList';
import { ProjectGallery } from './ProjectGallery';

interface ProjectDetailsProps {
  readonly project: Project;
  readonly onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <article className="project-details">
      <header className="project-details__header">
        <p className="project-details__eyebrow mono">
          {projectTypeLabel[project.type]} · {project.format}
          <span className="project-details__kind" data-kind={project.kind}>
            {projectKindLabel[project.kind]}
          </span>
        </p>
        <button
          type="button"
          className="project-details__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
            <path d="M3 3l12 12M15 3 3 15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <h2 id="project-dialog-title" className="project-details__title" tabIndex={-1}>
          {project.title}
        </h2>
        <p className="project-details__summary">{project.summary}</p>
      </header>

      <div className="project-details__body">
        <div className="project-details__main">
          <p className="project-details__description">{project.description}</p>
          <h3 className="project-details__subtitle mono">Что сделано</h3>
          <ul className="project-details__tasks">
            {project.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>

        <aside className="project-details__aside" aria-label="Коротко о проекте">
          {project.stats.length > 0 && (
            <dl className="project-details__stats">
              {project.stats.map((stat) => (
                <div key={stat.label} className="project-details__stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="project-details__block">
            <h3 className="project-details__subtitle mono">Стек</h3>
            <TagList items={project.stack} label="Стек проекта" />
          </div>
          <div className="project-details__block">
            <h3 className="project-details__subtitle mono">Статус</h3>
            <p>{project.status}</p>
          </div>
          {project.links.length > 0 && (
            <ul className="project-details__links">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowIcon size={14} />
                    <span className="visually-hidden">(откроется в новой вкладке)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <ProjectGallery project={project} />
    </article>
  );
}

import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { useHistoryDialog } from '../../hooks/useHistoryDialog';
import { projectRowId } from '../../lib/projectDom';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectDialog } from './ProjectDialog';
import { ProjectList } from './ProjectList';
import { ProjectPreview } from './ProjectPreview';
import './Works.css';
import './ProjectDialog.css';

const PREVIEW_ID = 'project-preview';

export function Works() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewWarm, setIsPreviewWarm] = useState(false);
  const dialog = useHistoryDialog<number>();
  const openProject = dialog.value === null ? null : (projects[dialog.value] ?? null);
  const lastOpenedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (openProject) {
      lastOpenedSlug.current = openProject.slug;
      return;
    }
    // Safari не фокусирует кнопку при клике, поэтому возвращаем фокус на строку проекта сами.
    if (lastOpenedSlug.current) {
      document.getElementById(projectRowId(lastOpenedSlug.current))?.focus({ preventScroll: true });
      lastOpenedSlug.current = null;
    }
  }, [openProject]);

  return (
    <section className="works container" aria-labelledby="works">
      <SectionHeading
        id="works"
        title="Избранные работы"
        count={projects.length}
        aside="Реальные проекты и концепты"
      />
      <div className="works__grid">
        <ProjectList
          projects={projects}
          activeIndex={activeIndex}
          previewId={PREVIEW_ID}
          onActivate={setActiveIndex}
          onOpen={dialog.open}
          onIntent={() => {
            setIsPreviewWarm(true);
          }}
        />
        <div className="works__preview">
          <ProjectPreview
            id={PREVIEW_ID}
            projects={projects}
            activeIndex={activeIndex}
            isWarm={isPreviewWarm}
            onOpen={dialog.open}
          />
        </div>
      </div>
      <ProjectDialog project={openProject} onClose={dialog.close} />
    </section>
  );
}

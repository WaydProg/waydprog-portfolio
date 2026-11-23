import type { ProjectKind, ProjectType } from './projectSchema';

export const projectTypeLabel: Record<ProjectType, string> = {
  site: 'Сайт',
  bot: 'Бот',
};

export const projectKindLabel: Record<ProjectKind, string> = {
  real: 'Реальный проект',
  demo: 'Демо-проект',
};

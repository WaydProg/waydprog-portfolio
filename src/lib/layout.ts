/** Ширина, на которой список работ становится лентой карточек. Совпадает с медиазапросами в Works.css. */
export const STACKED_WORKS_QUERY = '(max-width: 59.99rem)';

export const isStackedWorksLayout = (): boolean => window.matchMedia(STACKED_WORKS_QUERY).matches;

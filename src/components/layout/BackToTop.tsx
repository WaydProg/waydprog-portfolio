import { useScrolledPast } from '../../hooks/useScrolledPast';
import { ArrowIcon } from '../ui/ArrowIcon';
import './BackToTop.css';

const SHOW_AFTER_PX = 900;

export function BackToTop() {
  const isVisible = useScrolledPast(SHOW_AFTER_PX);

  return (
    <a
      className="back-to-top"
      href="#top"
      data-visible={isVisible}
      aria-label="Наверх"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowIcon direction="up" size={18} />
    </a>
  );
}

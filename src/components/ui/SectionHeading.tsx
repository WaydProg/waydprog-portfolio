import { padNumber } from '../../lib/format';
import './SectionHeading.css';

interface SectionHeadingProps {
  readonly id: string;
  readonly title: string;
  readonly count?: number;
  readonly aside?: string;
}

export function SectionHeading({ id, title, count, aside }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 id={id} className="section-heading__title">
        {title}
        {count !== undefined && (
          <span className="section-heading__count mono" aria-label={`${count} шт.`}>
            [{padNumber(count)}]
          </span>
        )}
      </h2>
      {aside && <p className="section-heading__aside mono">{aside}</p>}
    </div>
  );
}

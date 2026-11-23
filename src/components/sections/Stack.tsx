import { stack } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { TagList } from '../ui/TagList';
import './Stack.css';

export function Stack() {
  return (
    <section className="section container" aria-labelledby="stack">
      <SectionHeading id="stack" title="Стек" aside="Подтверждён проектами выше" />
      <div className="stack">
        {stack.map((group) => (
          <div key={group.title} className="stack__group">
            <h3 className="stack__title mono">{group.title}</h3>
            <TagList items={group.items} label={group.title} />
          </div>
        ))}
      </div>
    </section>
  );
}

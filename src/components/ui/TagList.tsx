import './TagList.css';

interface TagListProps {
  readonly items: readonly string[];
  readonly label: string;
}

export function TagList({ items, label }: TagListProps) {
  return (
    <ul className="tag-list" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="tag-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
}

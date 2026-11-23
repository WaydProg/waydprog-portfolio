import { publishedProfileLinks } from '../../data/links';
import { ArrowIcon } from '../ui/ArrowIcon';
import './ProfileButtons.css';

export function ProfileButtons() {
  if (publishedProfileLinks.length === 0) return null;

  return (
    <ul className="profile-buttons" aria-label="Профили и контакты">
      {publishedProfileLinks.map((link) => (
        <li key={link.id}>
          <a
            className="profile-buttons__link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${link.label} (откроется в новой вкладке)`}
          >
            {link.shortLabel}
            <ArrowIcon size={12} />
          </a>
        </li>
      ))}
    </ul>
  );
}

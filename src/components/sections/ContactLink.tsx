import type { PublishedProfileLink } from '../../data/links';
import { formatDisplayUrl } from '../../lib/url';
import { ArrowIcon } from '../ui/ArrowIcon';

interface ContactLinkProps {
  readonly link: PublishedProfileLink;
}

export function ContactLink({ link }: ContactLinkProps) {
  return (
    <a className="contact-link" href={link.url} target="_blank" rel="noopener noreferrer me">
      <span className="contact-link__label">
        {link.label}
        <ArrowIcon className="contact-link__icon" size={14} />
      </span>
      <span className="contact-link__url mono">{formatDisplayUrl(link.url)}</span>
      <span className="visually-hidden">(откроется в новой вкладке)</span>
    </a>
  );
}

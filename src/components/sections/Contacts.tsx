import { contacts } from '../../data/content';
import { publishedProfileLinks } from '../../data/links';
import { ContactLink } from './ContactLink';
import { Kicker } from '../ui/Kicker';
import './Contacts.css';

export function Contacts() {
  return (
    <section className="contacts" aria-labelledby="contacts">
      <div className="contacts__inner container">
        <div className="contacts__intro">
          <Kicker>{contacts.kicker}</Kicker>
          <h2 id="contacts" className="contacts__title">
            {contacts.title}
          </h2>
          <p className="contacts__lead">{contacts.lead}</p>
        </div>
        {publishedProfileLinks.length > 0 && (
          <ul className="contacts__links">
            {publishedProfileLinks.map((link) => (
              <li key={link.id}>
                <ContactLink link={link} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

import { site } from '../../data/site';
import './SiteHeader.css';

const navItems = [
  { href: '#works', label: 'Работы' },
  { href: '#about', label: 'Обо мне', optional: true },
  { href: '#contacts', label: 'Контакты' },
] as const;

export function SiteHeader() {
  return (
    <header className="container">
      <div className="site-header">
        <a className="site-header__brand" href="#top">
          <span className="site-header__mark" aria-hidden="true">
            [ / ]
          </span>
          <span className="site-header__brand-text">{site.brandLabel}</span>
        </a>
        <nav className="site-header__nav" aria-label="Основная навигация">
          <ul className="site-header__links">
            {navItems.map((item) => (
              <li
                key={item.href}
                className={'optional' in item ? 'site-header__optional' : undefined}
              >
                <a className="site-header__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="site-header__focus mono">{site.focusLabel}</p>
        </nav>
      </div>
    </header>
  );
}

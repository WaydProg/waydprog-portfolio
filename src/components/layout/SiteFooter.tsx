import { footerNote } from '../../data/content';
import { site } from '../../data/site';
import { ArrowIcon } from '../ui/ArrowIcon';
import './SiteFooter.css';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <p className="site-footer__meta mono">
            {site.handle} / {site.footerLabel}
          </p>
          <p className="site-footer__note">{footerNote}</p>
          <a className="site-footer__top" href="#top">
            Наверх
            <ArrowIcon direction="up" size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}

import avatar96 from '../../assets/avatar-96.webp';
import avatar192 from '../../assets/avatar-192.webp';
import avatarFallback from '../../assets/avatar-192.png';
import { hero } from '../../data/content';
import { site } from '../../data/site';
import { ArrowIcon } from '../ui/ArrowIcon';
import { ProfileButtons } from './ProfileButtons';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__profile">
        <picture className="hero__picture">
          <source type="image/webp" srcSet={`${avatar96} 1x, ${avatar192} 2x`} />
          <img
            className="hero__avatar"
            src={avatarFallback}
            width={80}
            height={80}
            alt="Логотип WaydProg"
            fetchPriority="high"
          />
        </picture>
        <p className="hero__handle">{site.handle}</p>
        <p className="hero__role">{site.role}</p>
        <ProfileButtons />
        <p className="hero__motto mono">{site.motto}</p>
      </div>
      <div className="hero__main">
        <h1 id="hero-title" className="hero__title">
          {hero.titleLines.map((line) => (
            <span key={line} className="hero__title-line">
              {line}
            </span>
          ))}
        </h1>
        <div className="hero__footer">
          <p className="hero__lead">
            {hero.lead.map((line) => (
              <span key={line} className="hero__lead-line">
                {line}
              </span>
            ))}
          </p>
          <a className="hero__scroll" href="#works" aria-label="К избранным работам">
            <ArrowIcon direction="down" size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

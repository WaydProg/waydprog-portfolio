import { about } from '../../data/content';
import { Kicker } from '../ui/Kicker';
import { SectionHeading } from '../ui/SectionHeading';
import './About.css';

export function About() {
  return (
    <section className="section container" aria-labelledby="about">
      <SectionHeading id="about" title={about.title} aside="Фриланс · Kwork · FunPay · Playerok" />
      <div className="section__grid">
        <div className="section__side">
          <Kicker>Коротко</Kicker>
        </div>
        <div className="about__text">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

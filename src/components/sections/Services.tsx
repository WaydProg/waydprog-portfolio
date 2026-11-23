import { services } from '../../data/content';
import { padNumber } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import './Services.css';

export function Services() {
  return (
    <section className="section container" aria-labelledby="services">
      <SectionHeading
        id="services"
        title="Услуги"
        count={services.length}
        aside="Что могу сделать"
      />
      <ol className="services">
        {services.map((service, index) => (
          <li key={service.title} className="services__item">
            <span className="services__index mono">{padNumber(index + 1)}</span>
            <h3 className="services__title">{service.title}</h3>
            <p className="services__text">{service.text}</p>
            <p className="services__proof">
              <span className="mono">Примеры</span>
              {service.proof}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

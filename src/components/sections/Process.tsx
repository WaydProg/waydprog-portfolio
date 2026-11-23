import { processSteps } from '../../data/content';
import { padNumber } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import './Process.css';

export function Process() {
  return (
    <section className="section container" aria-labelledby="process">
      <SectionHeading id="process" title="Как я работаю" count={processSteps.length} />
      <ol className="process">
        {processSteps.map((step, index) => (
          <li key={step.title} className="process__step">
            <span className="process__index mono">{padNumber(index + 1)}</span>
            <h3 className="process__title">{step.title}</h3>
            <p className="process__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

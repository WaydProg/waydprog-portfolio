import { faq } from '../../data/content';
import { ArrowIcon } from '../ui/ArrowIcon';
import { SectionHeading } from '../ui/SectionHeading';
import './Faq.css';

export function Faq() {
  return (
    <section className="section faq-section container" aria-labelledby="faq">
      <SectionHeading id="faq" title="Частые вопросы" count={faq.length} />
      <div className="section__grid">
        <p className="section__side">Не нашли ответ — напишите на любой из площадок ниже.</p>
        <div className="faq">
          {faq.map((item) => (
            <details key={item.question} className="faq__item" name="faq">
              <summary className="faq__question">
                {item.question}
                <ArrowIcon className="faq__icon" direction="down" size={16} />
              </summary>
              <p className="faq__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

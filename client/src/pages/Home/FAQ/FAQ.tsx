import { useState } from 'react';
import Accordion from '@components/ui/Accordion/Accordion';
import './FAQ.scss';

const faqData = [
  {
    question: 'Какие методологии используются для оценки уровня тревожности пользователей?',
    answer:
      'Мы применяем научно-обоснованные методики, такие как шкала тревожности Бека, опросник Спилбергера и адаптированные версии когнитивных тестов.',
  },
  {
    question: 'Какие технологии обеспечивают безопасность пользовательских данных?',
    answer: 'Мы используем JWT-токены, шифрование AES-256, а также SOC 2 и GDPR-совместимые протоколы хранения данных.',
  },
  {
    question: 'Как проводится анализ данных о тревожности?',
    answer:
      'Анализ строится на базе вычислений уровней тревожностей методом анкетирования пользователей и статистической обработки, учитывая результаты и методические нормы.',
  },
  {
    question: 'Можно ли настроить уведомления для сотрудников?',
    answer: 'Да, руководители организаций могут настраивать email уведмоления для осведомления сотрудников.',
  },
  {
    question: 'Как обеспечивается анонимность пользователей?',
    answer:
      'Данные хранятся в зашифрованном виде, а идентификаторы пользователей могут быть псевдонимизированы или полностью анонимизированы.',
  },
  {
    question: 'Можно ли экспортировать отчеты?',
    answer:
      'Да, поддерживаются форматы PDF, CSV и JSON, а также возможность отправки отчётов по email. Вы можете распечатать документ с результатами опросника прямо с веб-сайта.',
  },
  {
    question: 'Как проводится обучение использованию платформы?',
    answer:
      'К разрабатываемому продукту в виде веб-приложения MentalPRO предоставляется пояснительная записка с подробным описанием всех функций и инструкцией к их использованию.',
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq__wrapper">
        <div className="faq__info">
          <h3 className="faq__category">
            faq <sup>[04]</sup>
          </h3>
          <h2 className="faq__title home-title">Часто задаваемые вопросы</h2>
          <p className="faq__desc home-desc">
            Еще больше информации и деталей об особенностях и функциях веб-приложении MentalPRO.
          </p>
        </div>

        <div className="faq__list">
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex === index}
              onClick={() => handleAccordionClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

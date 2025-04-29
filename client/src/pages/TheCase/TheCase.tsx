import { useParams } from 'react-router-dom';

import './TheCase.scss';
import Badge from '@/components/ui/Badge/Badge';
import CardCase from '@/components/CaseCard/CardCase';
import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const TheCase = observer(() => {
  const { link } = useParams<{ link: string }>();
  if (!link) {
    return <h2 className="case__not-found">ID практики не найден или передан не верно</h2>;
  }
  useEffect(() => {
    practiceListStore.fetchPracticeById(link);
    practiceListStore.fetchPractices();
  }, [link]);

  const cases = practiceListStore.practices;
  const article = practiceListStore.practice;

  if (!article) {
    return <h2 className="case__not-found">Практика не найдена</h2>;
  }

  return (
    <>
      <section className="case">
        <div className="case__wrapper">
          <Badge className="case__badge" variant="small">
            {article.category}
          </Badge>
          <h1 className="case__title">{article.title}</h1>
          <img src={article.image} alt={article.title} className="case__image" />
          <div className="case__text">
            {article.content.split('\n').map((paragraph) => {
              return <p className="case__paragraph">{paragraph}</p>;
            })}
          </div>
        </div>
      </section>
      <section className="other-cases">
        <div className="other-cases__wrapper">
          <h2 className="other-cases__title">Другие практики</h2>
          <ul className="other-cases__list">
            {cases.slice(0, 4).map((cs) => (
              <li key={`case-${cs.id}`} className="other-cases_item">
                <CardCase
                  id={cs.id}
                  title={cs.title}
                  description={cs.description}
                  category={cs.category}
                  image={cs.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
});

export default TheCase;

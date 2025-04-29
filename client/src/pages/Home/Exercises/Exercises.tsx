import { useEffect, useRef } from 'react';
import { enableDragScroll } from '../../../utils/dragScroll';
import './Exercises.scss';
import CardCase from '@/components/CaseCard/CardCase';
import { practiceListStore } from '@entities/practice/stores/practiceStoreInstance';
import { observer } from 'mobx-react-lite';

const Exercises = observer(() => {
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    practiceListStore.fetchPractices();
  }, []);

  const cases = practiceListStore.practices;

  useEffect(() => {
    if (containerRef.current) {
      enableDragScroll(containerRef.current);
    }
  }, []);

  return (
    <section className="exercises">
      <div className="exercises__wrapper">
        <p className="exercises__category">
          практики <sup>[01]</sup>
        </p>
        <h2 className="exercises__title home-title">Популярные практики</h2>
        <ul ref={containerRef} className="exercises__list">
          {[...cases].slice(0, 5).map((item, index) => (
            <li className="exercises__item" key={index}>
              <CardCase
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default Exercises;

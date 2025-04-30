import { useState, useEffect, useCallback } from 'react';
import CardSurvey from '@components/CardSurvey/CardSurvey';
import './Surveys.scss';
import Pagination from '@components/ui/Pagination/Pagination';
import Search from '@components/Search/Search';
import { observer } from 'mobx-react-lite';
import { surveyListStore } from '@entities/survey/stores/surveyStoreInstance';
import { useSearchParams } from 'react-router-dom';
import { SurveyModel } from '@entities/survey/model';

const Surveys = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    surveyListStore.setSearchQuery(search);
    surveyListStore.fetchSurveys(page);
  }, [searchParams]);

  const onSearch = useCallback(() => {
    setSearchParams({
      search: localSearch,
      page: '1',
    });
  }, [localSearch, setSearchParams]);

  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set('page', String(page));
        return new URLSearchParams(prev);
      });
    },
    [setSearchParams],
  );

  return (
    <>
      <section className="surveys-info">
        <div className="surveys-info__wrapper">
          <div className="surveys-info__titles">
            <h1 className="surveys-info__title">Опросы и анкеты</h1>
            <p className="surveys-info__subtitle">Узнай свой уровень тревожности на данный момент.</p>
          </div>
          <div className="surveys-info__search">
            <p className="surveys-info__desc">
              Пройдите тесты на тревожность (<b>шкалы тревоги</b>) — это анкеты и опросники, которые помогают понять,
              какой у человека уровень тревоги и нужно ли обращаться за консультацией специалиста.
            </p>
            <Search
              value={localSearch}
              onSearch={onSearch}
              handleClear={() => {
                setLocalSearch('');
                setSearchParams({ search: '', page: '1' });
              }}
              onChange={(value) => {
                setLocalSearch(value);
              }}
              className="surveys-info__search"
            />
          </div>
        </div>
      </section>

      <section className="surveys-content">
        <div className="surveys-content__wrapper">
          <ul className="surveys-content__list">
            {surveyListStore.surveys.map((item: SurveyModel, index) => (
              <li key={`survey-${item.id}`} className="surveys-content__item">
                <CardSurvey
                  size={index === 0 ? 'big' : index === 1 ? 'middle' : 'default'}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  content={item.content}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={surveyListStore.pagination.page}
            totalPages={surveyListStore.pagination.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
});

export default Surveys;

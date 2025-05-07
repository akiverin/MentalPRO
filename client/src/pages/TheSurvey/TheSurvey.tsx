import { useNavigate, useParams } from 'react-router-dom';
import TheLink from '@/components/ui/Link/Link';
import './TheSurvey.scss';
import CardSurvey from '@/components/CardSurvey/CardSurvey';
import { useEffect } from 'react';
import { surveyListStore } from '@/entities/survey/stores/surveyStoreInstance';
import { observer } from 'mobx-react-lite';
import AccessControl from '@/components/AccessControl';
import Button from '@/components/ui/Button';
import LoaderScreen from '@/components/ui/LoaderScreen';

const TheSurvey = observer(() => {
  const { link } = useParams<{ link: string }>();
  const navigate = useNavigate();
  if (!link) {
    return <h2 className="survey__not-found">ID опроса не найден или передан неверно</h2>;
  }

  useEffect(() => {
    surveyListStore.fetchSurveys();
    surveyListStore.fetchSurveyById(link);
  }, [link]);

  const survey = surveyListStore.survey;

  const onDelete = () => {
    surveyListStore.delete(link);
    navigate('/surveys');
  };

  if (surveyListStore.meta === 'loading') {
    return <LoaderScreen />;
  }

  if (surveyListStore.meta === 'error' && !survey) {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Ошибка: {surveyListStore.error}</h2>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Опрос не найден</h2>
      </div>
    );
  }

  const otherSurveys = surveyListStore.surveys.filter((srv) => srv.id !== survey.id).slice(0, 4);

  return (
    <>
      <section className="survey">
        <div className="survey__wrapper">
          <div className="survey__info">
            <h1 className="survey__title">{survey.title}</h1>
            <TheLink variant="rounded" background="primary" to={`/surveys/${survey._id}/quest`}>
              Пройти опрос сейчас
            </TheLink>
            <div className="survey__actions">
              <AccessControl requiredRoles={['admin']}>
                <Button onClick={onDelete} background="danger" variant="rounded">
                  Удалить опрос
                </Button>
              </AccessControl>
            </div>
            <p className="survey__desc">{survey.description}</p>
            <p className="survey__details">{survey.details}</p>
            <div className="survey__extra">
              <p className="survey__time">
                <b>Время прохождения:</b> {survey.time} мин.
              </p>
              {survey.results && (
                <p className="survey__result">
                  <b>Результат:</b> {survey.results}
                </p>
              )}
            </div>
          </div>
          {survey.image && <img src={survey.image} alt={survey.title} className="survey__image" />}
        </div>
      </section>
      <section className="other-surveys">
        <div className="other-surveys__wrapper">
          <h2 className="other-surveys__title">Другие опросы</h2>
          <ul className="surveys-content__list">
            {otherSurveys.map((srv) => (
              <li key={`survey-${srv.id}`} className="surveys-content__item">
                <CardSurvey
                  size="default"
                  id={srv.id}
                  title={srv.title}
                  description={srv.description}
                  details={srv.details}
                  time={srv.time.toString()}
                  image={srv.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
});

export default TheSurvey;

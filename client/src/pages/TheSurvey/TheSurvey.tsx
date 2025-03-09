import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TheLink from "@/components/ui/Link/Link";
import "./TheSurvey.scss";
import CardSurvey from "@/components/CardSurvey/CardSurvey";

const TheSurvey = () => {
  const { link } = useParams<{ link: string }>();
  console.log(1, link);
  const survey = useSelector((state: RootState) =>
    state.surveys.surveys.find((s) => s.link === link)
  );
  const surveys = useSelector((state: RootState) => {
    return state.surveys.surveys
      .filter((item) => survey !== undefined && item.id !== survey.id)
      .slice(0, 4);
  });

  if (!survey) {
    return <h2 className="survey__not-found">Опрос не найден</h2>;
  }

  return (
    <>
      <section className="survey">
        <div className="survey__wrapper">
          <div className="survey__info">
            <h1 className="survey__title">{survey.name}</h1>
            <TheLink
              variant="rounded"
              background="primary"
              to={`/surveys/${survey.link}/quest`}
            >
              Пройти опрос сейчас
            </TheLink>
            <p className="survey__desc">{survey.description}</p>
            <p className="survey__details">{survey.details}</p>
            <div className="survey__extra">
              <p className="survey__time">
                <b>Время прохождения:</b> {survey.time}
              </p>
              <p className="survey__result">
                <b>Результат:</b> {survey.result}
              </p>
            </div>
          </div>
          <img src={survey.image} alt={survey.name} className="survey__image" />
        </div>
      </section>
      <section className="other-surveys">
        <div className="other-surveys__wrapper">
          <h2 className="other-surveys__title">Другие опросы</h2>
          <ul className="surveys-content__list">
            {surveys.map((srv) => (
              <li key={`survey-${srv.id}`} className="surveys-content__item">
                <CardSurvey {...srv} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TheSurvey;

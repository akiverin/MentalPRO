import TheLink from "@/components/ui/Link/Link";
import "./TheSurvey.scss";

const TheSurvey = () => {
  return (
    <>
      <section className="survey">
        <div className="survey__wrapper">
          <div className="survey__info">
            <h1 className="survey__title">
              Опросник Спилбергера – Ханина (STAI)
            </h1>
            <TheLink
              variant="rounded"
              background="primary"
              to="/surveys/0/quest"
            >
              Пройти опрос сейчас
            </TheLink>
            <p className="survey__full-desc">
              Тест из 40 утверждений, которые нужно оценить по шкале
              соответствия: «Нет, это не так», «Пожалуй, так», «Верно» или
              «Совершенно верно». Опросник Спилберга – Ханина подходит для
              самостоятельной оценки своего состояния. <br />
              <br />
              Данный опрос проверенный временем и сотнями исследований метод
              оценки тревожности; есть разделение тревоги и личностной
              тревожности; утверждения для оценки сформулированы понятно и не
              вызывают ступора.
            </p>
            <div className="survey__details">
              <p className="survey__time">
                <b>Время прохождения:</b> 5 мин.
              </p>
              <p className="survey__result">
                <b>Результат:</b> шкала от 0 до 35 баллов. Зелёный сектор от 0
                до 17 говорит об отсутствии тревоги, жёлтый до 24 — о средней
                выраженности тревожного расстройства, красный от 24 – о тяжёлом
                течении.
              </p>
            </div>
          </div>
          <img src="" alt="Decorate image" className="survey__image" />
        </div>
      </section>
      <section className="other-surveys"></section>
    </>
  );
};

export default TheSurvey;

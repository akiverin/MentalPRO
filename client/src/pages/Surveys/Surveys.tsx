import { useState, useMemo } from "react";
import { searchFilter } from "@utils/search";
import { useAppSelector } from "@/store/hooks";
import CardSurvey from "@/components/CardSurvey/CardSurvey";
import "./Surveys.scss";
import Pagination from "@/components/ui/Pagination/Pagination";
import Search from "@/components/Search/Search";
interface Survey {
  id: number;
  name: string;
  description: string;
  details?: string;
  image?: string;
  result?: string;
  time: string;
  link: string;
}
// const surveysData = [
//   {
//     id: 0,
//     name: "Опросник Спилбергера – Ханина (STAI)",
//     description:
//       "Тест из 40 утверждений, которые нужно оценить по шкале соответствия:  «Нет, это не так», «Пожалуй, так», «Верно» или «Совершенно верно».  Опросник Спилберга – Ханина подходит для самостоятельной оценки своего состояния.",
//     fullDescription:
//       "Тест из 40 утверждений, которые нужно оценить по шкале соответствия:  «Нет, это не так», «Пожалуй, так», «Верно» или «Совершенно верно».  Опросник Спилберга – Ханина подходит для самостоятельной оценки своего состояния. Данный опрос проверенный временем и сотнями исследований метод оценки тревожности; есть  разделение тревоги и личностной тревожности; утверждения для оценки  сформулированы понятно и не вызывают ступора.",
//     image: "",
//     result: "",
//     time: "7 мин.",
//     link: "stai",
//   },
//   {
//     id: 1,
//     name: "Госпитальная шкала тревоги и депрессии (HADS)",
//     description:
//       "Один из самых простых и популярных тестов на тревожность. В нём всего 14 вопросов о состоянии человека за последнюю неделю. В некоторых нужно определить частоту симптомов за последнюю неделю, в других — их актуальность.",
//     time: "3 мин.",
//     link: "hads",
//   },
//   {
//     id: 3,
//     name: "Шкала тревоги Бека (BAI)",
//     description:
//       "21 вопрос о физиологических проявлениях тревоги, о страхах и нервозности. В каждом вопросе указан отдельный симптом, и нужно оценить, беспокоил ли он вас в течение недели.",
//     time: "4 мин.",
//     link: "bai",
//   },
//   {
//     id: 4,
//     name: "Шкала Гамильтона (HARS)",
//     description:
//       "14 симптомов тревоги, наличие которых  специалист оценивает в пяти вариантах: отсутствует, выражен слабо или  умеренно, наблюдается в тяжёлой или в крайне тяжёлой степени.",
//     time: "3 мин.",
//     link: "hars",
//   },
//   {
//     id: 5,
//     name: "Шкала самооценки тревоги Шихана (SPRAS)",
//     description:
//       "Тест на актуальность симптомов в течение последней недели. Для шкалы тревоги Шихана предстоит оценить 35 тезисов.",
//     time: "6 мин.",
//     link: "spras",
//   },
//   {
//     id: 6,
//     name: "Шкала Гамильтона (HARS)",
//     description:
//       "14 симптомов тревоги, наличие которых  специалист оценивает в пяти вариантах: отсутствует, выражен слабо или  умеренно, наблюдается в тяжёлой или в крайне тяжёлой степени.",
//     time: "3 мин.",
//     link: "hars",
//   },
// ];

const Surveys = () => {
  const surveys = useAppSelector((state) => state.surveys.surveys);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurveys = useMemo(
    () => searchFilter<Survey>(surveys, searchQuery, ["name", "description"]),
    [searchQuery, surveys]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredSurveys.length / pageSize),
    [filteredSurveys, pageSize]
  );

  const paginatedSurveys = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSurveys.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredSurveys]);

  return (
    <>
      <section className="surveys-info">
        <div className="surveys-info__wrapper">
          <div className="surveys-info__titles">
            <h1 className="surveys-info__title">Опросы и анкеты</h1>
            <p className="surveys-info__subtitle">
              Узнай свой уровень тревожности на данный момент.
            </p>
          </div>
          <div className="surveys-info__search">
            <p className="surveys-info__desc">
              Пройдите тесты на тревожность (<b>шкалы тревоги</b>) — это анкеты
              и опросники, которые помогают понять, какой у человека уровень
              тревоги и нужно ли обращаться за консультацией специалиста.
            </p>
            <Search
              onSearch={setSearchQuery}
              className="surveys-info__search"
            />
          </div>
        </div>
      </section>

      <section className="surveys-content">
        <div className="surveys-content__wrapper">
          <ul className="surveys-content__list">
            {paginatedSurveys.map((survey) => (
              <li key={`survey-${survey.id}`} className="surveys-content__item">
                <CardSurvey
                  size={
                    survey.id === 0
                      ? "big"
                      : survey.id === 1
                      ? "middle"
                      : "default"
                  }
                  {...survey}
                />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </section>
    </>
  );
};

export default Surveys;

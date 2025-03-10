import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import "./TheCase.scss";
import Badge from "@/components/ui/Badge/Badge";
import CardCase from "@/components/CaseCard/CardCase";

const TheCase = () => {
  const { link } = useParams<{ link: string }>();
  const article = useSelector((state: RootState) =>
    state.cases.cases.find((s) => s.link === link)
  );
  const cases = useSelector((state: RootState) => {
    return state.cases.cases
      .filter((item) => article !== undefined && item.id !== article.id)
      .slice(0, 4);
  });

  if (!article) {
    return <h2 className="case__not-found">Практика не найдена</h2>;
  }

  return (
    <>
      <section className="case">
        <div className="case__wrapper">
          <h1 className="case__title">{article.name}</h1>
          <Badge variant="small">{article.category}</Badge>
          <img src={article.image} alt={article.name} className="case__image" />
          <div className="case__text">
            {article.text.map((paragraph) => {
              return <p className="case__paragraph">{paragraph}</p>;
            })}
          </div>
        </div>
      </section>
      <section className="other-cases">
        <div className="other-cases__wrapper">
          <h2 className="other-cases__title">Другие опросы</h2>
          <ul className="other-cases__list">
            {cases.slice(0, 4).map((cs) => (
              <li key={`case-${cs.id}`} className="other-cases_item">
                <CardCase {...cs} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TheCase;

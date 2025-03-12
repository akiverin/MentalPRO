import { useEffect, useRef } from "react";
import { enableDragScroll } from "../../../utils/dragScroll";
import "./Exercises.scss";
import { useAppSelector } from "@/store/hooks";
import CardCase from "@/components/CaseCard/CardCase";

const Exercises = () => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const cases = useAppSelector((state) => state.cases.cases);

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
          {[...cases]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map((exercise, index) => (
              <li className="exercises__item" key={index}>
                <CardCase {...exercise} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Exercises;

import { useEffect, useRef } from "react";
import { enableDragScroll } from "@utils/dragScroll";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import exerciseCard01 from "@assets/images/exerciseCard01.png";
import exerciseCard02 from "@assets/images/exerciseCard02.png";
import exerciseCard03 from "@assets/images/exerciseCard03.png";
import exerciseCard04 from "@assets/images/exerciseCard04.png";

import "./Exercises.scss";

const exercises = [
  {
    name: "Фитотерапия – советы и наставления",
    image: exerciseCard01,
    link: "/cases/1",
  },
  {
    name: "Дыхательная техника вашего умиротворения",
    image: exerciseCard02,
    link: "/cases/2",
  },
  {
    name: "Майндфулнес или как концентрировать себя на моменте присутствия в настоящем",
    image: exerciseCard03,
    link: "/cases/3",
  },
  {
    name: "Путь исследования сознания и разума в медитации",
    image: exerciseCard04,
    link: "/cases/4",
  },
];

const Exercises = () => {
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      enableDragScroll(containerRef.current);
    }
  }, []);

  return (
    <section className="exercises">
      <div className="exercises__wrapper">
        <ul ref={containerRef} className="exercises__list">
          {exercises.map((exercise, index) => (
            <li className="exercises__item" key={index}>
              <ExerciseCard {...exercise} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Exercises;

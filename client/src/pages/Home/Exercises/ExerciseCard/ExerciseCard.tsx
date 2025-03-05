import { FC } from "react";
import TheLink from "@components/ui/Link/Link";
import "./ExerciseCard.scss";

interface ExerciseCardProps {
  image: string;
  name: string;
  link: string;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ image, name, link }) => {
  return (
    <div className="exercise-card">
      <img src={image} alt={name} className="exercise-card__image" />
      <TheLink className="exercise-card__link" to={link}>
        <svg
          className="exercise-card__icon"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="58" height="58" rx="29" fill="#E7E9F7" />
          <path
            d="M23.29 21.5615L35.4725 21.5615L35.4725 33.744L33.1352 33.757V25.5962L22.8852 35.8462L21.1878 34.1488L31.4378 23.8987L23.2835 23.9053L23.29 21.5615Z"
            fill="#0756CA"
          />
        </svg>
      </TheLink>
      <h3 className="exercise-card__title">{name}</h3>
    </div>
  );
};

export default ExerciseCard;

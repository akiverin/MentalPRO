import { FC } from "react";
import "./CardCase.scss";
import TheLink from "@components/ui/Link/Link";
import Badge from "@components/ui/Badge/Badge";

interface Case {
  id: number;
  name: string;
  description: string;
  text?: string;
  image?: string;
  category: string;
  link: string;
}

const CardCase: FC<Case> = ({ name, description, category, image, link }) => {
  return (
    <div className="case-card">
      <img src={image} alt={name} className="case-card__image" />
      <div className="case-card__extra">
        <Badge variant="small" className="case-card__time">
          {category}
        </Badge>
        <TheLink className="exercise-card__link" to={"/cases/" + link + "/"}>
          <p className="visually-hidden">Открыть практику {name}</p>
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
      </div>
      <div className="case-card__info">
        <h3 className="case-card__title">{name}</h3>
        <p className="case-card__description">{description}</p>
      </div>
    </div>
  );
};

export default CardCase;

import { FC } from "react";
import "./CardCase.scss";
import TheLink from "@components/ui/Link/Link";
import Badge from "@components/ui/Badge/Badge";

interface Case {
  id: number;
  name: string;
  description: string;
  text?: string[];
  image?: string;
  category: string;
  link: string;
}

const CardCase: FC<Case> = ({ name, description, category, image, link }) => {
  return (
    <div className="case-card">
      <img src={image} alt={name} className="case-card__image" />
      <div className="case-card__info">
        <Badge variant="small" className="case-card__time">
          {category}
        </Badge>
        <h3 className="case-card__title">{name}</h3>
        <p className="case-card__description">{description}</p>
        <TheLink
          variant="rounded"
          background="primary"
          small
          className="exercise-card__link"
          to={"/cases/" + link + "/"}
        >
          Читать далее
        </TheLink>
      </div>
    </div>
  );
};

export default CardCase;

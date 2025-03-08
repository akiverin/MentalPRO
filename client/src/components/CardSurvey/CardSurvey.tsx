import { FC } from "react";
import classNames from "classnames";
import "./CardSurvey.scss";
import TheLink from "../ui/Link/Link";
import Badge from "../ui/Badge/Badge";

export type CardSurveySize = "big" | "middle" | "default";

interface CardSurveyProps {
  name: string;
  description: string;
  time: string;
  image?: string;
  link: string;
  size?: CardSurveySize;
}

const CardSurvey: FC<CardSurveyProps> = ({
  name,
  description,
  time,
  image,
  link,
  size = "default",
}) => {
  const cardClasses = classNames("survey-card", `survey-card--${size}`);

  return (
    <div className={cardClasses}>
      {image && <img src={image} alt={name} className="survey-card__image" />}
      <div className="survey-card__content">
        <div className="survey-card__info">
          <h3 className="survey-card__title">{name}</h3>
          <p className="survey-card__description">{description}</p>
        </div>
        <div className="survey-card__actions">
          <Badge
            variant={size === "default" ? "small" : "default"}
            className="survey-card__time"
          >
            {time}
          </Badge>
          <TheLink
            variant="rounded"
            background="primary"
            to={"/surveys/" + link + "/"}
            className="survey-card__button"
          >
            Пройти опросник
          </TheLink>
        </div>
      </div>
    </div>
  );
};

export default CardSurvey;

import { FC } from "react";
import "./CardOrganization.scss";
import TheLink from "@components/ui/Link/Link";
import Badge from "@components/ui/Badge/Badge";

interface Organization {
  id: number;
  name: string;
  description: string;
  image?: string;
  link: string;
}

const CardOrganization: FC<Organization> = ({
  name,
  description,
  image,
  link,
}) => {
  return (
    <div className="organization-card">
      <div className="organization-card__head">
        <img src={image} alt={name} className="organization-card__image" />

        <h3 className="organization-card__title">{name}</h3>
      </div>
      <p className="organization-card__description">{description}</p>
      <div className="organization-card__actions">
        <Badge variant="small" className="organization-card__time">
          Доступ закрыт
        </Badge>
        <TheLink
          variant="rounded"
          background="primary"
          className="exercise-card__link"
          to={"/organizations/" + link + "/"}
        >
          Подать заявку
        </TheLink>
      </div>
    </div>
  );
};

export default CardOrganization;

import { FC } from 'react';
import './CardCase.scss';
import TheLink from '@components/ui/Link/Link';
import Badge from '@components/ui/Badge/Badge';
import AccessControl from '../AccessControl';

interface CardCaseProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

const CardCase: FC<CardCaseProps> = ({ id, title, description, category, image }) => {
  return (
    <div className="case-card">
      <img src={image} alt={`Image for card case ${id}`} className="case-card__image" />
      <div className="case-card__info">
        <Badge variant="small" className="case-card__time">
          {category}
        </Badge>
        <h3 className="case-card__title">{title}</h3>
        <p className="case-card__description">{description}</p>
        <AccessControl
          fallback={
            <Badge color="danger" variant="small">
              Доступно авторизованным пользователям
            </Badge>
          }
        >
          <TheLink
            variant="rounded"
            background="primary"
            small
            className="exercise-card__link"
            to={'/cases/' + id + '/'}
          >
            Читать далее
          </TheLink>
        </AccessControl>
      </div>
    </div>
  );
};

export default CardCase;

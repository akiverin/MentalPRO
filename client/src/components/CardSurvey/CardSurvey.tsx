import { FC } from 'react';
import classNames from 'classnames';
import './CardSurvey.scss';
import TheLink from '../ui/Link/Link';
// import Badge from '../ui/Badge/Badge';

export type CardSurveySize = 'big' | 'middle' | 'default';

interface CardSurveyProps {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  size: CardSurveySize;
}

const CardSurvey: FC<CardSurveyProps> = ({ id, title, description, image, content, size = 'default' }) => {
  const cardClasses = classNames('survey-card', `survey-card--${size}`);

  return (
    <div className={cardClasses}>
      <div className="survey-card__content">
        <div className="survey-card__info">
          <h3 className="survey-card__title">{title}</h3>
          <p className="survey-card__description">{description}</p>
          {image && size == 'big' && (
            <div className="survey-card__extra">
              <img src={image} alt={title} className="survey-card__image" />
              <p className="survey-card__details">{content}</p>
            </div>
          )}
        </div>
        <div className="survey-card__actions">
          {/* <Badge variant="small" className="survey-card__time">
            {time}
          </Badge> */}
          <TheLink variant="rounded" background="primary" to={'/surveys/' + id + '/'} className="survey-card__button">
            Пройти опросник
          </TheLink>
        </div>
      </div>
    </div>
  );
};

export default CardSurvey;

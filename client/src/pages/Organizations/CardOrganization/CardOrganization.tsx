import { FC, useEffect } from 'react';
import './CardOrganization.scss';
import TheLink from '@components/ui/Link/Link';
import Badge from '@components/ui/Badge/Badge';
import { observer } from 'mobx-react-lite';
import { userStore } from '@entities/user/stores/userStoreInstance';
import { UserModel } from '@entities/user/model';

interface Organization {
  id: string;
  title: string;
  description: string;
  image?: string;
  members?: UserModel[];
  createdBy?: string | null;
}

const CardOrganization: FC<Organization> = observer(({ id, title, description, image, members, createdBy }) => {
  useEffect(() => {
    userStore.me();
  }, []);
  const user = userStore.user;
  const isMember =
    (members && user && members.some((usr) => usr.id === user.id)) || (createdBy && user && createdBy === user.id);
  console.log(user, members, isMember, createdBy);
  return (
    <div className="organization-card">
      <div className="organization-card__head">
        <img src={image} alt={title} className="organization-card__image" />

        <h3 className="organization-card__title">{title}</h3>
      </div>
      <p className="organization-card__description">{description}</p>
      <div className="organization-card__actions">
        {isMember ? (
          <>
            <Badge variant="small" className="organization-card__time">
              Доступ открыт
            </Badge>
            <TheLink
              variant="rounded"
              background="primary"
              className="exercise-card__link"
              to={'/organizations/' + id + '/'}
            >
              Перейти
            </TheLink>
          </>
        ) : (
          <>
            <Badge variant="small" className="organization-card__time">
              Доступ закрыт
            </Badge>
            <TheLink
              variant="rounded"
              background="primary"
              className="exercise-card__link"
              to={'/organizations/' + id + '/'}
            >
              Подать заявку
            </TheLink>
          </>
        )}
      </div>
    </div>
  );
});

export default CardOrganization;

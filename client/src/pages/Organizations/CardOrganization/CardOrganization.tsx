import { FC, useEffect } from 'react';
import './CardOrganization.scss';
import TheLink from '@components/ui/Link/Link';
import Badge from '@components/ui/Badge/Badge';
import { observer } from 'mobx-react-lite';
import { userStore } from '@entities/user/stores/userStoreInstance';
import { UserModel } from '@entities/user/model';
import { applicationStore } from '@/entities/application/stores/applicationStoreInstance';
import Button from '@/components/ui/Button';

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
    applicationStore.clear();
    applicationStore.fetchApplicationsByUser();
  }, []);
  const user = userStore.user;
  const applications = applicationStore.applications;
  const isMember =
    (members && user && members.some((usr) => usr.id === user.id)) || (createdBy && user && createdBy === user.id);
  const isCreatedApplication = applications.some((app) => app.organizationId.id === id);
  const createApplication = () => {
    if (!user) return;
    applicationStore.createApplication({ userId: user.id, organizationId: id });
  };

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
            {isCreatedApplication ? (
              <Badge>Заявка подана</Badge>
            ) : (
              <Button
                variant="rounded"
                background="primary"
                className="exercise-card__link"
                onClick={createApplication}
              >
                Подать заявку
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default CardOrganization;

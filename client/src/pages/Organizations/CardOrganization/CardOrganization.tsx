import { FC, useEffect } from 'react';
import './CardOrganization.scss';
import TheLink from '@components/ui/Link/Link';
import Badge from '@components/ui/Badge/Badge';
import { observer } from 'mobx-react-lite';
import { userStore } from '@entities/user/stores/userStoreInstance';
import { UserModel } from '@entities/user/model';
import { applicationStore } from '@/entities/application/stores/applicationStoreInstance';
import Button from '@/components/ui/Button';
import AccessControl from '@/components/AccessControl';
import { OrganizationModel } from '@/entities/organization/model';

interface Organization {
  id: string;
  title: string;
  description: string;
  image?: string;
  members?: UserModel[];
  isActive: boolean;
  createdBy?: string | null;
}

const CardOrganization: FC<Organization> = observer(
  ({ id, title, description, image, members, createdBy, isActive }) => {
    useEffect(() => {
      applicationStore.clear();
      applicationStore.fetchApplicationsByUser();
    }, []);
    const user = userStore.user;
    const applications = applicationStore.applications;
    const isMember =
      (members && user && members.some((usr) => usr.id === user.id)) || (createdBy && user && createdBy === user.id);
    const isCreatedApplication = applications.some(
      (app) =>
        user &&
        (app.organizationId as OrganizationModel) &&
        typeof app.organizationId !== 'string' &&
        app.organizationId._id === id &&
        app.userId.toString() === user.id,
    );
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
              <Badge variant="small" color={isActive ? 'default' : 'danger'} className="organization-card__time">
                {isActive ? 'Доступ открыт' : 'Не активна'}
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
                <AccessControl>
                  <Button
                    variant="rounded"
                    background="primary"
                    className="exercise-card__link"
                    onClick={createApplication}
                  >
                    Подать заявку
                  </Button>
                </AccessControl>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

export default CardOrganization;

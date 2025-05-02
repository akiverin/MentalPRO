import React, { useEffect } from 'react';
import './Applications.scss';
import { observer } from 'mobx-react-lite';
import { applicationStore } from '@entities/application/stores/applicationStoreInstance';
import { ApplicationModel } from '@entities/application/model';
import Badge from '@components/ui/Badge/Badge';
import IconClose from '@components/ui/icons/IconClose';
import Button from '@components/ui/Button/Button';
import IconCheck from '@/components/ui/icons/IconCheck';

interface ApplicationsProps {
  id: string;
}

const ApplicationStatus = {
  approved: 'одобрено',
  pending: 'ожидание',
  rejected: 'отказано',
};

const Applications: React.FC<ApplicationsProps> = observer(({ id }) => {
  useEffect(() => {
    if (!id) return;
    applicationStore.clear();
    applicationStore.fetchApplicationByOrganization(id);
  }, [id]);

  const applications = applicationStore.applications;

  if (applicationStore.meta === 'loading') {
    return (
      <div className="organization__wrapper">
        <h2 className="organization__not-found">Загрузка...</h2>
      </div>
    );
  }

  if (applicationStore.meta === 'error') {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Ошибка: {applicationStore.error}</h2>
      </div>
    );
  }

  if (!applications) {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Заявки на встпуление отсутствуют</h2>
      </div>
    );
  }

  return (
    <>
      {applicationStore.applications && (
        <div className="organization-application">
          <h2 className="organization-application__title">Заявки на вступление</h2>
          <ul className="organization-application__list">
            {applicationStore.applications.map((app: ApplicationModel) => (
              <li key={app.id} className="organization-application__item">
                <div className="organization-application__user-info">
                  <p className="organization-application__name">
                    {app.userId.firstName} {app.userId.lastName || ''}
                  </p>
                  <p className="organization-application__email">{app.userId.email}</p>
                </div>
                <div className="organization-application__details">
                  <Badge variant="small">{ApplicationStatus[app.status]}</Badge>
                  {app.status == 'pending' ? (
                    <>
                      <Button
                        className="organization-application__button"
                        variant="rounded"
                        size="small"
                        background="success"
                        onClick={() => applicationStore.updateApplicationStatus(app.id, 'approved')}
                      >
                        <IconCheck />
                      </Button>
                      <Button
                        className="organization-application__button"
                        variant="rounded"
                        size="small"
                        background="danger"
                        onClick={() => applicationStore.updateApplicationStatus(app.id, 'rejected')}
                      >
                        <IconClose />
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="organization-application__delete"
                      variant="rounded"
                      size="small"
                      onClick={() => applicationStore.deleteApplication(app.id)}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
});

export default Applications;

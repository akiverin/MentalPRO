import React, { useEffect } from 'react';
import './TheOrganization.scss';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { organizationListStore } from '@/entities/organization/stores/organizationStoreInstance';
import { applicationStore } from '@/entities/application/stores/applicationStoreInstance';
import Applications from './Applications';
import Content from './Content';
import LoaderScreen from '@/components/ui/LoaderScreen';

const TheOrganization: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return (
      <div className="organization__wrapper">
        <h2 className="organization__not-found">ID организации не найден или передан неверно</h2>
      </div>
    );
  }
  useEffect(() => {
    if (!id) return;
    organizationListStore.clear();
    applicationStore.clear();
    organizationListStore.fetchOrganizationById(id);
    applicationStore.fetchApplicationByOrganization(id);
  }, [id]);

  const organization = organizationListStore.organization;

  if (organizationListStore.meta === 'loading') {
    return (
      <div className="organization__wrapper">
        <LoaderScreen />
      </div>
    );
  }

  if (organizationListStore.meta === 'error') {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Ошибка: {organizationListStore.error}</h2>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="survey__wrapper">
        <h2 className="survey__not-found">Организация не найдена</h2>
      </div>
    );
  }

  return (
    <>
      <section className="organization-info">
        <div className="organization-info__wrapper">
          <div className="organization-info__titles">
            <h1 className="organization-info__title">{organization.title}</h1>
            <p className="organization-info__subtitle">{organization.description}</p>
            <p className="organization-info__subtitle">Количество участников: {organization.members.length}</p>
          </div>
          <div className="organization-info__extra">
            {organization.image && (
              <img src={organization.image} alt={organization.title} className="organization-info__image" />
            )}
          </div>
        </div>
      </section>
      <section className="organization">
        <div className="organization__wrapper">
          <Content />
          <Applications id={id} />
        </div>
      </section>
    </>
  );
});

export default TheOrganization;

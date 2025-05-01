import Search from '@components/Search/Search';
import './Organizations.scss';
import Badge from '@components/ui/Badge/Badge';
import CardOrganization from './CardOrganization/CardOrganization';
import Pagination from '@/components/ui/Pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { organizationListStore } from '@entities/organization/stores/organizationStoreInstance';
import { OrganizationModel } from '@/entities/organization/model';
import { observer } from 'mobx-react-lite';

const Organizations = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    organizationListStore.setSearchQuery(search);
    organizationListStore.fetchOrganizations(page);
  }, [searchParams]);

  const onSearch = useCallback(() => {
    setSearchParams({
      search: localSearch,
      page: '1',
    });
  }, [localSearch, setSearchParams]);

  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set('page', String(page));
        return new URLSearchParams(prev);
      });
    },
    [setSearchParams],
  );

  return (
    <>
      <section className="organizations-info">
        <div className="organizations-info__wrapper">
          <div className="organizations-info__titles">
            <h1 className="organizations-info__title">Организации</h1>
            <p className="organizations-info__subtitle">
              Список компаний, которые мониторит ментальное здоровье сотрудников с помощью MentalPRO.
            </p>
          </div>
          <div className="organizations-info__extra">
            <Badge variant="small">Вы не подключены к организации</Badge>
            <Search
              value={localSearch}
              onSearch={onSearch}
              handleClear={() => {
                setLocalSearch('');
                setSearchParams({ search: '', page: '1' });
              }}
              onChange={(value) => {
                setLocalSearch(value);
              }}
              className="organizations-info__search"
            />
          </div>
        </div>
      </section>
      <section className="organizations-content">
        <div className="organizations-content__wrapper">
          <ul className="organizations-content__list">
            {organizationListStore.organizations.map((item: OrganizationModel) => (
              <li key={`survey-${item.id}`} className="surveys-content__item">
                <CardOrganization
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  members={item.members}
                  createdBy={item.createdBy}
                />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={organizationListStore.pagination.page}
            totalPages={organizationListStore.pagination.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
});

export default Organizations;

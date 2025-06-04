import React, { useState } from 'react';
import './Members.scss';
import { observer } from 'mobx-react-lite';
import { Meta } from '@/utils/meta';
import Search from '@/components/Search/Search';
import { OrganizationModel } from '@/entities/organization/model';
import { userStore } from '@/entities/user/stores/userStoreInstance';
import ContextMenu from '@/components/ui/ContextMenu';
import IconDotsVertical from '@/components/ui/icons/IconDotsVertical';
import IconCrown from '@/components/ui/icons/IconCrown';
import { UserModel } from '@/entities/user/model';
import { organizationListStore } from '@/entities/organization/stores/organizationStoreInstance';
import { exportToJson } from '@/utils/exportJSON';
import { resultStore } from '@/entities/result/store/resultStoreInstance';

interface MembersProps {
  id: string;
  members: OrganizationModel['members'] | null;
  administrators: OrganizationModel['administrators'] | null;
  creator: OrganizationModel['createdBy'] | null;
  meta: Meta;
}

const Members: React.FC<MembersProps> = observer(({ id, members, administrators, creator, meta }) => {
  const [search, setSearch] = useState('');
  const filteredMembers = members?.filter((memb) => {
    const fullName = `${memb.firstName} ${memb.lastName || ''} ${memb.patronymic || ''}`.trim();
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  const deleteMember = (memberId: string) => {
    const obj = new FormData();
    const newMembers = members?.filter((m) => m._id !== memberId) || [];
    obj.append('members', JSON.stringify(newMembers));
    organizationListStore.update(id, obj);
  };

  const exportObj = async (userId: string) => {
    console.log(userId);
    await resultStore.fetchResultsByOrganization(id);
    const userResults = resultStore.results?.filter((res) => res.userId._id === userId);
    exportToJson(userResults, `results_${userId}.json`);
  };

  return (
    <div className="organization-members">
      {meta === 'error' && <p className="profile__error">Данные не были загружены</p>}
      <h4 className="organization-members__title">Участники организации</h4>
      <Search
        value={search}
        placeholder="Поиск по сотрудникам"
        onChange={(v) => setSearch(v)}
        onSearch={() => {}}
        handleClear={() => setSearch('')}
      />
      {filteredMembers && (
        <ul className="organization-members__list">
          {filteredMembers.map((memb) => (
            <li key={memb._id} className="organization-members__item">
              {memb.image && (
                <img
                  src={memb.image}
                  alt={`${memb.firstName} ${memb.lastName}`}
                  className="organization-members__avatar"
                />
              )}
              <div className="organization-members__member-info">
                <p className="organization-members__member-name">
                  {memb.firstName} {memb.lastName || ''} {memb.patronymic || ''}
                  {administrators?.some((adm: UserModel) => adm._id === memb._id) ||
                    (creator === memb._id && <IconCrown height={12} />)}
                </p>
                <span className="organization-members__member-email">{memb.email}</span>
              </div>
              {userStore.user?.role === 'admin' && (
                <ContextMenu
                  triggerContent={<IconDotsVertical />}
                  items={[
                    { title: 'Назначить администратором', action: () => {}, active: false },
                    {
                      title: 'Экспортировать результаты',
                      action: () => exportObj(memb._id),
                      active:
                        administrators?.some((adm: UserModel) => adm._id === userStore.user?.id) ||
                        creator === userStore.user?.id,
                    },
                    { title: 'Удалить из организации', action: () => deleteMember(memb.id), active: false },
                  ]}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Members;

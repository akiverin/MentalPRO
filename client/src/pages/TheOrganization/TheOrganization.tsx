import React, { useEffect, useRef } from 'react';
import './TheOrganization.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { organizationListStore } from '@/entities/organization/stores/organizationStoreInstance';
import { applicationStore } from '@/entities/application/stores/applicationStoreInstance';
import Applications from './Applications';
import Content from './Content';
import LoaderScreen from '@/components/ui/LoaderScreen';
import { resultStore } from '@/entities/result/store/resultStoreInstance';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { userStore } from '@/entities/user/stores/userStoreInstance';
import AccessControl from '@/components/AccessControl';
import ContextMenu from '@/components/ui/ContextMenu';
import IconDotsVertical from '@/components/ui/icons/IconDotsVertical';
import Members from './Members/Members';
import { exportToJson } from '@/utils/exportJSON';

const TheOrganization: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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
    resultStore.fetchResultsByOrganization(id);
  }, [id]);

  // Функция для генерации PDF
  const generatePDF = async () => {
    if (!contentRef.current) return;
    try {
      // Ожидание загрузки изображения
      if (imageRef.current && !imageRef.current.complete) {
        await new Promise((resolve) => {
          imageRef.current!.onload = resolve;
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('organization_report.pdf');
    } catch (error) {
      console.error('Ошибка при генерации PDF:', error);
    }
  };

  const onDelete = async () => {
    const res = await organizationListStore.delete(id);
    if (res?.success) {
      navigate('/organizations');
    }
  };

  const onActive = () => {
    organizationListStore.activate(id);
    navigate('/organizations');
  };

  const exportObj = async () => {
    await resultStore.fetchResultsByOrganization(id);
    exportToJson(resultStore.results, `results_org_${id}.json`);
  };

  const userId = userStore.user?.id;
  const organization = organizationListStore.organization;
  const access =
    (userId && organization?.administrators.includes(userId)) ||
    userId === organization?.createdBy ||
    userStore.user?.role === 'admin';

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
    <div ref={contentRef}>
      <section className="organization-info">
        <div className="organization-info__wrapper">
          <div className="organization-info__titles">
            <div className="organization-info__first">
              <h1 className="organization-info__title">{organization.title}</h1>
              {access && (
                <ContextMenu
                  triggerContent={<IconDotsVertical />}
                  items={[
                    {
                      title: 'Скачать отчет PDF',
                      action: () => generatePDF(),
                    },
                    {
                      title: 'Экспортировать результаты JSON',
                      action: () => exportObj(),
                    },
                    {
                      title: 'Одобрить организацию',
                      action: () => onActive(),
                      active: !organization.isActive,
                    },

                    {
                      title: 'Удалить организацию',
                      action: () => onDelete(),
                    },
                  ]}
                />
              )}
            </div>

            <p className="organization-info__subtitle">{organization.description}</p>
            <p className="organization-info__subtitle">Количество участников: {organization.members.length}</p>
          </div>
          <div className="organization-info__extra">
            {organization.image && (
              <img
                ref={imageRef}
                src={organization.image}
                alt={organization.title}
                className="organization-info__image"
              />
            )}
          </div>
        </div>
      </section>
      <section className="organization">
        <div className="organization__wrapper">
          <Content results={resultStore.results} meta={resultStore.meta} />
          <div className="organization__sideblock">
            <Members
              id={id}
              members={organization.members}
              administrators={organization.administrators}
              meta={organizationListStore.meta}
              creator={organization.createdBy}
            ></Members>
            <AccessControl requiredRoles={['admin', 'hr']}>
              <Applications id={id} />
            </AccessControl>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TheOrganization;

import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import './CreateOrganization.scss';
import { useNavigate } from 'react-router-dom';
import { OrganizationFormStore } from '@/entities/organization/stores/OrganizationFormStore';

const CreateOrganization: React.FC = observer(() => {
  const navigate = useNavigate();
  const form = useLocalObservable(() => new OrganizationFormStore());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    if (form.image instanceof File) {
      fd.append('organizationCover', form.image);
    }
    const ok = await practiceListStore.create(fd);
    if (ok?.success) {
      navigate(`/organizations/`);
    }
  };

  return (
    <section className="organization-create">
      <div className="organization-create__wrapper">
        <h1 className="organization-create__title">Новая организация</h1>
        <Form onSubmit={onSubmit} className="organization-create__form">
          <div className="organization-create__field">
            <label className="organization-create__label">Заголовок</label>
            <Input
              placeholder="Наименование организации"
              value={form.title}
              onChange={(v) => form.setField('title', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.title && <Error>{form.errors.title}</Error>}
          </div>

          <div className="organization-create__field">
            <label className="organization-create__label">Описание</label>
            <TextArea
              placeholder="Описание видов деятельности организации"
              value={form.description}
              onChange={(v) => form.setField('description', v)}
              fullWidth
            />
            {form.errors.description && <Error>{form.errors.description}</Error>}
          </div>

          <div className="organization-create__field">
            <label className="organization-create__label">Изображение</label>
            <Input
              className="organization-create__input-file"
              type="file"
              placeholder="Добавь изображение"
              onChange={(value) => form.setField('image', value)}
              fullWidth
            />
            {form.errors.image && <Error>{form.errors.image}</Error>}
          </div>

          <Button type="submit">Подать заявку на регистрацию организации</Button>
        </Form>
      </div>
    </section>
  );
});

export default CreateOrganization;

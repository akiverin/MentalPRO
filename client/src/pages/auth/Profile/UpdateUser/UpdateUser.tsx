import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './UpdateUser.scss';

import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';

import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';

import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import LoaderScreen from '@/components/ui/LoaderScreen';
import { userStore } from '@/entities/user/stores/userStoreInstance';
import { UserFormStore } from '@/entities/user/stores/UserFormStore';

const UpdateUser: React.FC = observer(() => {
  const navigate = useNavigate();
  const form = useState(() => new UserFormStore())[0];

  useEffect(() => {
    (async () => {
      const data = userStore.user;
      if (data) {
        form.setField('firstName', data.firstName);
        form.setField('lastName', data.lastName ?? '');
        form.setField('image', '');
        form.setField('email', data.email);
      }
    })();
  }, [form]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);

    if (form.image instanceof File) {
      formData.append('avatar', form.image);
    }
    if (userStore.user) {
      const success = await userStore.update(userStore.user.id, formData);
      if (success) {
        navigate(`/profile`);
      }
    }
  };

  if (practiceListStore.meta === 'loading') {
    return <LoaderScreen />;
  }

  return (
    <section className="case-update">
      <div className="case-update__wrapper">
        <div className="case-update__info">
          <h1 className="case-update__title">Редактирование пользователя</h1>
          <p className="case-update__subtitle">Форма для редактирования данных пользователя.</p>
        </div>

        <Form onSubmit={onSubmit} className="case-update__form">
          <div className="case-update__field">
            <label>Имя</label>
            <Input
              placeholder="Ваше имя"
              value={form.firstName}
              onChange={(v) => form.setField('firstName', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.firstName && <Error>{form.errors.firstName}</Error>}
          </div>

          <div className="case-update__field">
            <label>Фамилия</label>
            <Input
              placeholder="Ваша фамилия"
              value={form.lastName}
              onChange={(v) => form.setField('lastName', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.lastName && <Error>{form.errors.lastName}</Error>}
          </div>

          <div className="case-update__field">
            <label>Email</label>
            <Input
              placeholder="Ваш email"
              value={form.email}
              type="email"
              onChange={(v) => form.setField('email', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.email && <Error>{form.errors.email}</Error>}
          </div>

          {form.image && typeof form.image === 'string' && (
            <div className="case-update__preview">
              <label>Текущее изображение пользователя</label>
              <img src={form.image} alt="Cover preview" className="case-update__preview-img" />
            </div>
          )}

          <div className="case-update__field">
            <label>Загрузить новое изображение пользователя</label>
            <Input type="file" onChange={(v) => v && form.setField('image', v)} fullWidth />
            {form.errors.image && <Error>{form.errors.image}</Error>}
          </div>

          <Button type="submit" size="large">
            Сохранить изменения
          </Button>
        </Form>
      </div>
    </section>
  );
});

export default UpdateUser;

import './Registration.scss';
import { Form } from '@components/ui/Form';
import Input from '@components/ui/Input/';
import TheLink from '@components/ui/Link';
import Button from '@components/ui/Button';

import Checkbox from '@components/ui/Checkbox';
import IconVKID from '@components/ui/icons/IconVKID';
import IconYID from '@components/ui/icons/IconYID';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { RegisterFormStore } from '@entities/user/stores/RegisterFormStore';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@entities/user/stores/userStoreInstance';
import SlidesAuth from '../SlidesAuth';
import { useEffect } from 'react';
import Error from '@/components/ui/Error';

const Registration = observer(() => {
  const form = useLocalObservable(() => new RegisterFormStore());
  const navigate = useNavigate();

  useEffect(() => {
    userStore.clear();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) {
      return;
    }
    const success = await userStore.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (success) {
      navigate(`/login?confirm=${form.email}`);
    }
  };
  return (
    <div className="registration">
      <div className="registration__wrapper">
        <SlidesAuth />
        <div className="registration__content">
          <div className="registration__info">
            <h1 className="registration__title">Регистрация</h1>
            <p className="registration__desc">
              У вас уже есть аккаунт?{' '}
              <TheLink to="/login" variant="text">
                Войти
              </TheLink>
            </p>
            <Form className="registration__form" onSubmit={handleSubmit}>
              <div className="registration__name-inputs">
                <div className="registration__field">
                  <Input
                    value={form.firstName}
                    onChange={(value) => form.setField('firstName', typeof value === 'string' ? value : '')}
                    fullWidth
                    placeholder="Имя"
                    type="text"
                    name="firstNameInput"
                    required
                  />
                  {form.errors.firstName && <p className="registration__error">{form.errors.firstName}</p>}
                </div>
                <div className="registration__field">
                  <Input
                    value={form.lastName}
                    onChange={(value) => form.setField('lastName', typeof value === 'string' ? value : '')}
                    fullWidth
                    placeholder="Фамилия"
                    type="text"
                    name="secondNameInput"
                    required
                  />
                  {form.errors.lastName && <p className="registration__error">{form.errors.lastName}</p>}
                </div>
              </div>
              <Input
                onChange={(value) => form.setField('email', typeof value === 'string' ? value : '')}
                value={form.email}
                fullWidth
                placeholder="Email"
                type="email"
                name="emailInput"
                required
              />
              {form.errors.email && <p className="registration__error">{form.errors.email}</p>}
              <Input
                onChange={(value) => form.setField('password', typeof value === 'string' ? value : '')}
                value={form.password}
                placeholder="Пароль"
                type="password"
                name="passwordInput"
                fullWidth
                required
              />
              {form.errors.password && <p className="registration__error">{form.errors.password}</p>}
              <Checkbox checked={form.privacy} onChange={(value) => form.setField('privacy', value)}>
                Даю{' '}
                <TheLink variant="text" to="/privacy">
                  согласие
                </TheLink>{' '}
                на обработку персональных данных
              </Checkbox>
              {userStore.meta === 'error' && (
                <Error>
                  <p>{userStore.error}</p>
                </Error>
              )}{' '}
              <div className="registration__actions">
                <Button disabled={!form.privacy} size="large" className="registration__button" fullWidth type="submit">
                  Создать аккаунт
                </Button>
              </div>
            </Form>
            <div className="registration__extra">
              <h2 className="registration__extra-title">Регистрация через</h2>
            </div>
            <div className="registration__oauth">
              <TheLink variant="button" background="secondary" className="registration__button">
                <IconVKID />
                <p className="visually-hidden">Использовать VK ID</p>
              </TheLink>
              <TheLink variant="button" href="/api/auth/yandex" background="secondary" className="registration__button">
                <IconYID />
                <p className="visually-hidden">Использовать Яндекс ID</p>
              </TheLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Registration;

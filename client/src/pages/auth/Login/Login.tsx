import './Login.scss';
import { Form } from '@components/ui/Form';
import Input from '@components/ui/Input';
import TheLink from '@components/ui/Link';
import Button from '@components/ui/Button';
import IconYID from '@components/ui/icons/IconYID';
import Error from '@/components/ui/Error';

import { observer, useLocalObservable } from 'mobx-react-lite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginFormStore } from '@entities/user/stores/LoginFormStore';
import { userStore } from '@entities/user/stores/userStoreInstance';
import SlidesAuth from '../SlidesAuth';
import { useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

const Login = observer(() => {
  const form = useLocalObservable(() => new LoginFormStore());
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const confirm = params.get('confirm');

  useEffect(() => {
    userStore.clear();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) {
      return;
    }
    const success = await userStore.login(form.email, form.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login">
      <SlidesAuth />
      <div className="login__content">
        <div className="login__info">
          <h1 className="login__title">Вход в аккаунт</h1>
          <p className="login__desc">
            У вас нет аккаунта?{' '}
            <TheLink to="/registration" variant="text">
              Зарегистрируйтесь
            </TheLink>
          </p>
          {confirm && (
            <Error>
              <p>
                Перейдите по ссылке в письме, отправленному по адресу {confirm}, для подтверждения электронной почты.
              </p>
            </Error>
          )}
          <Form className="login__form" onSubmit={handleSubmit}>
            <Input
              fullWidth
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={(value) => form.setField('email', typeof value === 'string' ? value : '')}
              required
            />
            {form.errors.email && <p className="login__error">{form.errors.email}</p>}
            <Input
              placeholder="Пароль"
              type="password"
              name="password"
              value={form.password}
              onChange={(value) => form.setField('password', typeof value === 'string' ? value : '')}
              fullWidth
              required
            />
            {form.errors.password && <p className="login__error">{form.errors.password}</p>}
            {userStore.meta === 'error' && (
              <Error>
                <p>{userStore.error}</p>
              </Error>
            )}
            <div className="login__actions">
              {/* <TheLink
                className="login__button"
                variant="button"
                background="secondary"
                fullWidth
                to="/forgot-password"
              >
                Восстановить пароль
              </TheLink> */}
              <Button size="large" className="login__button" fullWidth type="submit">
                Войти
              </Button>
            </div>
          </Form>
          <div className="login__extra">
            <h2 className="login__extra-title">Авторизация через</h2>
          </div>
          <div className="login__oauth">
            <TheLink
              variant="button"
              background="secondary"
              className="login__button"
              href={`${API_BASE_URL}/auth/yandex`}
            >
              <IconYID />
              <p className="visually-hidden">Использовать Яндекс ID</p>
            </TheLink>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;

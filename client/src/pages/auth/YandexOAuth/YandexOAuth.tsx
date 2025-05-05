import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userStore } from '@/entities/user/stores/userStoreInstance';

const YandexOAuth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      userStore.setToken(token);
      userStore.me();
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return <p>Авторизация через Яндекс...</p>;
};

export default YandexOAuth;

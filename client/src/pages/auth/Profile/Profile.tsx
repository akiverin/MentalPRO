import './Profile.scss';
import imageCover from '@assets/images/imageProfile.webp';
import TheLink from '@components/ui/Link/Link';
import Badge from '@components/ui/Badge/Badge';
import formatDate from '@utils/formatDate';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { userStore } from '@entities/user/stores/userStoreInstance';
import { resultStore } from '@/entities/result/store/resultStoreInstance';
import SurveyResultCard from './SurveyResultCard/SurveyResultCard';
import Error from '@/components/ui/Error';

const Profile = observer(() => {
  useEffect(() => {
    resultStore.fetchResultsByUser();
  }, []);
  const user = userStore.user;
  const results = resultStore.results;

  if (userStore.meta == 'loading') {
    return (
      <section className="profile-head">
        <div className="profile-head__wrapper">
          <h1 className="profile-head__name">Загрузка... </h1>
        </div>
      </section>
    );
  }
  if (userStore.meta == 'error') {
    return (
      <section className="profile-head">
        <div className="profile-head__wrapper">
          <Error>
            <p>Пользователь не найден, не авторизован или был подтвердил адрес электронной почты. {userStore.error}</p>
          </Error>
        </div>
      </section>
    );
  }
  if (!user) {
    return (
      <section className="profile-head">
        <div className="profile-head__wrapper">
          <Error>
            <p>Пользователь не найден, не авторизован или был подтвердил адрес электронной почты.</p>
          </Error>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="profile-head">
        <div className="profile-head__wrapper">
          <div className="profile-head__images">
            <img src={imageCover} alt="Cover profile page" className="profile-head__cover" />
            {user.image && <img src={user.image} alt="" className="profile-head__avatar" />}
          </div>
          <div className="profile-head__content">
            <div className="profile-head__actions">
              <TheLink to="update" variant="rounded" background="primary">
                Редактировать
              </TheLink>
              <TheLink variant="rounded" background="light" onClick={() => userStore.logout()}>
                Выйти из аккаунта
              </TheLink>
            </div>
            <div className="profile-head__info">
              <div className="profile-head__personal">
                <div className="profile-head__titles">
                  <h1 className="profile-head__name">
                    {user.firstName} {user.lastName && user.lastName}
                  </h1>
                  {user.organizationId && <Badge variant="small">{user.organizationId}</Badge>}
                </div>
                <p className="profile-head__email">{user.email}</p>
              </div>
              <div className="profile-head__details">
                <div className="profile-head__details-item">
                  <p className="profile-head__detail-name">Регистрация</p>
                  <p className="profile-head__detail-content">{formatDate(user.createdAt)}</p>
                </div>
                <div className="profile-head__details-item">
                  <p className="profile-head__detail-name">Обновление</p>
                  <p className="profile-head__detail-content">{formatDate(user.updatedAt)}</p>
                </div>
                {results && (
                  <div className="profile-head__details-item">
                    <p className="profile-head__detail-name">Пройдено</p>
                    <p className="profile-head__detail-content">{results.length}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__history">
            <h2 className="profile__title">История опросов</h2>
            {resultStore.meta === 'loading' && <p className="profile__error">Загрузка...</p>}
            {resultStore.meta === 'error' && <p className="profile__error">Данные не были загружены</p>}
            {resultStore.meta === 'success' && results && (
              <ul className="profile__history-list">
                {results.map((res) => (
                  <li key={res._id} className="profile__history-item">
                    <SurveyResultCard survey={res.surveyId} createdAt={res.createdAt} answers={res.answers} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default Profile;

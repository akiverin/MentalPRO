import { useAppSelector } from "@/store/hooks";
import "./Profile.scss";
import imageCover from "@assets/images/imageProfile.webp";
import TheLink from "@/components/ui/Link/Link";
import Badge from "@/components/ui/Badge/Badge";
import formatDate from "@/utils/formatDate";

const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const organizations = useAppSelector(
    (state) => state.organizations.organizations
  );
  const organization = organizations.find(
    (item) => item.id === user.organizationID
  );

  return (
    <>
      <section className="profile-head">
        <div className="profile-head__wrapper">
          <div className="profile-head__images">
            <img
              src={imageCover}
              alt="Cover profile page"
              className="profile-head__cover"
            />
            <img
              src={user.profileImage}
              alt=""
              className="profile-head__avatar"
            />
          </div>
          <div className="profile-head__content">
            <div className="profile-head__actions">
              <TheLink variant="rounded" background="primary">
                История опросов
              </TheLink>
              <TheLink variant="rounded" background="light">
                Выйти из аккаунта
              </TheLink>
            </div>
            <div className="profile-head__info">
              <div className="profile-head__personal">
                <div className="profile-head__titles">
                  <h1 className="profile-head__name">{user.fullName}</h1>
                  {organization && (
                    <Badge variant="small">{organization.name}</Badge>
                  )}
                </div>
                <p className="profile-head__email">{user.email}</p>
              </div>
              <div className="profile-head__details">
                <div className="profile-head__details-item">
                  <p className="profile-head__detail-name">Регистрация</p>
                  <p className="profile-head__detail-content">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
                <div className="profile-head__details-item">
                  <p className="profile-head__detail-name">Последний опрос</p>
                  <p className="profile-head__detail-content">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
                <div className="profile-head__details-item">
                  <p className="profile-head__detail-name">Пройдено опросов</p>
                  <p className="profile-head__detail-content">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

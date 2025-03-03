import "./TheHeader.scss";
import TheLink from "../ui/Link/Link";
import Logo from "../ui/Logo/Logo";
import iconLogin from "@assets/iconLogin.svg";

function TheHeader() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__start">
          <TheLink className="header__link" background="transparent" href="/">
            <Logo withIcon className="header__logo" />
          </TheLink>
          <nav className="header__navigation">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <TheLink small variant="rounded" background="light" to="/home">
                  Главная
                </TheLink>
              </li>
              <li className="header__nav-item">
                <TheLink
                  small
                  variant="rounded"
                  background="transparent"
                  to="/surveys"
                >
                  Опросы
                </TheLink>
              </li>
              <li className="header__nav-item">
                <TheLink
                  small
                  variant="rounded"
                  background="transparent"
                  to="/cases"
                >
                  Практики
                </TheLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__end">
          <TheLink variant="rounded" to="/organizations">
            Организации
          </TheLink>
          <TheLink icon variant="rounded" background="light" to="/login">
            <img
              src={iconLogin}
              alt="icon login"
              className="header__link-icon"
            />
          </TheLink>
        </div>
      </div>
    </header>
  );
}

export default TheHeader;

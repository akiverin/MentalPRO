import "./TheHeader.scss";
import { useLocation } from "react-router-dom";
import TheLink from "../ui/Link/Link";
import Logo from "../ui/Logo/Logo";
import iconLogin from "@assets/iconLogin.svg";

function TheHeader() {
  const location = useLocation();
  const getLinkBackground = (path: string) =>
    location.pathname === path ? "light" : "transparent";

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__start">
          <TheLink className="header__link" background="transparent" to="/">
            <p className="visually-hidden">Логотип MentalPRO</p>
            <Logo withIcon className="header__logo" />
          </TheLink>
          <nav className="header__navigation">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <TheLink
                  small
                  variant="rounded"
                  background={getLinkBackground("/")}
                  to="/"
                >
                  Главная
                </TheLink>
              </li>
              <li className="header__nav-item">
                <TheLink
                  small
                  variant="rounded"
                  background={getLinkBackground("/surveys")}
                  to="/surveys"
                >
                  Опросы
                </TheLink>
              </li>
              <li className="header__nav-item">
                <TheLink
                  small
                  variant="rounded"
                  background={getLinkBackground("/cases")}
                  to="/cases"
                >
                  Практики
                </TheLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__end">
          <TheLink variant="rounded" background="primary" to="/organizations">
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

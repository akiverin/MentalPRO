import "./TheHeader.scss";
import { useLocation } from "react-router-dom";
import TheLink from "../ui/Link/Link";
import Logo from "../ui/Logo/Logo";
import { useState } from "react";
import Button from "../ui/Button/Button";
import IconLogin from "../ui/icons/IconLogin";
import IconClose from "../ui/icons/IconClose";

function TheHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const getLinkBackground = (path: string) =>
    location.pathname === path ? "light" : "transparent";
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__start">
          <TheLink className="header__link" background="transparent" to="/">
            <p className="visually-hidden">Логотип MentalPRO</p>
            <Logo withIcon className="header__logo" />
          </TheLink>

          <nav className="header__navigation desktop-navigation">
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

        <div className="header__end desktop-end">
          <TheLink variant="rounded" background="primary" to="/organizations">
            Организации
          </TheLink>
          <TheLink icon variant="rounded" background="light" to="/login">
            <IconLogin className="header__link-icon" />
          </TheLink>
        </div>

        <button
          className="header__menu-button mobile-only"
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <span className="header__menu-icon"></span>
        </button>
      </div>

      <div
        className={`header__mobile-menu ${
          menuOpen ? "header__mobile-menu--open" : ""
        }`}
      >
        <div className="header__mobile-menu-header">
          <Logo withIcon className="header__logo" />
          <Button
            className="header__close-button"
            onClick={toggleMenu}
            aria-label="Закрыть меню"
            variant="rounded"
            background="secondary"
          >
            <IconClose />
          </Button>
        </div>

        <nav className="header__mobile-navigation">
          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item">
              <TheLink
                variant="rounded"
                background={getLinkBackground("/")}
                to="/"
                onClick={toggleMenu}
              >
                Главная
              </TheLink>
            </li>
            <li className="header__mobile-nav-item">
              <TheLink
                variant="rounded"
                background={getLinkBackground("/surveys")}
                to="/surveys"
                onClick={toggleMenu}
              >
                Опросы
              </TheLink>
            </li>
            <li className="header__mobile-nav-item">
              <TheLink
                variant="rounded"
                background={getLinkBackground("/cases")}
                to="/cases"
                onClick={toggleMenu}
              >
                Практики
              </TheLink>
            </li>
            <li className="header__mobile-nav-item">
              <TheLink
                variant="rounded"
                background={getLinkBackground("/organizations")}
                to="/organizations"
                onClick={toggleMenu}
              >
                Организации
              </TheLink>
            </li>
            <li className="header__mobile-nav-item">
              <TheLink
                icon
                variant="rounded"
                background="light"
                to="/login"
                onClick={toggleMenu}
              >
                <IconLogin className="header__link-icon" />
                <span className="header__mobile-login-text">Войти</span>
              </TheLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default TheHeader;

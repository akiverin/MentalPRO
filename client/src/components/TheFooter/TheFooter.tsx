import "./TheFooter.scss";
import TheLink from "../ui/Link/Link";
import Logo from "../ui/Logo/Logo";
import { Form } from "../ui/Form/Form";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import IconVK from "../ui/icons/IconVK";
import IconTg from "../ui/icons/IconTg";
import IconGH from "../ui/icons/IconGH";

function TheFooter() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__base">
          <Form onSubmit={() => {}} className="footer__contact">
            <h3 className="footer__title">
              Возникли вопросы,
              <br />
              Свяжитесь с нами!
            </h3>
            <p className="footer__desc">
              Для обратной связи необходимо ввести Ваш адрес электронной почты в
              поле ввода, и мы свяжемся с Вами как можно скорее!
            </p>
            <div className="footer__form">
              <Input fullWidth placeholder="Email" />
              <Button fullWidth size="large" onClick={() => {}}>
                Отправить
              </Button>
            </div>
            <p className="footer__comment">
              Я даю{" "}
              <TheLink variant="text" to="/privacy">
                согласие
              </TheLink>{" "}
              на обработку моих персональных данных.{" "}
            </p>
          </Form>
          <div className="footer__map">
            <div className="footer__navigation">
              <h4 className="footer__nav-title">Навигация</h4>
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/"
                  >
                    Главная
                  </TheLink>
                </li>
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/surveys"
                  >
                    Опросы
                  </TheLink>
                </li>
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/cases"
                  >
                    Практики
                  </TheLink>
                </li>
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/organizations"
                  >
                    Организации
                  </TheLink>
                </li>
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/profile"
                  >
                    Мой профиль
                  </TheLink>
                </li>
              </ul>
            </div>
            <div className="footer__navigation">
              <h4 className="footer__nav-title">Аутентификация</h4>
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/registration"
                  >
                    Регистрация
                  </TheLink>
                </li>
                <li className="footer__nav-item">
                  <TheLink
                    className="footer__nav-link"
                    variant="navigation"
                    to="/login"
                  >
                    Вход в аккаунт
                  </TheLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__extra">
          <div className="footer__social">
            <TheLink href="/" aria-label="Вконтакте">
              <p className="visually-hidden">Вконтакте</p>
              <IconVK className="footer__soc-icon" />
            </TheLink>
            <TheLink href="/" aria-label="Телеграм">
              <p className="visually-hidden">Телеграм</p>
              <IconTg className="footer__soc-icon" />
            </TheLink>
            <TheLink href="/" aria-label="GitHub">
              <p className="visually-hidden">GitHub</p>
              <IconGH className="footer__soc-icon" />
            </TheLink>
          </div>

          <TheLink to="/">
            <p className="visually-hidden">Логотип MentalPRO</p>
            <Logo withIcon />
          </TheLink>
          <ul className="footer__docs">
            <li className="footer__docs-item">
              <TheLink
                to="/privacy"
                variant="navigation"
                className="footer__docs-link"
              >
                Политика обработки персональных данных
              </TheLink>
            </li>
            <li className="footer__docs-item">
              <TheLink variant="navigation" className="footer__docs-link">
                Пользовательское соглашение
              </TheLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default TheFooter;

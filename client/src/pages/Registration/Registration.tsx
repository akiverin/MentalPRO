import "./Registration.scss";
import { Form } from "@components/ui/Form/Form";
import Input from "@components/ui/Input/Input";
import TheLink from "@components/ui/Link/Link";
import Button from "@/components/ui/Button/Button";
import Slider from "@components/ui/Slider/Slider";

import iconVKID from "@assets/iconVKID.svg";
import iconYandexID from "@assets/iconYandexID.svg";

import imageLogin01Avif1x from "@assets/images/login/imageLogin01.avif";
import imageLogin01Avif2x from "@assets/images/login/imageLogin01@2x.avif";
import imageLogin01Webp1x from "@assets/images/login/imageLogin01.webp";
import imageLogin01Webp2x from "@assets/images/login/imageLogin01@2x.webp";
import imageLogin01Png1x from "@assets/images/login/imageLogin01.png";
import imageLogin01Png2x from "@assets/images/login/imageLogin01@2x.png";

import imageLogin02Avif1x from "@assets/images/login/imageLogin02.avif";
import imageLogin02Avif2x from "@assets/images/login/imageLogin02@2x.avif";
import imageLogin02Webp1x from "@assets/images/login/imageLogin02.webp";
import imageLogin02Webp2x from "@assets/images/login/imageLogin02@2x.webp";
import imageLogin02Png1x from "@assets/images/login/imageLogin02.png";
import imageLogin02Png2x from "@assets/images/login/imageLogin02@2x.png";

import imageLogin03Avif1x from "@assets/images/login/imageLogin03.avif";
import imageLogin03Avif2x from "@assets/images/login/imageLogin03@2x.avif";
import imageLogin03Webp1x from "@assets/images/login/imageLogin03.webp";
import imageLogin03Webp2x from "@assets/images/login/imageLogin03@2x.webp";
import imageLogin03Png1x from "@assets/images/login/imageLogin03.png";
import imageLogin03Png2x from "@assets/images/login/imageLogin03@2x.png";
import Checkbox from "@/components/ui/Checkbox/Checkbox";

const slides = [
  {
    id: 1,
    text: "Найди способы противостоять стрессу!",
    images: {
      avif: [imageLogin01Avif1x, imageLogin01Avif2x],
      webp: [imageLogin01Webp1x, imageLogin01Webp2x],
      png: [imageLogin01Png1x, imageLogin01Png2x],
    },
  },
  {
    id: 2,
    text: "Управляй своими эмоциями эффективно!",
    images: {
      avif: [imageLogin02Avif1x, imageLogin02Avif2x],
      webp: [imageLogin02Webp1x, imageLogin02Webp2x],
      png: [imageLogin02Png1x, imageLogin02Png2x],
    },
  },
  {
    id: 3,
    text: "Достигай внутренней гармонии!",
    images: {
      avif: [imageLogin03Avif1x, imageLogin03Avif2x],
      webp: [imageLogin03Webp1x, imageLogin03Webp2x],
      png: [imageLogin03Png1x, imageLogin03Png2x],
    },
  },
];

const Registration = () => {
  return (
    <div className="registration">
      <div className="registration__wrapper">
        <Slider slides={slides} slideDuration={10} />
        <div className="registration__content">
          <div className="registration__info">
            <h1 className="registration__title">Регистрация</h1>
            <p className="registration__desc">
              У вас уже есть аккаунт?{" "}
              <TheLink to="/login" variant="text">
                Войти
              </TheLink>
            </p>
            <Form className="registration__form" onSubmit={() => {}}>
              <div className="registration__name-inputs">
                <Input
                  fullWidth
                  placeholder="Имя"
                  type="text"
                  name="firstNameInput"
                  required
                />
                <Input
                  fullWidth
                  placeholder="Фамилия"
                  type="text"
                  name="secondNameInput"
                  required
                />
              </div>
              <Input
                fullWidth
                placeholder="Email"
                type="email"
                name="emailInput"
                required
              />
              <Input
                placeholder="Пароль"
                type="password"
                name="passwordInput"
                fullWidth
                required
              />
              <Checkbox>
                Даю{" "}
                <TheLink variant="text" to="/presonal-data">
                  согласие
                </TheLink>{" "}
                на обработку персональных данных
              </Checkbox>
              <div className="registration__actions">
                <Button
                  size="large"
                  className="registration__button"
                  fullWidth
                  type="submit"
                >
                  Создать аккаунт
                </Button>
              </div>
            </Form>
            <div className="registration__extra">
              <h2 className="registration__extra-title">Регистрация через</h2>
            </div>
            <div className="registration__oauth">
              <TheLink
                variant="button"
                background="secondary"
                className="registration__button"
              >
                <img
                  src={iconVKID}
                  alt="VK ID icon"
                  className="registration__icon"
                />
                <p className="visually-hidden">Использовать VK ID</p>
              </TheLink>
              <TheLink
                variant="button"
                background="secondary"
                className="registration__button"
              >
                <img
                  src={iconYandexID}
                  alt="Яндекс ID icon"
                  className="registration__icon"
                />
                <p className="visually-hidden">Использовать Яндекс ID</p>
              </TheLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

import "./Login.scss";
import { Form } from "@components/ui/Form/Form";
import Input from "@components/ui/Input/Input";
import TheLink from "@components/ui/Link/Link";
import Button from "@/components/ui/Button/Button";
import Slider from "@components/ui/Slider/Slider";

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

import IconVKID from "@/components/ui/icons/IconVKID";
import IconYID from "@/components/ui/icons/IconYID";

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

const Login = () => {
  return (
    <div className="login">
      <Slider slides={slides} slideDuration={10} />
      <div className="login__content">
        <div className="login__info">
          <h1 className="login__title">Вход в аккаунт</h1>
          <p className="login__desc">
            У вас нет аккаунта?{" "}
            <TheLink to="/registration" variant="text">
              Зарегистрируйтесь
            </TheLink>
          </p>
          <Form className="login__form" onSubmit={() => {}}>
            <Input
              fullWidth
              placeholder="Email"
              type="email"
              name="email"
              required
            />
            <Input
              placeholder="Пароль"
              type="password"
              name="password"
              fullWidth
              required
            />
            <div className="login__actions">
              <TheLink
                className="login__button"
                variant="button"
                background="secondary"
                fullWidth
                to="/forgot-password"
              >
                Восстановить пароль
              </TheLink>
              <Button
                size="large"
                className="login__button"
                fullWidth
                type="submit"
              >
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
            >
              <IconVKID />
              <p className="visually-hidden">Использовать VK ID</p>
            </TheLink>
            <TheLink
              variant="button"
              background="secondary"
              className="login__button"
            >
              <IconYID />
              <p className="visually-hidden">Использовать Яндекс ID</p>
            </TheLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

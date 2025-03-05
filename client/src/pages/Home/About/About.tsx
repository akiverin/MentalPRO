import TheLink from "../../../components/ui/Link/Link";

import imageGallery01 from "@assets/images/imageGallery01.webp";
import imageGallery02 from "@assets/images/imageGallery02.webp";
import imageGallery03 from "@assets/images/imageGallery03.webp";
import imageGallery04 from "@assets/images/imageGallery04.webp";
import imageGallery05 from "@assets/images/imageGallery05.webp";

import "./About.scss";

const About = () => {
  return (
    <>
      <section className="about">
        <div className="about__wrapper">
          <p className="about__category">
            о нас <sup className="about__number">[02]</sup>
          </p>
          <h2 className="about__title">
            Осознанность и контроль — ключи к внутреннему равновесию
          </h2>
          <p className="about__desc">
            Используйте наш сервис для ежедневного отслеживания настроения,
            обучения навыкам эмоциональной регуляции и улучшения качества жизни.
          </p>
          <TheLink
            className="about__link"
            variant="rounded"
            background="primary"
            to="/serveys"
          >
            Начать путь к спокойствию →
          </TheLink>
          <div className="about__gallery">
            <img
              src={imageGallery01}
              alt="Descorate image"
              className="about__image about__image--one"
            />
            <img
              src={imageGallery02}
              alt="Descorate image"
              className="about__image about__image--two"
            />
            <img
              src={imageGallery03}
              alt="Descorate image"
              className="about__image about__image--three"
            />
            <img
              src={imageGallery04}
              alt="Descorate image"
              className="about__image about__image--four"
            />
            <img
              src={imageGallery05}
              alt="Descorate image"
              className="about__image about__image--five"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

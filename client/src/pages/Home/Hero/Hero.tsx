import TheLink from "@components/ui/Link/Link";
import "./Hero.scss";

import heroImage480 from "@assets/images/imageHero-480.webp";
import heroImage768 from "@assets/images/imageHero-768.webp";
import heroImage1280 from "@assets/images/imageHero-1280.webp";
import heroImage1920 from "@assets/images/imageHero-1920.webp";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <picture>
          <source srcSet={heroImage1920} media="(min-width: 1281px)" />
          <source srcSet={heroImage1280} media="(min-width: 769px)" />
          <source srcSet={heroImage768} media="(min-width: 481px)" />
          <source srcSet={heroImage480} media="(max-width: 480px)" />
          <img
            alt="Model MentalPro"
            src={heroImage1280}
            className="hero__image"
            loading="lazy"
          />
        </picture>
        <h1 className="hero__decorate-title">MentalPRO</h1>
        <div className="hero__info">
          <h2 className="hero__desc">
            Побори свою тревожность <br /> и обрети спокойствие
          </h2>
          <TheLink background="primary" variant="rounded">
            Пройти практику
          </TheLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;

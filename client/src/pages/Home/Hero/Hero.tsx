import TheLink from "@components/ui/Link/Link";
import "./Hero.scss";

import heroImage480 from "@assets/images/home/imageHero-480.webp";
import heroImage768 from "@assets/images/home/imageHero-768.webp";
import heroImage920 from "@assets/images/home/imageHero-920.webp";
import heroImage1040 from "@assets/images/home/imageHero-1040.webp";
import heroImage1280 from "@assets/images/home/imageHero-1280.webp";
import imageHero from "@assets/images/home/imageHero.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <picture>
          <source srcSet={heroImage1280} media="(min-width: 2000px)" />
          <source srcSet={heroImage1040} media="(min-width: 1880px)" />
          <source srcSet={heroImage920} media="(min-width: 1640px)" />
          <source srcSet={heroImage768} media="(min-width: 769px)" />
          <source srcSet={heroImage480} media="(min-width: 481px)" />
          <source srcSet={heroImage480} media="(max-width: 480px)" />
          <img
            alt="Model MentalPro"
            src={imageHero}
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

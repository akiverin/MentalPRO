import TheLink from "../../../components/ui/Link/Link";
import heroImage from "@assets/images/heroImage.png";
import "./Hero.scss";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="hero__wrapper">
          <img alt="Model MentalPro" src={heroImage} className="hero__image" />
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
    </>
  );
};

export default Hero;

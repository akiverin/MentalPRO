import { useMemo } from "react";
import { motion } from "framer-motion";
import TheLink from "../../../components/ui/Link/Link";

import imageGallery01 from "@assets/images/imageGallery01.webp";
import imageGallery02 from "@assets/images/imageGallery02.webp";
import imageGallery03 from "@assets/images/imageGallery03.webp";
import imageGallery04 from "@assets/images/imageGallery04.webp";
import imageGallery05 from "@assets/images/imageGallery05.webp";

import "./About.scss";

const About = () => {
  // Движение вверх-вниз с разными амплитудами
  const floatingVariants = useMemo(
    () => ({
      animate: (delay: number) => ({
        y: [0, 20, 0],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror" as const,
          delay,
        },
      }),
    }),
    []
  );

  return (
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

        {/* Галерея с анимацией */}
        <div className="about__gallery">
          {[
            { src: imageGallery01, className: "about__image--one", delay: 0 },
            { src: imageGallery02, className: "about__image--two", delay: 0.5 },
            { src: imageGallery03, className: "about__image--three", delay: 1 },
            {
              src: imageGallery04,
              className: "about__image--four",
              delay: 1.5,
            },
            { src: imageGallery05, className: "about__image--five", delay: 2 },
          ].map(({ src, className, delay }, index) => (
            <motion.div
              key={index}
              variants={floatingVariants}
              animate="animate"
              custom={delay}
            >
              <img
                className={`about__image ${className}`}
                src={src}
                alt="Decorative image"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

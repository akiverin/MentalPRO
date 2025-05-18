import { useMemo } from 'react';
import { motion } from 'framer-motion';
import TheLink from '../../../components/ui/Link/Link';
import './About.scss';

import imageGallery01 from '@assets/images/home/imageGallery01.webp';
import imageGallery01Avif from '@assets/images/home/imageGallery01.avif';
import imageGallery01Png from '@assets/images/home/imageGallery01.png';

import imageGallery02 from '@assets/images/home/imageGallery02.webp';
import imageGallery02Avif from '@assets/images/home/imageGallery02.avif';
import imageGallery02Png from '@assets/images/home/imageGallery02.png';

import imageGallery03 from '@assets/images/home/imageGallery03.webp';
import imageGallery03Avif from '@assets/images/home/imageGallery03.avif';
import imageGallery03Png from '@assets/images/home/imageGallery03.png';

import imageGallery04 from '@assets/images/home/imageGallery04.webp';
import imageGallery04Avif from '@assets/images/home/imageGallery04.avif';
import imageGallery04Png from '@assets/images/home/imageGallery04.png';

import imageGallery05 from '@assets/images/home/imageGallery05.webp';
import imageGallery05Avif from '@assets/images/home/imageGallery05.avif';
import imageGallery05Png from '@assets/images/home/imageGallery05.png';

const imageGallery = [
  {
    avif: imageGallery01Avif,
    webp: imageGallery01,
    png: imageGallery01Png,
    className: 'about__image--one',
    delay: 0,
  },
  {
    avif: imageGallery02Avif,
    webp: imageGallery02,
    png: imageGallery02Png,
    className: 'about__image--two',
    delay: 0.5,
  },
  {
    avif: imageGallery03Avif,
    webp: imageGallery03,
    png: imageGallery03Png,
    className: 'about__image--three',
    delay: 1,
  },
  {
    avif: imageGallery04Avif,
    webp: imageGallery04,
    png: imageGallery04Png,
    className: 'about__image--four',
    delay: 1.5,
  },
  {
    avif: imageGallery05Avif,
    webp: imageGallery05,
    png: imageGallery05Png,
    className: 'about__image--five',
    delay: 2,
  },
];

const About = () => {
  const floatingVariants = useMemo(
    () => ({
      animate: (delay: number) => ({
        y: [0, 20, 0],
        transition: {
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror' as const,
          delay,
        },
      }),
    }),
    [],
  );

  return (
    <section className="about">
      <div className="about__wrapper">
        <h3 className="about__category">
          о нас <sup className="about__number">[02]</sup>
        </h3>
        <h2 className="about__title home-title">Осознанность и контроль — ключи к внутреннему равновесию</h2>
        <p className="about__desc home-desc">
          Используйте наш сервис для ежедневного отслеживания настроения, обучения навыкам эмоциональной регуляции и
          улучшения качества жизни.
        </p>
        <TheLink className="about__link" variant="rounded" background="primary" to="/surveys">
          Измерить уровень тревожности
        </TheLink>
        <div className="about__gallery">
          {imageGallery.map(({ avif, webp, png, className, delay }, index) => (
            <motion.div key={index} variants={floatingVariants} animate="animate" custom={delay}>
              <picture className={`about__image ${className}`}>
                <source srcSet={avif} type="image/avif" />
                <source srcSet={webp} type="image/webp" />
                <img
                  src={png}
                  className={`about__image ${className}`}
                  alt={`Decorative image ${index}`}
                  loading="lazy"
                />
              </picture>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

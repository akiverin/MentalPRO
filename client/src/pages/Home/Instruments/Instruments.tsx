import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TheLink from "@/components/ui/Link/Link";
import "./Instruments.scss";

import imageInstrument01Avif1x from "@assets/images/home/imageInstrument01-1x.avif";
import imageInstrument01Avif2x from "@assets/images/home/imageInstrument01-2x.avif";
import imageInstrument01Webp1x from "@assets/images/home/imageInstrument01-1x.webp";
import imageInstrument01Webp2x from "@assets/images/home/imageInstrument01-2x.webp";
import imageInstrument01Png1x from "@assets/images/home/imageInstrument01-1x.png";
import imageInstrument01Png2x from "@assets/images/home/imageInstrument01-2x.png";

import imageInstrument02Avif1x from "@assets/images/home/imageInstrument02-1x.avif";
import imageInstrument02Avif2x from "@assets/images/home/imageInstrument02-2x.avif";
import imageInstrument02Webp1x from "@assets/images/home/imageInstrument02-1x.webp";
import imageInstrument02Webp2x from "@assets/images/home/imageInstrument02-2x.webp";
import imageInstrument02Png1x from "@assets/images/home/imageInstrument02-1x.png";
import imageInstrument02Png2x from "@assets/images/home/imageInstrument02-2x.png";

import imageInstrument03Avif1x from "@assets/images/home/imageInstrument03-1x.avif";
import imageInstrument03Avif2x from "@assets/images/home/imageInstrument03-2x.avif";
import imageInstrument03Webp1x from "@assets/images/home/imageInstrument03-1x.webp";
import imageInstrument03Webp2x from "@assets/images/home/imageInstrument03-2x.webp";
import imageInstrument03Png1x from "@assets/images/home/imageInstrument03-1x.png";
import imageInstrument03Png2x from "@assets/images/home/imageInstrument03-2x.png";

import imageInstrument04Avif1x from "@assets/images/home/imageInstrument04-1x.avif";
import imageInstrument04Avif2x from "@assets/images/home/imageInstrument04-2x.avif";
import imageInstrument04Webp1x from "@assets/images/home/imageInstrument04-1x.webp";
import imageInstrument04Webp2x from "@assets/images/home/imageInstrument04-2x.webp";
import imageInstrument04Png1x from "@assets/images/home/imageInstrument04-1x.png";
import imageInstrument04Png2x from "@assets/images/home/imageInstrument04-2x.png";

import iconCases from "@assets/iconCases.svg";
import iconSurveys from "@assets/iconSurveys.svg";
import iconOrganizations from "@assets/iconOrganizations.svg";
import iconProfile from "@assets/iconProfile.svg";
import classNames from "classnames";

const instruments = [
  {
    id: 0,
    images: {
      avif: [imageInstrument01Avif1x, imageInstrument01Avif2x],
      webp: [imageInstrument01Webp1x, imageInstrument01Webp2x],
      png: [imageInstrument01Png1x, imageInstrument01Png2x],
    },
    bg: "linear-gradient(147deg,#648aac 0%,#9ac8e4 67.91%,#bbcad2 100%) ",
    name: "Практики",
    path: "/cases",
    icon: iconCases,
    desc: "Короткие техники управления стрессом, которые можно применять в повседневной жизни.",
    link: "Все практики",
  },
  {
    id: 1,
    images: {
      avif: [imageInstrument02Avif1x, imageInstrument02Avif2x],
      webp: [imageInstrument02Webp1x, imageInstrument02Webp2x],
      png: [imageInstrument02Png1x, imageInstrument02Png2x],
    },
    bg: "linear-gradient(147deg, #355535 0%, #84a583 67.91%, #e3f0e3 100%)",
    name: "Опросы",
    path: "/surveys",
    icon: iconSurveys,
    desc: "Определение уровня тревожности, триггеров стресса и анализ полученных результатов.",
    link: "Все опросы",
  },
  {
    id: 2,
    images: {
      avif: [imageInstrument03Avif1x, imageInstrument03Avif2x],
      webp: [imageInstrument03Webp1x, imageInstrument03Webp2x],
      png: [imageInstrument03Png1x, imageInstrument03Png2x],
    },
    bg: "linear-gradient(147deg, #7d6247 0%, #c4bba0 67.91%, #d3d0bd 100%)",
    name: "Организации",
    path: "/organizations",
    icon: iconOrganizations,
    desc: "Программы для сотрудников компаний, мониторинг психологического состояния и рекомендации по снижению стресса.",
    link: "Все организации",
  },
  {
    id: 3,
    images: {
      avif: [imageInstrument04Avif1x, imageInstrument04Avif2x],
      webp: [imageInstrument04Webp1x, imageInstrument04Webp2x],
      png: [imageInstrument04Png1x, imageInstrument04Png2x],
    },
    bg: "linear-gradient(147deg, #824877 0%, #ae7b7c 67.91%, #f9e7d9 100%)",
    name: "Профиль",
    path: "/profile",
    icon: iconProfile,
    desc: "Индивидуальный дашборд с динамикой изменений уровня тревожности.",
    link: "Перейти в профиль",
  },
];

const Instruments = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(0);

  const handlePrev = useCallback(() => {
    setSelectedInstrument((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedInstrument((prev) => Math.min(instruments.length - 1, prev + 1));
  }, []);

  return (
    <section
      className={classNames(
        "instruments",
        `instruments--${instruments[selectedInstrument].path.slice(1)}`
      )}
    >
      <motion.div
        className="instruments__cover"
        key={selectedInstrument}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1, transition: { duration: 0.9 } }}
        exit={{ opacity: 0 }}
        style={{ background: instruments[selectedInstrument].bg }}
      >
        <p className="instruments__category">
          инструменты <sup>[03]</sup>
        </p>
        <div className="instruments__frame">
          <AnimatePresence mode="wait">
            <motion.picture key={selectedInstrument}>
              <source
                srcSet={`${instruments[selectedInstrument].images.avif[0]} 1x, ${instruments[selectedInstrument].images.avif[1]} 2x`}
                type="image/avif"
              />
              <source
                srcSet={`${instruments[selectedInstrument].images.webp[0]} 1x, ${instruments[selectedInstrument].images.webp[1]} 2x`}
                type="image/webp"
              />
              <motion.img
                key={selectedInstrument}
                src={instruments[selectedInstrument].images.png[0]}
                srcSet={`${instruments[selectedInstrument].images.png[1]} 2x`}
                alt={instruments[selectedInstrument].name}
                className="instruments__image"
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8 },
                }}
                exit={{ opacity: 0, scale: 1.2 }}
              />
            </motion.picture>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="instruments__info">
        <ul className="instruments__list">
          {instruments.map((item) => (
            <li key={item.id} className="instruments__item">
              <Button
                className={
                  selectedInstrument === item.id
                    ? "instruments__nav-button instruments__nav-button--active"
                    : "instruments__nav-button"
                }
                variant="rounded"
                background={
                  selectedInstrument === item.id ? "light" : "secondary"
                }
                onClick={() => setSelectedInstrument(item.id)}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>

        <div className="instruments__content">
          <div className="instruments__circle">
            <img
              src={instruments[selectedInstrument].icon}
              alt="Instrument icon"
              className="instruments__icon"
            />
          </div>
          <p className="instruments__desc">
            {instruments[selectedInstrument].desc}
          </p>
          <TheLink
            background="primary"
            variant="rounded"
            to={instruments[selectedInstrument].path}
          >
            {instruments[selectedInstrument].link}
          </TheLink>
        </div>

        <div className="instruments__actions">
          <Button
            className="instruments__button"
            variant="rounded"
            background="secondary"
            disabled={selectedInstrument === 0}
            onClick={handlePrev}
          >
            <p className="visually-hidden">Предыдущий инструмент</p>
            <svg
              className="instruments__arrow"
              width="15"
              height="14"
              viewBox="0 0 15 14"
            >
              <path
                d="M6.58381 13.5065L0.123047 7.04572L6.58381 0.584961L7.83026 1.81756L3.50231 6.14551H14.3741V7.94593H3.50231L7.83026 12.267L6.58381 13.5065Z"
                fill="black"
              />
            </svg>
          </Button>
          <Button
            className="instruments__button"
            variant="rounded"
            background="secondary"
            disabled={selectedInstrument === instruments.length - 1}
            onClick={handleNext}
          >
            <p className="visually-hidden">Следующий инструмент</p>
            <svg
              className="instruments__arrow"
              width="16"
              height="15"
              viewBox="0 0 16 15"
            >
              <path
                d="M8.65626 14.6023L7.2911 13.2523L12.0312 8.51221H0.124023V6.54032H12.0312L7.2911 1.80777L8.65626 0.450195L15.7323 7.52627L8.65626 14.6023Z"
                fill="black"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Instruments;

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TheLink from "@/components/ui/Link/Link";
import "./Instruments.scss";

import imageInstrument01 from "@assets/images/imageInstrument01.webp";
import imageInstrument02 from "@assets/images/imageInstrument02.webp";
import imageInstrument03 from "@assets/images/imageInstrument03.webp";
import imageInstrument04 from "@assets/images/imageInstrument04.webp";

import iconCases from "@assets/iconCases.svg";
import iconSurveys from "@assets/iconSurveys.svg";
import iconOrganizations from "@assets/iconOrganizations.svg";
import iconProfile from "@assets/iconProfile.svg";

const instruments = [
  {
    id: 0,
    image: imageInstrument01,
    bg: "linear-gradient(147deg, #81a3c2 0%, #c2d9e7 67.91%, #dbe4e9 100%)",
    name: "Практики",
    path: "/cases",
    icon: iconCases,
    desc: "Короткие техники управления стрессом, которые можно применять в повседневной жизни.",
    link: "Все практики",
  },
  {
    id: 1,
    image: imageInstrument02,
    bg: "linear-gradient(147deg, #355535 0%, #84a583 67.91%, #e3f0e3 100%)",
    name: "Опросы",
    path: "/surveys",
    icon: iconSurveys,
    desc: "Определение уровная тревожности, триггеров стресса и анализ полученных результатов.",
    link: "Все опросы",
  },
  {
    id: 2,
    image: imageInstrument03,
    bg: "linear-gradient(147deg, #7d6247 0%, #c4bba0 67.91%, #d3d0bd 100%)",
    name: "Организации",
    path: "/organizations",
    icon: iconOrganizations,
    desc: "Программы для сотрудников компаний, мониторинг психологического состояния и рекомендации по снижению стресса.",
    link: "Все организации",
  },
  {
    id: 3,
    image: imageInstrument04,
    bg: "linear-gradient(147deg, #824877 0%, #ae7b7c 67.91%, #f9e7d9 100%)",
    name: "Профиль",
    path: "/profile",
    icon: iconProfile,
    desc: "Индивидуальный дашборд с динамикой изменений уровня тревожности.",
    link: "Перейти в профиль",
  },
];

const preloadImages = () => {
  instruments.forEach((instrument) => {
    const img = new Image();
    img.src = instrument.image;
  });
};

const Instruments = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(0);

  useEffect(() => {
    preloadImages();
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedInstrument((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedInstrument((prev) => Math.min(instruments.length - 1, prev + 1));
  }, []);

  return (
    <section className="instruments">
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
            <motion.img
              key={selectedInstrument}
              src={instruments[selectedInstrument].image}
              alt="Decorative"
              className="instruments__image"
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
              exit={{ opacity: 0, scale: 1.2 }}
            />
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

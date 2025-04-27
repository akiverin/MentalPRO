import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TheLink from "@/components/ui/Link/Link";
import "./Instruments.scss";
import { INSTRUMENTS } from ".";

import classNames from "classnames";
import IconArrowRight from "@/components/ui/icons/IconArrowRight";
import IconArrowLeft from "@/components/ui/icons/IconArrowLeft";

const Instruments = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<number>(0);

  const handlePrev = useCallback(() => {
    setSelectedInstrument((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedInstrument((prev) => Math.min(INSTRUMENTS.length - 1, prev + 1));
  }, []);

  return (
    <section
      className={classNames(
        "instruments",
        `instruments--${INSTRUMENTS[selectedInstrument].path.slice(1)}`
      )}
    >
      <motion.div
        className="instruments__cover"
        key={selectedInstrument}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1, transition: { duration: 0.9 } }}
        exit={{ opacity: 0 }}
        style={{ background: INSTRUMENTS[selectedInstrument].bg }}
      >
        <p className="instruments__category">
          инструменты <sup>[03]</sup>
        </p>
        <div className="instruments__frame">
          <AnimatePresence mode="wait">
            <motion.picture key={selectedInstrument}>
              <source
                srcSet={`${INSTRUMENTS[selectedInstrument].images.avif[0]} 1x, ${INSTRUMENTS[selectedInstrument].images.avif[1]} 2x`}
                type="image/avif"
              />
              <source
                srcSet={`${INSTRUMENTS[selectedInstrument].images.webp[0]} 1x, ${INSTRUMENTS[selectedInstrument].images.webp[1]} 2x`}
                type="image/webp"
              />
              <motion.img
                key={selectedInstrument}
                src={INSTRUMENTS[selectedInstrument].images.png[0]}
                srcSet={`${INSTRUMENTS[selectedInstrument].images.png[1]} 2x`}
                alt={INSTRUMENTS[selectedInstrument].name}
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
          {INSTRUMENTS.map((item) => (
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
            {INSTRUMENTS[selectedInstrument].icon}
          </div>
          <p className="instruments__desc home-desc">
            {INSTRUMENTS[selectedInstrument].desc}
          </p>
          <TheLink
            background="primary"
            variant="rounded"
            to={INSTRUMENTS[selectedInstrument].path}
          >
            {INSTRUMENTS[selectedInstrument].link}
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
            <IconArrowLeft className="instruments__arrow" />
          </Button>
          <Button
            className="instruments__button"
            variant="rounded"
            background="secondary"
            disabled={selectedInstrument === INSTRUMENTS.length - 1}
            onClick={handleNext}
          >
            <p className="visually-hidden">Следующий инструмент</p>
            <IconArrowRight className="instruments__arrow" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Instruments;

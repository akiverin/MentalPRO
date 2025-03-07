import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Slider.scss";

interface Slide {
  id: number;
  text: string;
  images: {
    avif: string[];
    webp: string[];
    png: string[];
  };
}

interface SliderProps {
  slides: Slide[];
  slideDuration?: number;
}

const Slider = ({ slides, slideDuration = 10 }: SliderProps) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (slideDuration * 10));
      } else {
        setProgress(0);
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress, slideDuration, slides.length]);

  return (
    <div className="slider">
      <motion.div
        key={slides[index].id}
        initial={{ opacity: 0.8, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="slider__box"
      >
        <picture>
          <source
            srcSet={`${slides[index].images.avif[0]} 1x, ${slides[index].images.avif[1]} 2x`}
            type="image/avif"
          />
          <source
            srcSet={`${slides[index].images.webp[0]} 1x, ${slides[index].images.webp[1]} 2x`}
            type="image/webp"
          />
          <img
            src={slides[index].images.png[0]}
            srcSet={`${slides[index].images.png[1]} 2x`}
            alt={slides[index].text}
            className="slider__image"
          />
        </picture>
      </motion.div>
      <p className="slider__text">{slides[index].text}</p>
      <div className="slider__indicators">
        {slides.map((_, i) => (
          <div key={i} className="slider__progress-bar-container">
            <div className="slider__progress-bar-background">
              <div
                className="slider__progress-bar-fill"
                style={{
                  width:
                    i === index ? `${progress}%` : i < index ? "100%" : "0%",
                  transition: i === index ? "width 0.1s linear" : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

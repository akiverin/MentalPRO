import React, { useState, useRef, useEffect } from "react";
import "./Accordion.scss";
import IconMArrowBottom from "../icons/IconMArrowBottom";

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const Accordion: React.FC<AccordionProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <button
        className="accordion__header"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        {question}
        <span className={`accordion__icon ${isOpen ? "open" : ""}`}>
          <IconMArrowBottom />
        </span>
      </button>

      <div className="accordion__container" style={{ height: `${height}px` }}>
        <div ref={contentRef} className="accordion__content">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

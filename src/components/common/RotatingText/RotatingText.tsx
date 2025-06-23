import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./RotatingText.module.css";

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number; // ms
  staggerDuration?: number; // s
  mainClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  rotationInterval = 3000,
  staggerDuration = 0.05,
  mainClassName = "",
  elementLevelClassName = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerDuration * 0.6,
        staggerDirection: -1,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 220 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { type: "spring", damping: 25, stiffness: 220 },
    },
  };

  const chars = texts[index].split("");

  return (
    <div className={`${styles.container} ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden="true"
          className={`${styles.inner}`}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              className={`${styles.element} ${elementLevelClassName}`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;

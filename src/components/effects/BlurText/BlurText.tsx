// src/components/effects/BlurText/BlurText.tsx (Versi Upgraded)
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { useMemo } from 'react';
import type { ElementType } from 'react';

type BlurTextProps = {
  as?: ElementType; // BARU: Untuk mengubah tag (h2, p, dll)
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  // Props IntersectionObserver tidak lagi dibutuhkan karena kita pakai Framer Motion
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k] as string | number)];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  as: Component = 'p', // Default tag adalah <p>
  text = '',
  delay = 20,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -20 } // Mengurangi jarak y
        : { filter: 'blur(10px)', opacity: 0, y: 20 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 2 : -2,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);
  const stepCount = defaultTo.length + 1;
  const totalDuration = 0.35 * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );
  
  // Menggunakan varian Framer Motion untuk kontrol yang lebih baik
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: delay / 1000, // Staggering antar anak
      },
    },
    hidden: {},
  };

  const childVariants = {
    hidden: defaultFrom,
    visible: animateKeyframes,
  };

  return (
    <Component
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        // DIUBAH: Animasi sekarang berulang
        viewport={{ once: false, amount: 0.3 }} 
        variants={containerVariants}
        aria-label={text}
      >
        {elements.map((segment, index) => {
          const spanTransition: Transition = {
            duration: totalDuration,
            times,
            ease: "easeInOut"
          };

          return (
            <motion.span
              key={index}
              variants={childVariants}
              transition={spanTransition}
              style={{
                display: 'inline-block',
                willChange: 'transform, filter, opacity',
              }}
              aria-hidden="true"
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
};

export default BlurText;
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './EducationTimeline.module.css';
import BlurText from '../../effects/BlurText/BlurText';

const educationData = [
  {
    id: 1,
    level: 'elementary school',
    school: 'SD Muhammadiyah 09 Plus',
    year: '2010 - 2016',
    description: 'The early period of forming the foundation of knowledge and character.',
  },
  {
    id: 2,
    level: 'junior high school',
    school: 'SMPIT Ar-Rudho',
    year: '2016 - 2019',
    description: 'Start studying various subjects and be active in extracurricular activities.',
  },
  {
    id: 3,
    level: 'senior high school',
    school: 'Pondok Pesantren Tahfizh Daarul Quran, Tangerang',
    year: '2019 - 2023',
    description: 'Focus on science majors and start to learn the basics of programming logic.',
  },
  {
    id: 4,
    level: 'college',
    school: 'Telkom University, Bandung',
    year: '2023 - Now',
    description: 'Majored in Telecommunication Engineering and started to explore modern web development.',
  },
];

type EducationItem = typeof educationData[0];

const getItemVariants = (isLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: isLeft ? -100 : 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
});

const TimelineItem: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const isLeft = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className={`${styles.timelineItem} ${isInView ? styles.isVisible : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={getItemVariants(isLeft)}
    >
      <div className={`${styles.timelineContent} ${isLeft ? styles.left : styles.right}`}>
        <span className={styles.level}>{item.level}</span>
        <h3 className={styles.school}>{item.school}</h3>
        <span className={styles.year}>{item.year}</span>
        <BlurText className={styles.description} text={item.description} delay={10} />
      </div>
    </motion.div>
  );
};

const EducationTimeline: React.FC = () => {
  return (
    <section id="education" className={styles.educationSection}>
      <div className="container">
        <BlurText as="h2" className={styles.sectionHeading} text="My Education Journey" delay={25} />
        <div className={styles.timelineContainer}>
          {educationData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;

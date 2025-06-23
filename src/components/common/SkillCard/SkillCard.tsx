// src/components/common/SkillCard/SkillCard.tsx (Versi Tinggi Tetap)
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../pages/Home/Home.module.css';

type Skill = {
  name: string;
  icon: ReactNode;
  level: number;
  category: string;
  color: string;
  textColor?: string;
  details?: {
    experience?: string;
    projects?: string;
    focus?: string;
  };
};

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Logika tinggi dinamis dihapus dari sini
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // Properti 'animate' untuk height dihapus dari sini
    <motion.div
      layout
      className={styles.skillCard}
      onClick={handleCardClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.25)" }}
    >
      <motion.div
        className={styles.skillCardInner}
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Hanya menganimasikan putaran
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* --- Bagian DEPAN Kartu --- */}
        <div className={styles.skillCardFront}>
          <div className={styles.skillIcon} style={{ color: skill.color }}>{skill.icon}</div>
          <div className={styles.skillInfo}>
            <span className={styles.skillName}>{skill.name}</span>
            <div className={styles.progressBarContainer}>
              <motion.div
                className={styles.progressBar}
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span style={{ color: skill.textColor || '#fff' }}>{skill.level}%</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Bagian BELAKANG Kartu --- */}
        <div className={styles.skillCardBack}>
          <h3 className={styles.skillCardBackTitle} style={{ color: skill.color }}>{skill.name}</h3>
          <ul className={styles.skillDetailsList}>
            {skill.details?.experience && <li><strong>Pengalaman:</strong> {skill.details.experience}</li>}
            {skill.details?.projects && <li><strong>Proyek:</strong> {skill.details.projects}</li>}
            {skill.details?.focus && <li><strong>Fokus:</strong> {skill.details.focus}</li>}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;
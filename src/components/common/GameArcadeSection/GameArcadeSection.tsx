// src/components/common/GameArcadeSection/GameArcadeSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GameArcadeSection.module.css';

const GameArcadeSection: React.FC = () => {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h2>Feeling Bored?</h2>
        <p>Take a break and play some simple games I've built. A fun way to see some interactive coding in action.</p>
        <Link to="/games" className={styles.ctaButton}>
          Enter The Arcade
        </Link>
      </div>
    </div>
  );
};

export default GameArcadeSection;
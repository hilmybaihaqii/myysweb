import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import styles from './GamePage.module.css';

// Impor semua komponen game
import MemoryGame from '../../components/common/MemoryGame/MemoryGame';
import BugSquashGame from '../../components/common/BugSquashGame/BugSquashGame';
import TerminalGame from '../../components/common/TerminalGame/TerminalGame';

import memoryPreview from '../../assets/images/brain.png';
import bugPreview from '../../assets/images/bug.png';
import terminalPreview from '../../assets/images/terminal.png';

// Impor ikon
import { FaMemory, FaBug, FaTerminal } from 'react-icons/fa';

type Game = 'memory' | 'bugsquash' | 'terminal';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 100 
    } 
  },
};

const GamePage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'memory':
        return <MemoryGame />;
      case 'bugsquash':
        return <BugSquashGame />;
      case 'terminal':
        return <TerminalGame />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        {activeGame ? (
          // TAMPILAN SAAT GAME AKTIF
          <motion.div 
            className={styles.gameActiveContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {renderGame()}
            <div className={styles.gameFooter}>
              <button onClick={() => setActiveGame(null)} className={styles.backButton}>
                &larr; Choose Another Game
              </button>
            </div>
          </motion.div>
        ) : (
          // TAMPILAN PEMILIHAN GAME
          <div className={styles.selectionContainer}>
            <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              Game Arcade
            </motion.h1>
            <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              Take a break and test your skills.
            </motion.p>
            <motion.div
              className={styles.gameList}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Kartu Game 1: Memory Game */}
              <motion.div className={styles.gameCard} variants={cardVariants}>
                <div className={styles.cardTitle}><FaMemory /> <h2>Tech Memory Game</h2></div>
                <img src={memoryPreview} alt="Memory Game Preview" className={styles.gamePreviewImage} />
                <p>Test your memory by matching pairs of technology icons.</p>
                <div className={styles.instructions}>
                  <strong>How to Play:</strong> Click two cards to find a matching pair. Find all pairs to win.
                </div>
                <button onClick={() => setActiveGame('memory')}>Play Now</button>
              </motion.div>

              {/* Kartu Game 2: Squash-A-Bug */}
              <motion.div className={styles.gameCard} variants={cardVariants}>
                <div className={styles.cardTitle}><FaBug /> <h2>Squash-A-Bug!</h2></div>
                <img src={bugPreview} alt="Bug Squash Game Preview" className={styles.gamePreviewImage} />
                <p>A fast-paced clicking game. How many bugs can you fix in 30 seconds?</p>
                 <div className={styles.instructions}>
                  <strong>How to Play:</strong> Click the bugs as they appear. Be quick, they disappear!
                </div>
                <button onClick={() => setActiveGame('bugsquash')}>Play Now</button>
              </motion.div>

              {/* Kartu Game 3: Terminal Quest */}
              <motion.div className={styles.gameCard} variants={cardVariants}>
                <div className={styles.cardTitle}>
                  <FaTerminal />
                  <h2><span className={styles.glitch} data-text="Terminal Quest">Terminal Quest</span></h2>
                </div>
                <img src={terminalPreview} alt="Terminal Game Preview" className={styles.gamePreviewImage} />
                <p>An interactive text adventure. Explore a server and uncover its secrets.</p>
                 <div className={styles.instructions}>
                  <strong>How to Play:</strong> Use commands like `ls`, `cd`, and `cat` to navigate and read files.
                </div>
                <button onClick={() => setActiveGame('terminal')}>Play Now</button>
              </motion.div>
            </motion.div>
             <Link to="/" className={styles.backToHome}>&larr; Back to Main Portfolio</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
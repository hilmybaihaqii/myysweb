import React, { useState, useEffect, useCallback } from 'react';
import Bug from './Bug';
import styles from './Bug SquashGame.module.css';

type GameState = 'idle' | 'playing' | 'finished';

// Konfigurasi Game
const BUG_COLORS = ['#ff4136', '#ff851b', '#f012be', '#0074d9', '#7fdbff', '#2ecc40', '#b10dc9'];
const BUG_LIFESPAN = 2500; // Bug akan hilang setelah 2.5 detik
const BUG_SPAWN_RATE = 800; // Bug baru muncul setiap 0.8 detik
const GAME_DURATION = 30; // Durasi permainan 30 detik

const BugSquashGame: React.FC = () => {
  const [bugs, setBugs] = useState<{ id: number; top: string; left: string; color: string; spawnTime: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<GameState>('idle');

  const startGame = () => {
    setBugs([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  };

  const spawnBug = useCallback(() => {
    if (gameState !== 'playing') return;
    const newBug = {
      id: Date.now(),
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      color: BUG_COLORS[Math.floor(Math.random() * BUG_COLORS.length)],
      spawnTime: Date.now(),
    };
    setBugs((currentBugs) => [...currentBugs, newBug]);
  }, [gameState]);

  const squashBug = (id: number) => {
    setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));
    setScore((currentScore) => currentScore + 1);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t > 1) return t - 1;
        setGameState('finished');
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const spawner = setInterval(spawnBug, BUG_SPAWN_RATE);
    return () => clearInterval(spawner);
  }, [gameState, spawnBug]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cleaner = setInterval(() => {
      const now = Date.now();
      setBugs(currentBugs => currentBugs.filter(bug => now - bug.spawnTime < BUG_LIFESPAN));
    }, 500);
    return () => clearInterval(cleaner);
  }, [gameState]);

  const renderGameState = () => {
    switch (gameState) {
      case 'finished':
        return (
          <div className={styles.overlay}>
            <h2>Time's Up!</h2>
            <p>Your Final Score: {score}</p>
            <button onClick={startGame}>Play Again</button>
          </div>
        );
      case 'playing':
        return bugs.map((bug) => (
          <Bug key={bug.id} {...bug} onSquash={squashBug} />
        ));
      default: // 'idle'
        return (
          <div className={styles.overlay}>
            <h2>Squash-A-Bug!</h2>
            <p>Click as many bugs as you can in {GAME_DURATION} seconds.</p>
            <button onClick={startGame}>Start Game</button>
          </div>
        );
    }
  };

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.uiPanel}>
        <span>Score: <strong>{score}</strong></span>
        <span>Time Left: <strong>{timeLeft}s</strong></span>
      </div>
      <div className={styles.gameBoard}>
        {renderGameState()}
      </div>
    </div>
  );
};

export default BugSquashGame;
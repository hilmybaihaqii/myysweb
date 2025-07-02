import React, { useState, useEffect, useCallback, useRef } from 'react';
import Bug from './Bug';
import styles from './BugSquashGame.module.css';

// Tipe data baru untuk state bug
type BugType = {
  id: number;
  top: string;
  left: string;
  color: string;
  isSquashed: boolean;
};

type GameState = 'idle' | 'playing' | 'finished';

// Konfigurasi Game
const BUG_COLORS = ['#ff4136', '#ff851b', '#f012be', '#0074d9', '#7fdbff', '#2ecc40', '#b10dc9'];
const BUG_LIFESPAN = 1100;
const BUG_SPAWN_RATE = 600;
const GAME_DURATION = 30;

const BugSquashGame: React.FC = () => {
  const [bugs, setBugs] = useState<BugType[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<GameState>('idle');

  const gameTimerRef = useRef<number | null>(null);
  const spawnerRef = useRef<number | null>(null);

  const removeBug = useCallback((id: number) => {
    setBugs(currentBugs => currentBugs.filter(bug => bug.id !== id));
  }, []);

  const spawnBug = useCallback(() => {
    const newBug: BugType = {
      id: Date.now(),
      top: `${Math.random() * 92}%`,
      left: `${Math.random() * 92}%`,
      color: BUG_COLORS[Math.floor(Math.random() * BUG_COLORS.length)],
      isSquashed: false, // Nilai awal saat bug baru muncul
    };
    setBugs(currentBugs => [...currentBugs, newBug]);

    // Jadwalkan bug hilang jika tidak di-klik
    setTimeout(() => {
      removeBug(newBug.id);
    }, BUG_LIFESPAN);
  }, [removeBug]);

  const squashBug = (id: number) => {
    // 1. Tandai bug sebagai 'squashed'
    setBugs(currentBugs =>
      currentBugs.map(bug =>
        bug.id === id ? { ...bug, isSquashed: true } : bug
      )
    );

    // 2. Tambah skor
    setScore(currentScore => currentScore + 1);

    // 3. Hapus bug dari state setelah animasi selesai
    setTimeout(() => {
      removeBug(id);
    }, 300); // Sesuaikan dengan durasi transisi di CSS
  };

  const cleanup = () => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (spawnerRef.current) clearInterval(spawnerRef.current);
  };

  const startGame = () => {
    cleanup();
    setBugs([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);

      spawnerRef.current = window.setInterval(spawnBug, BUG_SPAWN_RATE);
    } else {
      cleanup();
    }

    return cleanup;
  }, [gameState, spawnBug]);

  useEffect(() => {
    if (timeLeft <= 0 && gameState === 'playing') {
      setTimeLeft(0);
      setGameState('finished');
    }
  }, [timeLeft, gameState]);

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
        return bugs.map(bug => (
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
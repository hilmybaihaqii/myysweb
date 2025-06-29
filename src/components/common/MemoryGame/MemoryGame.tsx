import React, { useState, useEffect } from 'react';
import Card from './Card';
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiCss3 } from 'react-icons/si';
import styles from './MemoryGame.module.css';

interface CardType {
  id: number;
  symbol: React.ReactElement;
  name: string;
}

// Definisikan ikon yang akan dipakai
const ICONS: Omit<CardType, 'id'>[] = [
  { symbol: <FaReact />, name: 'react' },
  { symbol: <FaNodeJs />, name: 'node' },
  { symbol: <FaFigma />, name: 'figma' },
  { symbol: <SiTypescript />, name: 'ts' },
  { symbol: <SiJavascript />, name: 'js' },
  { symbol: <SiCss3 />, name: 'css' },
];

// PERBAIKAN 2: Buat fungsi shuffle yang type-safe menggunakan generics
const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const MemoryGame: React.FC = () => {
  // PERBAIKAN 3: Gunakan tipe CardType[] untuk state, bukan any[]
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  // Inisialisasi permainan
  const setupGame = () => {
    // Duplikasi dan acak ikon untuk membuat pasangan kartu
    const gameCards: CardType[] = shuffleArray([...ICONS, ...ICONS]).map((icon, index) => ({
      ...icon,
      id: index,
    }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };
  
  // Setup game saat komponen pertama kali dimuat
  useEffect(() => {
    setupGame();
  }, []);

  const handleCardClick = (clickedCardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(clickedCardId)) return;

    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const card1 = cards[newFlippedCards[0]];
      const card2 = cards[newFlippedCards[1]];
      
      if (card1.name === card2.name) {
        setMatchedCards([...matchedCards, card1.name]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <h3>Tech Memory Game</h3>
        <div className={styles.gameStats}>
            <span>Moves: {moves}</span>
            <button onClick={setupGame}>Reset Game</button>
        </div>
      </div>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            icon={card.symbol}
            isFlipped={flippedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.name)}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {matchedCards.length === ICONS.length && (
          <div className={styles.winMessage}>You Win!</div>
      )}
    </div>
  );
};

export default MemoryGame;
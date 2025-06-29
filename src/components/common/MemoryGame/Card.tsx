// src/components/common/MemoryGame/Card.tsx
import React from 'react';
import './Card.css'; // Kita akan buat styling-nya nanti

interface CardProps {
  id: number;
  icon: React.ReactElement;
  isFlipped: boolean;
  isMatched: boolean;
  handleCardClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, icon, isFlipped, isMatched, handleCardClick }) => {
  const handleClick = () => {
    // Jangan biarkan kartu diklik jika sudah terbuka atau sudah cocok
    if (!isFlipped && !isMatched) {
      handleCardClick(id);
    }
  };

  return (
    <div 
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} 
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          {icon}
        </div>
        <div className="card-back">
          ?
        </div>
      </div>
    </div>
  );
};

export default Card;
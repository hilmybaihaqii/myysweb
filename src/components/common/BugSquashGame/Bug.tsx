import React from 'react';
import { FaBug } from 'react-icons/fa';
import './Bug.css';

interface BugProps {
  id: number;
  top: string;
  left: string;
  color: string;
  isSquashed: boolean; // <-- Tambahkan properti baru
  onSquash: (id: number) => void;
}

const Bug: React.FC<BugProps> = ({ id, top, left, color, isSquashed, onSquash }) => {
  const handleClick = () => {
    // Jangan biarkan bug di-klik lagi jika sudah gepeng
    if (!isSquashed) {
      onSquash(id);
    }
  };

  // Tambahkan class 'squashed' jika isSquashed adalah true
  const bugClassName = `bug ${isSquashed ? 'squashed' : ''}`;

  return (
    <div className={bugClassName} style={{ top, left, color: color }} onClick={handleClick}>
      <FaBug />
    </div>
  );
};

export default Bug;
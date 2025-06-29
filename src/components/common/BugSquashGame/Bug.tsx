import React from 'react';
import { FaBug } from 'react-icons/fa';
import './Bug.css';

interface BugProps {
  id: number;
  top: string;
  left: string;
  color: string;
  onSquash: (id: number) => void;
}

const Bug: React.FC<BugProps> = ({ id, top, left, color, onSquash }) => {
  const handleClick = () => {
    onSquash(id);
  };

  return (
    <div className="bug" style={{ top, left, color: color }} onClick={handleClick}>
      <FaBug />
    </div>
  );
};

export default Bug;
import React from 'react';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, winningLine, disabled }) => {
  const renderCell = (index: number) => {
    const value = board[index];
    const isWinning = winningLine?.includes(index);
    
    return (
      <button
        key={index}
        onClick={() => onCellClick(index)}
        disabled={disabled || value !== null}
        className={cn(
          "aspect-square bg-game-cell border-2 border-border rounded-lg",
          "hover:bg-game-cell-hover hover:border-primary/50",
          "transition-all duration-200 ease-in-out",
          "flex items-center justify-center text-4xl font-bold",
          "shadow-cell hover:shadow-glow",
          "disabled:cursor-not-allowed",
          !value && !disabled && "hover:scale-105",
          isWinning && "animate-winning-pulse border-winning-glow",
          value === 'X' && "text-player-x",
          value === 'O' && "text-player-o"
        )}
      >
        {value && (
          <span className="animate-slide-in">
            {value}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-game-board rounded-xl shadow-cell">
      {Array.from({ length: 9 }, (_, index) => renderCell(index))}
    </div>
  );
};

export default GameBoard;
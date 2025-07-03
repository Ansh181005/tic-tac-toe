import { useState, useCallback, useEffect } from 'react';

type Player = 'X' | 'O';
type GameMode = 'pvp' | 'ai';
type Board = (Player | null)[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  winningLine: number[] | null;
  gameMode: GameMode;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const checkWinner = (board: Board): { winner: Player | null; winningLine: number[] | null } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: combination };
    }
  }
  return { winner: null, winningLine: null };
};

const checkDraw = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

const getAIMove = (board: Board, difficulty: 'easy' | 'hard' = 'hard'): number => {
  if (difficulty === 'hard') {
    return minimax(board, 'O').index;
  } else {
    // Easy AI - random available move
    const availableMoves = board.map((cell, index) => cell === null ? index : null)
                               .filter(val => val !== null) as number[];
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
};

const minimax = (board: Board, player: Player): { score: number; index: number } => {
  const availableMoves = board.map((cell, index) => cell === null ? index : null)
                            .filter(val => val !== null) as number[];

  const { winner } = checkWinner(board);
  if (winner === 'O') return { score: 10, index: -1 };
  if (winner === 'X') return { score: -10, index: -1 };
  if (availableMoves.length === 0) return { score: 0, index: -1 };

  const moves: { score: number; index: number }[] = [];

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = player;

    const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
    moves.push({
      score: result.score,
      index: move
    });
  }

  if (player === 'O') {
    return moves.reduce((best, move) => move.score > best.score ? move : best);
  } else {
    return moves.reduce((best, move) => move.score < best.score ? move : best);
  }
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    winningLine: null,
    gameMode: 'pvp',
    scores: { X: 0, O: 0, draws: 0 }
  });

  const makeMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);

    setGameState(prev => {
      const newScores = { ...prev.scores };
      if (winner) {
        newScores[winner]++;
      } else if (isDraw) {
        newScores.draws++;
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        winningLine,
        scores: newScores
      };
    });
  }, [gameState.board, gameState.currentPlayer, gameState.winner, gameState.isDraw]);

  // AI move effect
  useEffect(() => {
    if (gameState.gameMode === 'ai' && 
        gameState.currentPlayer === 'O' && 
        !gameState.winner && 
        !gameState.isDraw) {
      
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState.board);
        makeMove(aiMove);
      }, 500); // Slight delay for better UX

      return () => clearTimeout(timer);
    }
  }, [gameState.gameMode, gameState.currentPlayer, gameState.winner, gameState.isDraw, gameState.board, makeMove]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null
    }));
  }, []);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null
    }));
  }, []);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  }, []);

  const gameInProgress = gameState.board.some(cell => cell !== null) && !gameState.winner && !gameState.isDraw;

  return {
    ...gameState,
    makeMove,
    resetGame,
    changeGameMode,
    resetScores,
    gameInProgress
  };
};
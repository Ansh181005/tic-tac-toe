import React from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameBoard from './game/GameBoard';
import GameStats from './game/GameStats';
import GameControls from './game/GameControls';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';

const TicTacToe: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    winningLine,
    gameMode,
    scores,
    makeMove,
    resetGame,
    changeGameMode,
    resetScores,
    gameInProgress
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-muted-foreground">
            Challenge yourself against AI or play with a friend!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Game Stats - Left Column */}
          <div className="lg:order-1 space-y-4">
            <GameStats
              currentPlayer={currentPlayer}
              scores={scores}
              gameMode={gameMode}
              winner={winner}
              isDraw={isDraw}
            />
            
            {(winner || isDraw) && (
              <div className="text-center space-y-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                <div className="flex justify-center">
                  <Trophy className="w-8 h-8 text-winning-glow animate-pulse" />
                </div>
                <Button
                  onClick={resetGame}
                  variant="gaming"
                  className="w-full"
                >
                  Play Again
                </Button>
              </div>
            )}
          </div>

          {/* Game Board - Center Column */}
          <div className="lg:order-2 flex justify-center">
            <GameBoard
              board={board}
              onCellClick={makeMove}
              winningLine={winningLine}
              disabled={gameMode === 'ai' && currentPlayer === 'O'}
            />
          </div>

          {/* Game Controls - Right Column */}
          <div className="lg:order-3 space-y-4">
            <GameControls
              onReset={resetGame}
              onModeChange={changeGameMode}
              gameMode={gameMode}
              gameInProgress={gameInProgress}
            />
            
            <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <h3 className="text-sm font-semibold mb-2 text-center">Reset Scores</h3>
              <Button
                onClick={resetScores}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All Scores
              </Button>
            </div>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Get three in a row to win! Choose your game mode and start playing.</p>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
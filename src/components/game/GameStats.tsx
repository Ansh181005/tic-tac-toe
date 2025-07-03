import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameStatsProps {
  currentPlayer: 'X' | 'O';
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  gameMode: 'pvp' | 'ai';
  winner: string | null;
  isDraw: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  currentPlayer, 
  scores, 
  gameMode, 
  winner,
  isDraw 
}) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
          Game Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Current Turn</p>
          {!winner && !isDraw ? (
            <Badge 
              variant="outline" 
              className={`text-lg px-4 py-2 animate-pulse-glow ${
                currentPlayer === 'X' 
                  ? 'border-player-x text-player-x' 
                  : 'border-player-o text-player-o'
              }`}
            >
              Player {currentPlayer}
            </Badge>
          ) : winner ? (
            <Badge 
              variant="outline" 
              className="text-lg px-4 py-2 border-winning-glow text-winning-glow animate-winning-pulse"
            >
              {winner} Wins!
            </Badge>
          ) : (
            <Badge variant="outline" className="text-lg px-4 py-2 border-muted-foreground text-muted-foreground">
              Draw!
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-player-x font-semibold">Player X:</span>
            <Badge variant="secondary">{scores.X}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-player-o font-semibold">
              Player O {gameMode === 'ai' && '(AI)'}:
            </span>
            <Badge variant="secondary">{scores.O}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Draws:</span>
            <Badge variant="outline">{scores.draws}</Badge>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Mode: {gameMode === 'pvp' ? 'Player vs Player' : 'Player vs AI'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
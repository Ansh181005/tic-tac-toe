import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Users, Bot } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onModeChange: (mode: 'pvp' | 'ai') => void;
  gameMode: 'pvp' | 'ai';
  gameInProgress: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onReset, 
  onModeChange, 
  gameMode,
  gameInProgress 
}) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <Button
            variant={gameMode === 'pvp' ? 'default' : 'outline'}
            onClick={() => onModeChange('pvp')}
            className="flex-1 gap-2"
            disabled={gameInProgress}
          >
            <Users className="w-4 h-4" />
            PvP
          </Button>
          <Button
            variant={gameMode === 'ai' ? 'default' : 'outline'}
            onClick={() => onModeChange('ai')}
            className="flex-1 gap-2"
            disabled={gameInProgress}
          >
            <Bot className="w-4 h-4" />
            vs AI
          </Button>
        </div>
        
        <Button
          variant="secondary"
          onClick={onReset}
          className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameControls;
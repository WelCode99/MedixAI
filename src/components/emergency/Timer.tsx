import React, { useState, useEffect } from 'react';
import { TimerConfig } from '../../types/emergency';
import { cn } from '../../lib/utils';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  config: TimerConfig;
  onComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ config, onComplete }) => {
  const [time, setTime] = useState(config.duration || 0);
  const [isRunning, setIsRunning] = useState(true);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => {
          if (config.type === 'countdown' && prev <= 0) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }

          if (config.type === 'interval' && prev <= 0) {
            setCycles(c => c + 1);
            if (config.sound) {
              playAlertSound();
            }
            return config.interval || 0;
          }

          return config.type === 'countdown' ? prev - 1 : prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, config, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playAlertSound = () => {
    const audio = new Audio('/alert.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setTime(config.duration || 0);
    setCycles(0);
    setIsRunning(false);
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg",
      config.type === 'interval' 
        ? time <= 30 
          ? "bg-red-50" 
          : "bg-blue-50" 
        : "bg-gray-50"
    )}>
      <div className="flex items-center space-x-3">
        <TimerIcon className="w-5 h-5 text-gray-600" />
        <div>
          <div className={cn(
            "text-2xl font-mono font-bold",
            time <= 30 && "text-red-600 animate-pulse"
          )}>
            {formatTime(time)}
          </div>
          {config.type === 'interval' && (
            <div className="text-sm text-gray-600">
              Ciclos: {cycles}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
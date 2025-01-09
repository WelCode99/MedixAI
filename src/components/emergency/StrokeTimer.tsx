import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StrokeTimerProps {
  startTime: Date;
  thresholds: {
    thrombolysis: number;
    thrombectomy: number;
  };
}

export const StrokeTimer: React.FC<StrokeTimerProps> = ({
  startTime,
  thresholds
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const getTimeStatus = () => {
    if (elapsedTime <= thresholds.thrombolysis) return 'success';
    if (elapsedTime <= thresholds.thrombectomy) return 'warning';
    return 'danger';
  };

  return (
    <div className={cn(
      "flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium",
      {
        'bg-green-100 text-green-800': getTimeStatus() === 'success',
        'bg-yellow-100 text-yellow-800': getTimeStatus() === 'warning',
        'bg-red-100 text-red-800': getTimeStatus() === 'danger'
      }
    )}>
      <Timer className="w-4 h-4" />
      <span>{elapsedTime} min desde início</span>
    </div>
  );
};
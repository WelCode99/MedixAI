import React from 'react';
import { EmergencyProtocol } from '../../types/emergency';
import { Timer, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProtocolHeaderProps {
  protocol: EmergencyProtocol;
  elapsedTime: number;
}

export const ProtocolHeader: React.FC<ProtocolHeaderProps> = ({
  protocol,
  elapsedTime
}) => {
  return (
    <div className={cn(
      "bg-gradient-to-r p-6 rounded-lg shadow-lg text-white dark:text-white",
      protocol.type === 'acls' && "from-red-600/90 to-red-700/90 dark:from-red-900 dark:to-red-800",
      protocol.type === 'sepsis' && "from-orange-600/90 to-orange-700/90 dark:from-orange-900 dark:to-orange-800",
      protocol.type === 'stroke' && "from-purple-600/90 to-purple-700/90 dark:from-purple-900 dark:to-purple-800"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">{protocol.title}</h1>
            <div className="flex items-center space-x-2 mt-1 text-sm text-white/90 dark:text-white/90">
              <BookOpen className="w-4 h-4" />
              <span>{protocol.source}, {protocol.version}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5" />
          <span className="font-mono">{elapsedTime}s</span>
        </div>
      </div>
      <p className="text-sm text-white/90 dark:text-white/90 mt-2">{protocol.description}</p>
    </div>
  );
};
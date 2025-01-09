import React from 'react';
import { Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  view,
  onViewChange,
  className
}) => {
  return (
    <div className={cn(
      "flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1",
      className
    )}>
      <button
        onClick={() => onViewChange('grid')}
        className={cn(
          "p-2 rounded-md transition-colors",
          view === 'grid'
            ? "bg-white dark:bg-gray-600 shadow-sm"
            : "hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
        aria-label="Grid view"
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={cn(
          "p-2 rounded-md transition-colors",
          view === 'list'
            ? "bg-white dark:bg-gray-600 shadow-sm"
            : "hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};
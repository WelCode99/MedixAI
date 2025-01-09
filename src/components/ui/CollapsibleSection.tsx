import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("bg-accent/5 rounded-lg shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-accent/10 transition-colors"
      >
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-foreground/80 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
};
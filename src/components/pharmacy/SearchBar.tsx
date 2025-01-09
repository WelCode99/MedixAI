import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  className
}) => {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-2 rounded-lg",
          "border border-gray-200 dark:border-gray-700",
          "bg-white dark:bg-gray-800",
          "focus:ring-2 focus:ring-primary focus:border-transparent",
          "placeholder-gray-400 dark:placeholder-gray-500"
        )}
      />
    </div>
  );
};
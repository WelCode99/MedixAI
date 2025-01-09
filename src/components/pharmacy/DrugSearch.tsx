import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Drug } from '../../types/pharmacy/drug';
import { cn } from '../../lib/utils';

interface DrugSearchProps {
  onSearch: (query: string) => void;
  suggestions: Drug[];
  className?: string;
}

export const DrugSearch: React.FC<DrugSearchProps> = ({
  onSearch,
  suggestions,
  className
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Buscar por nome, classe ou indicação..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {suggestions.map((drug) => (
            <button
              key={drug.id}
              onClick={() => {
                handleSearch(drug.genericName);
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-gray-900">{drug.genericName}</div>
                <div className="text-sm text-gray-500">
                  {drug.categories.join(', ')}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {drug.categories.map(category => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
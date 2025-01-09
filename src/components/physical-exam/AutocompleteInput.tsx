import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface AutocompleteInputProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  suggestions,
  value,
  onChange,
  placeholder,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm",
          "focus:ring-2 focus:ring-primary focus:border-transparent",
          className
        )}
      />
      {isOpen && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(suggestion);
                setIsOpen(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
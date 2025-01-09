import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../lib/utils';

interface SearchResult {
  id: string;
  type: 'protocol' | 'guideline' | 'calculator' | 'specialty';
  title: string;
  path: string;
}

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock search function - replace with actual implementation
  const searchContent = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Mock results - replace with actual API call
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'protocol',
        title: 'Protocolo de Hipertensão',
        path: '/chat/cardiology/protocols/1'
      },
      {
        id: '2',
        type: 'calculator',
        title: 'Calculadora de Risco Cardiovascular',
        path: '/chat/cardiology/calculators/2'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
  }, 300);

  useEffect(() => {
    searchContent(query);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setQuery('');
    setIsOpen(false);
    setRecentSearches(prev => {
      const newSearches = [result.title, ...prev.filter(s => s !== result.title)].slice(0, 3);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Pesquisar em todas as especialidades, protocolos e diretrizes..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {query === '' && recentSearches.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Pesquisas Recentes</h3>
              <ul className="space-y-2">
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setQuery(search)}
                      className="text-sm text-gray-700 hover:text-primary"
                    >
                      {search}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50"
                  >
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {result.type}
                    </span>
                    <span className="flex-1 text-sm text-gray-700 text-left">
                      {result.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query && (
            <div className="p-4 text-sm text-gray-500 text-center">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
};
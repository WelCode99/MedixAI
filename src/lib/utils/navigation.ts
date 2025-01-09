import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_HISTORY_LENGTH = 10;
const STORAGE_KEY = 'navigationHistory';

interface HistoryEntry {
  path: string;
  title: string;
  timestamp: number;
}

export function useNavigationHistory() {
  const location = useLocation();
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const newEntry: HistoryEntry = {
      path: location.pathname,
      title: getPageTitle(location.pathname),
      timestamp: Date.now()
    };

    setHistory(prev => {
      const filtered = prev.filter(entry => entry.path !== location.pathname);
      const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY_LENGTH);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [location]);

  return history;
}

function getPageTitle(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return 'Home';
  
  const lastSegment = segments[segments.length - 1];
  return lastSegment.charAt(0).toUpperCase() + 
         lastSegment.slice(1).replace(/-/g, ' ');
}
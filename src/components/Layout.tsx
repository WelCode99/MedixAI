import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { BreadcrumbNav } from './navigation/BreadcrumbNav';
import { ProgressBar } from './ui/ProgressBar';

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoading = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar isLoading={isLoading} />
      <header className="bg-accent shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">MedChat</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbNav />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-200">
        {children}
      </main>
    </div>
  );
};
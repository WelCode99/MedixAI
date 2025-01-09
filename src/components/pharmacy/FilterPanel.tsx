import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const categories = [
    'Antibióticos',
    'Analgésicos',
    'Anti-hipertensivos',
    'Antiarrítmicos',
    'Anticoagulantes',
    'Antieméticos',
    'Broncodilatadores',
    'Corticosteroides'
  ];

  const populations = [
    'Adulto',
    'Pediátrico',
    'Geriátrico',
    'Gestante',
    'Lactante'
  ];

  const conditions = [
    'Ajuste Renal',
    'Ajuste Hepático',
    'Alto Risco',
    'Monitorização Especial'
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 p-4 rounded-lg",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      className
    )}>
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h3 className="font-semibold">Filtros</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Categorias
          </h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            População
          </h4>
          <div className="space-y-2">
            {populations.map(population => (
              <label key={population} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {population}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Condições Especiais
          </h4>
          <div className="space-y-2">
            {conditions.map(condition => (
              <label key={condition} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {condition}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
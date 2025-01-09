import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Medication } from '../../types/medication';
import { cn } from '../../lib/utils';

interface MedicationCardProps {
  medication: Medication;
  className?: string;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        "transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {medication.genericName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {medication.brandNames.join(', ')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {medication.clinicalData.adverseEffects.severe.length > 0 && (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            {medication.category.primary}
          </span>
          {medication.category.secondary?.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
            >
              {cat}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-slideDown">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Mecanismo de Ação
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {medication.clinicalData.mechanismOfAction}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Indicações
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {medication.clinicalData.indications.map((indication, index) => (
                  <li key={index}>{indication}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Efeitos Adversos Comuns
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                  {medication.clinicalData.adverseEffects.common.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>

              {medication.clinicalData.adverseEffects.severe.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Efeitos Adversos Graves</span>
                  </h4>
                  <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                    {medication.clinicalData.adverseEffects.severe.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Monitorização
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {medication.monitoring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Ver detalhes completos →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
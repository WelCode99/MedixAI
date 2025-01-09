import React from 'react';
import { Drug } from '../../types/pharmacy/drug';
import { cn } from '../../lib/utils';
import { Pill, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface DrugCardProps {
  drug: Drug;
  className?: string;
  onSelect?: (drug: Drug) => void;
}

export const DrugCard: React.FC<DrugCardProps> = ({
  drug,
  className,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const hasSevereWarnings = drug.adverseEffects.severe.length > 0;

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{drug.genericName}</h3>
            <p className="text-sm text-gray-500">{drug.brandNames.join(', ')}</p>
          </div>
          <div className="flex items-center space-x-2">
            {hasSevereWarnings && (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full"
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
          {drug.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
            >
              {category}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-slideDown">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Mecanismo de Ação
              </h4>
              <p className="text-sm text-gray-600">
                {drug.mechanismOfAction}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Indicações Principais
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {drug.indications.primary.map((indication, index) => (
                  <li key={index}>{indication}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Efeitos Adversos Comuns
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {drug.adverseEffects.common.map((effect, index) => (
                    <li key={index}>{effect.effect}</li>
                  ))}
                </ul>
              </div>

              {drug.adverseEffects.severe.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Efeitos Adversos Graves</span>
                  </h4>
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {drug.adverseEffects.severe.map((effect, index) => (
                      <li key={index}>{effect.effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Monitorização
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {drug.monitoring.parameters.map((param, index) => (
                  <li key={index}>{param}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t flex justify-between items-center">
              <button
                onClick={() => onSelect?.(drug)}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Ver detalhes completos →
              </button>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Atualizado: {drug.lastUpdated.toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
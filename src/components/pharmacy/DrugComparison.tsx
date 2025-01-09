import React from 'react';
import { Drug } from '../../types/pharmacy/drug';
import { cn } from '../../lib/utils';
import { AlertTriangle, Check, X } from 'lucide-react';

interface DrugComparisonProps {
  drugs: Drug[];
  onClose: () => void;
  className?: string;
}

export const DrugComparison: React.FC<DrugComparisonProps> = ({
  drugs,
  onClose,
  className
}) => {
  if (drugs.length === 0) return null;

  return (
    <div className={cn("bg-white rounded-lg shadow-lg border", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Comparação de Medicamentos</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-500">
                Característica
              </th>
              {drugs.map(drug => (
                <th key={drug.id} className="p-4 text-left text-sm font-medium text-gray-500">
                  {drug.genericName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-4 text-sm font-medium text-gray-500">
                Mecanismo de Ação
              </td>
              {drugs.map(drug => (
                <td key={drug.id} className="p-4 text-sm text-gray-900">
                  {drug.mechanismOfAction}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-medium text-gray-500">
                Indicações Principais
              </td>
              {drugs.map(drug => (
                <td key={drug.id} className="p-4 text-sm text-gray-900">
                  <ul className="list-disc list-inside">
                    {drug.indications.primary.map((indication, idx) => (
                      <li key={idx}>{indication}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-medium text-gray-500">
                Efeitos Adversos Graves
              </td>
              {drugs.map(drug => (
                <td key={drug.id} className="p-4">
                  {drug.adverseEffects.severe.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {drug.adverseEffects.severe.map((effect, idx) => (
                        <li key={idx}>{effect.effect}</li>
                      ))}
                    </ul>
                  ) : (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-medium text-gray-500">
                Custo Diário
              </td>
              {drugs.map(drug => (
                <td key={drug.id} className="p-4 text-sm text-gray-900">
                  {drug.costEffectiveness?.dailyCost 
                    ? `R$ ${drug.costEffectiveness.dailyCost.toFixed(2)}`
                    : 'Não disponível'
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
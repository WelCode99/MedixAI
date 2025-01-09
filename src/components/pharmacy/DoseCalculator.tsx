import React, { useState } from 'react';
import { Drug, DrugDosage } from '../../types/pharmacy/drug';
import { cn } from '../../lib/utils';
import { Calculator } from 'lucide-react';

interface DoseCalculatorProps {
  drug: Drug;
  className?: string;
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({
  drug,
  className
}) => {
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [selectedDosage, setSelectedDosage] = useState<DrugDosage | null>(null);

  const calculateDose = () => {
    if (!selectedDosage || !weight) return null;

    if (age < 18 && selectedDosage.pediatric) {
      // Parse calculation string and evaluate
      const calc = selectedDosage.pediatric.calculation
        .replace('weight', weight.toString());
      try {
        return eval(calc);
      } catch {
        return null;
      }
    }

    return selectedDosage.adult.standard;
  };

  const dose = calculateDose();

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border p-4", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-900">Calculadora de Dose</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Indicação
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            onChange={(e) => {
              const dosage = drug.dosages.find(d => d.indication === e.target.value);
              setSelectedDosage(dosage || null);
            }}
          >
            <option value="">Selecione a indicação</option>
            {drug.dosages.map((dosage, idx) => (
              <option key={idx} value={dosage.indication}>
                {dosage.indication}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight || ''}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Idade (anos)
            </label>
            <input
              type="number"
              min="0"
              value={age || ''}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {selectedDosage && dose && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Dose Calculada</h4>
            <p className="text-primary text-lg font-semibold">{dose}</p>
            <p className="text-sm text-gray-600 mt-1">
              Frequência: {selectedDosage.adult.frequency}
            </p>
            {selectedDosage.adult.maximum && (
              <p className="text-sm text-red-600 mt-1">
                Dose máxima: {selectedDosage.adult.maximum}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
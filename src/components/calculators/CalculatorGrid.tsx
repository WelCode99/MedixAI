import React from 'react';
import { CalculatorCard } from './CalculatorCard';
import { MedicalCalculator } from '../../types/calculator';
import { useNavigate } from 'react-router-dom';

interface CalculatorGridProps {
  calculators: MedicalCalculator[];
  specialty?: string | null;
}

export const CalculatorGrid: React.FC<CalculatorGridProps> = ({
  calculators,
  specialty
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculators.map(calculator => (
        <CalculatorCard
          key={calculator.id}
          calculator={calculator}
          onClick={() => navigate(`/calculators/${calculator.id}`)}
        />
      ))}
      {calculators.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          Nenhuma calculadora encontrada
          {specialty && ` para ${specialty}`}
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { MedicalCalculator } from '../../types/calculator';
import { Calculator } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalculatorCardProps {
  calculator: MedicalCalculator;
  onClick: () => void;
  className?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calculator,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-6 bg-white rounded-lg shadow-sm border-2",
        "hover:border-primary/40 transition-all duration-200",
        "text-left space-y-4",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{calculator.name}</h3>
          <p className="text-sm text-gray-500">{calculator.category}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">
        {calculator.description}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <span>Last updated: {calculator.lastUpdated.toLocaleDateString()}</span>
        </div>
        {calculator.evidenceLevel && (
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            calculator.evidenceLevel === 'A' && "bg-green-100 text-green-700",
            calculator.evidenceLevel === 'B' && "bg-yellow-100 text-yellow-700",
            calculator.evidenceLevel === 'C' && "bg-orange-100 text-orange-700"
          )}>
            Level {calculator.evidenceLevel}
          </span>
        )}
      </div>
    </button>
  );
};
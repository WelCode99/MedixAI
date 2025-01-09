import React from 'react';
import { CalculatorResult as Result } from '../../types/calculator';
import { cn } from '../../lib/utils';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface CalculatorResultProps {
  result: Result;
  className?: string;
}

export const CalculatorResult: React.FC<CalculatorResultProps> = ({
  result,
  className
}) => {
  const getRiskIcon = () => {
    switch (result.risk) {
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'moderate':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'high':
      case 'very-high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getRiskColor = () => {
    switch (result.risk) {
      case 'low':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'moderate':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'very-high':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn(
        "p-4 rounded-lg border",
        getRiskColor()
      )}>
        <div className="flex items-center space-x-2 mb-2">
          {getRiskIcon()}
          <h3 className="font-medium">Score: {result.score}</h3>
        </div>
        <p className="text-sm">{result.interpretation}</p>
      </div>

      {result.recommendation && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-700 mb-2">Recommendation</h4>
          <p className="text-sm text-blue-600">{result.recommendation}</p>
        </div>
      )}

      {result.details && result.details.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Details</h4>
          {result.details.map((detail, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-700">{detail.label}</div>
              <div className="text-sm text-gray-600">
                {detail.value}
                {detail.interpretation && (
                  <span className="ml-2 text-gray-500">
                    ({detail.interpretation})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
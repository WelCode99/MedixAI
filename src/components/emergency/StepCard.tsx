import React from 'react';
import { ProtocolStep } from '../../types/emergency';
import { Check, AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepCardProps {
  step: ProtocolStep;
  onComplete: () => void;
  isCompleted: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  onComplete,
  isCompleted
}) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-200",
      "border-l-4",
      isCompleted ? "border-green-500 dark:border-green-400" : "border-blue-500 dark:border-blue-400",
      step.criticalAction && !isCompleted && "animate-pulse"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(
            "text-xl font-semibold",
            "text-gray-900 dark:text-white",
            step.criticalAction && "text-red-700 dark:text-red-400"
          )}>
            {step.title}
          </h3>
          {step.timeframe && (
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{step.timeframe}</span>
            </div>
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-4">{step.description}</p>

        {step.medications && step.medications.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Medicações</h4>
            <div className="space-y-2">
              {step.medications.map((med, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md text-sm"
                >
                  <div className="font-medium dark:text-white">{med.drug}</div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {med.dose} - {med.route}
                    {med.frequency && ` (${med.frequency})`}
                  </div>
                  {med.notes && (
                    <div className="text-gray-500 dark:text-gray-400 mt-1">{med.notes}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step.alternatives && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Alternativas</h4>
            <ul className="list-disc list-inside text-gray-600">
              {step.alternatives.map((alt, index) => (
                <li key={index}>{alt}</li>
              ))}
            </ul>
          </div>
        )}

        {step.criticalAction && (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-md mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Ação crítica - requer confirmação</span>
          </div>
        )}

        {!isCompleted && (
          <button
            onClick={onComplete}
            className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md
                     hover:bg-primary/90 transition-colors flex items-center
                     justify-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Confirmar Conclusão</span>
          </button>
        )}
      </div>
    </div>
  );
};
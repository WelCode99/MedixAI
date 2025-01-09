import React, { useState, useEffect } from 'react';
import { EmergencyProtocol, ProtocolStep } from '../../types/emergency';
import { Timer } from './Timer';
import { StepCard } from './StepCard';
import { AlertCircle, AlertTriangle, ChevronRight, Calculator } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ProtocolHeader } from './ProtocolHeader';
import { PriorityActions } from './PriorityActions';
import { ReferenceSection } from './ReferenceSection';

interface EmergencyProtocolViewerProps {
  protocol: EmergencyProtocol;
  onComplete?: () => void;
}

export const EmergencyProtocolViewer: React.FC<EmergencyProtocolViewerProps> = ({
  protocol,
  onComplete
}) => {
  const [currentStepId, setCurrentStepId] = useState(protocol.initialStepId);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [startTime] = useState(new Date());

  const currentStep = protocol.steps.find(step => step.id === currentStepId);
  
  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    
    if (currentStep?.nextSteps?.length === 1) {
      setCurrentStepId(currentStep.nextSteps[0]);
    }
  };

  const handleNextStep = (nextStepId: string) => {
    setCurrentStepId(nextStepId);
  };

  const elapsedTime = () => {
    return Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ProtocolHeader protocol={protocol} elapsedTime={elapsedTime()} />
      
      <PriorityActions
        actions={protocol.steps
          .filter(step => step.criticalAction)
          .slice(0, 3)
          .map(step => ({
            id: step.id,
            title: step.title,
            description: step.shortDescription || step.description
          }))}
        protocolType={protocol.type}
      />

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Sequência de Passos</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {protocol.steps.map(step => (
            <button
              key={step.id}
              onClick={() => setCurrentStepId(step.id)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                "transition-colors duration-200",
                currentStepId === step.id
                  ? "bg-primary text-white"
                  : completedSteps.has(step.id)
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {step.order}. {step.shortDescription || step.title}
            </button>
          ))}
        </div>
      </div>

      {currentStep && (
        <div className="space-y-4">
          <StepCard
            step={currentStep}
            onComplete={() => handleStepComplete(currentStep.id)}
            isCompleted={completedSteps.has(currentStep.id)}
          />

          {currentStep.timer && (
            <Timer
              config={currentStep.timer}
              onComplete={() => {
                if (currentStep.timer?.alert) {
                  // Implement alert system
                }
              }}
            />
          )}

          {currentStep.nextSteps && currentStep.nextSteps.length > 1 && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Próximos Passos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStep.nextSteps.map(nextStepId => {
                  const nextStep = protocol.steps.find(s => s.id === nextStepId);
                  if (!nextStep) return null;

                  return (
                    <button
                      key={nextStepId}
                      onClick={() => handleNextStep(nextStepId)}
                      className="flex items-center justify-between p-4 rounded-lg
                               border-2 border-gray-200 hover:border-primary
                               transition-colors duration-200"
                    >
                      <span className="font-medium">{nextStep.title}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep?.id === 'thrombolysis-decision' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Calcular NIHSS Score</span>
              </div>
              <button
                onClick={() => {/* Implement calculator modal */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Abrir Calculadora
              </button>
            </div>
          )}

          {currentStep.criticalAction && (
            <div className={cn(
              "p-4 rounded-lg",
              currentStep.criticalAction
                ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
                : "bg-gray-50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
            )}>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">
                  {currentStep.criticalAction ? 'Ação Crítica - Requer confirmação' : 'Ação Regular'}
                </span>
              </div>
            </div>
          )}

          <ReferenceSection
            source={protocol.source}
            version={protocol.version}
            references={protocol.references}
          />
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriorityAction {
  id: string;
  title: string;
  description: string;
}

interface PriorityActionsProps {
  actions: PriorityAction[];
  protocolType: string;
}

export const PriorityActions: React.FC<PriorityActionsProps> = ({
  actions,
  protocolType
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
        <AlertTriangle className="w-5 h-5" />
        <h2 className="font-semibold">Ações Prioritárias</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className={cn(
              "p-4 rounded-lg border-l-4",
              protocolType === 'acls' && "bg-red-50/80 border-red-500 dark:bg-red-900/20 dark:border-red-700",
              protocolType === 'sepsis' && "bg-orange-50/80 border-orange-500 dark:bg-orange-900/20 dark:border-orange-700",
              protocolType === 'stroke' && "bg-purple-50/80 border-purple-500 dark:bg-purple-900/20 dark:border-purple-700"
            )}
          >
            <h3 className="font-medium mb-2 dark:text-gray-100">{action.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
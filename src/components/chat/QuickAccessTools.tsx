import React from 'react';
import { BookOpen, FileText, Beaker, Calculator, BookOpenCheck, Stethoscope, ClipboardCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickAccessToolsProps {
  onToolSelect: (tool: string) => void;
  className?: string;
  specialtyId: string;
}

export const QuickAccessTools: React.FC<QuickAccessToolsProps> = ({
  onToolSelect,
  className,
  specialtyId
}) => {
  const tools = [
    { id: 'protocols', label: 'Protocolos', icon: BookOpen },
    { id: 'treatments', label: 'Tratamentos', icon: Beaker },
    { id: 'physical-exam', label: 'Exame Físico', icon: ClipboardCheck },
    { id: 'cases', label: 'Análise de Casos', icon: FileText },
    { id: 'calculators', label: 'Calculadoras', icon: Calculator },
    { id: 'library', label: 'Biblioteca', icon: BookOpenCheck },
    { id: 'clinical-tools', label: 'Ferramentas Clínicas', icon: Stethoscope }
  ];

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200
                     hover:border-primary hover:bg-primary/5 transition-all duration-200
                     hover:shadow-sm"
          >
            <Icon className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
};
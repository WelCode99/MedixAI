import React from 'react';
import { PrescriptionTemplate } from '../../../types/pharmacy/prescription';
import { FileText, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PrescriptionTemplatesProps {
  templates: PrescriptionTemplate[];
  onSelect: (template: PrescriptionTemplate['prescription']) => void;
  className?: string;
}

export const PrescriptionTemplates: React.FC<PrescriptionTemplatesProps> = ({
  templates,
  onSelect,
  className
}) => {
  if (templates.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <Clock className="w-5 h-5" />
        <span>Modelos Salvos</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.prescription)}
            className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all text-left"
          >
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">{template.name}</span>
            </div>
            <div className="text-sm text-gray-600">
              {template.prescription.medications.length} medicamento(s)
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
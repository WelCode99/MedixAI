import React from 'react';
import { ExamTemplate } from '../../types/physical-exam';
import {
  Brain,
  Heart,
  Stethoscope,
  Wind,
  Activity,
  Scan,
  UserCheck,
  Microscope,
  Bone,
  Lung,
  User,
  Clipboard,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ExamTypeSelectorProps {
  templates: ExamTemplate[];
  selectedType: string | null;
  onSelect: (type: string) => void;
}

const iconMap = {
  'head-neck': UserCheck,
  'skin': Scan,
  'thorax-respiratory': Wind,
  cardiovascular: Heart,
  vascular: Activity,
  lymphatic: Microscope,
  abdomen: Stethoscope,
  locomotor: Bone,
  osteoarticular: Bone,
  urinary: User,
  gynecologic: Clipboard,
  neurologic: Brain,
  mental: FileText,
};

export const ExamTypeSelector: React.FC<ExamTypeSelectorProps> = ({
  templates,
  selectedType,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => {
        const Icon = iconMap[template.type as keyof typeof iconMap];
        return (
          <button
            key={template.type}
            onClick={() => onSelect(template.type)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all duration-200",
              "flex flex-col items-center space-y-2",
              selectedType === template.type
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
            )}
          >
            <Icon className="w-8 h-8 text-primary" />
            <span className="font-medium text-sm text-gray-900">{template.title}</span>
          </button>
        );
      })}
    </div>
  );
};
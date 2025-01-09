import React from 'react';
import { 
  Heart, Brain, Microscope, Baby, Activity, Wind, 
  Stethoscope, Scan, Bone, Beaker
} from 'lucide-react';
import { Specialty } from '../../types/specialty';
import { cn } from '../../lib/utils';

interface SpecialtyTabsProps {
  specialties: Specialty[];
  selectedSpecialty: string | null;
  onSelect: (specialty: string | null) => void;
}

const specialtyIcons = {
  cardiology: Heart,
  neurology: Brain,
  'infectious-diseases': Microscope,
  pediatrics: Baby,
  emergency: Activity,
  pulmonology: Wind,
  gastroenterology: Stethoscope,
  dermatology: Scan,
  orthopedics: Bone,
  nephrology: Beaker,
  endocrinology: Beaker
};

export const SpecialtyTabs: React.FC<SpecialtyTabsProps> = ({
  specialties,
  selectedSpecialty,
  onSelect
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto py-2 px-4 space-x-4 scrollbar-hide">
        {specialties.map(specialty => {
          const Icon = specialtyIcons[specialty.id as keyof typeof specialtyIcons] || Activity;
          return (
            <button
              key={specialty.id}
              onClick={() => onSelect(specialty.id === selectedSpecialty ? null : specialty.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap",
                "transition-colors duration-200",
                selectedSpecialty === specialty.id
                  ? `bg-[${specialty.color}] text-white`
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{specialty.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
import React from 'react';
import { MedicationCard } from './MedicationCard';
import { Medication } from '../../types/medication';

interface MedicationGridProps {
  medications?: Medication[];
}

export const MedicationGrid: React.FC<MedicationGridProps> = ({ 
  medications = [] 
}) => {
  if (medications.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhuma medicação encontrada
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {medications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
        />
      ))}
    </div>
  );
}
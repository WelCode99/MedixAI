import React from 'react';
import { MedicationCard } from './MedicationCard';
import { Medication } from '../../types/medication';

interface MedicationListProps {
  medications?: Medication[];
}

export const MedicationList: React.FC<MedicationListProps> = ({
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
    <div className="space-y-4">
      {medications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          className="w-full"
        />
      ))}
    </div>
  );
}
import { MedicationDose } from '../../../types/emergency';

export const arrhythmiaMedications: Record<string, MedicationDose[]> = {
  antiarrhythmic: [
    {
      drug: 'Amiodarona',
      dose: '150mg',
      route: 'IV',
      notes: 'Em 10 minutos'
    },
    {
      drug: 'Procainamida',
      dose: '10mg/kg',
      route: 'IV',
      notes: 'Máx 17mg/kg'
    }
  ],
  // ... other medication categories
};
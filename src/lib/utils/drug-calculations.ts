import { Drug, DrugDosage } from '../../types/pharmacy/drug';

export function calculatePediatricDose(
  dosage: DrugDosage,
  weight: number
): number | null {
  if (!dosage.pediatric?.calculation) return null;

  try {
    // Safely evaluate the calculation string
    const calc = dosage.pediatric.calculation
      .replace(/weight/g, weight.toString())
      .replace(/[^0-9+\-*/().]/g, '');
    
    return eval(calc);
  } catch {
    return null;
  }
}

export function getDosageAdjustment(
  dosage: DrugDosage,
  creatinineClearance?: number,
  hasHepaticImpairment?: boolean,
  age?: number
): string | null {
  if (age && age >= 65 && dosage.adjustments?.elderly) {
    return dosage.adjustments.elderly;
  }

  if (creatinineClearance && dosage.adjustments?.renal) {
    // Find appropriate renal adjustment based on CrCl
    return dosage.adjustments.renal.find(adj => {
      const [min, max] = adj.split('-').map(Number);
      return creatinineClearance >= min && creatinineClearance <= max;
    }) || null;
  }

  if (hasHepaticImpairment && dosage.adjustments?.hepatic) {
    return dosage.adjustments.hepatic[0];
  }

  return null;
}

export function formatDose(value: number, unit: string): string {
  return `${value.toFixed(2)} ${unit}`;
}
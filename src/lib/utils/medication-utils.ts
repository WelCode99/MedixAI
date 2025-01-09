import { MedicationDose } from '../../types/emergency';

export function formatDosage(medication: MedicationDose): string {
  let dosage = `${medication.drug} ${medication.dose} ${medication.route}`;
  if (medication.frequency) {
    dosage += ` ${medication.frequency}`;
  }
  if (medication.maxDose) {
    dosage += ` (máx: ${medication.maxDose})`;
  }
  return dosage;
}

export function validateMedication(medication: MedicationDose): boolean {
  return !!(
    medication.drug &&
    medication.dose &&
    medication.route
  );
}
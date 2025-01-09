import { Prescription } from '../../types/pharmacy/prescription';
import { Drug } from '../../types/pharmacy/drug';
import { mockDrugs } from '../../data/mock/drugs';

interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export function validatePrescription(prescription: Prescription): ValidationResult {
  const errors: string[] = [];

  // Validate medications
  prescription.medications.forEach((medication, index) => {
    const drug = mockDrugs.find(d => d.id === medication.drugId);
    if (!drug) {
      errors.push(`Medicamento ${index + 1}: Medicamento não encontrado`);
      return;
    }

    // Check for interactions
    const interactions = checkInteractions(drug, prescription.medications);
    if (interactions.length > 0) {
      errors.push(...interactions);
    }

    // Validate dosage
    const dosageValidation = validateDosage(medication.dosage, drug);
    if (!dosageValidation.isValid) {
      errors.push(`Medicamento ${index + 1}: ${dosageValidation.error}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

function checkInteractions(drug: Drug, medications: Prescription['medications']): string[] {
  const errors: string[] = [];
  
  drug.interactions.forEach(interaction => {
    const interactingDrug = medications.find(m => 
      mockDrugs.find(d => d.id === m.drugId)?.genericName === interaction.drug
    );

    if (interactingDrug) {
      errors.push(
        `Interação ${interaction.severity}: ${drug.genericName} + ${interaction.drug}`
      );
    }
  });

  return errors;
}

function validateDosage(dosage: string, drug: Drug): { isValid: boolean; error?: string } {
  // Implement dosage validation logic here
  return { isValid: true };
}
import { useState } from 'react';
import { Prescription, PrescriptionTemplate } from '../types/pharmacy/prescription';
import { validatePrescription as validate } from '../lib/utils/prescription-validation';

export function usePrescription() {
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<PrescriptionTemplate[]>([]);

  const saveTemplate = (name: string) => {
    if (!prescription) return;

    const template: PrescriptionTemplate = {
      id: Date.now().toString(),
      name,
      prescription: { ...prescription }
    };

    setSavedTemplates(prev => [...prev, template]);
  };

  return {
    prescription,
    setPrescription,
    savedTemplates,
    saveTemplate,
    validatePrescription: validate
  };
}
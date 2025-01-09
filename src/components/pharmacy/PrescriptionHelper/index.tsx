import React, { useState } from 'react';
import { PrescriptionForm } from './PrescriptionForm';
import { PrescriptionPreview } from './PrescriptionPreview';
import { PrescriptionTemplates } from './PrescriptionTemplates';
import { usePrescription } from '../../../hooks/usePrescription';
import { Prescription } from '../../../types/pharmacy/prescription';

export const PrescriptionHelper: React.FC = () => {
  const {
    prescription,
    setPrescription,
    savedTemplates,
    saveTemplate,
    validatePrescription
  } = usePrescription();

  const [showPreview, setShowPreview] = useState(false);

  const handleSave = (prescription: Prescription) => {
    const validationResult = validatePrescription(prescription);
    if (!validationResult.isValid) {
      // Handle validation errors
      return;
    }
    setPrescription(prescription);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      {!showPreview ? (
        <>
          <PrescriptionForm
            onSave={handleSave}
            initialData={prescription}
          />
          <PrescriptionTemplates
            templates={savedTemplates}
            onSelect={setPrescription}
          />
        </>
      ) : (
        <PrescriptionPreview
          prescription={prescription}
          onEdit={() => setShowPreview(false)}
          onSaveTemplate={saveTemplate}
        />
      )}
    </div>
  );
};
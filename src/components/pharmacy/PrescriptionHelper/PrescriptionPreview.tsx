import React from 'react';
import { Prescription } from '../../../types/pharmacy/prescription';
import { FileText, Download, Save } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PrescriptionPreviewProps {
  prescription: Prescription;
  onEdit: () => void;
  onSaveTemplate: (name: string) => void;
  className?: string;
}

export const PrescriptionPreview: React.FC<PrescriptionPreviewProps> = ({
  prescription,
  onEdit,
  onSaveTemplate,
  className
}) => {
  const handleSaveAsTemplate = () => {
    const name = prompt('Digite um nome para o modelo de prescrição:');
    if (name) {
      onSaveTemplate(name);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-lg", className)}>
      <div className="p-6 border-b space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Prescrição Médica</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Imprimir prescrição"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleSaveAsTemplate}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Salvar como modelo"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Data: {prescription.date.toLocaleDateString()}</span>
            <span>CRM: {prescription.prescriber.crm}</span>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-4">Medicamentos</h4>
            <div className="space-y-4">
              {prescription.medications.map((med, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium">{med.drug?.genericName}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div>Dosagem: {med.dosage}</div>
                    <div>Frequência: {med.frequency}</div>
                    <div>Via: {med.route}</div>
                    <div>Duração: {med.duration}</div>
                    {med.instructions && (
                      <div className="mt-2 text-gray-700">
                        Instruções: {med.instructions}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mt-8">
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-600">
                <div>Dr(a). {prescription.prescriber.name}</div>
                <div>CRM: {prescription.prescriber.crm}</div>
                {prescription.prescriber.specialty && (
                  <div>{prescription.prescriber.specialty}</div>
                )}
              </div>
              <div className="w-48 border-t border-gray-400 pt-2 text-center">
                Assinatura e Carimbo
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t rounded-b-lg">
        <button
          onClick={onEdit}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Editar Prescrição
        </button>
      </div>
    </div>
  );
};
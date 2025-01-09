import { MedicalCalculator } from '../../../types/calculator';

export const dilutionCalculator: MedicalCalculator = {
  id: 'dilutions',
  name: 'Calculadora de Diluições',
  category: 'solutions',
  description: 'Cálculo preciso de diluições e concentrações de medicamentos',
  version: '1.0',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'drugConcentration',
      label: 'Concentração do Medicamento',
      type: 'number',
      required: true,
      min: 0,
      unit: 'mg/mL'
    },
    {
      id: 'desiredConcentration',
      label: 'Concentração Desejada',
      type: 'number',
      required: true,
      min: 0,
      unit: 'mg/mL'
    },
    {
      id: 'finalVolume',
      label: 'Volume Final Desejado',
      type: 'number',
      required: true,
      min: 0,
      unit: 'mL'
    }
  ],
  calculate: (values) => {
    const { drugConcentration, desiredConcentration, finalVolume } = values;
    
    // Cálculo do volume de medicamento necessário
    const drugVolume = (desiredConcentration * finalVolume) / drugConcentration;
    
    // Cálculo do volume de diluente
    const diluentVolume = finalVolume - drugVolume;

    return {
      score: drugVolume, // Usamos score para volume do medicamento
      interpretation: `Volume de Medicamento: ${drugVolume.toFixed(2)}mL\nVolume de Diluente: ${diluentVolume.toFixed(2)}mL`,
      recommendation: `Diluir ${drugVolume.toFixed(2)}mL do medicamento em ${diluentVolume.toFixed(2)}mL de diluente`,
      details: [
        {
          label: 'Volume de Medicamento',
          value: `${drugVolume.toFixed(2)}mL`
        },
        {
          label: 'Volume de Diluente',
          value: `${diluentVolume.toFixed(2)}mL`
        },
        {
          label: 'Concentração Final',
          value: `${desiredConcentration}mg/mL`
        }
      ]
    };
  },
  references: [
    'Handbook on Injectable Drugs, 20th Edition',
    'ASHP Guidelines on Compounding Sterile Preparations'
  ]
};
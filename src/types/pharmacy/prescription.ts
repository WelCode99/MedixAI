import { z } from 'zod';
import { Drug } from './drug';

export interface PrescriptionMedication {
  drugId: string;
  drug?: Drug;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  date: Date;
  medications: PrescriptionMedication[];
  prescriber: {
    name: string;
    crm: string;
    specialty?: string;
  };
}

export interface PrescriptionTemplate {
  id: string;
  name: string;
  prescription: Prescription;
}

export const prescriptionSchema = z.object({
  medications: z.array(z.object({
    drugId: z.string().min(1, 'Selecione um medicamento'),
    dosage: z.string().min(1, 'Informe a dosagem'),
    frequency: z.string().min(1, 'Informe a frequência'),
    route: z.string().min(1, 'Informe a via de administração'),
    duration: z.string().min(1, 'Informe a duração'),
    instructions: z.string().optional()
  })).min(1, 'Adicione pelo menos um medicamento'),
  prescriber: z.object({
    name: z.string().min(1, 'Informe o nome do prescritor'),
    crm: z.string().min(1, 'Informe o CRM'),
    specialty: z.string().optional()
  })
});
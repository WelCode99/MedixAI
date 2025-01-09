import { z } from 'zod';

export type ExamType = 
  | 'head-neck'
  | 'skin'
  | 'thorax-respiratory'
  | 'cardiovascular'
  | 'vascular'
  | 'lymphatic'
  | 'abdomen'
  | 'locomotor'
  | 'osteoarticular'
  | 'urinary'
  | 'gynecologic'
  | 'neurologic'
  | 'mental';

export interface ExamStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  technicalTerms?: string[];
  normalFindings?: string[];
  abnormalFindings?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface ExamTemplate {
  type: ExamType;
  title: string;
  description: string;
  steps: ExamStep[];
}

export interface ExamFinding {
  stepId: string;
  finding: string;
  isNormal: boolean;
  notes?: string;
  timestamp: Date;
}

export const examFindingSchema = z.object({
  finding: z.string().min(1, 'Achado é obrigatório'),
  isNormal: z.boolean(),
  notes: z.string().optional(),
});

export type ExamFindingForm = z.infer<typeof examFindingSchema>;
import { z } from 'zod';

export type CalculatorCategory = 
  | 'solutions'
  | 'pediatric'
  | 'scores'
  | 'cardiology'
  | 'neurology'
  | 'infectious-disease'
  | 'pediatrics'
  | 'emergency'
  | 'obstetrics'
  | 'pulmonology'
  | 'gastroenterology'
  | 'nephrology'
  | 'endocrinology';

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: Array<{
    value: string | number;
    label: string;
    points?: number;
  }>;
  placeholder?: string;
  description?: string;
}

export interface CalculatorResult {
  score: number;
  interpretation: string;
  recommendation?: string;
  risk?: 'low' | 'moderate' | 'high' | 'very-high';
  details?: Array<{
    label: string;
    value: string | number;
    interpretation?: string;
  }>;
}

export interface MedicalCalculator {
  id: string;
  name: string;
  category: CalculatorCategory;
  description: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculatorResult;
  references: string[];
  version: string;
  lastUpdated: Date;
  evidenceLevel?: 'A' | 'B' | 'C';
  flowchart?: boolean;
}

export const calculatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    'cardiology',
    'neurology',
    'infectious-disease',
    'pediatrics',
    'emergency',
    'obstetrics',
    'pulmonology',
    'gastroenterology',
    'nephrology',
    'endocrinology'
  ]),
  description: z.string(),
  inputs: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(['number', 'select', 'radio', 'checkbox']),
    required: z.boolean(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    unit: z.string().optional(),
    options: z.array(z.object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
      points: z.number().optional()
    })).optional(),
    placeholder: z.string().optional(),
    description: z.string().optional()
  })),
  version: z.string(),
  lastUpdated: z.date(),
  evidenceLevel: z.enum(['A', 'B', 'C']).optional(),
  flowchart: z.boolean().optional()
});
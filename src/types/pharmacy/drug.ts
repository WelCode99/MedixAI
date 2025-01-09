import { z } from 'zod';

export type DrugCategory = 
  | 'analgesic'
  | 'antibiotic'
  | 'antihypertensive'
  | 'antiarrhythmic'
  | 'anticoagulant'
  | 'antidiabetic'
  | 'antidepressant'
  | 'antipsychotic'
  | 'bronchodilator'
  | 'corticosteroid';

export type SystemTarget =
  | 'cardiovascular'
  | 'respiratory'
  | 'neurological'
  | 'gastrointestinal'
  | 'musculoskeletal'
  | 'endocrine'
  | 'immune';

export type AdministrationRoute =
  | 'oral'
  | 'intravenous'
  | 'intramuscular'
  | 'subcutaneous'
  | 'inhaled'
  | 'topical'
  | 'sublingual';

export interface DrugPresentation {
  form: string;
  concentration: string;
  volume?: string;
  unitCount?: number;
}

export interface DrugDosage {
  indication: string;
  route: AdministrationRoute;
  adult: {
    standard: string;
    maximum?: string;
    frequency: string;
    duration?: string;
  };
  pediatric?: {
    calculation: string;
    maximum?: string;
    frequency: string;
  };
  adjustments?: {
    renal?: string[];
    hepatic?: string[];
    elderly?: string;
  };
}

export interface AdverseEffect {
  effect: string;
  frequency: 'very_common' | 'common' | 'uncommon' | 'rare' | 'very_rare';
  severity: 'mild' | 'moderate' | 'severe';
  management?: string;
}

export interface DrugInteraction {
  drug: string;
  mechanism: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  management: string;
}

export interface DrugReference {
  id: string;
  title: string;
  source: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface Drug {
  id: string;
  genericName: string;
  brandNames: string[];
  categories: DrugCategory[];
  systemTargets: SystemTarget[];
  mechanismOfAction: string;
  indications: {
    primary: string[];
    secondary?: string[];
  };
  contraindications: string[];
  presentations: DrugPresentation[];
  dosages: DrugDosage[];
  pharmacokinetics: {
    absorption?: string;
    distribution?: string;
    metabolism?: string;
    elimination?: string;
    halfLife: string;
  };
  adverseEffects: {
    common: AdverseEffect[];
    severe: AdverseEffect[];
  };
  interactions: DrugInteraction[];
  warnings: string[];
  monitoring: {
    parameters: string[];
    frequency: string;
    alerts?: string[];
  };
  costEffectiveness?: {
    dailyCost: number;
    alternativesComparison?: string;
  };
  references: DrugReference[];
  lastUpdated: Date;
  tags: string[];
}

export const drugSchema = z.object({
  id: z.string(),
  genericName: z.string(),
  brandNames: z.array(z.string()),
  categories: z.array(z.enum([
    'analgesic',
    'antibiotic',
    'antihypertensive',
    'antiarrhythmic',
    'anticoagulant',
    'antidiabetic',
    'antidepressant',
    'antipsychotic',
    'bronchodilator',
    'corticosteroid'
  ])),
  // ... rest of schema validation
});
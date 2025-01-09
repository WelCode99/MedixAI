export interface DrugPresentation {
  form: string;
  concentration: string;
  volume?: string;
  unitCount?: number;
}

export interface DrugDilution {
  solution: string;
  volume: string;
  finalConcentration: string;
  stability: string;
  instructions: string[];
}

export interface DrugDosage {
  indication: string;
  loading?: string;
  maintenance: string;
  maxDose?: string;
  adjustments?: {
    renal?: string;
    hepatic?: string;
    elderly?: string;
    pediatric?: string;
  };
}

export interface DrugInteraction {
  drug: string;
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated';
  effect: string;
  management: string;
}

export interface EmergencyDrug {
  id: string;
  genericName: string;
  brandNames: string[];
  category: DrugCategory;
  class: string;
  mechanism: string;
  indications: string[];
  contraindications: string[];
  presentations: DrugPresentation[];
  dilutions: DrugDilution[];
  dosages: DrugDosage[];
  administrationRoutes: string[];
  monitoring: {
    parameters: string[];
    frequency: string;
  };
  adverseEffects: {
    common: string[];
    severe: string[];
    management: Record<string, string>;
  };
  interactions: DrugInteraction[];
  antidote?: {
    drug: string;
    dosage: string;
    instructions: string[];
  };
  notes: string[];
  references: string[];
  lastUpdated: Date;
}

export type DrugCategory =
  | 'vasopressors'
  | 'inotropes'
  | 'vasodilators'
  | 'antiarrhythmics'
  | 'sedatives'
  | 'analgesics'
  | 'neuromuscular_blockers'
  | 'anticoagulants'
  | 'antiplatelets'
  | 'antibiotics'
  | 'antidotes'
  | 'others';
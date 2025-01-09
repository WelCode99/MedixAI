export interface DoseInfo {
  standard: string;
  max?: string;
  frequency: string;
  route: string[];
  duration?: string;
}

export interface DoseAdjustment {
  condition: string;
  adjustment: string;
}

export interface DrugInteraction {
  drug: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  effect: string;
  management?: string;
}

export interface Medication {
  id: string;
  genericName: string;
  brandNames: string[];
  category: {
    primary: string;
    secondary?: string[];
  };
  clinicalData: {
    mechanismOfAction: string;
    indications: string[];
    contraindications: string[];
    adverseEffects: {
      common: string[];
      severe: string[];
    };
  };
  dosing: {
    adult: DoseInfo;
    pediatric?: DoseInfo;
    geriatric?: DoseInfo;
    specialPopulations?: {
      renal?: DoseAdjustment[];
      hepatic?: DoseAdjustment[];
      pregnancy?: string;
      lactation?: string;
    };
  };
  interactions: DrugInteraction[];
  monitoring: string[];
  references: string[];
}
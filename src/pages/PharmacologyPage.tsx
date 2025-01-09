import React, { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { MedicationGrid } from '../components/pharmacy/MedicationGrid';
import { MedicationList } from '../components/pharmacy/MedicationList';
import { FilterPanel } from '../components/pharmacy/FilterPanel';
import { SearchBar } from '../components/pharmacy/SearchBar';
import { ViewToggle } from '../components/pharmacy/ViewToggle';
import { PrescriptionHelper } from '../components/pharmacy/PrescriptionHelper';
import { DrugCard } from '../components/pharmacy/DrugCard';
import { DrugComparison } from '../components/pharmacy/DrugComparison';
import { DoseCalculator } from '../components/pharmacy/DoseCalculator';
import { DrugProtocols } from '../components/pharmacy/DrugProtocols';
import { Drug } from '../types/pharmacy/drug';
import { cn } from '../lib/utils';
import { searchDrugs, filterDrugsByCategory, filterDrugsBySystem } from '../lib/utils/drug-filters';

// Mock data - replace with actual API call
const mockDrugs: Drug[] = [
  {
    id: '1',
    genericName: 'Amoxicilina',
    brandNames: ['Amoxil', 'Novocilin'],
    categories: ['antibiotic'],
    systemTargets: ['respiratory'],
    mechanismOfAction: 'Inibição da síntese da parede celular bacteriana',
    indications: {
      primary: ['Infecções respiratórias', 'Otite média'],
      secondary: ['Infecções urinárias não complicadas']
    },
    contraindications: ['Hipersensibilidade a penicilinas'],
    presentations: [
      { form: 'Cápsula', concentration: '500mg' },
      { form: 'Suspensão', concentration: '250mg/5mL' }
    ],
    dosages: [
      {
        indication: 'Infecções respiratórias',
        route: 'oral',
        adult: {
          standard: '500mg',
          frequency: '8/8h',
          duration: '7-10 dias'
        },
        pediatric: {
          calculation: 'weight * 50',
          frequency: '8/8h'
        }
      }
    ],
    pharmacokinetics: {
      absorption: 'Rápida absorção oral',
      halfLife: '1-2 horas'
    },
    adverseEffects: {
      common: [
        { effect: 'Diarreia', frequency: 'common', severity: 'mild' },
        { effect: 'Náusea', frequency: 'common', severity: 'mild' }
      ],
      severe: [
        { effect: 'Reação anafilática', frequency: 'rare', severity: 'severe' }
      ]
    },
    interactions: [],
    warnings: ['Ajuste de dose em insuficiência renal'],
    monitoring: {
      parameters: ['Função renal', 'Sinais de alergia'],
      frequency: 'Início do tratamento'
    },
    references: [
      {
        id: 'ref1',
        title: 'Diretrizes Brasileiras de Antibioticoterapia',
        source: 'SBI',
        year: 2023
      }
    ],
    lastUpdated: new Date(),
    tags: ['antibiótico', 'penicilina', 'betalactâmico']
  }
  // Add more mock drugs here
];

export default function PharmacologyPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [comparisonDrugs, setComparisonDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);
  const [filteredDrugs, setFilteredDrugs] = useState(mockDrugs);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredDrugs(mockDrugs);
      return;
    }
    setFilteredDrugs(searchDrugs(mockDrugs, query));
  };

  const handleDrugSelect = (drug: Drug) => {
    setSelectedDrug(drug);
  };

  const handleAddToComparison = (drug: Drug) => {
    if (comparisonDrugs.length < 3) {
      setComparisonDrugs([...comparisonDrugs, drug]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="bg-gradient-to-r from-primary/90 to-primary p-6 text-white">
          <div className="max-w-7xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Biblioteca Farmacológica</h1>
            <p className="text-primary-foreground/90">
              Base de dados farmacológica baseada em evidências
            </p>
            <SearchBar
              onSearch={handleSearch}
              suggestions={filteredDrugs}
              className="max-w-2xl"
            />
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPrescription(!showPrescription)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                showPrescription
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {showPrescription ? 'Voltar ao Catálogo' : 'Nova Prescrição'}
            </button>
          </div>

          {showPrescription ? (
            <PrescriptionHelper />
          ) : (
            <div className="flex gap-6">
              <aside className="w-64 flex-shrink-0">
                <FilterPanel
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
              </aside>

              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                  <ViewToggle
                    view={view}
                    onViewChange={setView}
                  />
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDrugs.map(drug => (
                    <DrugCard
                      key={drug.id}
                      drug={drug}
                      onSelect={handleDrugSelect}
                    />
                  ))}
                </div>
              </div>

              {selectedDrug && (
                <aside className="w-80 flex-shrink-0 space-y-6">
                  <DoseCalculator drug={selectedDrug} />
                  <DrugProtocols drug={selectedDrug} />
                </aside>
              )}
            </div>
          )}

          {comparisonDrugs.length > 0 && (
            <DrugComparison
              drugs={comparisonDrugs}
              onClose={() => setComparisonDrugs([])}
              className="mt-6"
            />
          )}
        </div>
      </div>
    </>
  );
}
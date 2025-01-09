import React, { useState } from 'react';
import { DrugSearch } from '../components/drugs/DrugSearch';
import { DrugCategories } from '../components/drugs/DrugCategories';
import { EmergencyDrug, DrugCategory } from '../types/drugs';
import { emergencyDrugs } from '../data/emergency-drugs';

export default function EmergencyDrugs() {
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | null>(null);
  const [searchResults, setSearchResults] = useState<EmergencyDrug[]>([]);

  const categories = Object.entries(
    emergencyDrugs.reduce((acc, drug) => {
      acc[drug.category] = (acc[drug.category] || 0) + 1;
      return acc;
    }, {} as Record<DrugCategory, number>)
  ).map(([category, count]) => ({
    category: category as DrugCategory,
    title: getCategoryTitle(category as DrugCategory),
    count
  }));

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = emergencyDrugs.filter(drug =>
      drug.genericName.toLowerCase().includes(query.toLowerCase()) ||
      drug.brandNames.some(name => name.toLowerCase().includes(query.toLowerCase())) ||
      drug.indications.some(ind => ind.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(results);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Drogas na Emergência
        </h1>
        <p className="text-lg text-gray-600">
          Guia completo de medicamentos para situações de emergência
        </p>
      </div>

      <DrugSearch
        onSearch={handleSearch}
        suggestions={searchResults}
        className="max-w-2xl mx-auto"
      />

      <DrugCategories
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />
    </div>
  );
}

function getCategoryTitle(category: DrugCategory): string {
  const titles: Record<DrugCategory, string> = {
    vasopressors: 'Vasopressores',
    inotropes: 'Inotrópicos',
    vasodilators: 'Vasodilatadores',
    antiarrhythmics: 'Antiarrítmicos',
    sedatives: 'Sedativos',
    analgesics: 'Analgésicos',
    neuromuscular_blockers: 'Bloqueadores Neuromusculares',
    anticoagulants: 'Anticoagulantes',
    antiplatelets: 'Antiagregantes',
    antibiotics: 'Antibióticos',
    antidotes: 'Antídotos',
    others: 'Outros'
  };
  return titles[category];
}
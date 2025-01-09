import { Drug, DrugCategory, SystemTarget } from '../../types/pharmacy/drug';

export function filterDrugsByCategory(drugs: Drug[], category: DrugCategory): Drug[] {
  return drugs.filter(drug => drug.categories.includes(category));
}

export function filterDrugsBySystem(drugs: Drug[], system: SystemTarget): Drug[] {
  return drugs.filter(drug => drug.systemTargets.includes(system));
}

export function filterDrugsByIndication(drugs: Drug[], indication: string): Drug[] {
  return drugs.filter(drug => 
    drug.indications.primary.some(ind => 
      ind.toLowerCase().includes(indication.toLowerCase())
    ) ||
    drug.indications.secondary?.some(ind =>
      ind.toLowerCase().includes(indication.toLowerCase())
    )
  );
}

export function searchDrugs(drugs: Drug[], query: string): Drug[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return drugs.filter(drug => {
    const searchableText = [
      drug.genericName,
      ...drug.brandNames,
      ...drug.categories,
      ...drug.systemTargets,
      ...drug.indications.primary,
      ...(drug.indications.secondary || []),
      ...drug.tags
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}
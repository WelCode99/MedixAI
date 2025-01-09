import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { mockDrugs } from '../../../data/mock/drugs';
import { cn } from '../../../lib/utils';

interface DrugSelectorProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: (name: string, value: any) => void;
  errors: any;
}

export const DrugSelector: React.FC<DrugSelectorProps> = ({
  register,
  watch,
  setValue,
  errors
}) => {
  const medications = watch('medications') || [];

  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setValue('medications', newMedications);
  };

  const handleAddMedication = () => {
    setValue('medications', [...medications, {
      drugId: '',
      dosage: '',
      frequency: '',
      route: '',
      duration: '',
      instructions: ''
    }]);
  };

  return (
    <div className="space-y-4">
      {medications.map((medication: any, index: number) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <select
              {...register(`medications.${index}.drugId`)}
              className={cn(
                "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                "focus:ring-2 focus:ring-primary focus:border-transparent",
                errors?.medications?.[index]?.drugId && "border-red-500"
              )}
            >
              <option value="">Selecione um medicamento</option>
              {mockDrugs.map(drug => (
                <option key={drug.id} value={drug.id}>
                  {drug.genericName}
                </option>
              ))}
            </select>
            
            <button
              type="button"
              onClick={() => handleRemoveMedication(index)}
              className="ml-2 p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                {...register(`medications.${index}.dosage`)}
                placeholder="Dosagem"
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors?.medications?.[index]?.dosage && "border-red-500"
                )}
              />
            </div>
            
            <div>
              <input
                {...register(`medications.${index}.frequency`)}
                placeholder="Frequência"
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors?.medications?.[index]?.frequency && "border-red-500"
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                {...register(`medications.${index}.route`)}
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors?.medications?.[index]?.route && "border-red-500"
                )}
              >
                <option value="">Via de administração</option>
                <option value="oral">Oral</option>
                <option value="intravenous">Intravenosa</option>
                <option value="intramuscular">Intramuscular</option>
                <option value="subcutaneous">Subcutânea</option>
              </select>
            </div>
            
            <div>
              <input
                {...register(`medications.${index}.duration`)}
                placeholder="Duração"
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors?.medications?.[index]?.duration && "border-red-500"
                )}
              />
            </div>
          </div>

          <textarea
            {...register(`medications.${index}.instructions`)}
            placeholder="Instruções especiais"
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={2}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddMedication}
        className="w-full p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Adicionar Medicamento</span>
      </button>
    </div>
  );
};
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { prescriptionSchema } from '../../../types/pharmacy/prescription';
import { DrugSelector } from './DrugSelector';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PrescriptionFormProps {
  onSave: (data: any) => void;
  initialData?: any;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  onSave,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: initialData || {
      medications: [],
      prescriber: {
        name: '',
        crm: '',
        specialty: ''
      }
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Nova Prescrição</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Prescritor
              </label>
              <input
                {...register('prescriber.name')}
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors.prescriber?.name && "border-red-500"
                )}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CRM
              </label>
              <input
                {...register('prescriber.crm')}
                className={cn(
                  "w-full rounded-md border border-gray-300 shadow-sm px-3 py-2",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors.prescriber?.crm && "border-red-500"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <input
              {...register('prescriber.specialty')}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <DrugSelector
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {errors.medications && (
            <div className="p-4 bg-red-50 rounded-lg flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">
                {errors.medications.message as string}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Gerar Prescrição
          </button>
        </div>
      </div>
    </form>
  );
};
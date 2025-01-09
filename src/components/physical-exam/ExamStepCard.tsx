import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamStep, ExamFinding, examFindingSchema } from '../../types/physical-exam';
import { Image, Video, AlertCircle } from 'lucide-react';

interface ExamStepCardProps {
  step: ExamStep;
  onFindingSubmit: (finding: ExamFinding) => void;
  onMediaClick?: (url: string, type: string) => void;
}

export const ExamStepCard: React.FC<ExamStepCardProps> = ({
  step,
  onFindingSubmit,
  onMediaClick
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(examFindingSchema)
  });

  const onSubmit = (data: any) => {
    onFindingSubmit({
      stepId: step.id,
      ...data,
      timestamp: new Date()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
        {step.required && (
          <span className="text-xs font-medium text-red-600">Obrigatório</span>
        )}
      </div>
      
      {step.required && !step.mediaUrl && (
        <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-md">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Este passo requer documentação obrigatória</span>
        </div>
      )}

      {step.mediaUrl && (
        <button
          onClick={() => onMediaClick?.(step.mediaUrl!, step.mediaType!)}
          className="w-full p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            {step.mediaType === 'video' ? (
              <Video className="w-5 h-5" />
            ) : (
              <Image className="w-5 h-5" />
            )}
            <span>Visualizar {step.mediaType === 'video' ? 'vídeo' : 'imagem'}</span>
          </div>
        </button>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Achados do Exame
          </label>
          <textarea
            {...register('finding')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            rows={3}
            placeholder="Descreva os achados do exame..."
          />
          {errors.finding && (
            <p className="mt-1 text-sm text-red-600">{errors.finding.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isNormal')}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Achados normais</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observações Adicionais
          </label>
          <textarea
            {...register('notes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            rows={2}
            placeholder="Observações opcionais..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Salvar Achados
        </button>
      </form>

      {step.technicalTerms && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Termos Técnicos Sugeridos</h4>
          <div className="flex flex-wrap gap-2">
            {step.technicalTerms.map((term, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
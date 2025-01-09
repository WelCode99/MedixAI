import React from 'react';
import { EmergencyDrug } from '../../types/drugs';
import { Clock, AlertTriangle, Syringe, Stethoscope, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DrugDetailsViewProps {
  drug: EmergencyDrug;
}

export const DrugDetailsView: React.FC<DrugDetailsViewProps> = ({ drug }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">{drug.genericName}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">
            {drug.brandNames.join(', ')}
          </span>
          <span className={cn(
            "px-2 py-1 text-xs rounded-full",
            drug.category === 'vasopressors' && "bg-red-100 text-red-800",
            drug.category === 'inotropes' && "bg-blue-100 text-blue-800"
          )}>
            {drug.class}
          </span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Apresentação</h3>
          {drug.presentations.map((pres, idx) => (
            <div key={idx} className="text-sm text-gray-600">
              {pres.form}: {pres.concentration}
              {pres.volume && ` (${pres.volume})`}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Vias de Administração</h3>
          <div className="flex flex-wrap gap-2">
            {drug.administrationRoutes.map((route, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {route}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dilution */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Syringe className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Diluição</h3>
        </div>
        {drug.dilutions.map((dil, idx) => (
          <div key={idx} className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="font-medium text-blue-900">
              Solução: {dil.solution} ({dil.volume})
            </div>
            <div className="text-sm text-blue-800">
              Concentração final: {dil.finalConcentration}
            </div>
            <div className="text-sm text-blue-800">
              Estabilidade: {dil.stability}
            </div>
            <ul className="list-disc list-inside text-sm text-blue-800">
              {dil.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dosage */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Posologia</h3>
        </div>
        {drug.dosages.map((dos, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="font-medium text-gray-900">
              {dos.indication}
            </div>
            {dos.loading && (
              <div className="text-sm text-gray-700">
                Ataque: {dos.loading}
              </div>
            )}
            <div className="text-sm text-gray-700">
              Manutenção: {dos.maintenance}
            </div>
            {dos.maxDose && (
              <div className="text-sm text-gray-700">
                Dose máxima: {dos.maxDose}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Monitoring */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Monitorização</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-700 space-y-2">
            <div>Frequência: {drug.monitoring.frequency}</div>
            <ul className="list-disc list-inside">
              {drug.monitoring.parameters.map((param, idx) => (
                <li key={idx}>{param}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Adverse Effects */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Efeitos Adversos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Comuns</h4>
            <ul className="list-disc list-inside text-sm text-yellow-800">
              {drug.adverseEffects.common.map((effect, idx) => (
                <li key={idx}>{effect}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Graves</h4>
            <ul className="list-disc list-inside text-sm text-red-800">
              {drug.adverseEffects.severe.map((effect, idx) => (
                <li key={idx}>{effect}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Observações</h3>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {drug.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>

      {/* References */}
      <div className="text-sm text-gray-500 border-t pt-4">
        <div className="font-medium mb-1">Referências:</div>
        <ul className="list-disc list-inside">
          {drug.references.map((ref, idx) => (
            <li key={idx}>{ref}</li>
          ))}
        </ul>
        <div className="mt-2">
          Última atualização: {drug.lastUpdated.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
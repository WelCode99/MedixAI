import React from 'react';
import { Drug } from '../../types/pharmacy/drug';
import { cn } from '../../lib/utils';
import { FileText, ExternalLink } from 'lucide-react';

interface DrugProtocolProps {
  drug: Drug;
  className?: string;
}

export const DrugProtocols: React.FC<DrugProtocolProps> = ({
  drug,
  className
}) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border p-4", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-900">Protocolos Relacionados</h3>
      </div>

      <div className="space-y-4">
        {drug.references.map((ref) => (
          <div
            key={ref.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">{ref.title}</h4>
            <p className="text-sm text-gray-600 mb-2">
              {ref.source} ({ref.year})
            </p>
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80"
              >
                Ver protocolo
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
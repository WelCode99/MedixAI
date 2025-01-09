import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ReferenceSectionProps {
  source: string;
  version: string;
  references: string[];
}

export const ReferenceSection: React.FC<ReferenceSectionProps> = ({
  source,
  version,
  references
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <BookOpen className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Fonte e Referências</h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fonte Principal:</span> {source}, {version}
        </p>
        <div className="text-sm text-gray-600">
          <div className="font-medium mb-1">Referências:</div>
          <ul className="space-y-1">
            {references.map((ref, index) => (
              <li key={index} className="flex items-start space-x-2">
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
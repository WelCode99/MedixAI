import React from 'react';
import { PhysicalExamGuide } from '../components/physical-exam/PhysicalExamGuide';
import { GlobalSearch } from '../components/search/GlobalSearch';

export default function PhysicalExam() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guia de Exame Físico</h1>
        <p className="text-lg text-gray-600">
          Selecione o tipo de exame físico para acessar o roteiro sistemático e baseado em evidências
        </p>
      </div>
      
      <div className="mb-8">
        <GlobalSearch />
      </div>

      <PhysicalExamGuide />
    </div>
  );
}
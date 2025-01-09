import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { ExamTypeSelector } from './ExamTypeSelector';
import { ExamStepCard } from './ExamStepCard';
import { Modal } from '../ui/Modal';
import { DraggableStepList } from './DraggableStepList';
import { examTemplates } from '../../data/exam-templates';
import { ExamFinding, ExamStep, ExamTemplate } from '../../types/physical-exam';
import { Plus, Download, AlertTriangle } from 'lucide-react';

export const PhysicalExamGuide: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [findings, setFindings] = useState<ExamFinding[]>([]);
  const [steps, setSteps] = useState<ExamStep[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: string } | null>(null);
  const [showAbnormalModal, setShowAbnormalModal] = useState(false);
  const [abnormalFinding, setAbnormalFinding] = useState<ExamFinding | null>(null);

  const selectedTemplate = selectedType
    ? examTemplates.find(t => t.type === selectedType)
    : null;

  useEffect(() => {
    if (selectedTemplate) {
      setSteps(selectedTemplate.steps);
    }
  }, [selectedTemplate]);

  const handleFindingSubmit = (finding: ExamFinding) => {
    setFindings(prev => [...prev, finding]);

    // Check for abnormal findings and show alerts
    if (!finding.isNormal) {
      const step = selectedTemplate?.steps.find(s => s.id === finding.stepId);
      if (step?.abnormalFindings?.some(af => 
        finding.finding.toLowerCase().includes(af.toLowerCase())
      )) {
        setAbnormalFinding(finding);
        setShowAbnormalModal(true);
      }
    }
  };

  const handleAddStep = () => {
    const newStep: ExamStep = {
      id: `custom-${Date.now()}`,
      title: 'Nova Etapa',
      description: 'Descrição da nova etapa',
      required: false,
    };
    setSteps(prev => [...prev, newStep]);
  };

  const handleReorderSteps = (newSteps: ExamStep[]) => {
    setSteps(newSteps);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.text('Relatório de Exame Físico', 20, 20);
    
    // Add exam type
    doc.setFontSize(14);
    doc.text(`Tipo: ${selectedTemplate?.title || ''}`, 20, 30);
    
    // Add findings
    doc.setFontSize(12);
    let y = 40;
    findings.forEach((finding, index) => {
      const step = steps.find(s => s.id === finding.stepId);
      if (step) {
        doc.text(`${step.title}:`, 20, y);
        doc.text(finding.finding, 30, y + 5);
        y += 15;
      }
    });
    
    doc.save('exame-fisico.pdf');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Guia de Exame Físico
        </h2>
        <p className="text-gray-600 mb-6">
          Selecione o tipo de exame físico para começar a avaliação sistemática.
        </p>
        <ExamTypeSelector
          templates={examTemplates}
          selectedType={selectedType}
          onSelect={setSelectedType}
        />
      </div>

      {selectedTemplate && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedTemplate.title}
            </h3>
            <p className="text-gray-600">{selectedTemplate.description}</p>
          </div>

          <div className="flex justify-end space-x-4 mb-4">
            <button
              onClick={handleAddStep}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Etapa</span>
            </button>
            <button
              onClick={generatePDF}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar PDF</span>
            </button>
          </div>

          <DraggableStepList
            steps={steps}
            onReorder={handleReorderSteps}
          >
            {(step) => (
              <ExamStepCard
                key={step.id}
                step={step}
                onFindingSubmit={handleFindingSubmit}
                onMediaClick={(url, type) => {
                  setSelectedMedia({ url, type });
                  setIsMediaModalOpen(true);
                }}
              />
            )}
          </DraggableStepList>

          <Modal
            isOpen={isMediaModalOpen}
            onClose={() => setIsMediaModalOpen(false)}
            title="Recurso Visual"
          >
            {selectedMedia?.type === 'video' ? (
              <iframe
                src={selectedMedia.url}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
              />
            ) : (
              <img
                src={selectedMedia?.url}
                alt="Demonstração"
                className="w-full rounded-lg"
              />
            )}
          </Modal>

          <Modal
            isOpen={showAbnormalModal}
            onClose={() => setShowAbnormalModal(false)}
            title="Achado Anormal Detectado"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-yellow-600">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Atenção</span>
              </div>
              <p className="text-gray-600">
                Foi detectado um achado anormal que pode requerer atenção:
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-medium text-yellow-800">
                  {abnormalFinding?.finding}
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Sugestões de Conduta:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Considerar investigação adicional</li>
                  <li>Documentar achado no prontuário</li>
                  <li>Avaliar necessidade de exames complementares</li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
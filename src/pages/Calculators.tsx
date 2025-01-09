import React, { useState } from 'react';
import { 
  Beaker, Baby, Calculator, Search, 
  Activity, Brain, Heart, Wind, ChevronLeft,
  Droplet, Timer, Pill, Scale
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CalculatorForm } from '../components/calculators/CalculatorForm';
import { CalculatorResult } from '../components/calculators/CalculatorResult';
import { MedicalCalculator } from '../types/calculator';
import { dilutionCalculator } from '../data/calculators/solutions/dilutions';
import { vasopressorCalculator } from '../data/calculators/solutions/vasopressors';

type CalculatorCategory = 'solutions' | 'pediatric' | 'scores';
type Specialty = 'cardiology' | 'neurology' | 'pulmonology' | 'emergency' | 'all';

interface Calculator {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  specialty?: Specialty;
  complexity: 'basic' | 'intermediate' | 'advanced';
}

export default function Calculators() {
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('all');
  const [selectedCalculator, setSelectedCalculator] = useState<MedicalCalculator | null>(null);
  const [calculatorResult, setCalculatorResult] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'solutions',
      name: 'Soluções e Medicamentos',
      icon: Beaker,
      description: 'Cálculos de diluições, doses e infusões',
      color: 'text-emerald-600'
    },
    {
      id: 'pediatric',
      name: 'Pediatria',
      icon: Baby,
      description: 'Doses pediátricas e ajustes específicos',
      color: 'text-blue-600'
    },
    {
      id: 'scores',
      name: 'Scores e Escalas',
      icon: Calculator,
      description: 'Scores diagnósticos e prognósticos',
      color: 'text-purple-600'
    }
  ];

  const specialties = [
    { id: 'all', name: 'Todas', icon: Activity },
    { id: 'cardiology', name: 'Cardiologia', icon: Heart },
    { id: 'neurology', name: 'Neurologia', icon: Brain },
    { id: 'pulmonology', name: 'Pneumologia', icon: Wind }
  ];

  const renderCalculator = () => (
    <div className="space-y-6">
      <button
        onClick={() => {
          setSelectedCalculator(null);
          setCalculatorResult(null);
        }}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {selectedCalculator?.name}
        </h2>
        <p className="text-gray-600 mb-6">{selectedCalculator?.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {selectedCalculator && (
            <CalculatorForm
              calculator={selectedCalculator}
              onCalculate={setCalculatorResult}
            />
          )}
          
          {calculatorResult && (
            <CalculatorResult result={calculatorResult} />
          )}
        </div>
      </div>
    </div>
  );

  const renderCategoryContent = () => {
    if (selectedCategory === 'solutions') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Soluções e Medicamentos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CalcCard
              title="Diluições e Concentrações"
              description="Cálculo preciso de diluições medicamentosas"
              onClick={() => setSelectedCalculator(dilutionCalculator)}
              icon={Beaker}
            />
            <CalcCard
              title="Drogas Vasoativas"
              description="Doses e taxas de infusão de vasopressores"
              onClick={() => setSelectedCalculator(vasopressorCalculator)}
              icon={Timer}
            />
            <CalcCard
              title="Eletrólitos"
              description="Correção de distúrbios eletrolíticos"
              onClick={() => {}}
              icon={Droplet}
            />
            <CalcCard
              title="Sedação"
              description="Protocolos de sedação e analgesia"
              onClick={() => {}}
              icon={Pill}
            />
          </div>
        </div>
      );
    }

    if (selectedCategory === 'pediatric') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Pediatria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CalcCard
              title="Doses Pediátricas"
              description="Cálculo de doses por peso e idade"
              onClick={() => {}}
              icon={Scale}
            />
            <CalcCard
              title="Diluições Pediátricas"
              description="Diluições específicas para pediatria"
              onClick={() => {}}
              icon={Beaker}
            />
            <CalcCard
              title="Hidratação"
              description="Cálculos de hidratação e manutenção"
              onClick={() => {}}
              icon={Droplet}
            />
          </div>
        </div>
      );
    }

    if (selectedCategory === 'scores') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Scores e Escalas</h2>
          
          <div className="flex overflow-x-auto py-2 space-x-4">
            {specialties.map(spec => {
              const Icon = spec.icon;
              return (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id as Specialty)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap",
                    "transition-colors duration-200",
                    selectedSpecialty === spec.id
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{spec.name}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CalcCard
              title="GRACE Score"
              description="Risco em síndrome coronariana aguda"
              onClick={() => {}}
              icon={Heart}
              specialty="cardiology"
            />
            <CalcCard
              title="NIHSS"
              description="Escala de AVC do NIH"
              onClick={() => {}}
              icon={Brain}
              specialty="neurology"
            />
            <CalcCard
              title="qSOFA"
              description="Quick SOFA Score para sepse"
              onClick={() => {}}
              icon={Activity}
              specialty="emergency"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {selectedCalculator ? (
        renderCalculator()
      ) : (
        <>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Calculadoras Médicas
            </h1>
            <p className="text-lg text-gray-600">
              Ferramentas precisas para cálculos médicos, scores e escalas
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar calculadora..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as CalculatorCategory)}
                  className={cn(
                    "p-6 rounded-lg border-2 text-left transition-all duration-200",
                    "hover:shadow-md hover:-translate-y-1",
                    selectedCategory === category.id
                      ? "border-primary/40 bg-primary/5"
                      : "border-gray-200 hover:border-primary/20"
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      category.color.replace('text-', 'bg-') + '/10'
                    )}>
                      <Icon className={cn("w-6 h-6", category.color)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {renderCategoryContent()}
        </>
      )}
    </div>
  );
}

interface CalcCardProps {
  title: string;
  description: string;
  icon: React.FC<any>;
  onClick: () => void;
  specialty?: string;
}

const CalcCard: React.FC<CalcCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  specialty
}) => {
  return (
    <button
      onClick={onClick}
      className="block w-full p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all duration-200 hover:shadow-md text-left"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          {specialty && (
            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {specialty}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
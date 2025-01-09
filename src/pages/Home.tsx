import React from 'react';
import { specialties } from '../data/specialties';
import { SpecialtyCard } from '../components/SpecialtyCard';
import { GlobalSearch } from '../components/search/GlobalSearch';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Calculator, AlertCircle, Pill } from 'lucide-react';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Especialidades Médicas</h1>
        <p className="text-lg text-gray-600">
          Selecione uma especialidade para iniciar uma consulta
        </p>
      </div>
      
      <div className="mb-8">
        <GlobalSearch />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link 
          to="/pharmacy"
          className="block p-6 bg-white rounded-lg shadow-sm border-2 border-primary/20 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Pill className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Biblioteca Farmacológica</h2>
              <p className="text-gray-600">
                Base de dados completa de medicamentos baseada em evidências
              </p>
            </div>
          </div>
        </Link>

        <Link 
          to="/physical-exam"
          className="block p-6 bg-white rounded-lg shadow-sm border-2 border-primary/20 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Guia de Exame Físico</h2>
              <p className="text-gray-600">
                Roteiros sistemáticos para exame físico baseado em evidências
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/calculators"
          className="block p-6 bg-white rounded-lg shadow-sm border-2 border-primary/20 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculadoras Médicas</h2>
              <p className="text-gray-600">
                Scores e calculadoras validadas para suporte à decisão
              </p>
            </div>
          </div>
        </Link>

        <button
          onClick={() => navigate('/emergency')}
          className="block p-6 bg-red-50 rounded-lg shadow-sm border-2 border-red-200 hover:border-red-300 transition-colors col-span-full"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold text-red-900">Modo Emergência</h2>
              <p className="text-red-700">
                Acesso rápido a protocolos de emergência e calculadoras críticas
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className={cn(
        "grid gap-6",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      )}>
        {specialties.map((specialty) => (
          <SpecialtyCard key={specialty.id} specialty={specialty} />
        ))}
      </div>
    </div>
  );
};

export default Home;
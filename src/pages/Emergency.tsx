import React, { useState } from 'react';
import { EmergencyProtocolViewer } from '../components/emergency/EmergencyProtocolViewer';
import { emergencyProtocols } from '../data/protocols';
import { EmergencyProtocol } from '../types/emergency';
import { Heart, Activity, Brain, AlertTriangle, Timer, Zap, Baby, Stethoscope } from 'lucide-react';
import { cn } from '../lib/utils';

const protocolIcons = {
  acls: Heart,
  sepsis: Activity,
  stroke: Brain,
  ami: Heart,
  anaphylaxis: Zap,
  'status-epilepticus': Brain,
  pals: Baby,
  eclampsia: Stethoscope,
  trauma: AlertTriangle
};

export default function Emergency() {
  const [selectedProtocol, setSelectedProtocol] = useState<EmergencyProtocol | null>(null);
  const [startTime] = useState(new Date());

  const elapsedTime = () => {
    return Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
  };

  if (selectedProtocol) {
    return (
      <EmergencyProtocolViewer
        protocol={selectedProtocol}
        onComplete={() => setSelectedProtocol(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 text-white p-6 rounded-lg shadow-lg dark:from-red-900 dark:to-red-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Modo Emergência</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5" />
            <span className="font-mono">{elapsedTime()}s</span>
          </div>
        </div>
        <p className="text-red-100">
          Acesso rápido a protocolos de emergência e calculadoras críticas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyProtocols.map(protocol => {
          const Icon = protocolIcons[protocol.type as keyof typeof protocolIcons] || AlertTriangle;
          return (
            <button
              key={protocol.id}
              onClick={() => setSelectedProtocol(protocol)}
              className={cn(
                "p-6 rounded-lg border-2 text-left transition-all duration-200",
                "hover:shadow-md hover:-translate-y-1",
                protocol.type === 'acls' && "border-red-200 hover:border-red-400 bg-red-50/80 dark:bg-red-900/20 dark:border-red-700",
                protocol.type === 'sepsis' && "border-orange-200 hover:border-orange-400 bg-orange-50/80 dark:bg-orange-900/20 dark:border-orange-700",
                protocol.type === 'stroke' && "border-purple-200 hover:border-purple-400 bg-purple-50/80 dark:bg-purple-900/20 dark:border-purple-700",
                protocol.type === 'ami' && "border-pink-200 hover:border-pink-400 bg-pink-50/80 dark:bg-pink-900/20 dark:border-pink-700",
                protocol.type === 'anaphylaxis' && "border-yellow-200 hover:border-yellow-400 bg-yellow-50/80 dark:bg-yellow-900/20 dark:border-yellow-700",
                protocol.type === 'status-epilepticus' && "border-indigo-200 hover:border-indigo-400 bg-indigo-50/80 dark:bg-indigo-900/20 dark:border-indigo-700",
                protocol.type === 'pals' && "border-blue-200 hover:border-blue-400 bg-blue-50/80 dark:bg-blue-900/20 dark:border-blue-700",
                protocol.type === 'eclampsia' && "border-teal-200 hover:border-teal-400 bg-teal-50/80 dark:bg-teal-900/20 dark:border-teal-700",
                protocol.type === 'trauma' && "border-gray-200 hover:border-gray-400 bg-gray-50/80 dark:bg-gray-900/20 dark:border-gray-700"
              )}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "p-3 rounded-full",
                  protocol.type === 'acls' && "bg-red-100 dark:bg-red-800",
                  protocol.type === 'sepsis' && "bg-orange-100 dark:bg-orange-800",
                  protocol.type === 'stroke' && "bg-purple-100 dark:bg-purple-800"
                )}>
                  <Icon className={cn(
                    "w-6 h-6",
                    protocol.type === 'acls' && "text-red-600 dark:text-red-200",
                    protocol.type === 'sepsis' && "text-orange-600 dark:text-orange-200",
                    protocol.type === 'stroke' && "text-purple-600 dark:text-purple-200"
                  )} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {protocol.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {protocol.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full font-medium",
                      protocol.type === 'acls' && "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
                      protocol.type === 'sepsis' && "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200",
                      protocol.type === 'stroke' && "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
                    )}>
                      {protocol.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Nível de Evidência: {protocol.evidenceLevel}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Assistente Médico Baseado em Evidências
          </h1>
          <p className="text-xl text-gray-600">
            Acesse calculadoras, protocolos e diretrizes atualizadas para suporte à decisão clínica
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Stethoscope className="w-12 h-12 text-primary" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">MedChat</h2>
            <p className="mt-2 text-center text-sm text-gray-600 lg:hidden">
              Seu assistente médico baseado em evidências
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou continue sem login</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Acessar como Visitante
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/register" className="font-medium text-primary hover:text-primary/80">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
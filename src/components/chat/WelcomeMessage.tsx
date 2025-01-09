import React, { useState } from 'react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { QuickAccessTools } from './QuickAccessTools';

interface WelcomeMessageProps {
  specialtyId: string;
  onToolSelect: (tool: string) => void;
}

interface Tip {
  id: string;
  title: string;
  content: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  link?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  specialtyId,
  onToolSelect
}) => {
  const [tips] = useState<Tip[]>([
    {
      id: '1',
      title: 'Protocolos Atualizados',
      content: 'Acesse os protocolos mais recentes e diretrizes baseadas em evidências.'
    },
    {
      id: '2',
      title: 'Análise de Casos',
      content: 'Utilize nossa ferramenta de análise de casos para suporte à decisão clínica.'
    },
    {
      id: '3',
      title: 'Modo Ensino',
      content: 'Ative o modo ensino para explicações detalhadas e conteúdo educacional.'
    }
  ]);

  const [faqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Pergunta frequente 1?',
      answer: 'Resposta detalhada para a pergunta 1...',
      link: '/guidelines/1'
    },
    {
      id: '2',
      question: 'Pergunta frequente 2?',
      answer: 'Resposta detalhada para a pergunta 2...',
      link: '/guidelines/2'
    },
    {
      id: '3',
      question: 'Pergunta frequente 3?',
      answer: 'Resposta detalhada para a pergunta 3...',
      link: '/guidelines/3'
    }
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="max-w-lg">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Olá! Sou o MedChat, seu assistente virtual para informações médicas baseadas em evidências.
        </h2>
        <p className="text-muted-foreground mb-8">
          Selecione uma ferramenta no menu lateral ou digite sua pergunta aqui para começar.
        </p>

        <QuickAccessTools onToolSelect={onToolSelect} className="mb-8" />

        <div className="space-y-4">
          <CollapsibleSection title="Dicas Contextuais">
            <ul className="space-y-3">
              {tips.map((tip) => (
                <li key={tip.id} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                  <h4 className="font-medium mb-1">{tip.title}</h4>
                  <p className="text-muted-foreground">{tip.content}</p>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Perguntas Frequentes">
            <ul className="space-y-4">
              {faqs.map((faq) => (
                <li key={faq.id} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground mb-2">{faq.answer}</p>
                  {faq.link && (
                    <a
                      href={faq.link}
                      className="text-sm text-primary hover:underline"
                    >
                      Ver na íntegra →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};
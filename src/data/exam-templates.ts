import { ExamTemplate } from '../types/physical-exam';

export const examTemplates: ExamTemplate[] = [
  {
    type: 'head-neck',
    title: 'Semiologia de Cabeça e Pescoço',
    description: 'Avaliação sistemática e detalhada das estruturas da cabeça e pescoço, incluindo pares cranianos',
    steps: [
      {
        id: 'head-inspection',
        title: 'Inspeção da Cabeça',
        description: 'Observe simetria facial, movimentos involuntários, alterações cutâneas e postura cefálica',
        required: true,
        technicalTerms: [
          'assimetria facial',
          'ptose palpebral',
          'nistagmo',
          'paralisia facial',
          'fasciculações',
          'tiques'
        ],
        normalFindings: [
          'Face simétrica em repouso e movimento',
          'Movimentos oculares conjugados preservados',
          'Ausência de movimentos involuntários',
          'Pele íntegra sem lesões'
        ],
        abnormalFindings: [
          'Assimetria facial em repouso ou movimento',
          'Desvio de rima',
          'Ptose palpebral',
          'Movimentos oculares descoordenados'
        ]
      },
      {
        id: 'cranial-nerves',
        title: 'Avaliação dos Pares Cranianos',
        description: 'Examine sistematicamente os 12 pares de nervos cranianos',
        required: true,
        technicalTerms: [
          'anosmia',
          'diplopia',
          'paresia facial',
          'disfagia',
          'disartria'
        ],
        normalFindings: [
          'Olfato preservado bilateralmente',
          'Acuidade visual preservada',
          'Movimentos oculares preservados',
          'Sensibilidade facial preservada',
          'Mímica facial simétrica',
          'Audição preservada',
          'Deglutição normal',
          'Fonação normal',
          'Língua centrada'
        ],
        abnormalFindings: [
          'Alteração do olfato',
          'Déficit visual',
          'Alteração da motricidade ocular',
          'Hipoestesia facial',
          'Paralisia facial',
          'Hipoacusia',
          'Disfagia',
          'Desvio da língua'
        ]
      },
      {
        id: 'neck-palpation',
        title: 'Palpação Cervical',
        description: 'Realize palpação sistemática de linfonodos, tireoide e estruturas cervicais, avaliando mobilidade e características',
        required: true,
        technicalTerms: [
          'linfonodomegalia',
          'bócio',
          'tireoidite',
          'nódulo',
          'pulso carotídeo',
          'frêmito'
        ],
        normalFindings: [
          'Linfonodos não palpáveis ou pequenos, móveis e indolores',
          'Tireoide normal à palpação',
          'Pulsos carotídeos simétricos',
          'Ausência de frêmitos'
        ],
        abnormalFindings: [
          'Linfonodos aumentados, fixos ou dolorosos',
          'Tireoide aumentada ou nodular',
          'Assimetria de pulsos carotídeos',
          'Frêmito cervical'
        ]
      },
      {
        id: 'neck-mobility',
        title: 'Avaliação da Mobilidade Cervical',
        description: 'Examine amplitude de movimento e presença de limitações ou dor',
        required: true,
        technicalTerms: [
          'rigidez nucal',
          'torcicolo',
          'contratura muscular',
          'amplitude de movimento'
        ],
        normalFindings: [
          'Mobilidade cervical preservada em todos os planos',
          'Ausência de dor à movimentação',
          'Tônus muscular normal'
        ],
        abnormalFindings: [
          'Limitação da mobilidade cervical',
          'Dor à movimentação',
          'Rigidez nucal',
          'Contratura muscular'
        ]
      }
    ]
  },
  {
    type: 'skin',
    title: 'Exame da Pele e Anexos',
    description: 'Avaliação dermatológica completa incluindo mucosas e fâneros',
    steps: [
      {
        id: 'skin-inspection',
        title: 'Inspeção da Pele',
        description: 'Observe coloração, lesões elementares, distribuição',
        required: true,
        technicalTerms: ['mácula', 'pápula', 'nódulo', 'vesícula'],
        normalFindings: ['Pele íntegra', 'Coloração uniforme'],
        abnormalFindings: ['Lesões cutâneas', 'Alteração de coloração']
      }
    ]
  },
  {
    type: 'thorax-respiratory',
    title: 'Exame do Tórax e Sistema Respiratório',
    description: 'Avaliação completa da estrutura torácica e função respiratória',
    steps: [
      {
        id: 'thorax-inspection',
        title: 'Inspeção do Tórax',
        description: 'Observe formato, simetria e padrão respiratório',
        required: true,
        technicalTerms: ['tiragem intercostal', 'tipo respiratório', 'frequência respiratória'],
        normalFindings: ['Tórax simétrico', 'FR normal'],
        abnormalFindings: ['Tiragem intercostal', 'Uso de musculatura acessória']
      }
    ]
  },
  {
    type: 'cardiovascular',
    title: 'Exame Cardíaco',
    description: 'Avaliação sistemática e detalhada do sistema cardiovascular, incluindo inspeção, palpação e ausculta',
    steps: [
      {
        id: 'cv-inspection',
        title: 'Inspeção Precordial',
        description: 'Observe o precórdio em busca de abaulamentos, retrações e visualização do ictus cordis',
        required: true,
        technicalTerms: [
          'ictus cordis',
          'pulso venoso jugular',
          'abaulamento sistólico',
          'retração sistólica',
          'circulação colateral'
        ],
        normalFindings: [
          'Ictus cordis não visível ou discretamente visível no 5º EIC esquerdo',
          'Ausência de abaulamentos ou retrações',
          'Ausência de circulação colateral'
        ],
        abnormalFindings: [
          'Ictus cordis visível e desviado lateralmente',
          'Abaulamento sistólico difuso',
          'Retrações sistólicas',
          'Circulação colateral visível'
        ]
      },
      {
        id: 'cv-palpation',
        title: 'Palpação do Precórdio',
        description: 'Palpe o precórdio para localizar e caracterizar o ictus cordis e detectar frêmitos',
        required: true,
        technicalTerms: [
          'ictus cordis palpável',
          'frêmito sistólico',
          'frêmito diastólico',
          'impulsão sistólica',
          'choque de ponta'
        ],
        normalFindings: [
          'Ictus cordis palpável no 5º EIC esquerdo na linha hemiclavicular',
          'Área de 2 polpas digitais',
          'Ausência de frêmitos',
          'Impulsão normal'
        ],
        abnormalFindings: [
          'Ictus cordis desviado lateralmente',
          'Ictus cordis propulsivo ou cupuliforme',
          'Frêmito sistólico em focos da base',
          'Frêmito diastólico'
        ]
      },
      {
        id: 'cv-auscultation',
        title: 'Ausculta Cardíaca',
        description: 'Ausculte sistematicamente os focos cardíacos, avaliando ritmo, bulhas e ruídos adventícios',
        required: true,
        technicalTerms: [
          'bulhas normofonéticas',
          'hiperfonese',
          'hipofonese',
          'desdobramento',
          'sopro sistólico',
          'sopro diastólico',
          'atrito pericárdico',
          'estalido',
          'B3',
          'B4'
        ],
        normalFindings: [
          'Ritmo cardíaco regular em 2 tempos',
          'Bulhas normofonéticas',
          'Ausência de sopros',
          'Ausência de ruídos adventícios'
        ],
        abnormalFindings: [
          'Ritmo cardíaco irregular',
          'Bulhas hipofonéticas ou hiperfonéticas',
          'Desdobramento patológico de bulhas',
          'Sopros cardíacos',
          'Presença de B3 ou B4',
          'Atrito pericárdico'
        ]
      },
      {
        id: 'cv-maneuvers',
        title: 'Manobras Especiais',
        description: 'Realize manobras específicas para caracterizar achados auscultatórios',
        required: false,
        technicalTerms: [
          'manobra de Valsalva',
          'manobra de handgrip',
          'mudança postural',
          'ausculta na posição sentada',
          'ausculta em decúbito lateral esquerdo'
        ],
        normalFindings: [
          'Ausência de alterações significativas com as manobras'
        ],
        abnormalFindings: [
          'Intensificação de sopros com manobras',
          'Aparecimento de B3 em decúbito lateral',
          'Alteração do desdobramento com respiração'
        ]
      }
    ]
  },
  {
    type: 'vascular',
    title: 'Exame do Sistema Vascular Periférico',
    description: 'Avaliação da circulação arterial e venosa periférica',
    steps: [
      {
        id: 'pulse-palpation',
        title: 'Palpação de Pulsos',
        description: 'Avalie pulsos periféricos bilateralmente',
        required: true,
        technicalTerms: ['amplitude', 'simetria', 'ritmo'],
        normalFindings: ['Pulsos simétricos e rítmicos'],
        abnormalFindings: ['Pulsos assimétricos', 'Ausência de pulsos']
      }
    ]
  },
  {
    type: 'lymphatic',
    title: 'Exame dos Gânglios e Sistema Linfático',
    description: 'Avaliação sistemática do sistema linfático',
    steps: [
      {
        id: 'lymph-palpation',
        title: 'Palpação Ganglionar',
        description: 'Examine todas as cadeias ganglionares',
        required: true,
        technicalTerms: ['linfonodomegalia', 'consistência', 'mobilidade'],
        normalFindings: ['Gânglios não palpáveis'],
        abnormalFindings: ['Linfonodos aumentados', 'Linfonodos fixos']
      }
    ]
  },
  {
    type: 'abdomen',
    title: 'Exame Físico de Abdome e Sistema Digestório',
    description: 'Avaliação completa do abdome e sistema digestivo',
    steps: [
      {
        id: 'abdomen-inspection',
        title: 'Inspeção do Abdome',
        description: 'Observe forma, volume e movimentos',
        required: true,
        technicalTerms: ['distensão', 'circulação colateral', 'peristaltismo visível'],
        normalFindings: ['Abdome plano', 'Ausência de distensão'],
        abnormalFindings: ['Distensão abdominal', 'Circulação colateral']
      }
    ]
  },
  {
    type: 'locomotor',
    title: 'Exame do Sistema Locomotor',
    description: 'Avaliação da função musculoesquelética',
    steps: [
      {
        id: 'muscle-exam',
        title: 'Exame Muscular',
        description: 'Avalie força, tônus e trofismo',
        required: true,
        technicalTerms: ['força muscular', 'tônus', 'atrofia'],
        normalFindings: ['Força muscular preservada', 'Tônus normal'],
        abnormalFindings: ['Diminuição de força', 'Atrofia muscular']
      }
    ]
  },
  {
    type: 'osteoarticular',
    title: 'Exame Osteoarticular',
    description: 'Avaliação sistemática do sistema osteoarticular',
    steps: [
      {
        id: 'joint-exam',
        title: 'Exame Articular',
        description: 'Avalie mobilidade e estabilidade',
        required: true,
        technicalTerms: ['amplitude de movimento', 'crepitação', 'instabilidade'],
        normalFindings: ['Mobilidade preservada', 'Articulações estáveis'],
        abnormalFindings: ['Limitação de movimento', 'Instabilidade articular']
      }
    ]
  },
  {
    type: 'urinary',
    title: 'Exame das Vias Urinárias e Sistema Reprodutor Masculino',
    description: 'Avaliação do sistema geniturinário masculino',
    steps: [
      {
        id: 'genital-exam',
        title: 'Exame Genital',
        description: 'Realize inspeção e palpação',
        required: true,
        technicalTerms: ['fimose', 'hidrocele', 'varicocele'],
        normalFindings: ['Genitália sem alterações'],
        abnormalFindings: ['Presença de varicocele', 'Hidrocele']
      }
    ]
  },
  {
    type: 'gynecologic',
    title: 'Semiologia Ginecológica e Mamária',
    description: 'Avaliação ginecológica e das mamas',
    steps: [
      {
        id: 'breast-exam',
        title: 'Exame das Mamas',
        description: 'Realize inspeção e palpação mamária',
        required: true,
        technicalTerms: ['nódulo', 'retração', 'descarga papilar'],
        normalFindings: ['Mamas simétricas', 'Ausência de nódulos'],
        abnormalFindings: ['Nódulo palpável', 'Retração cutânea']
      }
    ]
  },
  {
    type: 'neurologic',
    title: 'Exame do Sistema Nervoso',
    description: 'Avaliação neurológica completa',
    steps: [
      {
        id: 'mental-status',
        title: 'Estado Mental',
        description: 'Avalie consciência e funções cognitivas',
        required: true,
        technicalTerms: ['nível de consciência', 'orientação', 'memória'],
        normalFindings: ['Consciente e orientado', 'Memória preservada'],
        abnormalFindings: ['Desorientação', 'Alteração de memória']
      }
    ]
  },
  {
    type: 'mental',
    title: 'Avaliação da Saúde Mental',
    description: 'Exame do estado mental e aspectos psiquiátricos',
    steps: [
      {
        id: 'psychiatric-exam',
        title: 'Exame Psiquiátrico',
        description: 'Avalie humor e comportamento',
        required: true,
        technicalTerms: ['humor', 'afeto', 'pensamento'],
        normalFindings: ['Humor eutímico', 'Pensamento organizado'],
        abnormalFindings: ['Alteração do humor', 'Pensamento desorganizado']
      }
    ]
  }
];
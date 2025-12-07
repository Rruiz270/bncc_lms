// BNCC Data Service
// This would normally connect to the database, but for now we'll use the CSV data

export interface BNCCCompetency {
  code: string
  text: string
  subject?: string
  area?: string
  year: number | string
  skillType: string
  cognitiveType: string
  domainTypology?: string
  cognitiveProcesses: string[]
}

export interface BNCCStats {
  totalCompetencies: number
  fundamentalSkills: number
  medioSkills: number
  skillTypes: number
  cognitiveTypes: number
  subjects: number
  areas: number
}

// Sample BNCC data based on our analysis - in production this would be loaded from database
export const bnccStats: BNCCStats = {
  totalCompetencies: 1512,
  fundamentalSkills: 678,
  medioSkills: 417,
  skillTypes: 14,
  cognitiveTypes: 9,
  subjects: 7,
  areas: 5
}

export const fundamentalSubjects = [
  'Língua Portuguesa',
  'Matemática', 
  'Ciências',
  'Geografia',
  'História',
  'Arte',
  'Educação Física',
  'Ensino Religioso',
  'Língua Inglesa'
]

export const medioAreas = [
  'Linguagens e suas Tecnologias',
  'Matemática e suas Tecnologias', 
  'Ciências da Natureza e suas Tecnologias',
  'Ciências Humanas e Sociais Aplicadas'
]

export const skillTypes = [
  'Análise Crítica',
  'Aplicação de Conhecimentos',
  'Argumentação',
  'Comparação e Classificação',
  'Compreensão Geral',
  'Comunicação e Expressão',
  'Criação e Produção',
  'Cálculo e Operações',
  'Investigação e Pesquisa',
  'Leitura e Interpretação',
  'Memorização',
  'Movimento e Corporeidade',
  'Observação e Identificação',
  'Produção Textual'
]

export const cognitiveTypes = [
  'Análise (Pensamento Crítico)',
  'Aplicação (Execução)',
  'Atenção (Percepção)',
  'Avaliação (Julgamento)',
  'Compreensão (Interpretação)',
  'Criação (Síntese)',
  'Memória (Recordação)',
  'Processamento Integrado',
  'Psicomotora (Coordenação)'
]

// Expanded sample BNCC competencies - representing the actual 1,512 competencies
export const sampleBNCCCompetencies: BNCCCompetency[] = [
  // Ensino Fundamental - Língua Portuguesa
  {
    code: "EF01LP01",
    text: "Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.",
    subject: "Língua Portuguesa",
    year: 1,
    skillType: "Leitura e Interpretação",
    cognitiveType: "Atenção (Percepção)",
    domainTypology: "Apropriação do sistema de escrita alfabética",
    cognitiveProcesses: ["Processamento Visual", "Pensamento Analítico"]
  },
  {
    code: "EF01LP02", 
    text: "Escrever, espontaneamente ou por ditado, palavras e frases de forma alfabética – usando letras/grafemas que representem fonemas.",
    subject: "Língua Portuguesa",
    year: 1,
    skillType: "Produção Textual",
    cognitiveType: "Aplicação (Execução)",
    domainTypology: "Apropriação do sistema de escrita alfabética",
    cognitiveProcesses: ["Processamento Geral"]
  },
  {
    code: "EF02LP01",
    text: "Utilizar, ao produzir o texto, grafia correta de palavras conhecidas ou com estruturas silábicas já dominadas, letras maiúsculas em início de frases e em substantivos próprios, segmentação entre as palavras, ponto final, ponto de interrogação e ponto de exclamação.",
    subject: "Língua Portuguesa", 
    year: 2,
    skillType: "Produção Textual",
    cognitiveType: "Aplicação (Execução)",
    domainTypology: "Construção do sistema alfabético e da ortografia",
    cognitiveProcesses: ["Processamento Geral"]
  },

  // Ensino Fundamental - Matemática
  {
    code: "EF01MA01",
    text: "Utilizar números naturais como indicador de quantidade ou de ordem em diferentes situações cotidianas e reconhecer situações em que os números não indicam contagem nem ordem, mas sim código de identificação.",
    subject: "Matemática",
    year: 1,
    skillType: "Observação e Identificação", 
    cognitiveType: "Compreensão (Interpretação)",
    domainTypology: "Números",
    cognitiveProcesses: ["Processamento Geral"]
  },
  {
    code: "EF01MA02",
    text: "Contar de maneira exata ou aproximada, utilizando diferentes estratégias como o pareamento e outros agrupamentos.",
    subject: "Matemática",
    year: 1,
    skillType: "Cálculo e Operações",
    cognitiveType: "Aplicação (Execução)",
    domainTypology: "Números",
    cognitiveProcesses: ["Processamento Visual"]
  },
  {
    code: "EF02MA01",
    text: "Comparar e ordenar números naturais (até a ordem de centenas) pela compreensão de características do sistema de numeração decimal (valor posicional e função do zero).",
    subject: "Matemática",
    year: 2,
    skillType: "Comparação e Classificação",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Números",
    cognitiveProcesses: ["Pensamento Analítico"]
  },

  // Ensino Fundamental - História
  {
    code: "EF01HI01",
    text: "Identificar aspectos do seu crescimento por meio do registro das lembranças particulares ou de lembranças dos membros de sua família e/ou de sua comunidade.",
    subject: "História",
    year: 1,
    skillType: "Observação e Identificação",
    cognitiveType: "Compreensão (Interpretação)",
    domainTypology: "Mundo pessoal: meu lugar no mundo",
    cognitiveProcesses: ["Memória Trabalho"]
  },
  {
    code: "EF02HI01",
    text: "Reconhecer espaços de sociabilidade e identificar os motivos que aproximam e separam as pessoas em diferentes grupos sociais ou de parentesco.",
    subject: "História",
    year: 2,
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "A comunidade e seus registros",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Fundamental - Geografia  
  {
    code: "EF01GE01",
    text: "Descrever características observadas de seus lugares de vivência (moradia, escola etc.) e identificar semelhanças e diferenças entre esses lugares.",
    subject: "Geografia",
    year: 1,
    skillType: "Observação e Identificação",
    cognitiveType: "Atenção (Percepção)",
    domainTypology: "O sujeito e seu lugar no mundo",
    cognitiveProcesses: ["Processamento Visual"]
  },
  {
    code: "EF02GE01",
    text: "Descrever a história das migrações no bairro ou comunidade em que vive.",
    subject: "Geografia",
    year: 2,
    skillType: "Compreensão Geral",
    cognitiveType: "Compreensão (Interpretação)",
    domainTypology: "O sujeito e seu lugar no mundo",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Fundamental - Ciências
  {
    code: "EF01CI01",
    text: "Comparar características de diferentes materiais presentes em objetos de uso cotidiano, discutindo sua origem, os modos como são descartados e como esse descarte afeta o ambiente.",
    subject: "Ciências",
    year: 1,
    skillType: "Comparação e Classificação",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Matéria e energia",
    cognitiveProcesses: ["Processamento Integrado"]
  },
  {
    code: "EF02CI01",
    text: "Identificar de que materiais (metais, madeira, vidro etc.) são feitos os objetos que fazem parte da vida cotidiana, como esses objetos são utilizados e com quais materiais eram produzidos no passado.",
    subject: "Ciências",
    year: 2,
    skillType: "Observação e Identificação",
    cognitiveType: "Compreensão (Interpretação)",
    domainTypology: "Matéria e energia",
    cognitiveProcesses: ["Processamento Geral"]
  },

  // Ensino Fundamental - Língua Inglesa (6º ano em diante)
  {
    code: "EF06LI01",
    text: "Interagir em situações de intercâmbio oral, demonstrando iniciativa para utilizar a língua inglesa.",
    subject: "Língua Inglesa",
    year: 6,
    skillType: "Comunicação e Expressão",
    cognitiveType: "Aplicação (Execução)",
    domainTypology: "Interação discursiva",
    cognitiveProcesses: ["Processamento Integrado"]
  },
  {
    code: "EF07LI01",
    text: "Interagir em situações de intercâmbio oral para realizar as atividades em sala de aula, de forma respeitosa e colaborativa, trocando ideias e engajando-se em brincadeiras e jogos.",
    subject: "Língua Inglesa",
    year: 7,
    skillType: "Comunicação e Expressão",
    cognitiveType: "Aplicação (Execução)",
    domainTypology: "Interação discursiva",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Fundamental - Ensino Religioso
  {
    code: "EF01ER01",
    text: "Identificar e acolher as semelhanças e diferenças entre o eu, o outro e o nós.",
    subject: "Ensino Religioso",
    year: 1,
    skillType: "Observação e Identificação",
    cognitiveType: "Compreensão (Interpretação)",
    domainTypology: "Identidades e alteridades",
    cognitiveProcesses: ["Processamento Geral"]
  },
  {
    code: "EF02ER01",
    text: "Reconhecer os diferentes espaços de convivência.",
    subject: "Ensino Religioso",
    year: 2,
    skillType: "Observação e Identificação", 
    cognitiveType: "Atenção (Percepção)",
    domainTypology: "Identidades e alteridades",
    cognitiveProcesses: ["Processamento Visual"]
  },

  // Ensino Médio - Linguagens e suas Tecnologias
  {
    code: "EM13LGG101",
    text: "Compreender e analisar processos de produção e circulação de discursos, nas diferentes linguagens, para fazer escolhas fundamentadas em função de interesses pessoais e coletivos.",
    area: "Linguagens e suas Tecnologias",
    year: "10º-12º",
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Linguagens e suas práticas",
    cognitiveProcesses: ["Processamento Integrado"]
  },
  {
    code: "EM13LGG102", 
    text: "Analisar visões de mundo, conflitos de interesse, preconceitos e ideologias presentes nos discursos veiculados nas diferentes mídias, ampliando suas possibilidades de explicação, interpretação e intervenção crítica da/na realidade.",
    area: "Linguagens e suas Tecnologias",
    year: "10º-12º",
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Linguagens e suas práticas",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Médio - Matemática e suas Tecnologias
  {
    code: "EM13MAT101",
    text: "Interpretar criticamente situações econômicas, sociais e fatos relativos às Ciências da Natureza que envolvam a variação de grandezas, pela análise dos gráficos das funções representadas e suas taxas de variação, com ou sem apoio de tecnologias digitais.",
    area: "Matemática e suas Tecnologias",
    year: "10º-12º",
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Números e álgebra",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Médio - Ciências da Natureza e suas Tecnologias
  {
    code: "EM13CNT101",
    text: "Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais específicos, as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento para realizar previsões sobre seus comportamentos em situações cotidianas e em processos produtivos que priorizem o desenvolvimento sustentável, o uso consciente dos recursos naturais e a preservação da vida em todas as suas formas.",
    area: "Ciências da Natureza e suas Tecnologias",
    year: "10º-12º",
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Matéria e energia",
    cognitiveProcesses: ["Processamento Integrado"]
  },

  // Ensino Médio - Ciências Humanas e Sociais Aplicadas
  {
    code: "EM13CHS101",
    text: "Analisar e comparar diferentes fontes e narrativas expressas em diversas linguagens, com vistas à compreensão e à crítica de ideologias implícitas, de poder e de dominação presentes.",
    area: "Ciências Humanas e Sociais Aplicadas",
    year: "10º-12º",
    skillType: "Análise Crítica",
    cognitiveType: "Análise (Pensamento Crítico)",
    domainTypology: "Tempo e espaço",
    cognitiveProcesses: ["Processamento Integrado"]
  }
]

// Functions to filter and search BNCC data
export function filterCompetencies(
  competencies: BNCCCompetency[],
  filters: {
    search?: string
    level?: 'all' | 'fundamental' | 'medio'
    subject?: string
    skillType?: string
    cognitiveType?: string
  }
): BNCCCompetency[] {
  return competencies.filter(comp => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!comp.text.toLowerCase().includes(searchLower) && 
          !comp.code.toLowerCase().includes(searchLower)) {
        return false
      }
    }

    // Level filter
    if (filters.level && filters.level !== 'all') {
      if (filters.level === 'fundamental' && typeof comp.year !== 'number') return false
      if (filters.level === 'medio' && typeof comp.year !== 'string') return false
    }

    // Subject filter
    if (filters.subject && filters.subject !== 'all') {
      if (comp.subject !== filters.subject && comp.area !== filters.subject) return false
    }

    // Skill type filter
    if (filters.skillType && filters.skillType !== 'all') {
      if (comp.skillType !== filters.skillType) return false
    }

    // Cognitive type filter
    if (filters.cognitiveType && filters.cognitiveType !== 'all') {
      if (comp.cognitiveType !== filters.cognitiveType) return false
    }

    return true
  })
}

export function getCompetenciesBySubject(subject: string): BNCCCompetency[] {
  return sampleBNCCCompetencies.filter(comp => comp.subject === subject || comp.area === subject)
}

export function getCompetenciesByYear(year: number | string): BNCCCompetency[] {
  return sampleBNCCCompetencies.filter(comp => comp.year === year)
}

export function getCompetencyByCode(code: string): BNCCCompetency | undefined {
  return sampleBNCCCompetencies.find(comp => comp.code === code)
}
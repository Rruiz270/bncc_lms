# BNCC LMS - Sistema de Gestão Escolar

Sistema de gestão escolar baseado na Base Nacional Comum Curricular (BNCC) desenvolvido para a Secretaria de Educação de Santa Catarina.

## 🎯 Objetivo

Digitalizar e otimizar o processo educacional de 1.038 escolas e ~51.000 professores através de um sistema integrado que mapeia competências BNCC e facilita a criação, execução e análise de aulas.

## 🏗️ Arquitetura do Sistema

### Módulos Principais

- **🔧 Builder**: Estrutura curricular e competências BNCC
- **👥 Manager**: Gestão de escolas, professores e alunos  
- **✏️ Creator**: Planejamento e criação de aulas
- **▶️ Player**: Execução e interação em sala de aula
- **📊 Trainer**: Análise de performance e relatórios

## 🎨 Design System

Paleta de cores customizada:
- **Azure (#6CCFF6)**: Ações primárias e módulo Builder/Player
- **Rich Black (#001011)**: Texto e cabeçalhos
- **Gray (#757780)**: Texto secundário e módulo Manager
- **Baby Powder (#FFFFFC)**: Fundos e cards
- **Yellow Green (#A4DF00)**: Sucesso e módulo Creator

## 🚀 Tecnologias

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL com Prisma ORM
- **UI**: Radix UI, Lucide Icons
- **Autenticação**: NextAuth.js

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/rruiz270/bncc_lms.git
cd bncc_lms

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Execute as migrações do banco
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

O sistema implementa um schema completo baseado na estrutura BNCC:

### Builder Module
- Níveis educacionais (Fundamental/Médio)
- Séries (1º-9º Fundamental, 1º-3º Médio)
- Disciplinas e áreas do conhecimento
- Competências e habilidades BNCC
- Processos cognitivos

### Manager Module
- Cadastro de escolas
- Gestão de professores (Contratado/ACT)
- Turmas e classes
- Alunos e responsáveis
- Relacionamentos professor-turma-disciplina

### Estrutura Curricular
- Cursos e módulos
- Disciplinas modulares
- Carga horária por disciplina

## 📊 Dados BNCC

O sistema vem pré-configurado com:
- **1.512 competências** mapeadas
- **678 habilidades** do Ensino Fundamental
- **417 habilidades** do Ensino Médio
- **14 tipos de habilidades**
- **9 tipos cognitivos**

## 🎓 Funcionalidades Principais

### Estágio 1 (Atual)
- ✅ Controle básico de turmas
- ✅ Planejamento de aulas
- ✅ Criação de artefatos
- ✅ Gestão de execução

### Estágio 2 (Próximo)
- 🔄 Apresentação via projetor/lousa digital
- 🔄 Exercícios em tempo real
- 🔄 Avaliação de resultados

### Estágios Futuros
- 📅 Avaliação digital de alunos
- 📱 Tarefas de casa online
- 📹 Monitoramento audiovisual

## 🔐 Perfis de Usuário

- **Administração**: Secretaria de Educação
- **Coordenação**: Secretaria e escolas
- **Orientação**: Pedagógica
- **Professor**: Criação e execução de aulas

## 📈 Métricas do Sistema

- **1.038** escolas na rede
- **51.000** professores cadastrados
- **1.512** competências BNCC implementadas
- **Disponibilização**: 12/12/2024
- **Validação**: 15/12/2024

## 🤝 Contribuição

Este projeto está sendo desenvolvido para a Secretaria de Educação de Santa Catarina. Para contribuições, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Projeto proprietário - Secretaria de Educação de Santa Catarina.

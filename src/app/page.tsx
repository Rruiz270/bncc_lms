import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen, 
  Users, 
  PencilRuler, 
  Play, 
  BarChart3,
  School,
  GraduationCap,
  FileText,
  Calendar,
  Settings
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-black">BNCC LMS</h1>
              <p className="text-primary-gray">Sistema de Gestão Escolar Baseado na BNCC</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="default" size="sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-primary-gray">Total de Escolas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-black">1,038</div>
              <p className="text-xs text-primary-gray">Rede estadual ativa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-primary-gray">Professores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-black">51,000</div>
              <p className="text-xs text-primary-gray">Cadastrados no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-primary-gray">Competências BNCC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-black">1,512</div>
              <p className="text-xs text-primary-gray">Mapeadas e implementadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-primary-gray">Aulas Criadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-black">2,847</div>
              <p className="text-xs text-primary-gray">Este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Builder Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-builder/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BookOpen className="w-8 h-8 text-builder" />
                <Link href="/builder">
                  <Button variant="builder" size="sm">Acessar</Button>
                </Link>
              </div>
              <CardTitle className="text-xl">Módulo Builder</CardTitle>
              <CardDescription>
                Estrutura Curricular - Gestão de competências, habilidades e currículo BNCC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-builder rounded-full mr-2" />
                  Cadastro de Séries e Disciplinas
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-builder rounded-full mr-2" />
                  Competências x Habilidades
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-builder rounded-full mr-2" />
                  Processos Cognitivos
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manager Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-manager/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-manager" />
                <Button variant="manager" size="sm">Acessar</Button>
              </div>
              <CardTitle className="text-xl">Módulo Manager</CardTitle>
              <CardDescription>
                Gestão Escolar - Escolas, professores, turmas e alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-manager rounded-full mr-2" />
                  Cadastro de Escolas
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-manager rounded-full mr-2" />
                  Gestão de Professores
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-manager rounded-full mr-2" />
                  Turmas e Alunos
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-creator/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <PencilRuler className="w-8 h-8 text-creator" />
                <Button variant="creator" size="sm">Acessar</Button>
              </div>
              <CardTitle className="text-xl">Módulo Creator</CardTitle>
              <CardDescription>
                Criação de Conteúdo - Planejamento e criação de aulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-creator rounded-full mr-2" />
                  Planejamento de Aulas
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-creator rounded-full mr-2" />
                  Planos de Aula
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-creator rounded-full mr-2" />
                  Artefatos Multimídia
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-player/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Play className="w-8 h-8 text-player" />
                <Button variant="player" size="sm">Acessar</Button>
              </div>
              <CardTitle className="text-xl">Módulo Player</CardTitle>
              <CardDescription>
                Execução de Aulas - Apresentação e interação em sala
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-player rounded-full mr-2" />
                  Apresentação de Aulas
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-player rounded-full mr-2" />
                  Lista de Presença
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-player rounded-full mr-2" />
                  Exercícios Interativos
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trainer Module */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-trainer/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-trainer" />
                <Button variant="trainer" size="sm">Em Breve</Button>
              </div>
              <CardTitle className="text-xl">Módulo Trainer</CardTitle>
              <CardDescription>
                Análise de Performance - Dados e relatórios pedagógicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-trainer rounded-full mr-2" />
                  Performance dos Alunos
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-trainer rounded-full mr-2" />
                  Relatórios por Turma
                </div>
                <div className="flex items-center text-sm text-primary-gray">
                  <div className="w-2 h-2 bg-trainer rounded-full mr-2" />
                  Analytics Pedagógico
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <School className="w-8 h-8 text-primary-azure" />
                <Button variant="outline" size="sm">Ver Todos</Button>
              </div>
              <CardTitle className="text-xl">Acesso Rápido</CardTitle>
              <CardDescription>
                Ferramentas e relatórios mais utilizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Relatório Mensal
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendário Escolar
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Cadastro Express
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Últimas ações realizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary-powder rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-creator rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Nova aula criada - Matemática 5º Ano</p>
                      <p className="text-xs text-primary-gray">Prof. Maria Silva - Escola Municipal Santos</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary-gray">2 min atrás</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary-powder rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-manager rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">25 novos alunos cadastrados</p>
                      <p className="text-xs text-primary-gray">Escola Estadual Florianópolis</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary-gray">15 min atrás</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary-powder rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-player rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Aula executada - História 8º Ano</p>
                      <p className="text-xs text-primary-gray">Prof. João Santos - 98% presença</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary-gray">1 hora atrás</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

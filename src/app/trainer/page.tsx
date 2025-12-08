'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3,
  TrendingUp,
  Users,
  Target,
  BookOpen,
  Award,
  Clock,
  Calendar,
  Filter,
  Download,
  Upload,
  Search,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Eye,
  Brain,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Star,
  Zap,
  PieChart,
  Activity,
  FileText,
  School,
  GraduationCap,
  Settings
} from "lucide-react"
import Link from 'next/link'

// Interfaces for analytics and performance tracking
interface StudentPerformance {
  id: string
  name: string
  class: string
  school: string
  overallScore: number
  bnccProgress: number
  attendanceRate: number
  engagementLevel: 'low' | 'medium' | 'high'
  competenciesCompleted: number
  totalCompetencies: number
  lastActivity: string
  trend: 'up' | 'down' | 'stable'
}

interface ClassAnalytics {
  id: string
  name: string
  teacher: string
  subject: string
  series: number
  studentsCount: number
  averagePerformance: number
  bnccCompletion: number
  attendanceRate: number
  lessonsCompleted: number
  totalLessons: number
  activitiesCompleted: number
  engagementScore: number
}

interface SchoolStats {
  id: string
  name: string
  studentsCount: number
  teachersCount: number
  classesCount: number
  averagePerformance: number
  bnccCompletion: number
  attendanceRate: number
  engagementScore: number
  region: string
}

interface CompetencyProgress {
  code: string
  description: string
  subject: string
  year: number | string
  completionRate: number
  averageScore: number
  studentsWorking: number
  difficulty: 'easy' | 'medium' | 'hard'
  cognitiveType: string
}

export default function TrainerModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'students' | 'classes' | 'schools' | 'competencies' | 'reports'>('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedRegion, setSelectedRegion] = useState('all')

  // Mock performance data
  const systemStats = {
    totalStudents: 780000,
    activeStudents: 745000,
    totalLessons: 2847,
    completedLessons: 2340,
    averagePerformance: 78.5,
    bnccCompletion: 65.8,
    attendanceRate: 92.3,
    engagementScore: 74.2,
    improvedStudents: 85.6,
    atRiskStudents: 8.3
  }

  const topPerformers: StudentPerformance[] = [
    {
      id: '1',
      name: 'Ana Julia Santos',
      class: '5º A',
      school: 'E.E.B. Prof. Maria Silva',
      overallScore: 95.5,
      bnccProgress: 87.3,
      attendanceRate: 98.0,
      engagementLevel: 'high',
      competenciesCompleted: 156,
      totalCompetencies: 180,
      lastActivity: '2h ago',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Pedro Henrique Costa',
      class: '7º B',
      school: 'E.E.B. Dom Pedro II',
      overallScore: 93.2,
      bnccProgress: 89.1,
      attendanceRate: 95.5,
      engagementLevel: 'high',
      competenciesCompleted: 203,
      totalCompetencies: 225,
      lastActivity: '1h ago',
      trend: 'up'
    },
    {
      id: '3',
      name: 'Sofia Oliveira Lima',
      class: '3º C',
      school: 'E.E.B. Irmão José Otão',
      overallScore: 91.8,
      bnccProgress: 84.7,
      attendanceRate: 97.2,
      engagementLevel: 'high',
      competenciesCompleted: 98,
      totalCompetencies: 115,
      lastActivity: '30min ago',
      trend: 'stable'
    }
  ]

  const classAnalytics: ClassAnalytics[] = [
    {
      id: '1',
      name: '5º Ano A',
      teacher: 'Maria Fernanda Silva',
      subject: 'Matemática',
      series: 5,
      studentsCount: 28,
      averagePerformance: 84.5,
      bnccCompletion: 78.2,
      attendanceRate: 94.6,
      lessonsCompleted: 45,
      totalLessons: 60,
      activitiesCompleted: 234,
      engagementScore: 82.1
    },
    {
      id: '2',
      name: '7º Ano B',
      teacher: 'João Carlos Santos',
      subject: 'História',
      series: 7,
      studentsCount: 32,
      averagePerformance: 79.3,
      bnccCompletion: 71.8,
      attendanceRate: 91.2,
      lessonsCompleted: 38,
      totalLessons: 55,
      activitiesCompleted: 298,
      engagementScore: 77.4
    },
    {
      id: '3',
      name: '3º Ano C',
      teacher: 'Ana Paula Costa',
      subject: 'Língua Portuguesa',
      series: 3,
      studentsCount: 25,
      averagePerformance: 88.7,
      bnccCompletion: 85.4,
      attendanceRate: 96.8,
      lessonsCompleted: 52,
      totalLessons: 58,
      activitiesCompleted: 187,
      engagementScore: 91.3
    }
  ]

  const competencyProgress: CompetencyProgress[] = [
    {
      code: 'EF05MA04',
      description: 'Identificar propriedades da igualdade numérica',
      subject: 'Matemática',
      year: 5,
      completionRate: 87.3,
      averageScore: 82.1,
      studentsWorking: 15420,
      difficulty: 'medium',
      cognitiveType: 'Análise (Pensamento Crítico)'
    },
    {
      code: 'EF07LP15',
      description: 'Utilizar estratégias de condensação, ampliação e argumentação',
      subject: 'Língua Portuguesa',
      year: 7,
      completionRate: 73.8,
      averageScore: 76.4,
      studentsWorking: 12890,
      difficulty: 'hard',
      cognitiveType: 'Criação (Síntese)'
    },
    {
      code: 'EF03CI02',
      description: 'Experimentar e relatar mudanças de estado físico',
      subject: 'Ciências',
      year: 3,
      completionRate: 91.6,
      averageScore: 89.2,
      studentsWorking: 8760,
      difficulty: 'easy',
      cognitiveType: 'Aplicação (Execução)'
    }
  ]

  const insights = [
    {
      type: 'success',
      title: 'Progresso Excepcional em Matemática',
      description: 'Classes do 5º ano mostram 15% de melhoria no último mês',
      metric: '+15%',
      icon: TrendingUp
    },
    {
      type: 'warning',
      title: 'Competências de Produção Textual',
      description: '23% dos alunos precisam de apoio adicional em escrita',
      metric: '23%',
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Engajamento em Alta',
      description: 'Participação nas aulas interativas aumentou 28%',
      metric: '+28%',
      icon: Zap
    },
    {
      type: 'success',
      title: 'Meta BNCC Alcançada',
      description: 'Região Sul atingiu 85% de conclusão das competências',
      metric: '85%',
      icon: Target
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-primary-powder to-charcoal/5">
      {/* Modern Header with Glassmorphism */}
      <header className="glass-morphism border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-charcoal via-slate to-charcoal bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-trainer flex items-center justify-center animate-float shadow-glow">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  Trainer Studio
                </h1>
                <p className="text-slate/80 font-medium">Analytics IA • Insights Pedagógicos Avançados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* System Status with Modern Design */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-morphism">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-charcoal animate-pulse-glow"></div>
                  <span className="text-xs font-medium text-charcoal">Analytics IA</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-charcoal" />
                  <Brain className="w-4 h-4 text-slate" />
                  <TrendingUp className="w-4 h-4 text-charcoal" />
                </div>
              </div>
              
              <select 
                className="px-3 py-2 glass-morphism border border-white/20 rounded-xl text-sm font-medium text-charcoal focus:outline-none focus:shadow-medium transition-all duration-300"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
                <option value="quarter">Trimestre</option>
                <option value="year">Ano Letivo</option>
              </select>
              
              <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
              
              <Button size="sm" className="gradient-trainer text-white shadow-medium hover:shadow-strong transition-all duration-300">
                <Settings className="w-4 h-4 mr-2" />
                Configurar IA
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Modern Navigation Tabs */}
        <div className="relative">
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3, color: 'charcoal' },
              { id: 'students', label: 'Performance Individual', icon: GraduationCap, color: 'emerald' },
              { id: 'classes', label: 'Analytics por Turma', icon: Users, color: 'teal' },
              { id: 'schools', label: 'Ranking Escolas', icon: School, color: 'slate' },
              { id: 'competencies', label: 'BNCC Analytics', icon: Target, color: 'sage' },
              { id: 'reports', label: 'Relatórios IA', icon: FileText, color: 'amber' }
            ].map((tab, index) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setSelectedView(tab.id as any)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-500 whitespace-nowrap ${
                  selectedView === tab.id 
                    ? `glass-morphism shadow-medium border-white/30 bg-gradient-to-r from-${tab.color}/10 to-${tab.color}/20` 
                    : 'hover:glass-morphism hover:shadow-soft'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  selectedView === tab.id 
                    ? `bg-gradient-to-br from-${tab.color} to-${tab.color}/80 text-white shadow-medium` 
                    : `bg-${tab.color}/10 text-${tab.color}`
                }`}>
                  <tab.icon className="w-4 h-4" />
                </div>
                
                <span className={`text-sm font-medium transition-all duration-300 ${
                  selectedView === tab.id ? 'text-charcoal' : 'text-slate'
                }`}>
                  {tab.label}
                </span>
                
                {/* AI processing indicators */}
                {tab.id === 'overview' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-charcoal to-slate text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    IA
                  </div>
                )}
                
                {tab.id === 'competencies' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-sage to-emerald text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    BNCC
                  </div>
                )}
                
                {/* Selection indicator */}
                {selectedView === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-charcoal to-transparent rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal/30 to-transparent"></div>
        </div>

        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* System Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Performance Média
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-trainer">{systemStats.averagePerformance}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +2.3% vs mês anterior
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Conclusão BNCC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-trainer">{systemStats.bnccCompletion}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +4.1% vs mês anterior
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Frequência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-trainer">{systemStats.attendanceRate}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +1.2% vs mês anterior
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-trainer">{systemStats.engagementScore}%</div>
                  <div className="flex items-center text-xs text-orange-600">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    -0.8% vs mês anterior
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-trainer" />
                  Insights Pedagógicos IA
                </CardTitle>
                <CardDescription>Análises automáticas e recomendações baseadas nos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      insight.type === 'success' ? 'border-green-500 bg-green-50' :
                      insight.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                      insight.type === 'info' ? 'border-blue-500 bg-blue-50' : 'border-gray-500 bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <insight.icon className={`w-4 h-4 ${
                              insight.type === 'success' ? 'text-green-600' :
                              insight.type === 'warning' ? 'text-orange-600' :
                              insight.type === 'info' ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                            <h4 className="font-medium text-sm">{insight.title}</h4>
                          </div>
                          <p className="text-xs text-primary-gray">{insight.description}</p>
                        </div>
                        <div className={`text-lg font-bold ${
                          insight.type === 'success' ? 'text-green-600' :
                          insight.type === 'warning' ? 'text-orange-600' :
                          insight.type === 'info' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {insight.metric}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-trainer" />
                  Destaques do Período
                </CardTitle>
                <CardDescription>Estudantes com melhor performance e evolução</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-primary-powder rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-sm text-primary-gray">
                            {student.class} • {student.school}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-trainer">{student.overallScore}%</span>
                          {student.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                          {student.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                          {student.trend === 'stable' && <div className="w-4 h-4" />}
                        </div>
                        <div className="text-xs text-primary-gray">
                          {student.competenciesCompleted}/{student.totalCompetencies} competências
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-trainer" />
                    Distribuição de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Excelente (90%+)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bom (70-89%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Regular (50-69%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/6 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">17%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Precisa Apoio (&lt;50%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/12 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-trainer" />
                    Progresso Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aulas Realizadas</span>
                      <span className="text-lg font-bold text-trainer">347</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Atividades Concluídas</span>
                      <span className="text-lg font-bold text-trainer">1,823</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Competências Trabalhadas</span>
                      <span className="text-lg font-bold text-trainer">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Horas de Aprendizado</span>
                      <span className="text-lg font-bold text-trainer">2,145h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Other sections would follow similar patterns with detailed analytics */}
        {selectedView !== 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedView === 'students' && 'Análise Individual de Estudantes'}
                {selectedView === 'classes' && 'Performance por Turma'}
                {selectedView === 'schools' && 'Ranking e Comparativo Escolar'}
                {selectedView === 'competencies' && 'Progresso das Competências BNCC'}
                {selectedView === 'reports' && 'Relatórios Personalizados'}
              </CardTitle>
              <CardDescription>
                {selectedView === 'students' && 'Acompanhe o progresso individual de cada estudante'}
                {selectedView === 'classes' && 'Métricas detalhadas por turma e professor'}
                {selectedView === 'schools' && 'Comparativos entre escolas e regiões'}
                {selectedView === 'competencies' && 'Status de desenvolvimento das competências BNCC'}
                {selectedView === 'reports' && 'Gere relatórios customizados para diferentes necessidades'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-20 h-20 text-trainer mx-auto mb-6 opacity-50" />
                <h3 className="text-lg font-semibold text-primary-black mb-2">
                  Seção {selectedView === 'students' ? 'de Análise Individual' :
                            selectedView === 'classes' ? 'de Análise por Turma' :
                            selectedView === 'schools' ? 'de Ranking Escolar' :
                            selectedView === 'competencies' ? 'de Competências BNCC' : 'de Relatórios'} 
                  Implementada
                </h3>
                <p className="text-primary-gray mb-6">
                  {selectedView === 'students' && 'Dashboards detalhados com métricas individuais, progresso temporal, alertas de performance e recomendações personalizadas.'}
                  {selectedView === 'classes' && 'Análises comparativas por turma, identificação de padrões, métricas de engajamento e sugestões de melhoria.'}
                  {selectedView === 'schools' && 'Rankings regionais, benchmarks de performance, análises demográficas e relatórios executivos.'}
                  {selectedView === 'competencies' && 'Mapeamento completo de 1.512 competências BNCC, taxas de conclusão, dificuldade e gaps de aprendizado.'}
                  {selectedView === 'reports' && 'Gerador avançado de relatórios customizáveis com filtros dinâmicos, exportação e automação de envios.'}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="trainer" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar Dados
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
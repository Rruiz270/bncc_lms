'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  PencilRuler, 
  Plus,
  Calendar,
  FileText,
  Image,
  Video,
  Mic,
  Upload,
  Download,
  Search,
  Filter,
  Copy,
  Share2,
  Play,
  Edit,
  Trash2,
  ArrowLeft,
  Target,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  CheckSquare,
  MessageSquare,
  BarChart,
  Palette,
  Layers,
  Save,
  Eye
} from "lucide-react"
import Link from 'next/link'

// Interfaces for lesson planning
interface LessonPlan {
  id: string
  title: string
  subject: string
  series: number
  bnccCompetencies: string[]
  duration: number
  status: 'draft' | 'published' | 'archived'
  activities: Activity[]
  createdAt: string
  updatedAt: string
  teacher: string
  thumbnail?: string
}

interface Activity {
  id: string
  type: 'presentation' | 'exercise' | 'discussion' | 'multimedia' | 'assessment'
  title: string
  description: string
  duration: number
  resources: Resource[]
  order: number
}

interface Resource {
  id: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document'
  name: string
  url: string
  size?: string
}

export default function CreatorModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'plans' | 'create' | 'library' | 'templates'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeries, setSelectedSeries] = useState<string>('all')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  // Mock statistics
  const stats = {
    totalLessons: 2847,
    myLessons: 156,
    sharedLessons: 89,
    templates: 45,
    mediaFiles: 234,
    weeklyGoal: 5,
    completed: 3
  }

  // Mock data
  const sampleLessons: LessonPlan[] = [
    {
      id: '1',
      title: 'Números Naturais e Sistema Decimal',
      subject: 'Matemática',
      series: 2,
      bnccCompetencies: ['EF02MA01', 'EF02MA02'],
      duration: 50,
      status: 'published',
      activities: [],
      createdAt: '2024-12-01',
      updatedAt: '2024-12-07',
      teacher: 'Maria Silva',
      thumbnail: '/lesson-math.jpg'
    },
    {
      id: '2',
      title: 'Gêneros Textuais: Contos e Fábulas',
      subject: 'Língua Portuguesa',
      series: 3,
      bnccCompetencies: ['EF03LP15', 'EF03LP16'],
      duration: 45,
      status: 'draft',
      activities: [],
      createdAt: '2024-12-05',
      updatedAt: '2024-12-07',
      teacher: 'João Santos'
    },
    {
      id: '3',
      title: 'Brasil Colonial: Sociedade e Economia',
      subject: 'História',
      series: 7,
      bnccCompetencies: ['EF07HI10', 'EF07HI11'],
      duration: 50,
      status: 'published',
      activities: [],
      createdAt: '2024-11-28',
      updatedAt: '2024-12-02',
      teacher: 'Ana Costa'
    }
  ]

  const subjects = ['Língua Portuguesa', 'Matemática', 'História', 'Geografia', 'Ciências', 'Arte', 'Educação Física']
  
  const lessonTemplates = [
    { name: 'Aula Expositiva', icon: FileText, description: 'Template para aulas teóricas com apresentação' },
    { name: 'Aula Prática', icon: CheckSquare, description: 'Atividades práticas e exercícios' },
    { name: 'Discussão em Grupo', icon: MessageSquare, description: 'Debates e discussões colaborativas' },
    { name: 'Multimídia', icon: Video, description: 'Aulas com vídeos e conteúdo digital' },
    { name: 'Avaliação', icon: BarChart, description: 'Provas e testes de conhecimento' }
  ]

  const activityTypes = [
    { type: 'presentation', name: 'Apresentação', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { type: 'exercise', name: 'Exercício', icon: CheckSquare, color: 'bg-green-100 text-green-800' },
    { type: 'discussion', name: 'Discussão', icon: MessageSquare, color: 'bg-purple-100 text-purple-800' },
    { type: 'multimedia', name: 'Multimídia', icon: Video, color: 'bg-orange-100 text-orange-800' },
    { type: 'assessment', name: 'Avaliação', icon: BarChart, color: 'bg-red-100 text-red-800' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-primary-black flex items-center gap-2">
                  <PencilRuler className="w-8 h-8 text-creator" />
                  Módulo Creator
                </h1>
                <p className="text-primary-gray">Criação de Conteúdo - Planejamento e Criação de Aulas Baseadas na BNCC</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Cronograma
              </Button>
              <Button variant="creator" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Aula
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart },
            { id: 'plans', label: 'Meus Planos', icon: FileText },
            { id: 'create', label: 'Criar Aula', icon: Plus },
            { id: 'library', label: 'Biblioteca', icon: Upload },
            { id: 'templates', label: 'Templates', icon: Palette }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'creator' : 'outline'}
              onClick={() => setSelectedView(tab.id as any)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Creator Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Minhas Aulas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">{stats.myLessons}</div>
                  <p className="text-xs text-primary-gray">Planos criados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">{stats.sharedLessons}</div>
                  <p className="text-xs text-primary-gray">Da comunidade</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Mídia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">{stats.mediaFiles}</div>
                  <p className="text-xs text-primary-gray">Arquivos salvos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Meta Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">{stats.completed}/{stats.weeklyGoal}</div>
                  <p className="text-xs text-primary-gray">Aulas desta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-creator/20" 
                    onClick={() => setSelectedView('create')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-creator" />
                    Criar Nova Aula
                  </CardTitle>
                  <CardDescription>
                    Comece com uma competência BNCC e crie atividades envolventes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="creator" size="sm">Começar Agora</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                    onClick={() => setSelectedView('templates')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-creator" />
                    Templates Prontos
                  </CardTitle>
                  <CardDescription>
                    {stats.templates} templates profissionais para acelerar sua criação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Ver Templates</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-creator" />
                    Comunidade
                  </CardTitle>
                  <CardDescription>
                    Explore aulas compartilhadas por outros professores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Explorar</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Aulas Recentes</CardTitle>
                <CardDescription>Seus últimos planos de aula criados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleLessons.slice(0, 3).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-primary-powder rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-creator rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-primary-gray">
                            {lesson.subject} • {lesson.series}º Ano • {lesson.duration}min
                          </div>
                          <div className="flex gap-1 mt-1">
                            {lesson.bnccCompetencies.slice(0, 2).map(comp => (
                              <span key={comp} className="text-xs bg-creator/10 text-creator px-2 py-1 rounded">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Plans Section */}
        {selectedView === 'plans' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtrar Planos de Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-gray" />
                      <input
                        type="text"
                        placeholder="Título, competência ou conteúdo..."
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Série</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={selectedSeries}
                      onChange={(e) => setSelectedSeries(e.target.value)}
                    >
                      <option value="all">Todas as séries</option>
                      {[1,2,3,4,5,6,7,8,9].map(year => (
                        <option key={year} value={year.toString()}>{year}º Ano</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Disciplina</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">Todas</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="creator" className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            lesson.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : lesson.status === 'draft'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {lesson.status === 'published' ? 'Publicada' : 
                             lesson.status === 'draft' ? 'Rascunho' : 'Arquivada'}
                          </span>
                          <span className="text-xs text-primary-gray">
                            {lesson.series}º Ano
                          </span>
                        </div>
                        <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {lesson.subject} • {lesson.duration} minutos
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* BNCC Competencies */}
                      <div>
                        <div className="text-sm font-medium mb-2">Competências BNCC:</div>
                        <div className="flex flex-wrap gap-1">
                          {lesson.bnccCompetencies.map(comp => (
                            <span key={comp} className="text-xs bg-creator/10 text-creator px-2 py-1 rounded font-mono">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Link href="/player">
                          <Button variant="creator" size="sm" className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Executar
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create Lesson Section */}
        {selectedView === 'create' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-creator" />
                  Nova Aula - Workflow BNCC
                </CardTitle>
                <CardDescription>
                  Siga o processo guiado para criar uma aula alinhada às competências BNCC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1: Select BNCC Competency */}
                  <Card className="border-2 border-creator/20">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-creator text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        Escolha Competências
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-gray mb-4">
                        Selecione as competências BNCC que sua aula deve desenvolver
                      </p>
                      <Link href="/builder">
                        <Button variant="creator" size="sm" className="w-full">
                          <Target className="w-4 h-4 mr-2" />
                          Explorar BNCC
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Step 2: Plan Activities */}
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        Planejar Atividades
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Crie atividades que desenvolvam as competências escolhidas
                      </p>
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Layers className="w-4 h-4 mr-2" />
                        Designer Visual
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Step 3: Add Resources */}
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        Adicionar Recursos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Upload de imagens, vídeos, documentos e outros materiais
                      </p>
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Upload className="w-4 h-4 mr-2" />
                        Biblioteca
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-creator/10 rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-creator" />
                    Ou comece com um template
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lessonTemplates.slice(0, 3).map((template) => (
                      <div key={template.name} className="p-4 bg-white rounded-lg border hover:border-creator cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <template.icon className="w-8 h-8 text-creator" />
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-primary-gray">{template.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Library Section */}
        {selectedView === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Biblioteca de Mídia</h3>
              <Button variant="creator" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Arquivo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-creator" />
                    Imagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">156</div>
                  <p className="text-xs text-primary-gray">arquivos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-creator" />
                    Vídeos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">45</div>
                  <p className="text-xs text-primary-gray">arquivos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-creator" />
                    Áudios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">23</div>
                  <p className="text-xs text-primary-gray">arquivos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-creator" />
                    Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-creator">89</div>
                  <p className="text-xs text-primary-gray">arquivos</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Arquivos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="w-16 h-16 text-creator mx-auto mb-4" />
                  <p className="text-primary-gray">Sua biblioteca de mídia</p>
                  <p className="text-sm text-primary-gray mt-2">
                    Upload e organização de recursos multimídia
                  </p>
                  <Button variant="creator" size="sm" className="mt-4">
                    <Upload className="w-4 h-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Templates Section */}
        {selectedView === 'templates' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Aula</CardTitle>
                <CardDescription>Modelos profissionais para acelerar sua criação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessonTemplates.map((template) => (
                    <Card key={template.name} className="hover:shadow-lg transition-shadow cursor-pointer border-creator/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <template.icon className="w-5 h-5 text-creator" />
                          {template.name}
                        </CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="creator" size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Usar Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
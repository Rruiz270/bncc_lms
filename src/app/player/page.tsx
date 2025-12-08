'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Play, 
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  Users,
  CheckCircle,
  Clock,
  MessageSquare,
  Hand,
  ChartBar as Poll,
  Presentation,
  Monitor,
  ArrowLeft,
  FullscreenIcon as Fullscreen,
  Settings,
  Wifi,
  Battery,
  Signal,
  Timer,
  Target,
  BookOpen,
  Eye,
  ThumbsUp,
  AlertCircle,
  Zap,
  BarChart3,
  PencilRuler
} from "lucide-react"
import Link from 'next/link'

// Interfaces for classroom execution
interface ClassSession {
  id: string
  lessonTitle: string
  className: string
  subject: string
  duration: number
  startTime: string
  currentActivity: number
  totalActivities: number
  attendanceMarked: boolean
  studentsPresent: number
  totalStudents: number
}

interface Student {
  id: string
  name: string
  present: boolean
  participationLevel: 'low' | 'medium' | 'high'
  lastActivity: string
}

interface ActivityProgress {
  activityId: string
  type: 'presentation' | 'exercise' | 'discussion' | 'assessment'
  title: string
  completed: boolean
  responses: number
  duration: number
  timeElapsed: number
}

export default function PlayerModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'active' | 'attendance' | 'activities' | 'analytics'>('overview')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)

  // Mock session data
  const currentSession: ClassSession = {
    id: 'session-001',
    lessonTitle: 'Números Naturais e Sistema Decimal',
    className: '2º Ano A',
    subject: 'Matemática',
    duration: 50,
    startTime: '08:00',
    currentActivity: 2,
    totalActivities: 5,
    attendanceMarked: true,
    studentsPresent: 28,
    totalStudents: 30
  }

  const activities: ActivityProgress[] = [
    {
      activityId: '1',
      type: 'presentation',
      title: 'Introdução aos Números',
      completed: true,
      responses: 0,
      duration: 10,
      timeElapsed: 10
    },
    {
      activityId: '2', 
      type: 'exercise',
      title: 'Exercício: Contando Objetos',
      completed: false,
      responses: 25,
      duration: 15,
      timeElapsed: 8
    },
    {
      activityId: '3',
      type: 'discussion',
      title: 'Discussão: Números no Dia a Dia',
      completed: false,
      responses: 0,
      duration: 10,
      timeElapsed: 0
    }
  ]

  const mockStudents: Student[] = [
    { id: '1', name: 'Ana Silva', present: true, participationLevel: 'high', lastActivity: '2min ago' },
    { id: '2', name: 'Bruno Santos', present: true, participationLevel: 'medium', lastActivity: '5min ago' },
    { id: '3', name: 'Carla Oliveira', present: true, participationLevel: 'low', lastActivity: '15min ago' },
    { id: '4', name: 'Diego Costa', present: false, participationLevel: 'low', lastActivity: 'Never' },
    { id: '5', name: 'Elena Ferreira', present: true, participationLevel: 'high', lastActivity: '1min ago' }
  ]

  // Stats for overview
  const stats = {
    activeSession: sessionActive,
    totalLessonsToday: 4,
    completedToday: 2,
    averageAttendance: 92,
    studentEngagement: 78,
    lessonsThisWeek: 18,
    hoursThisWeek: 15
  }

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
                  <Play className="w-8 h-8 text-player" />
                  Módulo Player
                </h1>
                <p className="text-primary-gray">Execução de Aulas - Apresentação e Interação em Tempo Real</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* System Status */}
              <div className="flex items-center gap-2 text-sm text-primary-gray">
                <Wifi className="w-4 h-4 text-green-500" />
                <Signal className="w-4 h-4 text-green-500" />
                <Battery className="w-4 h-4 text-green-500" />
              </div>
              <Button variant="outline" size="sm">
                <Monitor className="w-4 h-4 mr-2" />
                Projetar
              </Button>
              <Button variant="player" size="sm">
                <Fullscreen className="w-4 h-4 mr-2" />
                Tela Cheia
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'active', label: 'Aula Ativa', icon: Play },
            { id: 'attendance', label: 'Presença', icon: Users },
            { id: 'activities', label: 'Atividades', icon: Target },
            { id: 'analytics', label: 'Análise', icon: Eye }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'player' : 'outline'}
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
            {/* Current Session Status */}
            <Card className={`${sessionActive ? 'border-player/50 bg-player/5' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {sessionActive ? <Zap className="w-5 h-5 text-player animate-pulse" /> : <Clock className="w-5 h-5 text-gray-400" />}
                  {sessionActive ? 'Aula em Andamento' : 'Nenhuma Aula Ativa'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessionActive ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{currentSession.lessonTitle}</h3>
                        <p className="text-primary-gray">{currentSession.className} • {currentSession.subject}</p>
                      </div>
                      <Button variant="player" size="sm" onClick={() => setSelectedView('active')}>
                        <Play className="w-4 h-4 mr-2" />
                        Ir para Aula
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-player">{currentSession.currentActivity}/{currentSession.totalActivities}</div>
                        <div className="text-xs text-primary-gray">Atividades</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-player">{currentSession.studentsPresent}/{currentSession.totalStudents}</div>
                        <div className="text-xs text-primary-gray">Presentes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-player">25min</div>
                        <div className="text-xs text-primary-gray">Restantes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-player">78%</div>
                        <div className="text-xs text-primary-gray">Participação</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-primary-gray mb-4">Pronto para iniciar sua próxima aula</p>
                    <div className="flex gap-2 justify-center">
                      <Link href="/creator">
                        <Button variant="outline" size="sm">
                          <PencilRuler className="w-4 h-4 mr-2" />
                          Criar Aula
                        </Button>
                      </Link>
                      <Button variant="player" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar Nova Aula
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Aulas Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-player">{stats.completedToday}/{stats.totalLessonsToday}</div>
                  <p className="text-xs text-primary-gray">Executadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Frequência Média
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-player">{stats.averageAttendance}%</div>
                  <p className="text-xs text-primary-gray">Esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-player">{stats.studentEngagement}%</div>
                  <p className="text-xs text-primary-gray">Participação</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Horas Semanais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-player">{stats.hoursThisWeek}</div>
                  <p className="text-xs text-primary-gray">{stats.lessonsThisWeek} aulas</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-player/20" 
                    onClick={() => setSessionActive(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-player" />
                    Iniciar Aula
                  </CardTitle>
                  <CardDescription>
                    Execute uma aula criada no módulo Creator
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="player" size="sm">Escolher Aula</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                    onClick={() => setSelectedView('attendance')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-player" />
                    Marcar Presença
                  </CardTitle>
                  <CardDescription>
                    Registrar presença dos alunos rapidamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Abrir Lista</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-player" />
                    Analytics de Aula
                  </CardTitle>
                  <CardDescription>
                    Visualizar dados e performance das suas aulas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/trainer">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Ver Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Aulas Recentes</CardTitle>
                <CardDescription>Últimas sessões executadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Frações e Decimais', class: '4º Ano B', time: '2h atrás', attendance: '95%' },
                    { title: 'Brasil Colonial', class: '7º Ano A', time: '1 dia atrás', attendance: '88%' },
                    { title: 'Gêneros Textuais', class: '3º Ano C', time: '2 dias atrás', attendance: '92%' }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-primary-powder rounded-lg">
                      <div>
                        <div className="font-medium">{session.title}</div>
                        <div className="text-sm text-primary-gray">{session.class} • {session.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-player">{session.attendance}</div>
                        <div className="text-xs text-primary-gray">Presença</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Lesson Section */}
        {selectedView === 'active' && (
          <div className="space-y-6">
            {sessionActive ? (
              <div>
                {/* Lesson Control Panel */}
                <Card className="border-player/50 bg-player/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{currentSession.lessonTitle}</CardTitle>
                        <CardDescription>{currentSession.className} • {currentSession.subject} • {currentSession.startTime}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
                          ● AO VIVO
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setSessionActive(false)}>
                          <Square className="w-4 h-4 mr-2" />
                          Finalizar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-gray">Progresso da Aula</span>
                        <span className="text-sm text-player font-medium">{currentSession.currentActivity}/{currentSession.totalActivities} atividades</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-player h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(currentSession.currentActivity / currentSession.totalActivities) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-player">{currentSession.studentsPresent}</div>
                          <div className="text-xs text-primary-gray">Presentes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-player">25</div>
                          <div className="text-xs text-primary-gray">Participando</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-player">8</div>
                          <div className="text-xs text-primary-gray">Com dúvidas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-player">25min</div>
                          <div className="text-xs text-primary-gray">Restantes</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Controles da Atividade Atual</CardTitle>
                    <CardDescription>Exercício: Contando Objetos (8/15 min)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-4 py-8">
                      <Button variant="outline" size="lg">
                        <SkipBack className="w-6 h-6" />
                      </Button>
                      <Button 
                        variant="player" 
                        size="lg" 
                        className="w-20 h-20 rounded-full"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                      </Button>
                      <Button variant="outline" size="lg">
                        <SkipForward className="w-6 h-6" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Hand className="w-4 h-4" />
                        Solicitar Atenção
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Poll className="w-4 h-4" />
                        Enquete Rápida
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat da Turma
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Real-time Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback em Tempo Real</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-4">Participação dos Alunos</h4>
                        <div className="space-y-2">
                          {mockStudents.slice(0, 3).map(student => (
                            <div key={student.id} className="flex items-center justify-between p-2 bg-primary-powder rounded">
                              <span className="text-sm">{student.name}</span>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  student.participationLevel === 'high' ? 'bg-green-500' :
                                  student.participationLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                                <span className="text-xs text-primary-gray">{student.lastActivity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-4">Alertas</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">3 alunos com dúvidas</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-800">Participação acima da média</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Nenhuma Aula Ativa</CardTitle>
                  <CardDescription>Inicie uma nova sessão para usar os controles em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Play className="w-16 h-16 text-player mx-auto mb-4" />
                    <Button variant="player" onClick={() => setSessionActive(true)}>
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Nova Aula
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Attendance Section */}
        {selectedView === 'attendance' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Presença - {currentSession.className}</CardTitle>
                <CardDescription>Marque a presença dos alunos de forma rápida</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-medium">{student.name}</span>
                      <Button 
                        variant={student.present ? "default" : "outline"} 
                        size="sm"
                        className={student.present ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {student.present ? <CheckCircle className="w-4 h-4 mr-2" /> : null}
                        {student.present ? "Presente" : "Ausente"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other sections would be implemented similarly */}
        {(selectedView === 'activities' || selectedView === 'analytics') && (
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedView === 'activities' ? 'Atividades da Aula' : 'Análise de Performance'}
              </CardTitle>
              <CardDescription>Funcionalidade em desenvolvimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-player mx-auto mb-4" />
                <p className="text-primary-gray">
                  {selectedView === 'activities' 
                    ? 'Controle detalhado de atividades em desenvolvimento'
                    : 'Analytics avançados em desenvolvimento'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
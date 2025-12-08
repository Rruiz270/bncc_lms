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
  PencilRuler,
  Brain,
  Puzzle,
  MousePointer,
  Send,
  Heart,
  Star,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  Maximize2,
  Layers,
  Activity,
  TrendingUp,
  Award,
  Trophy,
  Sparkles
} from "lucide-react"
import Link from 'next/link'

// Import advanced types
import type { 
  CourseModuleLesson, 
  CourseModuleLessonStructureStage, 
  CourseModuleLessonStructureStageActivity,
  Widget,
  WidgetInteractionType,
  CourseModuleLessonStructureStageActivityForm,
  CourseModuleLessonStructureStageActivityFormItem
} from '@/lib/advanced-types'

// Enhanced interfaces for sophisticated lesson execution
interface AdvancedClassSession {
  id: string
  lesson: CourseModuleLesson
  className: string
  institution: string
  professor: string
  duration: number
  startTime: string
  currentStage: number
  currentActivity: number
  attendanceMarked: boolean
  studentsPresent: number
  totalStudents: number
  sessionMode: 'presentation' | 'interactive' | 'assessment' | 'collaborative'
  activeWidgets: string[]
  realTimeData: SessionRealTimeData
  framework: 'engage_explore_explain_elaborate_evaluate' | 'think_pair_share' | 'problem_based' | 'flipped'
}

interface SessionRealTimeData {
  participationRate: number
  attentionLevel: number
  questionsRaised: number
  responsesReceived: number
  cognitiveLoad: 'low' | 'medium' | 'high'
  engagementTrend: 'increasing' | 'stable' | 'decreasing'
  interactionFrequency: number
  lastInteractionTime: string
}

interface AdvancedStudent {
  id: string
  name: string
  present: boolean
  participationLevel: 'low' | 'medium' | 'high'
  lastActivity: string
  cognitiveState: 'focused' | 'distracted' | 'confused' | 'engaged'
  interactionHistory: StudentInteraction[]
  currentActivity?: string
  performance: StudentPerformanceMetrics
  needsSupport: boolean
}

interface StudentInteraction {
  timestamp: string
  activityId: string
  interactionType: 'response' | 'question' | 'help_request' | 'participation'
  content?: any
  score?: number
  duration: number
}

interface StudentPerformanceMetrics {
  accuracy: number
  responseTime: number
  participationFrequency: number
  helpRequests: number
  competenciesProgress: Record<string, number>
}

interface WidgetExecution {
  widgetId: string
  widget: Widget
  isActive: boolean
  configuration: Record<string, any>
  studentInteractions: WidgetStudentInteraction[]
  analytics: WidgetAnalytics
  renderStatus: 'loading' | 'ready' | 'error' | 'completed'
}

interface WidgetStudentInteraction {
  studentId: string
  timestamp: string
  interactionData: any
  score?: number
  completed: boolean
}

interface WidgetAnalytics {
  totalInteractions: number
  averageScore: number
  completionRate: number
  averageTimeSpent: number
  difficultyRating: number
  studentFeedback: Record<string, number>
}

interface ActivityProgress {
  activityId: string
  activity: CourseModuleLessonStructureStageActivity
  stage: CourseModuleLessonStructureStage
  completed: boolean
  responses: number
  averageScore: number
  duration: number
  timeElapsed: number
  activeWidgets: WidgetExecution[]
  studentProgress: Record<string, StudentActivityProgress>
  realTimeMetrics: ActivityRealTimeMetrics
}

interface StudentActivityProgress {
  studentId: string
  started: boolean
  completed: boolean
  score?: number
  timeSpent: number
  interactions: number
  needsHelp: boolean
  lastInteraction: string
}

interface ActivityRealTimeMetrics {
  participationRate: number
  averageResponseTime: number
  difficultyPerception: number
  engagementLevel: number
  helpRequests: number
  collaborationLevel: number
}

export default function PlayerModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'active' | 'attendance' | 'activities' | 'analytics' | 'widgets'>('overview')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [widgetMode, setWidgetMode] = useState<'presentation' | 'interaction' | 'assessment'>('presentation')

  // Advanced mock lesson data with sophisticated structure
  const advancedLesson: CourseModuleLesson = {
    id: 'lesson-001',
    moduleId: 'module-math-001',
    title: 'Números Naturais e Sistema Decimal - Exploração Interativa',
    description: 'Aula utilizando metodologia 5E para explorar conceitos fundamentais de números naturais através de atividades interativas e colaborativas',
    sequence: 1,
    lessonType: {
      id: 'type-001',
      name: 'Aula Interativa com Tecnologia',
      category: 'laboratory',
      interactionLevel: 'high'
    },
    typology: {
      id: 'typ-001',
      name: 'Aprendizado Construtivista',
      pedagogicalPattern: 'Construção de Conhecimento',
      learningOutcomes: ['Identificar números naturais', 'Compreender sistema decimal', 'Aplicar contagem'],
      assessmentStrategy: 'Formativa contínua com widgets interativos'
    },
    framework: {
      id: 'frame-001',
      name: '5E Learning Cycle',
      description: 'Engage, Explore, Explain, Elaborate, Evaluate',
      structure: 'engage_explore_explain_elaborate_evaluate',
      phases: ['Engajamento', 'Exploração', 'Explicação', 'Elaboração', 'Avaliação']
    },
    model: {
      id: 'model-001',
      name: 'Modelo Interativo Digital',
      lessonModelType: {
        id: 'mtype-001',
        name: 'Tecnologia Educacional',
        framework: '5E + Widgets',
        description: 'Combina metodologia 5E com widgets interativos'
      },
      typology: {
        id: 'mtyp-001',
        name: 'Aprendizado Ativo Digital',
        approach: 'Construtivista',
        methodology: ['Investigação', 'Colaboração', 'Reflexão'],
        tools: ['Widgets interativos', 'Gamificação', 'Analytics em tempo real']
      },
      structure: {
        id: 'struct-001',
        name: 'Estrutura 5E Expandida',
        stages: [],
        flow: 'sequential'
      }
    },
    structure: {
      id: 'lesson-struct-001',
      lessonId: 'lesson-001',
      name: 'Estrutura da Aula: Números Naturais',
      structureType: {
        id: 'stype-001',
        name: '5E com Tecnologia',
        pattern: 'Engajamento → Exploração → Explicação → Elaboração → Avaliação',
        description: 'Metodologia 5E expandida com widgets e analytics'
      },
      stages: [
        {
          id: 'stage-engage',
          structureId: 'lesson-struct-001',
          stageName: 'Engajamento (Engage)',
          sequence: 1,
          duration: 8,
          stageTypology: {
            id: 'stage-typ-001',
            name: 'Despertar Curiosidade',
            purpose: 'Motivar e conectar com conhecimento prévio',
            characteristics: ['Pergunta problema', 'Situação real', 'Desafio inicial']
          },
          activities: [
            {
              id: 'act-engage-001',
              stageId: 'stage-engage',
              name: 'Quantos objetos vemos na sala?',
              description: 'Atividade de contagem colaborativa para despertar curiosidade sobre números',
              sequence: 1,
              activityType: {
                id: 'acttype-001',
                name: 'Enquete Interativa',
                category: 'input',
                description: 'Coleta de respostas em tempo real',
                cognitiveLoad: 'low'
              },
              forms: [
                {
                  id: 'form-001',
                  activityId: 'act-engage-001',
                  formName: 'Contagem de Objetos',
                  formType: {
                    id: 'formtype-001',
                    name: 'Enquete Rápida',
                    category: 'survey',
                    description: 'Coleta rápida de respostas numéricas',
                    scorable: false
                  },
                  items: [
                    {
                      id: 'item-001',
                      formId: 'form-001',
                      itemText: 'Quantas cadeiras você consegue ver na sala?',
                      itemType: {
                        id: 'itemtype-001',
                        name: 'Número Inteiro',
                        inputType: 'number',
                        validation: ['min:1', 'max:100'],
                        scoring: false
                      },
                      artifacts: [],
                      sequence: 1,
                      required: true,
                      feedback: 'Ótima observação! Vamos explorar mais números.'
                    }
                  ],
                  sequence: 1,
                  required: true,
                  adaptive: false
                }
              ],
              duration: 3,
              interactionLevel: 'class',
              tools: ['widget-poll', 'widget-visualization'],
              assessment: false,
              mandatory: true
            }
          ],
          objectives: ['Despertar interesse por contagem', 'Ativar conhecimento prévio'],
          resources: ['Projetor', 'Dispositivos móveis', 'Widget de enquete']
        },
        {
          id: 'stage-explore',
          structureId: 'lesson-struct-001',
          stageName: 'Exploração (Explore)',
          sequence: 2,
          duration: 15,
          stageTypology: {
            id: 'stage-typ-002',
            name: 'Investigação Guiada',
            purpose: 'Descobrir padrões e conceitos através da experimentação',
            characteristics: ['Manipulação', 'Descoberta', 'Hipóteses']
          },
          activities: [
            {
              id: 'act-explore-001',
              stageId: 'stage-explore',
              name: 'Laboratório Virtual de Números',
              description: 'Exploração interativa do sistema decimal usando widgets manipulativos',
              sequence: 1,
              activityType: {
                id: 'acttype-002',
                name: 'Simulação Interativa',
                category: 'processing',
                description: 'Manipulação de objetos virtuais para compreensão',
                cognitiveLoad: 'medium'
              },
              forms: [
                {
                  id: 'form-002',
                  activityId: 'act-explore-001',
                  formName: 'Exploração de Padrões',
                  formType: {
                    id: 'formtype-002',
                    name: 'Laboratório Digital',
                    category: 'simulation',
                    description: 'Ambiente virtual para experimentação',
                    scorable: true
                  },
                  items: [
                    {
                      id: 'item-002',
                      formId: 'form-002',
                      itemText: 'Organize os números em grupos de 10. Quantos grupos você conseguiu formar?',
                      itemType: {
                        id: 'itemtype-002',
                        name: 'Manipulação Digital',
                        inputType: 'choice',
                        validation: ['required'],
                        scoring: true
                      },
                      artifacts: [
                        {
                          id: 'artifact-001',
                          itemId: 'item-002',
                          artifactName: 'Widget Manipulativo Numérico',
                          artifactType: 'interactive',
                          url: '/widgets/number-manipulative',
                          receivingType: {
                            id: 'recv-001',
                            name: 'Widget Interativo',
                            format: ['interactive'],
                            description: 'Widget para manipulação de números'
                          },
                          metadata: {
                            difficulty: 'beginner',
                            concepts: ['agrupamento', 'base 10'],
                            interactions: ['drag', 'drop', 'count']
                          }
                        }
                      ],
                      sequence: 1,
                      points: 10,
                      required: true,
                      feedback: 'Excelente! Você descobriu como funciona o agrupamento em base 10!'
                    }
                  ],
                  sequence: 1,
                  required: true,
                  adaptive: true
                }
              ],
              duration: 12,
              interactionLevel: 'individual',
              tools: ['widget-manipulative', 'widget-counter', 'widget-visualization'],
              assessment: true,
              mandatory: true
            }
          ],
          objectives: ['Explorar agrupamentos', 'Descobrir padrões numéricos', 'Compreender base 10'],
          resources: ['Tablets', 'Widget manipulativo', 'Contador digital']
        }
      ]
    },
    objectives: [
      {
        id: 'obj-001',
        lessonId: 'lesson-001',
        objectiveText: 'Compreender o conceito de números naturais através de atividades práticas',
        objectiveCategory: 'learning',
        assessment: true,
        sequence: 1
      }
    ],
    keyWords: [
      {
        id: 'kw-001',
        lessonId: 'lesson-001',
        keyword: 'números naturais',
        keywordType: {
          id: 'kwtype-001',
          name: 'Conceito Principal',
          category: 'concept',
          description: 'Conceito central da aula'
        },
        typology: {
          id: 'kwtyp-001',
          name: 'Matemática Fundamental',
          domain: 'Números e Operações',
          classification: ['BNCC', 'EF02MA01']
        },
        relevance: 'primary'
      }
    ],
    linkTypes: [],
    duration: 50,
    difficulty: 'beginner',
    status: 'published'
  }

  const currentAdvancedSession: AdvancedClassSession = {
    id: 'session-advanced-001',
    lesson: advancedLesson,
    className: '2º Ano A',
    institution: 'E.E.B. Prof. Maria Silva',
    professor: 'Ana Carolina Santos',
    duration: 50,
    startTime: '08:00',
    currentStage: 0,
    currentActivity: 0,
    attendanceMarked: true,
    studentsPresent: 28,
    totalStudents: 30,
    sessionMode: 'interactive',
    activeWidgets: ['widget-poll', 'widget-manipulative', 'widget-counter'],
    framework: 'engage_explore_explain_elaborate_evaluate',
    realTimeData: {
      participationRate: 89.3,
      attentionLevel: 78.6,
      questionsRaised: 12,
      responsesReceived: 156,
      cognitiveLoad: 'medium',
      engagementTrend: 'increasing',
      interactionFrequency: 24,
      lastInteractionTime: '2 segundos atrás'
    }
  }

  const advancedStudents: AdvancedStudent[] = [
    {
      id: '1',
      name: 'Ana Julia Oliveira',
      present: true,
      participationLevel: 'high',
      lastActivity: '30s ago',
      cognitiveState: 'engaged',
      interactionHistory: [
        {
          timestamp: '08:15:30',
          activityId: 'act-engage-001',
          interactionType: 'response',
          content: { answer: 25 },
          score: 10,
          duration: 15
        }
      ],
      currentActivity: 'act-explore-001',
      performance: {
        accuracy: 92.5,
        responseTime: 12.3,
        participationFrequency: 18,
        helpRequests: 2,
        competenciesProgress: { 'EF02MA01': 85, 'EF02MA02': 78 }
      },
      needsSupport: false
    },
    {
      id: '2',
      name: 'Bruno Henrique Costa',
      present: true,
      participationLevel: 'medium',
      lastActivity: '2min ago',
      cognitiveState: 'focused',
      interactionHistory: [
        {
          timestamp: '08:14:45',
          activityId: 'act-engage-001',
          interactionType: 'response',
          content: { answer: 23 },
          score: 8,
          duration: 23
        }
      ],
      currentActivity: 'act-explore-001',
      performance: {
        accuracy: 76.2,
        responseTime: 18.7,
        participationFrequency: 12,
        helpRequests: 5,
        competenciesProgress: { 'EF02MA01': 68, 'EF02MA02': 71 }
      },
      needsSupport: false
    },
    {
      id: '3',
      name: 'Carla Sofia Lima',
      present: true,
      participationLevel: 'high',
      lastActivity: '45s ago',
      cognitiveState: 'engaged',
      interactionHistory: [
        {
          timestamp: '08:16:12',
          activityId: 'act-engage-001',
          interactionType: 'response',
          content: { answer: 26 },
          score: 10,
          duration: 11
        }
      ],
      currentActivity: 'act-explore-001',
      performance: {
        accuracy: 94.1,
        responseTime: 10.2,
        participationFrequency: 22,
        helpRequests: 1,
        competenciesProgress: { 'EF02MA01': 91, 'EF02MA02': 88 }
      },
      needsSupport: false
    },
    {
      id: '4',
      name: 'Diego Santos Ferreira',
      present: true,
      participationLevel: 'low',
      lastActivity: '8min ago',
      cognitiveState: 'confused',
      interactionHistory: [
        {
          timestamp: '08:12:20',
          activityId: 'act-engage-001',
          interactionType: 'help_request',
          content: { question: 'Não entendi a pergunta' },
          duration: 0
        }
      ],
      currentActivity: 'act-engage-001',
      performance: {
        accuracy: 45.3,
        responseTime: 35.8,
        participationFrequency: 4,
        helpRequests: 12,
        competenciesProgress: { 'EF02MA01': 32, 'EF02MA02': 28 }
      },
      needsSupport: true
    },
    {
      id: '5',
      name: 'Elena Beatriz Silva',
      present: true,
      participationLevel: 'high',
      lastActivity: '1min ago',
      cognitiveState: 'engaged',
      interactionHistory: [
        {
          timestamp: '08:15:55',
          activityId: 'act-engage-001',
          interactionType: 'response',
          content: { answer: 24 },
          score: 9,
          duration: 18
        }
      ],
      currentActivity: 'act-explore-001',
      performance: {
        accuracy: 88.7,
        responseTime: 14.1,
        participationFrequency: 19,
        helpRequests: 3,
        competenciesProgress: { 'EF02MA01': 84, 'EF02MA02': 82 }
      },
      needsSupport: false
    }
  ]

  const availableWidgets: Widget[] = [
    {
      id: 'widget-poll',
      name: 'Enquete Colaborativa',
      description: 'Widget para coleta de respostas em tempo real com visualização instantânea',
      widgetType: {
        id: 'wtype-001',
        name: 'Enquete Interativa',
        category: 'interaction',
        description: 'Coleta de dados em tempo real',
        complexity: 'simple'
      },
      typology: {
        id: 'wtyp-001',
        name: 'Participação Ativa',
        pedagogicalFunction: ['coleta de dados', 'engajamento', 'avaliação formativa'],
        learningTheory: ['construtivismo', 'aprendizagem ativa'],
        interactionPattern: 'síncrono'
      },
      supplier: {
        id: 'sup-001',
        name: 'EduTech Widgets',
        company: 'Better Learning Technologies',
        contactInfo: 'contact@betterlearning.com',
        certificationLevel: 'premium',
        supportLevel: '24/7'
      },
      componentType: {
        id: 'comp-001',
        name: 'React Interactive Component',
        technicalSpec: 'React 18+ with real-time updates',
        framework: ['React', 'Next.js', 'Socket.io'],
        compatibility: ['web', 'mobile', 'tablet'],
        renderingType: 'real-time'
      },
      contentType: {
        id: 'cont-001',
        name: 'Multimedia Poll',
        mediaType: ['text', 'image', 'audio'],
        format: ['json', 'svg', 'mp3'],
        accessibility: ['screen-reader', 'keyboard-navigation', 'high-contrast'],
        localization: true
      },
      interactionType: {
        id: 'int-001',
        name: 'Real-time Response',
        userAction: ['click', 'touch', 'voice'],
        feedbackType: ['visual', 'audio', 'haptic'],
        dataCapture: ['responses', 'timing', 'patterns'],
        analytics: true
      },
      attributes: [
        {
          id: 'attr-001',
          name: 'question',
          dataType: 'string',
          required: true,
          defaultValue: 'Digite sua pergunta aqui',
          typology: {
            id: 'attyp-001',
            name: 'Conteúdo Principal',
            category: 'content',
            scope: 'instance'
          }
        },
        {
          id: 'attr-002',
          name: 'responseType',
          dataType: 'string',
          required: true,
          defaultValue: 'multiple_choice',
          validation: ['multiple_choice', 'text', 'number', 'scale'],
          typology: {
            id: 'attyp-002',
            name: 'Tipo de Resposta',
            category: 'behavior',
            scope: 'global'
          }
        }
      ],
      version: '2.1.3',
      status: 'active',
      configuration: {
        theme: 'educational',
        animations: true,
        sound: false,
        multiSelect: false,
        showResults: 'real-time'
      }
    }
  ]

  const currentActivityProgress: ActivityProgress[] = advancedLesson.structure.stages.map((stage, stageIndex) => 
    stage.activities.map((activity, activityIndex) => ({
      activityId: activity.id,
      activity,
      stage,
      completed: stageIndex < currentAdvancedSession.currentStage || 
                 (stageIndex === currentAdvancedSession.currentStage && activityIndex < currentAdvancedSession.currentActivity),
      responses: stageIndex === 0 && activityIndex === 0 ? 28 : 0,
      averageScore: stageIndex === 0 && activityIndex === 0 ? 8.9 : 0,
      duration: activity.duration,
      timeElapsed: stageIndex === 0 && activityIndex === 0 ? 3 : 0,
      activeWidgets: stageIndex === 0 && activityIndex === 0 ? [
        {
          widgetId: 'widget-poll',
          widget: availableWidgets[0],
          isActive: true,
          configuration: {
            question: 'Quantas cadeiras você consegue ver na sala?',
            responseType: 'number',
            maxValue: 100,
            minValue: 1
          },
          studentInteractions: advancedStudents.map(student => ({
            studentId: student.id,
            timestamp: '08:15:30',
            interactionData: { answer: Math.floor(Math.random() * 5) + 23 },
            score: Math.floor(Math.random() * 3) + 8,
            completed: true
          })),
          analytics: {
            totalInteractions: 28,
            averageScore: 8.9,
            completionRate: 100,
            averageTimeSpent: 16.2,
            difficultyRating: 2.1,
            studentFeedback: { helpful: 26, confusing: 2 }
          },
          renderStatus: 'completed'
        }
      ] : [],
      studentProgress: Object.fromEntries(advancedStudents.map(student => [
        student.id,
        {
          studentId: student.id,
          started: true,
          completed: stageIndex === 0 && activityIndex === 0,
          score: stageIndex === 0 && activityIndex === 0 ? student.interactionHistory[0]?.score : undefined,
          timeSpent: stageIndex === 0 && activityIndex === 0 ? student.interactionHistory[0]?.duration || 0 : 0,
          interactions: student.interactionHistory.length,
          needsHelp: student.needsSupport,
          lastInteraction: student.lastActivity
        }
      ])),
      realTimeMetrics: {
        participationRate: stageIndex === 0 && activityIndex === 0 ? 100 : 0,
        averageResponseTime: stageIndex === 0 && activityIndex === 0 ? 16.2 : 0,
        difficultyPerception: stageIndex === 0 && activityIndex === 0 ? 2.1 : 0,
        engagementLevel: stageIndex === 0 && activityIndex === 0 ? 89.3 : 0,
        helpRequests: stageIndex === 0 && activityIndex === 0 ? 1 : 0,
        collaborationLevel: 0
      }
    }))
  ).flat()

  // Stats for overview  
  const stats = {
    activeSession: sessionActive,
    totalLessonsToday: 4,
    completedToday: 2,
    averageAttendance: 92,
    studentEngagement: 78,
    lessonsThisWeek: 18,
    hoursThisWeek: 15,
    widgetsUsed: 3,
    interactionRate: 89.3,
    realTimeAnalytics: true
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
            { id: 'widgets', label: 'Widgets Ativos', icon: Puzzle },
            { id: 'analytics', label: 'Analytics Tempo Real', icon: Activity }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'player' : 'outline'}
              onClick={() => setSelectedView(tab.id as any)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'widgets' && sessionActive && (
                <span className="ml-2 px-2 py-0.5 bg-player text-white text-xs rounded-full">
                  {currentAdvancedSession.activeWidgets.length}
                </span>
              )}
              {tab.id === 'active' && sessionActive && (
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              )}
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
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{currentAdvancedSession.lesson.title}</h3>
                        <p className="text-primary-gray">
                          {currentAdvancedSession.className} • {currentAdvancedSession.institution} • {currentAdvancedSession.professor}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {currentAdvancedSession.lesson.framework.name}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {currentAdvancedSession.sessionMode}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {currentAdvancedSession.activeWidgets.length} widgets ativos
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedView('widgets')}>
                          <Puzzle className="w-4 h-4 mr-2" />
                          Widgets ({currentAdvancedSession.activeWidgets.length})
                        </Button>
                        <Button variant="player" size="sm" onClick={() => setSelectedView('active')}>
                          <Play className="w-4 h-4 mr-2" />
                          Ir para Aula
                        </Button>
                      </div>
                    </div>
                    
                    {/* Current Stage Progress */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Estágio Atual: {currentAdvancedSession.lesson.structure.stages[currentAdvancedSession.currentStage]?.stageName}</h4>
                        <span className="text-sm text-purple-600 font-medium">
                          {currentAdvancedSession.currentStage + 1}/{currentAdvancedSession.lesson.structure.stages.length}
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${((currentAdvancedSession.currentStage + 1) / currentAdvancedSession.lesson.structure.stages.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-player">{currentAdvancedSession.studentsPresent}/{currentAdvancedSession.totalStudents}</div>
                        <div className="text-xs text-primary-gray">Presentes</div>
                        <div className="text-xs text-green-600 font-medium">{Math.round((currentAdvancedSession.studentsPresent / currentAdvancedSession.totalStudents) * 100)}%</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-player">{currentAdvancedSession.realTimeData.participationRate.toFixed(1)}%</div>
                        <div className="text-xs text-primary-gray">Participação</div>
                        <div className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {currentAdvancedSession.realTimeData.engagementTrend}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <div className="text-2xl font-bold text-player">{currentAdvancedSession.realTimeData.responsesReceived}</div>
                        <div className="text-xs text-primary-gray">Interações</div>
                        <div className="text-xs text-blue-600 font-medium">{currentAdvancedSession.realTimeData.lastInteractionTime}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-player">
                          <span className={`${
                            currentAdvancedSession.realTimeData.cognitiveLoad === 'low' ? 'text-green-500' :
                            currentAdvancedSession.realTimeData.cognitiveLoad === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {currentAdvancedSession.realTimeData.cognitiveLoad === 'low' ? 'Baixa' :
                             currentAdvancedSession.realTimeData.cognitiveLoad === 'medium' ? 'Média' : 'Alta'}
                          </span>
                        </div>
                        <div className="text-xs text-primary-gray">Carga Cognitiva</div>
                        <div className="text-xs text-gray-500">{currentAdvancedSession.realTimeData.attentionLevel.toFixed(1)}% atenção</div>
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
                {/* Advanced Lesson Control Panel */}
                <Card className="border-player/50 bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Brain className="w-6 h-6 text-purple-600" />
                          {currentAdvancedSession.lesson.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {currentAdvancedSession.className} • {currentAdvancedSession.institution} • {currentAdvancedSession.professor}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {currentAdvancedSession.lesson.framework.name}
                          </span>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            Nível: {currentAdvancedSession.lesson.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <div className="text-sm text-gray-500">Duração</div>
                          <div className="text-lg font-bold text-purple-600">{currentAdvancedSession.duration}min</div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse flex items-center gap-2">
                          <Zap className="w-4 h-4" />
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
                    {/* 5E Framework Progress */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Metodologia 5E - Progresso da Aula</span>
                          <span className="text-sm text-purple-600 font-medium">
                            Estágio {currentAdvancedSession.currentStage + 1}/{currentAdvancedSession.lesson.structure.stages.length}
                          </span>
                        </div>
                        
                        {/* 5E Stages Visualization */}
                        <div className="flex items-center gap-2 mb-4">
                          {currentAdvancedSession.lesson.structure.stages.map((stage, index) => (
                            <div key={stage.id} className="flex-1">
                              <div className={`p-3 rounded-lg text-center transition-all duration-300 ${
                                index === currentAdvancedSession.currentStage 
                                  ? 'bg-purple-100 border-2 border-purple-500 text-purple-800' 
                                  : index < currentAdvancedSession.currentStage
                                  ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                  : 'bg-gray-100 border-2 border-gray-300 text-gray-500'
                              }`}>
                                <div className="text-xs font-medium">{stage.stageName.split(' ')[0]}</div>
                                <div className="text-xs opacity-75">{stage.duration}min</div>
                                {index === currentAdvancedSession.currentStage && (
                                  <Sparkles className="w-3 h-3 mx-auto mt-1 animate-pulse" />
                                )}
                                {index < currentAdvancedSession.currentStage && (
                                  <CheckCircle className="w-3 h-3 mx-auto mt-1" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${((currentAdvancedSession.currentStage + 1) / currentAdvancedSession.lesson.structure.stages.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Real-time Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-purple-200 text-center">
                          <div className="text-lg font-bold text-purple-600">{currentAdvancedSession.studentsPresent}</div>
                          <div className="text-xs text-gray-500">Presentes</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                          <div className="text-lg font-bold text-blue-600">{currentAdvancedSession.realTimeData.participationRate.toFixed(1)}%</div>
                          <div className="text-xs text-gray-500">Participando</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
                          <div className="text-lg font-bold text-green-600">{currentAdvancedSession.realTimeData.responsesReceived}</div>
                          <div className="text-xs text-gray-500">Respostas</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-orange-200 text-center">
                          <div className="text-lg font-bold text-orange-600">{currentAdvancedSession.realTimeData.questionsRaised}</div>
                          <div className="text-xs text-gray-500">Dúvidas</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-indigo-200 text-center">
                          <div className="text-lg font-bold text-indigo-600">{currentAdvancedSession.activeWidgets.length}</div>
                          <div className="text-xs text-gray-500">Widgets</div>
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

        {/* Advanced Widget Control Panel */}
        {selectedView === 'widgets' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="w-5 h-5 text-player" />
                  Controle de Widgets - Sessão Ativa
                </CardTitle>
                <CardDescription>
                  Gerencie widgets interativos em tempo real. {currentAdvancedSession.activeWidgets.length} widgets ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Active Widgets */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-500" />
                      Widgets Ativos ({currentActivityProgress[0]?.activeWidgets.length || 0})
                    </h4>
                    {currentActivityProgress[0]?.activeWidgets.map((widgetExecution) => (
                      <div key={widgetExecution.widgetId} className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-medium">{widgetExecution.widget.name}</h5>
                            <p className="text-sm text-gray-600">{widgetExecution.widget.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              widgetExecution.renderStatus === 'completed' ? 'bg-green-100 text-green-800' :
                              widgetExecution.renderStatus === 'ready' ? 'bg-blue-100 text-blue-800' :
                              widgetExecution.renderStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {widgetExecution.renderStatus === 'completed' ? 'Concluído' :
                               widgetExecution.renderStatus === 'ready' ? 'Pronto' :
                               widgetExecution.renderStatus === 'loading' ? 'Carregando' : 'Erro'}
                            </span>
                            <Button variant="outline" size="sm">
                              <Settings className="w-3 h-3 mr-1" />
                              Config
                            </Button>
                          </div>
                        </div>
                        
                        {/* Widget Analytics */}
                        <div className="grid grid-cols-4 gap-3 text-center text-sm">
                          <div>
                            <div className="font-bold text-green-600">{widgetExecution.analytics.totalInteractions}</div>
                            <div className="text-xs text-gray-500">Interações</div>
                          </div>
                          <div>
                            <div className="font-bold text-blue-600">{widgetExecution.analytics.completionRate}%</div>
                            <div className="text-xs text-gray-500">Conclusão</div>
                          </div>
                          <div>
                            <div className="font-bold text-purple-600">{widgetExecution.analytics.averageScore.toFixed(1)}</div>
                            <div className="text-xs text-gray-500">Média</div>
                          </div>
                          <div>
                            <div className="font-bold text-orange-600">{widgetExecution.analytics.averageTimeSpent.toFixed(1)}s</div>
                            <div className="text-xs text-gray-500">Tempo</div>
                          </div>
                        </div>

                        {/* Real-time Configuration */}
                        <div className="mt-3 p-3 bg-white rounded border">
                          <div className="text-xs text-gray-600 mb-1">Configuração Atual:</div>
                          <div className="text-sm font-mono text-gray-800">
                            {widgetExecution.configuration.question}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Available Widgets Library */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-500" />
                      Biblioteca de Widgets
                    </h4>
                    {availableWidgets.map((widget) => (
                      <div key={widget.id} className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-medium">{widget.name}</h5>
                            <p className="text-sm text-gray-600">{widget.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <MousePointer className="w-3 h-3 mr-1" />
                            Ativar
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="font-medium">Categoria:</span> {widget.widgetType.category}
                          </div>
                          <div>
                            <span className="font-medium">Complexidade:</span> {widget.widgetType.complexity}
                          </div>
                          <div>
                            <span className="font-medium">Função:</span> {widget.typology.pedagogicalFunction.slice(0,2).join(', ')}
                          </div>
                          <div>
                            <span className="font-medium">Versão:</span> {widget.version}
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {widget.interactionType.userAction.slice(0,3).map(action => (
                            <span key={action} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Widget Performance Summary */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    Performance dos Widgets - Sessão Atual
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">89.3%</div>
                        <div className="text-sm text-gray-600">Taxa de Engajamento</div>
                        <div className="text-xs text-green-600 font-medium">↑ 12% vs média</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">16.2s</div>
                        <div className="text-sm text-gray-600">Tempo Médio</div>
                        <div className="text-xs text-blue-600 font-medium">Dentro do esperado</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">2.1</div>
                        <div className="text-sm text-gray-600">Nível de Dificuldade</div>
                        <div className="text-xs text-orange-600 font-medium">Adequado ao público</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Advanced Real-time Analytics */}
        {selectedView === 'analytics' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-player" />
                  Analytics em Tempo Real - Sessão Ativa
                </CardTitle>
                <CardDescription>
                  Dados pedagógicos em tempo real com IA para análise de aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Student Cognitive States */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      Estados Cognitivos dos Estudantes
                    </h4>
                    <div className="space-y-3">
                      {advancedStudents.slice(0, 4).map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              student.cognitiveState === 'engaged' ? 'bg-green-500' :
                              student.cognitiveState === 'focused' ? 'bg-blue-500' :
                              student.cognitiveState === 'confused' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                            <span className="font-medium">{student.name}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              student.needsSupport ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {student.needsSupport ? 'Precisa apoio' : 'Progredindo'}
                            </span>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-medium">{student.performance.accuracy.toFixed(1)}%</div>
                            <div className="text-xs text-gray-500">Acurácia</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Analytics */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Análises de Aprendizado
                    </h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Competência EF02MA01</span>
                          <span className="text-sm text-green-600 font-bold">78% progresso</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <div className="text-xs text-green-700 mt-1">Números e contagem - Acima da meta</div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Engajamento Metodologia 5E</span>
                          <span className="text-sm text-blue-600 font-bold">89.3%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                        <div className="text-xs text-blue-700 mt-1">Participação ativa aumentou 24%</div>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Carga Cognitiva</span>
                          <span className="text-sm text-purple-600 font-bold">Adequada</span>
                        </div>
                        <div className="text-xs text-purple-700 mt-1">Nível de dificuldade ideal para a turma</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Insights Pedagógicos IA
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Sucesso Detectado</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        A metodologia 5E está funcionando excepcionalmente bem. 
                        Participação 24% acima da média nacional.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-amber-600" />
                        <span className="font-medium text-amber-800">Atenção Necessária</span>
                      </div>
                      <p className="text-sm text-amber-700">
                        1 aluno (Diego) apresenta sinais de confusão. 
                        Considere personalizar próxima atividade.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Activities Section with Advanced Structure */}
        {selectedView === 'activities' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-player" />
                  Atividades da Sessão - Estrutura 5E
                </CardTitle>
                <CardDescription>
                  Gerenciamento detalhado das atividades por estágio metodológico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentAdvancedSession.lesson.structure.stages.map((stage, stageIndex) => (
                    <div key={stage.id} className={`border rounded-lg overflow-hidden ${
                      stageIndex === currentAdvancedSession.currentStage ? 'border-purple-300 bg-purple-50' : 'border-gray-200'
                    }`}>
                      <div className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              stageIndex < currentAdvancedSession.currentStage ? 'bg-green-500' :
                              stageIndex === currentAdvancedSession.currentStage ? 'bg-purple-500' : 'bg-gray-400'
                            }`}>
                              {stageIndex + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{stage.stageName}</h3>
                              <p className="text-sm text-gray-600">
                                {stage.stageTypology.purpose} • {stage.duration} min
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {stage.activities.length} atividades
                            </span>
                            {stageIndex === currentAdvancedSession.currentStage && (
                              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stage Activities */}
                      <div className="p-4 space-y-4">
                        {stage.activities.map((activity, activityIndex) => {
                          const activityProgress = currentActivityProgress.find(ap => ap.activityId === activity.id)
                          return (
                            <div key={activity.id} className={`p-4 border rounded-lg ${
                              activityProgress?.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                            }`}>
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">{activity.name}</h4>
                                  <p className="text-sm text-gray-600">{activity.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{activity.duration} min</div>
                                  <div className="text-xs text-gray-500">{activity.activityType.category}</div>
                                </div>
                              </div>
                              
                              {activityProgress && (
                                <div className="grid grid-cols-4 gap-3 text-center text-sm">
                                  <div>
                                    <div className="font-bold text-blue-600">{activityProgress.responses}</div>
                                    <div className="text-xs text-gray-500">Respostas</div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-green-600">{activityProgress.averageScore.toFixed(1)}</div>
                                    <div className="text-xs text-gray-500">Média</div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-purple-600">{activityProgress.realTimeMetrics.participationRate}%</div>
                                    <div className="text-xs text-gray-500">Participação</div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-orange-600">{activityProgress.timeElapsed}/{activityProgress.duration}min</div>
                                    <div className="text-xs text-gray-500">Tempo</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Attendance with Cognitive States */}
        {selectedView === 'attendance' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-player" />
                  Lista de Presença Inteligente - {currentAdvancedSession.className}
                </CardTitle>
                <CardDescription>
                  Controle de presença com análise comportamental e cognitiva em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Attendance Summary */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{currentAdvancedSession.studentsPresent}</div>
                      <div className="text-sm text-gray-600">Presentes</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600">{currentAdvancedSession.totalStudents - currentAdvancedSession.studentsPresent}</div>
                      <div className="text-sm text-gray-600">Ausentes</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{Math.round((currentAdvancedSession.studentsPresent / currentAdvancedSession.totalStudents) * 100)}%</div>
                      <div className="text-sm text-gray-600">Taxa de Presença</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">{advancedStudents.filter(s => s.needsSupport).length}</div>
                      <div className="text-sm text-gray-600">Precisam Apoio</div>
                    </div>
                  </div>

                  {/* Student List with Cognitive Analysis */}
                  <div className="space-y-3">
                    {advancedStudents.map((student) => (
                      <div key={student.id} className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                        student.present ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      } ${student.needsSupport ? 'border-l-4 border-l-amber-500' : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <Button 
                              variant={student.present ? "default" : "outline"} 
                              size="sm"
                              className={`w-24 ${student.present ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-600 hover:text-white"}`}
                            >
                              {student.present ? <CheckCircle className="w-4 h-4 mr-2" /> : null}
                              {student.present ? "Presente" : "Ausente"}
                            </Button>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-lg">{student.name}</span>
                              <div className={`w-3 h-3 rounded-full ${
                                student.cognitiveState === 'engaged' ? 'bg-green-500' :
                                student.cognitiveState === 'focused' ? 'bg-blue-500' :
                                student.cognitiveState === 'confused' ? 'bg-red-500' : 'bg-yellow-500'
                              }`} />
                              <span className="text-xs text-gray-500 capitalize">{student.cognitiveState}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Última atividade: {student.lastActivity}</span>
                              <span>Participação: {student.participationLevel}</span>
                              <span>Acurácia: {student.performance.accuracy.toFixed(1)}%</span>
                            </div>
                            
                            {student.needsSupport && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                <span className="text-sm text-amber-700 font-medium">Necessita atenção especial</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-bold text-blue-600">{student.interactionHistory.length}</div>
                              <div className="text-gray-500">Interações</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-green-600">{student.performance.participationFrequency}</div>
                              <div className="text-gray-500">Participações</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-orange-600">{student.performance.helpRequests}</div>
                              <div className="text-gray-500">Pedidos Ajuda</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-600">{student.performance.responseTime.toFixed(1)}s</div>
                              <div className="text-gray-500">Tempo Resp.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Marcar Todos Presentes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Lista
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Última atualização: {currentAdvancedSession.realTimeData.lastInteractionTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
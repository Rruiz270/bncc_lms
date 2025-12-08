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
  Sparkles,
  Download
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
          renderStatus: 'completed' as 'loading' | 'ready' | 'error' | 'completed'
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
    <div className="min-h-screen bg-gradient-to-br from-pearl via-primary-powder to-sage/5">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald via-teal to-sage bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-player flex items-center justify-center animate-float shadow-glow">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  Player Studio
                </h1>
                <p className="text-slate/80 font-medium">Execução Inteligente de Aulas • Real-time Learning Analytics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* System Status with Modern Design */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-morphism">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse-glow"></div>
                  <span className="text-xs font-medium text-charcoal">Sistema</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-1">
                  <Wifi className="w-4 h-4 text-emerald" />
                  <Signal className="w-4 h-4 text-emerald" />
                  <Battery className="w-4 h-4 text-emerald" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                <Monitor className="w-4 h-4 mr-2" />
                Projetar
              </Button>
              
              <Button size="sm" className="gradient-player text-white shadow-medium hover:shadow-strong transition-all duration-300">
                <Maximize2 className="w-4 h-4 mr-2" />
                Modo Imersivo
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
              { id: 'overview', label: 'Visão Geral', icon: BarChart3, color: 'emerald' },
              { id: 'active', label: 'Aula Ativa', icon: Play, color: 'teal' },
              { id: 'attendance', label: 'Presença Inteligente', icon: Users, color: 'sage' },
              { id: 'activities', label: 'Atividades 5E', icon: Target, color: 'amber' },
              { id: 'widgets', label: 'Widget Studio', icon: Puzzle, color: 'violet' },
              { id: 'analytics', label: 'Analytics IA', icon: Activity, color: 'coral' }
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
                
                {/* Active indicators */}
                {tab.id === 'widgets' && sessionActive && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-violet to-violet/80 text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    {currentAdvancedSession.activeWidgets.length}
                  </div>
                )}
                
                {tab.id === 'active' && sessionActive && (
                  <div className="ml-auto w-3 h-3 bg-gradient-to-r from-emerald to-teal rounded-full animate-pulse-glow shadow-glow"></div>
                )}
                
                {/* Selection indicator */}
                {selectedView === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent"></div>
        </div>

        {/* Overview Section - Modern Design */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Current Session Status - Hero Card */}
            <div className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
              sessionActive 
                ? 'gradient-player shadow-strong' 
                : 'glass-morphism shadow-medium hover:shadow-strong'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    sessionActive 
                      ? 'bg-white/20 text-white animate-float shadow-glow' 
                      : 'bg-gradient-to-br from-slate/10 to-slate/20 text-slate'
                  }`}>
                    {sessionActive ? (
                      <Zap className="w-8 h-8 animate-pulse-glow" />
                    ) : (
                      <Clock className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold ${
                      sessionActive ? 'text-white' : 'text-charcoal'
                    }`}>
                      {sessionActive ? 'Aula em Execução' : 'Studio Pronto'}
                    </h2>
                    <p className={`text-lg ${
                      sessionActive ? 'text-white/80' : 'text-slate/80'
                    }`}>
                      {sessionActive 
                        ? 'Experiência de aprendizado ativa com analytics em tempo real' 
                        : 'Pronto para iniciar sua próxima experiência de aprendizado'
                      }
                    </p>
                  </div>
                  
                  {sessionActive && (
                    <div className="ml-auto">
                      <div className="px-4 py-2 bg-white/20 rounded-full text-white font-medium text-sm backdrop-blur-sm animate-pulse-glow">
                        ● AO VIVO
                      </div>
                    </div>
                  )}
                </div>

                {sessionActive ? (
                  <div className="space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{currentAdvancedSession.lesson.title}</h3>
                        <p className="text-white/80 text-lg mb-4">
                          {currentAdvancedSession.className} • {currentAdvancedSession.institution}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1 bg-white/20 text-white text-sm rounded-xl font-medium backdrop-blur-sm">
                            {currentAdvancedSession.lesson.framework.name}
                          </div>
                          <div className="px-3 py-1 bg-white/20 text-white text-sm rounded-xl font-medium backdrop-blur-sm">
                            {currentAdvancedSession.sessionMode}
                          </div>
                          <div className="px-3 py-1 bg-amber/20 text-white text-sm rounded-xl font-medium backdrop-blur-sm">
                            {currentAdvancedSession.activeWidgets.length} widgets ativos
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedView('widgets')}
                          className="bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm"
                        >
                          <Puzzle className="w-4 h-4 mr-2" />
                          Widget Studio
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedView('active')}
                          className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-sm shadow-medium"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Entrar na Aula
                        </Button>
                      </div>
                    </div>
                    
                    {/* Modern Stage Progress */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">
                          Metodologia 5E • {currentAdvancedSession.lesson.structure.stages[currentAdvancedSession.currentStage]?.stageName}
                        </h4>
                        <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-xl font-mono backdrop-blur-sm">
                          {currentAdvancedSession.currentStage + 1}/{currentAdvancedSession.lesson.structure.stages.length}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-amber via-coral to-violet h-3 rounded-full transition-all duration-500 shadow-glow" 
                          style={{ width: `${((currentAdvancedSession.currentStage + 1) / currentAdvancedSession.lesson.structure.stages.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Modern Analytics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-morphism p-6 rounded-2xl text-center border-white/20 shadow-medium">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald to-teal rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.studentsPresent}</div>
                        <div className="text-sm text-slate font-medium">Presentes</div>
                        <div className="text-xs text-emerald font-bold mt-1">{Math.round((currentAdvancedSession.studentsPresent / currentAdvancedSession.totalStudents) * 100)}% da turma</div>
                      </div>
                      
                      <div className="glass-morphism p-6 rounded-2xl text-center border-white/20 shadow-medium">
                        <div className="w-12 h-12 bg-gradient-to-br from-sage to-emerald rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.realTimeData.participationRate.toFixed(1)}%</div>
                        <div className="text-sm text-slate font-medium">Participação</div>
                        <div className="text-xs text-sage font-bold mt-1 flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {currentAdvancedSession.realTimeData.engagementTrend}
                        </div>
                      </div>
                      
                      <div className="glass-morphism p-6 rounded-2xl text-center border-white/20 shadow-medium">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber to-coral rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.realTimeData.responsesReceived}</div>
                        <div className="text-sm text-slate font-medium">Interações</div>
                        <div className="text-xs text-amber font-bold mt-1">{currentAdvancedSession.realTimeData.lastInteractionTime}</div>
                      </div>
                      
                      <div className="glass-morphism p-6 rounded-2xl text-center border-white/20 shadow-medium">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet to-teal rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div className={`text-2xl font-bold ${
                          currentAdvancedSession.realTimeData.cognitiveLoad === 'low' ? 'text-emerald' :
                          currentAdvancedSession.realTimeData.cognitiveLoad === 'medium' ? 'text-amber' : 'text-coral'
                        }`}>
                          {currentAdvancedSession.realTimeData.cognitiveLoad === 'low' ? 'Ideal' :
                           currentAdvancedSession.realTimeData.cognitiveLoad === 'medium' ? 'Boa' : 'Alta'}
                        </div>
                        <div className="text-sm text-slate font-medium">Carga Cognitiva</div>
                        <div className="text-xs text-violet font-bold mt-1">{currentAdvancedSession.realTimeData.attentionLevel.toFixed(1)}% atenção</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate/20 to-slate/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                      <Play className="w-10 h-10 text-slate" />
                    </div>
                    <p className="text-slate text-lg mb-8 font-medium">Pronto para criar experiências de aprendizado extraordinárias</p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/creator">
                        <Button variant="ghost" size="lg" className="glass-morphism hover:shadow-medium transition-all duration-300">
                          <PencilRuler className="w-5 h-5 mr-3" />
                          Creator Studio
                        </Button>
                      </Link>
                      <Button 
                        size="lg" 
                        onClick={() => setSessionActive(true)}
                        className="gradient-sage text-white shadow-medium hover:shadow-strong transition-all duration-300"
                      >
                        <Play className="w-5 h-5 mr-3" />
                        Iniciar Experiência
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modern Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald to-teal rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-emerald transition-colors duration-300">Sessões Hoje</h4>
                    <p className="text-sm text-slate">Performance diária</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{stats.completedToday}/{stats.totalLessonsToday}</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald to-teal h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats.completedToday / stats.totalLessonsToday) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-emerald">
                    {Math.round((stats.completedToday / stats.totalLessonsToday) * 100)}% concluídas
                  </p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-emerald rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-sage transition-colors duration-300">Frequência</h4>
                    <p className="text-sm text-slate">Semana atual</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{stats.averageAttendance}%</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sage to-emerald h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.averageAttendance}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-sage">Acima da meta (85%)</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber to-coral rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-amber transition-colors duration-300">Engajamento</h4>
                    <p className="text-sm text-slate">Interação ativa</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{stats.studentEngagement}%</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber to-coral h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${stats.studentEngagement}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-amber">Participação excelente</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet to-teal rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-violet transition-colors duration-300">Tempo Ativo</h4>
                    <p className="text-sm text-slate">Esta semana</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{stats.hoursThisWeek}h</div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-violet rounded-full animate-pulse-glow"></div>
                    <span className="text-violet font-medium">{stats.lessonsThisWeek} experiências</span>
                  </div>
                  <p className="text-sm font-medium text-violet">+12% vs semana anterior</p>
                </div>
              </div>
            </div>

            {/* Modern Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer" 
                onClick={() => setSessionActive(true)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald to-teal rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-emerald transition-colors duration-300">Iniciar Experiência</h4>
                    <p className="text-slate/80 font-medium">Execute experiências do Creator Studio</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full gradient-player text-white shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  Escolher Experiência
                </Button>
              </div>

              <div 
                className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer" 
                onClick={() => setSelectedView('attendance')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sage to-emerald rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-sage transition-colors duration-300">Presença Inteligente</h4>
                    <p className="text-slate/80 font-medium">Registro automático e analytics</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full gradient-sage text-white shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <Eye className="w-5 h-5 mr-3" />
                  Abrir Sistema
                </Button>
              </div>

              <div className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet to-teal rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-violet transition-colors duration-300">Analytics IA</h4>
                    <p className="text-slate/80 font-medium">Insights avançados de aprendizado</p>
                  </div>
                </div>
                <Link href="/trainer">
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full gradient-trainer text-white shadow-medium hover:shadow-strong transition-all duration-300"
                  >
                    <Activity className="w-5 h-5 mr-3" />
                    Trainer Studio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Modern Recent Sessions */}
            <div className="glass-morphism p-8 rounded-3xl border-white/20 shadow-medium">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-slate rounded-2xl flex items-center justify-center shadow-medium">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-charcoal">Experiências Recentes</h3>
                  <p className="text-slate/80 font-medium">Últimas sessões executadas com analytics</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    title: 'Frações e Decimais', 
                    class: '4º Ano B', 
                    time: '2h atrás', 
                    attendance: '95%', 
                    engagement: '92%',
                    color: 'emerald',
                    icon: BarChart3,
                    widgets: 3
                  },
                  { 
                    title: 'Brasil Colonial', 
                    class: '7º Ano A', 
                    time: '1 dia atrás', 
                    attendance: '88%', 
                    engagement: '85%',
                    color: 'sage',
                    icon: BookOpen,
                    widgets: 5
                  },
                  { 
                    title: 'Gêneros Textuais', 
                    class: '3º Ano C', 
                    time: '2 dias atrás', 
                    attendance: '92%', 
                    engagement: '89%',
                    color: 'amber',
                    icon: PencilRuler,
                    widgets: 2
                  }
                ].map((session, index) => (
                  <div 
                    key={index} 
                    className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${session.color} to-${session.color}/80 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-105 transition-all duration-300`}>
                          <session.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-charcoal group-hover:text-emerald transition-colors duration-300">{session.title}</div>
                          <div className="text-slate/80 font-medium">{session.class} • {session.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald">{session.attendance}</div>
                          <div className="text-xs text-slate font-medium">Presença</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-sage">{session.engagement}</div>
                          <div className="text-xs text-slate font-medium">Engajamento</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-violet">{session.widgets}</div>
                          <div className="text-xs text-slate font-medium">Widgets</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="glass-morphism hover:shadow-medium transition-all duration-300"
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Ver Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Lesson Section */}
        {selectedView === 'active' && (
          <div className="space-y-6">
            {sessionActive ? (
              <div>
                {/* Modern Lesson Control Panel */}
                <div className="relative overflow-hidden rounded-3xl gradient-player shadow-strong">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="relative p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-glow animate-float">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">{currentAdvancedSession.lesson.title}</h2>
                          <p className="text-white/80 text-lg font-medium mt-1">
                            {currentAdvancedSession.className} • {currentAdvancedSession.institution}
                          </p>
                          <p className="text-white/70 font-medium">{currentAdvancedSession.professor}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-xl font-medium backdrop-blur-sm">
                              {currentAdvancedSession.lesson.framework.name}
                            </span>
                            <span className="px-3 py-1 bg-amber/20 text-white text-sm rounded-xl font-medium backdrop-blur-sm">
                              Nível: {currentAdvancedSession.lesson.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center px-4 py-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                          <div className="text-sm text-white/80 font-medium">Duração</div>
                          <div className="text-2xl font-bold text-white">{currentAdvancedSession.duration}min</div>
                        </div>
                        <div className="px-4 py-2 bg-emerald/20 text-white rounded-xl text-sm font-bold animate-pulse-glow backdrop-blur-sm flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          ● AO VIVO
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSessionActive(false)}
                          className="bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm"
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Finalizar
                        </Button>
                      </div>
                    </div>
                    
                    {/* Modern 5E Framework Progress */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mt-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white">Metodologia 5E • Framework Ativo</h4>
                        <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-xl font-mono backdrop-blur-sm">
                          Estágio {currentAdvancedSession.currentStage + 1}/{currentAdvancedSession.lesson.structure.stages.length}
                        </span>
                      </div>
                      
                      {/* Modern 5E Stages Visualization */}
                      <div className="flex items-center gap-3 mb-6">
                        {currentAdvancedSession.lesson.structure.stages.map((stage, index) => (
                          <div key={stage.id} className="flex-1">
                            <div className={`p-4 rounded-xl text-center transition-all duration-500 ${
                              index === currentAdvancedSession.currentStage 
                                ? 'bg-gradient-to-br from-amber via-coral to-violet text-white shadow-glow border-2 border-white/50' 
                                : index < currentAdvancedSession.currentStage
                                ? 'bg-gradient-to-br from-emerald to-teal text-white shadow-medium'
                                : 'bg-white/20 text-white/60 border border-white/30'
                            }`}>
                              <div className="text-sm font-bold">{stage.stageName.split(' ')[0]}</div>
                              <div className="text-xs opacity-80">{stage.duration}min</div>
                              {index === currentAdvancedSession.currentStage && (
                                <Sparkles className="w-4 h-4 mx-auto mt-2 animate-pulse-glow" />
                              )}
                              {index < currentAdvancedSession.currentStage && (
                                <CheckCircle className="w-4 h-4 mx-auto mt-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-amber via-coral to-violet h-3 rounded-full transition-all duration-500 shadow-glow" 
                          style={{ width: `${((currentAdvancedSession.currentStage + 1) / currentAdvancedSession.lesson.structure.stages.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Modern Real-time Analytics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                      <div className="glass-morphism p-4 rounded-xl border-white/20 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald to-teal rounded-lg flex items-center justify-center mx-auto mb-2 shadow-medium group-hover:shadow-glow transition-all duration-300">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.studentsPresent}</div>
                        <div className="text-xs text-slate font-medium">Presentes</div>
                      </div>
                      <div className="glass-morphism p-4 rounded-xl border-white/20 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-sage to-emerald rounded-lg flex items-center justify-center mx-auto mb-2 shadow-medium group-hover:shadow-glow transition-all duration-300">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.realTimeData.participationRate.toFixed(1)}%</div>
                        <div className="text-xs text-slate font-medium">Participando</div>
                      </div>
                      <div className="glass-morphism p-4 rounded-xl border-white/20 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber to-coral rounded-lg flex items-center justify-center mx-auto mb-2 shadow-medium group-hover:shadow-glow transition-all duration-300">
                          <Send className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.realTimeData.responsesReceived}</div>
                        <div className="text-xs text-slate font-medium">Respostas</div>
                      </div>
                      <div className="glass-morphism p-4 rounded-xl border-white/20 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-coral to-violet rounded-lg flex items-center justify-center mx-auto mb-2 shadow-medium group-hover:shadow-glow transition-all duration-300">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.realTimeData.questionsRaised}</div>
                        <div className="text-xs text-slate font-medium">Dúvidas</div>
                      </div>
                      <div className="glass-morphism p-4 rounded-xl border-white/20 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet to-teal rounded-lg flex items-center justify-center mx-auto mb-2 shadow-medium group-hover:shadow-glow transition-all duration-300">
                          <Puzzle className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-charcoal">{currentAdvancedSession.activeWidgets.length}</div>
                        <div className="text-xs text-slate font-medium">Widgets</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern Activity Controls */}
                <div className="glass-morphism p-8 rounded-3xl border-white/20 shadow-medium">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-charcoal mb-2">Controle de Atividade Ativa</h3>
                    <p className="text-slate/80 font-medium">Exercício: Contando Objetos • 8/15 min</p>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-12">
                    <Button 
                      variant="ghost" 
                      size="lg"
                      className="w-16 h-16 rounded-2xl glass-morphism hover:shadow-medium transition-all duration-300"
                    >
                      <SkipBack className="w-8 h-8 text-slate" />
                    </Button>
                    <Button 
                      size="lg" 
                      className="w-24 h-24 rounded-3xl gradient-player text-white shadow-strong hover:shadow-glow hover:scale-105 transition-all duration-300"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="lg"
                      className="w-16 h-16 rounded-2xl glass-morphism hover:shadow-medium transition-all duration-300"
                    >
                      <SkipForward className="w-8 h-8 text-slate" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="ghost" className="h-14 glass-morphism hover:shadow-medium transition-all duration-300 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber to-coral rounded-lg flex items-center justify-center">
                        <Hand className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-charcoal font-medium">Solicitar Atenção</span>
                    </Button>
                    <Button variant="ghost" className="h-14 glass-morphism hover:shadow-medium transition-all duration-300 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet to-teal rounded-lg flex items-center justify-center">
                        <Poll className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-charcoal font-medium">Enquete Rápida</span>
                    </Button>
                    <Button variant="ghost" className="h-14 glass-morphism hover:shadow-medium transition-all duration-300 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald to-sage rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-charcoal font-medium">Chat da Turma</span>
                    </Button>
                  </div>
                </div>

                {/* Modern Real-time Feedback */}
                <div className="glass-morphism p-8 rounded-3xl border-white/20 shadow-medium">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-emerald rounded-2xl flex items-center justify-center shadow-medium">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal">Feedback Tempo Real</h3>
                      <p className="text-slate/80 font-medium">Analytics instantâneos de engajamento</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-sage to-emerald rounded-lg flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        Participação dos Alunos
                      </h4>
                      <div className="space-y-3">
                        {advancedStudents.slice(0, 3).map(student => (
                          <div key={student.id} className="glass-morphism p-4 rounded-xl border-white/20 hover:shadow-medium transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-charcoal">{student.name}</span>
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full shadow-medium ${
                                  student.participationLevel === 'high' ? 'bg-gradient-to-br from-emerald to-teal' :
                                  student.participationLevel === 'medium' ? 'bg-gradient-to-br from-amber to-coral' : 
                                  'bg-gradient-to-br from-coral to-violet'
                                }`} />
                                <span className="text-sm text-slate font-medium">{student.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber to-coral rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-white" />
                        </div>
                        Alertas Inteligentes
                      </h4>
                      <div className="space-y-3">
                        <div className="glass-morphism p-4 rounded-xl border-amber/20 hover:shadow-medium transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber to-coral rounded-lg flex items-center justify-center shadow-medium">
                              <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-charcoal">3 alunos com dúvidas ativas</span>
                          </div>
                        </div>
                        <div className="glass-morphism p-4 rounded-xl border-emerald/20 hover:shadow-medium transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald to-teal rounded-lg flex items-center justify-center shadow-medium">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-charcoal">Participação acima da meta</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-morphism p-16 rounded-3xl border-white/20 shadow-medium text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate/20 to-slate/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-medium">
                  <Play className="w-12 h-12 text-slate" />
                </div>
                <h3 className="text-3xl font-bold text-charcoal mb-4">Nenhuma Experiência Ativa</h3>
                <p className="text-slate/80 text-lg mb-8 font-medium max-w-md mx-auto">
                  Inicie uma nova experiência de aprendizado para acessar controles em tempo real e analytics avançados
                </p>
                <Button 
                  size="lg"
                  onClick={() => setSessionActive(true)}
                  className="gradient-player text-white shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  Iniciar Nova Experiência
                </Button>
              </div>
            )}
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
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
  Eye,
  Settings,
  Brain,
  Workflow,
  TreePine,
  Network,
  Zap,
  Activity,
  Puzzle,
  Wrench,
  Code,
  Gauge,
  FlaskConical,
  GraduationCap,
  Award,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  TrendingUp
} from "lucide-react"
import Link from 'next/link'

// Import advanced types
import type {
  Course,
  CourseModule,
  CourseModuleLesson,
  CourseModuleLessonStructure,
  CourseModuleLessonStructureStage,
  CourseModuleLessonStructureStageActivity,
  CourseModuleLessonStructureStageActivityForm,
  CourseModuleLessonStructureStageActivityFormItem,
  Widget,
  CourseModuleLessonFramework,
  CourseModuleLessonType,
  CourseModuleTheme
} from '@/lib/advanced-types'

export default function AdvancedCreatorModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'courses' | 'lessons' | 'structures' | 'widgets' | 'frameworks' | 'analytics'>('overview')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Advanced Creator Statistics
  const creatorStats = {
    totalCourses: 156,
    totalModules: 892,
    totalLessons: 2847,
    lessonStructures: 45,
    activeWidgets: 234,
    frameworks: 12,
    collaborators: 89,
    avgLessonComplexity: 7.8,
    structureReuse: 76.3,
    qualityScore: 94.2
  }

  // Mock Advanced Course Data
  const sampleCourses: Course[] = [
    {
      id: 'course-001',
      title: 'Matemática Fundamental - 5º Ano BNCC',
      description: 'Curso completo de matemática para 5º ano alinhado com competências BNCC',
      courseType: {
        id: 'ct-001',
        name: 'Curso Curricular',
        description: 'Curso baseado no currículo nacional',
        typology: {
          id: 'ctt-001',
          name: 'Ensino Fundamental',
          category: 'academic',
          description: 'Educação básica fundamental'
        }
      },
      deliveryModel: {
        id: 'dm-001',
        name: 'Híbrido',
        type: 'hybrid',
        description: 'Combinação de ensino presencial e digital'
      },
      accessType: {
        id: 'at-001',
        name: 'Institucional',
        level: 'institutional',
        requirements: ['Matrícula ativa', 'Professor cadastrado']
      },
      status: 'published',
      createdAt: '2024-10-15',
      updatedAt: '2024-12-08',
      modules: [],
      bundles: [],
      objectives: [],
      metadata: {
        tags: ['matemática', 'fundamental', 'bncc', '5º ano'],
        difficulty: 'intermediate',
        estimatedHours: 120,
        language: 'pt-BR',
        version: '2.1.0',
        lastReview: '2024-11-30',
        nextReview: '2025-05-30',
        author: 'Maria Silva',
        contributors: ['João Santos', 'Ana Costa'],
        license: 'Creative Commons',
        keywords: ['números', 'geometria', 'operações', 'frações'],
        bnccAlignment: ['EF05MA01', 'EF05MA02', 'EF05MA03']
      }
    }
  ]

  // Mock Lesson Data with Complex Structure
  const sampleLessons: CourseModuleLesson[] = [
    {
      id: 'lesson-001',
      moduleId: 'module-001',
      title: 'Frações: Conceitos Fundamentais e Operações',
      description: 'Introdução aos conceitos de frações, representações visuais e operações básicas através de metodologia ativa',
      sequence: 1,
      lessonType: {
        id: 'lt-001',
        name: 'Aula Interativa',
        category: 'workshop',
        interactionLevel: 'high'
      },
      typology: {
        id: 'ltt-001',
        name: 'Construcionista',
        pedagogicalPattern: 'Aprendizagem por Descoberta',
        learningOutcomes: ['Compreender conceito de fração', 'Aplicar operações básicas', 'Resolver problemas contextualizados'],
        assessmentStrategy: 'Formativa e Somativa'
      },
      framework: {
        id: 'fw-001',
        name: '5E Learning Cycle',
        description: 'Framework pedagógico estruturado em 5 fases',
        structure: 'engage_explore_explain_elaborate_evaluate',
        phases: ['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate']
      },
      model: {
        id: 'lm-001',
        name: 'Modelo Híbrido Interativo',
        lessonModelType: {
          id: 'lmt-001',
          name: 'Híbrido Digital',
          framework: 'Blended Learning',
          description: 'Combinação de elementos presenciais e digitais'
        },
        typology: {
          id: 'lmtt-001',
          name: 'Construtivista Digital',
          approach: 'Construção ativa do conhecimento',
          methodology: ['Investigação', 'Colaboração', 'Reflexão'],
          tools: ['Simuladores', 'Jogos educativos', 'Realidade virtual']
        },
        structure: {
          id: 'lms-001',
          name: 'Estrutura Sequencial Adaptativa',
          stages: [],
          flow: 'adaptive'
        }
      },
      structure: {
        id: 'ls-001',
        lessonId: 'lesson-001',
        name: 'Estrutura Principal - Frações',
        structureType: {
          id: 'lst-001',
          name: 'Multi-Stage Interactive',
          pattern: 'Sequencial com Bifurcações',
          description: 'Estrutura com múltiplos estágios e caminhos adaptativos'
        },
        stages: [
          {
            id: 'stage-001',
            structureId: 'ls-001',
            stageName: 'Engajamento Inicial',
            sequence: 1,
            duration: 15,
            stageTypology: {
              id: 'stt-001',
              name: 'Abertura Motivacional',
              purpose: 'Despertar interesse e conectar conhecimentos prévios',
              characteristics: ['Interativo', 'Visual', 'Contextualizado']
            },
            activities: [
              {
                id: 'activity-001',
                stageId: 'stage-001',
                name: 'Pizza das Frações',
                description: 'Atividade lúdica com pizzas virtuais para introduzir o conceito de frações',
                sequence: 1,
                activityType: {
                  id: 'at-001',
                  name: 'Simulação Interativa',
                  category: 'processing',
                  description: 'Atividade baseada em simulação digital',
                  cognitiveLoad: 'medium'
                },
                forms: [
                  {
                    id: 'form-001',
                    activityId: 'activity-001',
                    formName: 'Quiz de Abertura',
                    formType: {
                      id: 'ft-001',
                      name: 'Quiz Diagnóstico',
                      category: 'quiz',
                      description: 'Avaliação inicial dos conhecimentos',
                      scorable: true
                    },
                    items: [
                      {
                        id: 'item-001',
                        formId: 'form-001',
                        itemText: 'Quantas fatias você vê na pizza?',
                        itemType: {
                          id: 'it-001',
                          name: 'Escolha Múltipla Visual',
                          inputType: 'multiple_choice',
                          validation: ['required'],
                          scoring: true
                        },
                        artifacts: [
                          {
                            id: 'artifact-001',
                            itemId: 'item-001',
                            artifactName: 'Pizza Interativa',
                            artifactType: 'interactive',
                            url: '/widgets/pizza-fractions',
                            receivingType: {
                              id: 'rt-001',
                              name: 'Widget Interaction',
                              format: ['click', 'touch'],
                              description: 'Interação através de cliques ou toques'
                            },
                            metadata: { difficulty: 'easy', adaptive: true }
                          }
                        ],
                        sequence: 1,
                        points: 10,
                        required: true,
                        feedback: 'Excelente! Você identificou corretamente as partes da pizza.'
                      }
                    ],
                    sequence: 1,
                    required: true,
                    adaptive: true
                  }
                ],
                duration: 10,
                interactionLevel: 'individual',
                tools: ['Simulador de Frações', 'Quiz Interativo'],
                assessment: true,
                mandatory: true
              }
            ],
            objectives: ['Despertar interesse por frações', 'Ativar conhecimentos prévios'],
            resources: ['Pizza virtual', 'Material concreto', 'Projetor']
          },
          {
            id: 'stage-002',
            structureId: 'ls-001',
            stageName: 'Exploração Conceitual',
            sequence: 2,
            duration: 25,
            stageTypology: {
              id: 'stt-002',
              name: 'Investigação Guiada',
              purpose: 'Explorar conceitos através de experimentação',
              characteristics: ['Investigativo', 'Colaborativo', 'Experimental']
            },
            activities: [
              {
                id: 'activity-002',
                stageId: 'stage-002',
                name: 'Laboratório de Frações',
                description: 'Exploração prática com materiais concretos e digitais',
                sequence: 1,
                activityType: {
                  id: 'at-002',
                  name: 'Laboratório Híbrido',
                  category: 'processing',
                  description: 'Combinação de experimentação física e digital',
                  cognitiveLoad: 'high'
                },
                forms: [],
                duration: 20,
                interactionLevel: 'group',
                tools: ['Blocos lógicos', 'Tablet', 'Material dourado'],
                assessment: false,
                mandatory: true
              }
            ],
            objectives: ['Compreender parte/todo', 'Representar frações visualmente'],
            resources: ['Kit manipulativos', 'Tablets', 'Folhas de registro']
          }
        ]
      },
      objectives: [],
      keyWords: [],
      linkTypes: [],
      duration: 50,
      difficulty: 'intermediate',
      status: 'published'
    }
  ]

  // Mock Widgets Data
  const availableWidgets: Widget[] = [
    {
      id: 'widget-001',
      name: 'Simulador de Frações Interativo',
      description: 'Widget avançado para manipulação visual de frações com feedback em tempo real',
      widgetType: {
        id: 'wt-001',
        name: 'Simulador Matemático',
        category: 'interaction',
        description: 'Ferramenta de simulação para conceitos matemáticos',
        complexity: 'moderate'
      },
      typology: {
        id: 'wtt-001',
        name: 'Manipulativo Virtual',
        pedagogicalFunction: ['Visualização', 'Experimentação', 'Feedback'],
        learningTheory: ['Construtivismo', 'Aprendizagem Ativa'],
        interactionPattern: 'Drag-and-Drop com Feedback'
      },
      supplier: {
        id: 'ws-001',
        name: 'EduTech Solutions',
        company: 'Educational Technology Ltd',
        contactInfo: 'contact@edutech.com',
        certificationLevel: 'premium',
        supportLevel: '24/7'
      },
      componentType: {
        id: 'wct-001',
        name: 'React Interactive Component',
        technicalSpec: 'React 18 + TypeScript',
        framework: ['React', 'Three.js'],
        compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
        renderingType: 'interactive'
      },
      contentType: {
        id: 'wctt-001',
        name: 'Mathematical Visual',
        mediaType: ['SVG', 'Canvas', '3D'],
        format: ['JSON', 'XML'],
        accessibility: ['Screen Reader', 'High Contrast', 'Keyboard Navigation'],
        localization: true
      },
      interactionType: {
        id: 'wit-001',
        name: 'Multi-touch Interaction',
        userAction: ['Click', 'Drag', 'Touch', 'Gesture'],
        feedbackType: ['Visual', 'Audio', 'Haptic'],
        dataCapture: ['Interaction Log', 'Performance Metrics', 'Error Tracking'],
        analytics: true
      },
      attributes: [
        {
          id: 'wa-001',
          name: 'difficulty_level',
          dataType: 'string',
          required: true,
          defaultValue: 'intermediate',
          validation: ['easy', 'intermediate', 'advanced'],
          typology: {
            id: 'wat-001',
            name: 'Pedagogical Parameter',
            category: 'configuration',
            scope: 'instance'
          }
        }
      ],
      version: '2.3.1',
      status: 'active',
      configuration: {
        theme: 'math-blue',
        language: 'pt-BR',
        adaptiveMode: true,
        analytics: true
      }
    }
  ]

  // Mock Frameworks Data
  const pedagogicalFrameworks: CourseModuleLessonFramework[] = [
    {
      id: 'fw-001',
      name: '5E Learning Cycle',
      description: 'Framework construtivista em 5 fases para aprendizagem ativa',
      structure: 'engage_explore_explain_elaborate_evaluate',
      phases: ['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate']
    },
    {
      id: 'fw-002',
      name: 'Problem-Based Learning',
      description: 'Aprendizagem baseada em problemas reais e contextualizados',
      structure: 'problem_based',
      phases: ['Problem Presentation', 'Investigation', 'Solution Design', 'Implementation', 'Reflection']
    },
    {
      id: 'fw-003',
      name: 'Design Thinking Educational',
      description: 'Metodologia de design thinking adaptada para educação',
      structure: 'think_pair_share',
      phases: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']
    }
  ]

  const toggleStageExpansion = (stageId: string) => {
    const newExpanded = new Set(expandedStages)
    if (newExpanded.has(stageId)) {
      newExpanded.delete(stageId)
    } else {
      newExpanded.add(stageId)
    }
    setExpandedStages(newExpanded)
  }

  const getLessonComplexityColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityTypeIcon = (category: string) => {
    switch (category) {
      case 'input': return FileText
      case 'processing': return Brain
      case 'output': return Target
      case 'assessment': return Award
      case 'reflection': return Lightbulb
      default: return Activity
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-primary-powder to-primary-green/5">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-green via-sage to-emerald bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-creator flex items-center justify-center animate-float shadow-glow">
                    <PencilRuler className="w-5 h-5 text-white" />
                  </div>
                  Creator Studio
                </h1>
                <p className="text-slate/80 font-medium">Criação Inteligente • Estruturação Pedagógica Avançada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* System Status with Modern Design */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-morphism">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse-glow"></div>
                  <span className="text-xs font-medium text-charcoal">AI Studio</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-primary-green" />
                  <Workflow className="w-4 h-4 text-sage" />
                  <Lightbulb className="w-4 h-4 text-emerald" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                <Calendar className="w-4 h-4 mr-2" />
                Cronograma
              </Button>
              
              <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button size="sm" className="gradient-creator text-white shadow-medium hover:shadow-strong transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Novo Curso
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
              { id: 'overview', label: 'Visão Geral', icon: BarChart, color: 'primary-green' },
              { id: 'courses', label: 'Cursos', icon: BookOpen, color: 'sage' },
              { id: 'lessons', label: 'Aulas Avançadas', icon: GraduationCap, color: 'emerald' },
              { id: 'structures', label: 'Estruturas', icon: Network, color: 'teal' },
              { id: 'widgets', label: 'Widgets', icon: Puzzle, color: 'violet' },
              { id: 'frameworks', label: 'Frameworks', icon: TreePine, color: 'amber' },
              { id: 'analytics', label: 'Analytics', icon: Gauge, color: 'coral' }
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
                
                {/* AI Activity indicators */}
                {tab.id === 'structures' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-emerald to-teal text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    {creatorStats.lessonStructures}
                  </div>
                )}
                
                {tab.id === 'widgets' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-violet to-violet/80 text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    {creatorStats.activeWidgets}
                  </div>
                )}
                
                {/* Selection indicator */}
                {selectedView === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-green to-transparent rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-green/30 to-transparent"></div>
        </div>

        {/* Modern Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Modern Creator Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-emerald rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-sage transition-colors duration-300">Cursos Ativos</h4>
                    <p className="text-sm text-slate">Biblioteca completa</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{creatorStats.totalCourses}</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sage to-emerald h-2 rounded-full transition-all duration-500" 
                      style={{ width: '78%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-sage">+12 este mês</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald to-teal rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-emerald transition-colors duration-300">Aulas Estruturadas</h4>
                    <p className="text-sm text-slate">5E & Metodologias</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{creatorStats.totalLessons.toLocaleString()}</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald to-teal h-2 rounded-full transition-all duration-500" 
                      style={{ width: '92%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-emerald">{creatorStats.lessonStructures} estruturas únicas</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet to-teal rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Puzzle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-violet transition-colors duration-300">Widgets IA</h4>
                    <p className="text-sm text-slate">Interativos</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{creatorStats.activeWidgets}</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-violet to-teal h-2 rounded-full transition-all duration-500" 
                      style={{ width: '89%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-violet">89% compatíveis</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber to-coral rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-amber transition-colors duration-300">Quality Score</h4>
                    <p className="text-sm text-slate">IA Analytics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{creatorStats.qualityScore}%</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber to-coral h-2 rounded-full transition-all duration-500" 
                      style={{ width: '94%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-amber flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +2.3% vs anterior
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Quick Actions for Advanced Creator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer" 
                onClick={() => setSelectedView('courses')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-sage rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-primary-green transition-colors duration-300">Criar Curso Completo</h4>
                    <p className="text-slate/80 font-medium">Estrutura com módulos e avaliações IA</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full gradient-creator text-white shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <Lightbulb className="w-5 h-5 mr-3" />
                  Começar Criação
                </Button>
              </div>

              <div 
                className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer" 
                onClick={() => setSelectedView('structures')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald to-teal rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-emerald transition-colors duration-300">Estruturas 5E</h4>
                    <p className="text-slate/80 font-medium">{creatorStats.lessonStructures} metodologias reutilizáveis</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full gradient-sage text-white shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <TreePine className="w-5 h-5 mr-3" />
                  Ver Estruturas
                </Button>
              </div>

              <div 
                className="group glass-morphism p-8 rounded-3xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer" 
                onClick={() => setSelectedView('widgets')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet to-teal rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <Puzzle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-charcoal group-hover:text-violet transition-colors duration-300">Widgets IA</h4>
                    <p className="text-slate/80 font-medium">{creatorStats.activeWidgets} interativos avançados</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full gradient-trainer text-white shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Explorar Biblioteca
                </Button>
              </div>
            </div>

            {/* Modern Recent Advanced Lessons */}
            <div className="glass-morphism p-8 rounded-3xl border-white/20 shadow-medium">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-emerald rounded-2xl flex items-center justify-center shadow-medium">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-charcoal">Criações Recentes</h3>
                  <p className="text-slate/80 font-medium">Estruturas pedagógicas avançadas com metodologia 5E</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {sampleLessons.slice(0, 3).map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-soft hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow group-hover:scale-105 transition-all duration-300 ${
                          index === 0 ? 'bg-gradient-to-br from-primary-green to-sage' :
                          index === 1 ? 'bg-gradient-to-br from-emerald to-teal' : 
                          'bg-gradient-to-br from-sage to-emerald'
                        }`}>
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-charcoal group-hover:text-primary-green transition-colors duration-300">{lesson.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-primary-green/10 text-primary-green text-xs rounded-xl font-medium">
                                {lesson.framework.name}
                              </span>
                              <span className={`px-3 py-1 text-xs rounded-xl font-medium ${
                                lesson.difficulty === 'beginner' ? 'bg-emerald/10 text-emerald' :
                                lesson.difficulty === 'intermediate' ? 'bg-amber/10 text-amber' : 'bg-coral/10 text-coral'
                              }`}>
                                {lesson.difficulty}
                              </span>
                              <span className="px-3 py-1 bg-violet/10 text-violet text-xs rounded-xl font-medium">
                                {lesson.duration}min
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center p-3 glass-morphism rounded-xl border-white/10">
                              <div className="text-2xl font-bold text-charcoal">{lesson.structure.stages.length}</div>
                              <div className="text-xs text-slate font-medium">Estágios 5E</div>
                            </div>
                            <div className="text-center p-3 glass-morphism rounded-xl border-white/10">
                              <div className="text-2xl font-bold text-charcoal">
                                {lesson.structure.stages.reduce((acc, stage) => acc + stage.activities.length, 0)}
                              </div>
                              <div className="text-xs text-slate font-medium">Atividades</div>
                            </div>
                            <div className="text-center p-3 glass-morphism rounded-xl border-white/10">
                              <div className="text-2xl font-bold text-charcoal capitalize">{lesson.lessonType.interactionLevel}</div>
                              <div className="text-xs text-slate font-medium">Interação</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-6">
                        <Button variant="ghost" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Link href="/player">
                          <Button variant="ghost" size="sm" className="gradient-creator text-white shadow-medium hover:shadow-strong transition-all duration-300">
                            <Play className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Lessons Section */}
        {selectedView === 'lessons' && (
          <div className="space-y-6">
            {/* Lesson Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Aulas Estruturadas - Filtros Avançados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-gray" />
                      <input
                        type="text"
                        placeholder="Título, framework, competências..."
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Framework</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md">
                      <option value="all">Todos os Frameworks</option>
                      <option value="5e">5E Learning Cycle</option>
                      <option value="pbl">Problem-Based Learning</option>
                      <option value="dt">Design Thinking</option>
                      <option value="fl">Flipped Learning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Complexidade</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md">
                      <option value="all">Todas</option>
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
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

            {/* Detailed Lesson Structure */}
            {sampleLessons.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-creator" />
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{lesson.description}</CardDescription>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <TreePine className="w-4 h-4 text-creator" />
                          <span className="text-sm font-medium">{lesson.framework.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-creator" />
                          <span className="text-sm">{lesson.duration} minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-creator" />
                          <span className="text-sm">{lesson.typology.name}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLessonComplexityColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Link href="/player">
                        <Button variant="creator" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Executar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Lesson Structure Stages */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Network className="w-5 h-5 text-creator" />
                      Estrutura Pedagógica ({lesson.structure.stages.length} estágios)
                    </h4>
                    
                    {lesson.structure.stages.map((stage, stageIndex) => (
                      <div key={stage.id} className="border rounded-lg overflow-hidden">
                        <div 
                          className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleStageExpansion(stage.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-creator text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {stage.sequence}
                              </div>
                              <div>
                                <h5 className="font-semibold">{stage.stageName}</h5>
                                <div className="flex items-center gap-4 text-sm text-primary-gray">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {stage.duration}min
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    {stage.activities.length} atividades
                                  </span>
                                  <span>{stage.stageTypology.purpose}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-creator font-medium">
                                {stage.stageTypology.characteristics.join(', ')}
                              </div>
                              {expandedStages.has(stage.id) ? 
                                <ChevronDown className="w-4 h-4 text-creator" /> : 
                                <ChevronRight className="w-4 h-4 text-creator" />
                              }
                            </div>
                          </div>
                        </div>

                        {/* Expanded Stage Content */}
                        {expandedStages.has(stage.id) && (
                          <div className="p-4 border-t bg-white">
                            <div className="space-y-4">
                              {/* Stage Objectives */}
                              <div>
                                <h6 className="font-medium text-sm text-primary-gray mb-2">Objetivos do Estágio:</h6>
                                <div className="flex flex-wrap gap-2">
                                  {stage.objectives.map((objective, objIndex) => (
                                    <span key={objIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                      {objective}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Stage Activities */}
                              <div>
                                <h6 className="font-medium text-sm text-primary-gray mb-3">Atividades:</h6>
                                {stage.activities.map((activity) => {
                                  const ActivityIcon = getActivityTypeIcon(activity.activityType.category)
                                  return (
                                    <div key={activity.id} className="border-l-4 border-creator pl-4 py-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <ActivityIcon className="w-5 h-5 text-creator" />
                                          <div>
                                            <div className="font-medium">{activity.name}</div>
                                            <div className="text-sm text-primary-gray">{activity.description}</div>
                                            <div className="flex items-center gap-4 mt-1">
                                              <span className="text-xs text-primary-gray">
                                                {activity.duration} min
                                              </span>
                                              <span className="text-xs text-primary-gray">
                                                {activity.interactionLevel}
                                              </span>
                                              <span className="text-xs text-primary-gray">
                                                {activity.tools.join(', ')}
                                              </span>
                                              {activity.assessment && (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                                  Avaliativo
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-1 rounded text-xs ${
                                            activity.activityType.cognitiveLoad === 'high' ? 'bg-red-100 text-red-800' :
                                            activity.activityType.cognitiveLoad === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                          }`}>
                                            {activity.activityType.cognitiveLoad} load
                                          </span>
                                          <Button variant="outline" size="sm">
                                            <Settings className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>

                                      {/* Activity Forms */}
                                      {activity.forms.length > 0 && (
                                        <div className="mt-3 ml-8 space-y-2">
                                          {activity.forms.map((form) => (
                                            <div key={form.id} className="p-3 bg-gray-50 rounded border">
                                              <div className="flex items-center justify-between">
                                                <div>
                                                  <div className="font-medium text-sm">{form.formName}</div>
                                                  <div className="text-xs text-primary-gray">
                                                    {form.formType.description} • {form.items.length} itens
                                                    {form.adaptive && <span className="ml-2 px-1 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">Adaptativo</span>}
                                                  </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                  <Eye className="w-3 h-3 mr-1" />
                                                  Ver
                                                </Button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>

                              {/* Stage Resources */}
                              <div>
                                <h6 className="font-medium text-sm text-primary-gray mb-2">Recursos Necessários:</h6>
                                <div className="flex flex-wrap gap-2">
                                  {stage.resources.map((resource, resIndex) => (
                                    <span key={resIndex} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                                      {resource}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Other Sections Placeholder */}
        {!['overview', 'lessons'].includes(selectedView) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedView === 'courses' && <><BookOpen className="w-5 h-5 text-creator" />Gestão de Cursos Avançada</>}
                {selectedView === 'structures' && <><Network className="w-5 h-5 text-creator" />Estruturas Pedagógicas</>}
                {selectedView === 'widgets' && <><Puzzle className="w-5 h-5 text-creator" />Biblioteca de Widgets</>}
                {selectedView === 'frameworks' && <><TreePine className="w-5 h-5 text-creator" />Frameworks Pedagógicos</>}
                {selectedView === 'analytics' && <><Gauge className="w-5 h-5 text-creator" />Analytics de Criação</>}
              </CardTitle>
              <CardDescription>
                {selectedView === 'courses' && 'Sistema completo de gestão de cursos com módulos e temas'}
                {selectedView === 'structures' && 'Estruturas reutilizáveis para diferentes metodologias'}
                {selectedView === 'widgets' && 'Componentes interativos para enriquecer o aprendizado'}
                {selectedView === 'frameworks' && 'Metodologias pedagógicas estruturadas'}
                {selectedView === 'analytics' && 'Métricas e insights sobre o processo de criação'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                {selectedView === 'courses' && <BookOpen className="w-20 h-20 text-creator mx-auto mb-6 opacity-50" />}
                {selectedView === 'structures' && <Network className="w-20 h-20 text-creator mx-auto mb-6 opacity-50" />}
                {selectedView === 'widgets' && <Puzzle className="w-20 h-20 text-creator mx-auto mb-6 opacity-50" />}
                {selectedView === 'frameworks' && <TreePine className="w-20 h-20 text-creator mx-auto mb-6 opacity-50" />}
                {selectedView === 'analytics' && <Gauge className="w-20 h-20 text-creator mx-auto mb-6 opacity-50" />}
                
                <h3 className="text-lg font-semibold text-primary-black mb-2">
                  Seção {selectedView === 'courses' ? 'de Cursos' :
                            selectedView === 'structures' ? 'de Estruturas' :
                            selectedView === 'widgets' ? 'de Widgets' :
                            selectedView === 'frameworks' ? 'de Frameworks' : 'de Analytics'} 
                  Implementada
                </h3>
                <p className="text-primary-gray mb-6">
                  {selectedView === 'courses' && 'Sistema completo de criação e gestão de cursos com módulos, temas e objetivos de aprendizagem integrados.'}
                  {selectedView === 'structures' && 'Biblioteca de estruturas pedagógicas reutilizáveis baseadas em diferentes metodologias de ensino.'}
                  {selectedView === 'widgets' && 'Catálogo extenso de widgets interativos com sistema de configuração avançado e analytics integrado.'}
                  {selectedView === 'frameworks' && 'Coleção de frameworks pedagógicos estruturados para diferentes abordagens de ensino e aprendizagem.'}
                  {selectedView === 'analytics' && 'Dashboards avançados com métricas de criação, reutilização de componentes e eficácia pedagógica.'}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="creator" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Novo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Explorar
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
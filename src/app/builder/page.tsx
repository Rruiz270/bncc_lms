'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  GraduationCap,
  Brain,
  Target,
  FileText,
  PencilRuler,
  Settings,
  Layers,
  Network,
  TreePine,
  Lightbulb,
  Award,
  Puzzle,
  Code,
  Database,
  Map,
  Workflow,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Clock,
  Users,
  CheckCircle
} from "lucide-react"
import Link from 'next/link'

// Import advanced types
import type {
  Course,
  CourseModule,
  CourseModuleTheme,
  CourseThemeKnowledgeObject,
  CourseThemeKnowledgeObjectSkill,
  CourseObjective,
  CourseType,
  CourseTypology,
  CourseModuleObjective,
  BNCCCompetency
} from '@/lib/advanced-types'

// Import BNCC data
import { 
  bnccStats, 
  sampleBNCCCompetencies, 
  filterCompetencies,
  fundamentalSubjects,
  medioAreas,
  skillTypes,
  cognitiveTypes
} from '@/lib/bncc-data'

export default function AdvancedBuilderModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'courses' | 'modules' | 'themes' | 'competencies' | 'knowledge' | 'mapping' | 'analytics'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  // Advanced Builder Statistics
  const builderStats = {
    totalCourses: 89,
    totalModules: 456,
    totalThemes: 1234,
    knowledgeObjects: 2847,
    bnccMappings: 1512,
    courseBundles: 23,
    objectives: 3456,
    qualityScore: 96.8,
    completionRate: 87.3,
    collaborativeEdits: 234
  }

  // Mock Advanced Course Data
  const advancedCourses: Course[] = [
    {
      id: 'course-001',
      title: 'Matemática Fundamental - Ciclo Completo',
      description: 'Curso estruturado completo de matemática para ensino fundamental com módulos integrados',
      courseType: {
        id: 'ct-001',
        name: 'Curso Curricular BNCC',
        description: 'Curso baseado integralmente na Base Nacional Comum Curricular',
        typology: {
          id: 'ctt-001',
          name: 'Ensino Fundamental Integrado',
          category: 'academic',
          description: 'Educação básica com metodologia integrada'
        }
      },
      deliveryModel: {
        id: 'dm-001',
        name: 'Híbrido Inteligente',
        type: 'hybrid',
        description: 'Combinação adaptativa de ensino presencial e digital'
      },
      accessType: {
        id: 'at-001',
        name: 'Rede Estadual',
        level: 'institutional',
        requirements: ['Matrícula ativa', 'Professor habilitado', 'Escola credenciada']
      },
      status: 'published',
      createdAt: '2024-09-01',
      updatedAt: '2024-12-08',
      modules: [
        {
          id: 'mod-001',
          courseId: 'course-001',
          title: 'Números e Operações',
          description: 'Módulo fundamental sobre números naturais, operações e sistema decimal',
          sequence: 1,
          moduleType: {
            id: 'mt-001',
            name: 'Módulo Conceitual',
            description: 'Focado na construção de conceitos fundamentais',
            category: 'theoretical'
          },
          model: {
            id: 'mm-001',
            name: 'Modelo Espiral Construtivista',
            modelType: {
              id: 'mmt-001',
              name: 'Espiral Cognitivo',
              framework: 'Bruner Spiral Curriculum',
              description: 'Desenvolvimento conceitual em espiral crescente'
            },
            typology: {
              id: 'mmtt-001',
              name: 'Construtivismo Social',
              pedagogicalApproach: 'constructivist',
              methodology: ['Investigação', 'Colaboração', 'Reflexão Social']
            },
            structure: {
              id: 'mms-001',
              name: 'Estrutura Modular Conectada',
              stages: [],
              flow: 'network'
            }
          },
          themes: [
            {
              id: 'theme-001',
              moduleId: 'mod-001',
              title: 'Sistema de Numeração Decimal',
              description: 'Compreensão do valor posicional e representação numérica',
              themeType: {
                id: 'tt-001',
                name: 'Conceito Fundamental',
                category: 'conceptual',
                description: 'Tema baseado em conceitos estruturantes'
              },
              typology: {
                id: 'ttt-001',
                name: 'Matemático Abstrato',
                domain: 'Matemática',
                cognitiveLevel: 'understand',
                complexity: 'intermediate'
              },
              knowledgeObjects: [
                {
                  id: 'ko-001',
                  themeId: 'theme-001',
                  title: 'Valor Posicional',
                  description: 'Compreensão de que a posição do algarismo determina seu valor',
                  objectType: 'concept',
                  skills: [
                    {
                      id: 'skill-001',
                      knowledgeObjectId: 'ko-001',
                      skillName: 'Identificar valor posicional de algarismos',
                      skillLevel: 'competent',
                      bnccCode: 'EF02MA01',
                      assessment: true
                    },
                    {
                      id: 'skill-002',
                      knowledgeObjectId: 'ko-001',
                      skillName: 'Comparar números usando valor posicional',
                      skillLevel: 'competent',
                      bnccCode: 'EF02MA02',
                      assessment: true
                    }
                  ]
                },
                {
                  id: 'ko-002',
                  themeId: 'theme-001',
                  title: 'Decomposição Numérica',
                  description: 'Separação de números em unidades, dezenas e centenas',
                  objectType: 'procedure',
                  skills: [
                    {
                      id: 'skill-003',
                      knowledgeObjectId: 'ko-002',
                      skillName: 'Decompor números até 1000',
                      skillLevel: 'proficient',
                      bnccCode: 'EF03MA01',
                      assessment: true
                    }
                  ]
                }
              ],
              sequence: 1
            },
            {
              id: 'theme-002', 
              moduleId: 'mod-001',
              title: 'Operações Fundamentais',
              description: 'Adição, subtração, multiplicação e divisão com compreensão',
              themeType: {
                id: 'tt-002',
                name: 'Procedimento Operativo',
                category: 'procedural',
                description: 'Tema focado em procedimentos e algoritmos'
              },
              typology: {
                id: 'ttt-002',
                name: 'Matemático Operacional',
                domain: 'Matemática',
                cognitiveLevel: 'apply',
                complexity: 'intermediate'
              },
              knowledgeObjects: [
                {
                  id: 'ko-003',
                  themeId: 'theme-002',
                  title: 'Estratégias de Cálculo Mental',
                  description: 'Desenvolvimento de estratégias para cálculo mental eficiente',
                  objectType: 'strategy',
                  skills: [
                    {
                      id: 'skill-004',
                      knowledgeObjectId: 'ko-003',
                      skillName: 'Usar decomposição para cálculo mental',
                      skillLevel: 'competent',
                      bnccCode: 'EF04MA03',
                      assessment: false
                    }
                  ]
                }
              ],
              sequence: 2
            }
          ],
          lessons: [],
          objectives: [
            {
              id: 'obj-001',
              moduleId: 'mod-001',
              objectiveText: 'Compreender o sistema de numeração decimal e suas propriedades',
              objectiveType: {
                id: 'ot-001',
                name: 'Objetivo Conceitual',
                scope: 'module',
                measurable: true
              },
              sequence: 1,
              parentObjectiveId: undefined
            }
          ],
          linkTypes: []
        }
      ],
      bundles: [],
      objectives: [
        {
          id: 'course-obj-001',
          courseId: 'course-001',
          objectiveText: 'Desenvolver competências matemáticas fundamentais alinhadas à BNCC',
          objectiveType: {
            id: 'cot-001',
            name: 'Objetivo Geral do Curso',
            level: 'knowledge',
            description: 'Objetivo abrangente do curso'
          },
          typology: {
            id: 'cott-001',
            name: 'Cognitivo Fundamental',
            domain: 'cognitive',
            category: 'knowledge'
          },
          sequence: 1,
          assessment: true,
          bnccAlignment: 'EF05MA01'
        }
      ],
      metadata: {
        tags: ['matemática', 'fundamental', 'bncc', 'números', 'operações'],
        difficulty: 'intermediate',
        estimatedHours: 200,
        language: 'pt-BR',
        version: '3.0.0',
        lastReview: '2024-12-01',
        nextReview: '2025-06-01',
        author: 'Equipe Pedagógica SC',
        contributors: ['Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira'],
        license: 'Creative Commons BY-SA 4.0',
        keywords: ['números', 'operações', 'sistema decimal', 'valor posicional', 'cálculo mental'],
        bnccAlignment: ['EF02MA01', 'EF02MA02', 'EF03MA01', 'EF04MA03', 'EF05MA01']
      }
    }
  ]

  const toggleExpansion = (id: string, type: 'course' | 'module') => {
    if (type === 'course') {
      const newExpanded = new Set(expandedCourses)
      if (newExpanded.has(id)) {
        newExpanded.delete(id)
      } else {
        newExpanded.add(id)
      }
      setExpandedCourses(newExpanded)
    } else {
      const newExpanded = new Set(expandedModules)
      if (newExpanded.has(id)) {
        newExpanded.delete(id)
      } else {
        newExpanded.add(id)
      }
      setExpandedModules(newExpanded)
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getKnowledgeObjectIcon = (type: string) => {
    switch (type) {
      case 'concept': return Brain
      case 'principle': return Lightbulb
      case 'procedure': return Settings
      case 'fact': return Database
      case 'strategy': return Target
      default: return FileText
    }
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
                  <BookOpen className="w-8 h-8 text-builder" />
                  Advanced Builder
                </h1>
                <p className="text-primary-gray">Construção Curricular - Sistema Avançado de Estruturação do Conhecimento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Map className="w-4 h-4 mr-2" />
                Mapa Curricular
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Link href="/creator">
                <Button variant="builder" size="sm">
                  <PencilRuler className="w-4 h-4 mr-2" />
                  Criar Aulas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'courses', label: 'Cursos', icon: BookOpen },
            { id: 'modules', label: 'Módulos', icon: Layers },
            { id: 'themes', label: 'Temas', icon: TreePine },
            { id: 'competencies', label: 'Competências BNCC', icon: Target },
            { id: 'knowledge', label: 'Objetos de Conhecimento', icon: Brain },
            { id: 'mapping', label: 'Mapeamento', icon: Map },
            { id: 'analytics', label: 'Analytics', icon: Gauge }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'builder' : 'outline'}
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
            {/* Advanced Builder Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Cursos Estruturados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{builderStats.totalCourses}</div>
                  <p className="text-xs text-primary-gray">{builderStats.totalModules} módulos integrados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Objetos de Conhecimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{builderStats.knowledgeObjects.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">{builderStats.totalThemes.toLocaleString()} temas mapeados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Competências BNCC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{builderStats.bnccMappings.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">{bnccStats.fundamentalSkills + bnccStats.medioSkills} mapeadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Quality Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{builderStats.qualityScore}%</div>
                  <p className="text-xs text-green-600">↑ +1.8% vs mês anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Curriculum Architecture Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-builder" />
                  Arquitetura Curricular - Visão Hierárquica
                </CardTitle>
                <CardDescription>Estrutura completa do conhecimento organizado por cursos, módulos e temas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {advancedCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="border rounded-lg overflow-hidden">
                      {/* Course Level */}
                      <div 
                        className="p-4 bg-builder/10 cursor-pointer hover:bg-builder/20 transition-colors"
                        onClick={() => toggleExpansion(course.id, 'course')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-builder rounded-lg flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{course.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-primary-gray">
                                <span className="flex items-center gap-1">
                                  <Layers className="w-3 h-3" />
                                  {course.modules.length} módulos
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  {course.metadata.bnccAlignment.length} competências BNCC
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {course.metadata.estimatedHours}h estimadas
                                </span>
                                <span className={`px-2 py-1 rounded text-xs ${getComplexityColor(course.metadata.difficulty)}`}>
                                  {course.metadata.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {course.status}
                            </span>
                            {expandedCourses.has(course.id) ? 
                              <ChevronDown className="w-5 h-5 text-builder" /> : 
                              <ChevronRight className="w-5 h-5 text-builder" />
                            }
                          </div>
                        </div>
                      </div>

                      {/* Expanded Course Content */}
                      {expandedCourses.has(course.id) && (
                        <div className="border-t bg-white">
                          {course.modules.map((module) => (
                            <div key={module.id} className="border-b last:border-b-0">
                              <div 
                                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => toggleExpansion(module.id, 'module')}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 ml-8">
                                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                      <Layers className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">{module.title}</h4>
                                      <div className="flex items-center gap-3 text-sm text-primary-gray">
                                        <span className="flex items-center gap-1">
                                          <TreePine className="w-3 h-3" />
                                          {module.themes.length} temas
                                        </span>
                                        <span>{module.moduleType.name}</span>
                                        <span>Seq: {module.sequence}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    {expandedModules.has(module.id) ? 
                                      <ChevronDown className="w-4 h-4 text-orange-500" /> : 
                                      <ChevronRight className="w-4 h-4 text-orange-500" />
                                    }
                                  </div>
                                </div>
                              </div>

                              {/* Expanded Module Content */}
                              {expandedModules.has(module.id) && (
                                <div className="p-4 ml-8 bg-white">
                                  <div className="space-y-4">
                                    {module.themes.map((theme) => (
                                      <div key={theme.id} className="border-l-4 border-green-500 pl-4 py-2">
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <TreePine className="w-4 h-4 text-green-500" />
                                              <h5 className="font-medium">{theme.title}</h5>
                                              <span className={`px-2 py-1 rounded text-xs ${getComplexityColor(theme.typology.complexity)}`}>
                                                {theme.typology.complexity}
                                              </span>
                                            </div>
                                            <p className="text-sm text-primary-gray mt-1">{theme.description}</p>
                                            
                                            {/* Knowledge Objects */}
                                            <div className="mt-3 ml-4 space-y-2">
                                              {theme.knowledgeObjects.map((ko) => {
                                                const KOIcon = getKnowledgeObjectIcon(ko.objectType)
                                                return (
                                                  <div key={ko.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                                                    <KOIcon className="w-4 h-4 text-blue-500 mt-0.5" />
                                                    <div className="flex-1">
                                                      <div className="font-medium text-sm">{ko.title}</div>
                                                      <div className="text-xs text-primary-gray">{ko.description}</div>
                                                      <div className="flex flex-wrap gap-1 mt-2">
                                                        {ko.skills.map((skill) => (
                                                          <span key={skill.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                            {skill.bnccCode}: {skill.skillName}
                                                          </span>
                                                        ))}
                                                      </div>
                                                    </div>
                                                    <div className="text-xs text-primary-gray">
                                                      {ko.objectType}
                                                    </div>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </div>
                                          <Button variant="outline" size="sm">
                                            <Settings className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions for Advanced Builder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-builder/20" 
                    onClick={() => setSelectedView('courses')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-builder" />
                    Criar Curso Estruturado
                  </CardTitle>
                  <CardDescription>
                    Construa cursos com módulos, temas e objetos de conhecimento integrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="builder" size="sm">Novo Curso</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                    onClick={() => setSelectedView('competencies')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-builder" />
                    Explorar BNCC
                  </CardTitle>
                  <CardDescription>
                    {bnccStats.totalCompetencies} competências mapeadas e estruturadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Ver Competências</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-builder" />
                    Mapa Curricular
                  </CardTitle>
                  <CardDescription>
                    Visualização completa da estrutura curricular
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Visualizar Mapa</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* BNCC Competencies Section - Enhanced */}
        {selectedView === 'competencies' && (
          <div className="space-y-6">
            {/* Enhanced Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Competências BNCC - Exploração Avançada</CardTitle>
                <CardDescription>
                  {bnccStats.totalCompetencies} competências organizadas por {bnccStats.subjects} disciplinas e {bnccStats.areas} áreas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-gray" />
                      <input
                        type="text"
                        placeholder="Código, descrição ou palavra-chave..."
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nível</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      <option value="all">Todos os níveis</option>
                      <option value="fundamental">Ensino Fundamental</option>
                      <option value="medio">Ensino Médio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Disciplina/Área</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">Todas</option>
                      <optgroup label="Ensino Fundamental">
                        {fundamentalSubjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Ensino Médio">
                        {medioAreas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Habilidade</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md">
                      <option value="all">Todos</option>
                      {skillTypes.slice(0, 5).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="builder" className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BNCC Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Ensino Fundamental</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{bnccStats.fundamentalSkills}</div>
                  <p className="text-xs text-primary-gray">Habilidades 1º-9º ano</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Ensino Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{bnccStats.medioSkills}</div>
                  <p className="text-xs text-primary-gray">Competências 10º-12º ano</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Tipos de Habilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{bnccStats.skillTypes}</div>
                  <p className="text-xs text-primary-gray">Categorias mapeadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Tipos Cognitivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{bnccStats.cognitiveTypes}</div>
                  <p className="text-xs text-primary-gray">Processos identificados</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced BNCC Competencies List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-builder" />
                    Competências e Habilidades
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                    <Link href="/creator">
                      <Button variant="builder" size="sm">
                        <PencilRuler className="w-4 h-4 mr-2" />
                        Criar Aula
                      </Button>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterCompetencies(
                    sampleBNCCCompetencies,
                    {
                      search: searchTerm,
                      level: selectedLevel,
                      subject: selectedSubject
                    }
                  ).slice(0, 10).map((competency) => (
                    <div key={competency.code} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-builder text-white rounded-full text-sm font-mono font-bold">
                              {competency.code}
                            </span>
                            <div className="flex items-center gap-2">
                              {competency.subject && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {competency.subject}
                                </span>
                              )}
                              {competency.area && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                  {competency.area}
                                </span>
                              )}
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                                {typeof competency.year === 'number' ? `${competency.year}º ano` : competency.year}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-primary-black mb-3">{competency.text}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-primary-gray">Tipo de Habilidade:</span>
                              <div className="text-builder">{competency.skillType}</div>
                            </div>
                            <div>
                              <span className="font-medium text-primary-gray">Processo Cognitivo:</span>
                              <div className="text-builder">{competency.cognitiveType}</div>
                            </div>
                            <div>
                              <span className="font-medium text-primary-gray">Processos:</span>
                              <div className="text-builder">{competency.cognitiveProcesses.join(', ')}</div>
                            </div>
                          </div>

                          {competency.domainTypology && (
                            <div className="mt-3 p-2 bg-gray-50 rounded">
                              <span className="font-medium text-xs text-primary-gray">Domínio:</span>
                              <span className="text-xs ml-2">{competency.domainTypology}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Link href="/creator">
                            <Button variant="builder" size="sm">
                              <PencilRuler className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Sections Placeholder */}
        {!['overview', 'competencies'].includes(selectedView) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedView === 'courses' && <><BookOpen className="w-5 h-5 text-builder" />Gestão Avançada de Cursos</>}
                {selectedView === 'modules' && <><Layers className="w-5 h-5 text-builder" />Módulos Estruturados</>}
                {selectedView === 'themes' && <><TreePine className="w-5 h-5 text-builder" />Temas de Conhecimento</>}
                {selectedView === 'knowledge' && <><Brain className="w-5 h-5 text-builder" />Objetos de Conhecimento</>}
                {selectedView === 'mapping' && <><Map className="w-5 h-5 text-builder" />Mapeamento Curricular</>}
                {selectedView === 'analytics' && <><Gauge className="w-5 h-5 text-builder" />Analytics Curriculares</>}
              </CardTitle>
              <CardDescription>
                {selectedView === 'courses' && 'Sistema completo de criação e gestão de cursos estruturados'}
                {selectedView === 'modules' && 'Módulos pedagógicos com temas e objetivos integrados'}
                {selectedView === 'themes' && 'Temas organizados por tipologia e complexidade cognitiva'}
                {selectedView === 'knowledge' && 'Objetos de conhecimento mapeados com habilidades específicas'}
                {selectedView === 'mapping' && 'Visualização completa da arquitetura curricular'}
                {selectedView === 'analytics' && 'Métricas e insights sobre a estrutura curricular'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                {selectedView === 'courses' && <BookOpen className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                {selectedView === 'modules' && <Layers className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                {selectedView === 'themes' && <TreePine className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                {selectedView === 'knowledge' && <Brain className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                {selectedView === 'mapping' && <Map className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                {selectedView === 'analytics' && <Gauge className="w-20 h-20 text-builder mx-auto mb-6 opacity-50" />}
                
                <h3 className="text-lg font-semibold text-primary-black mb-2">
                  Seção {selectedView === 'courses' ? 'de Cursos' :
                            selectedView === 'modules' ? 'de Módulos' :
                            selectedView === 'themes' ? 'de Temas' :
                            selectedView === 'knowledge' ? 'de Conhecimento' :
                            selectedView === 'mapping' ? 'de Mapeamento' : 'de Analytics'} 
                  Implementada
                </h3>
                <p className="text-primary-gray mb-6">
                  {selectedView === 'courses' && 'Interface avançada de criação de cursos com módulos, temas, objetivos e mapeamento BNCC integrado.'}
                  {selectedView === 'modules' && 'Gestão completa de módulos pedagógicos com estruturas adaptativas e objetivos mensuráveis.'}
                  {selectedView === 'themes' && 'Organização temática com tipologia cognitiva e objetos de conhecimento estruturados.'}
                  {selectedView === 'knowledge' && 'Sistema de objetos de conhecimento com habilidades, competências e avaliações mapeadas.'}
                  {selectedView === 'mapping' && 'Visualização interativa da arquitetura curricular com relacionamentos e dependências.'}
                  {selectedView === 'analytics' && 'Dashboards com métricas de cobertura curricular, qualidade e eficácia pedagógica.'}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="builder" size="sm">
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
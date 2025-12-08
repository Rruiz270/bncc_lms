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
  PencilRuler
} from "lucide-react"
import Link from 'next/link'

// Types based on our BNCC analysis
interface CompetencyData {
  code: string
  text: string
  subject: string
  year: number | string
  skillType: string
  cognitiveType: string
  cognitiveProcesses: string[]
}

export default function BuilderModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'competencies' | 'subjects' | 'series'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'fundamental' | 'medio'>('all')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  // BNCC Statistics from our analysis
  const stats = {
    totalCompetencies: 1512,
    fundamentalSkills: 678,
    medioSkills: 417,
    skillTypes: 14,
    cognitiveTypes: 9,
    subjects: 7,
    areas: 5
  }

  // State for API data
  const [competencies, setCompetencies] = useState<CompetencyData[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // Fetch competencies from API
  const fetchCompetencies = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedLevel !== 'all' && { level: selectedLevel }),
        ...(selectedSubject !== 'all' && { subject: selectedSubject })
      })

      const response = await fetch(`/api/bncc/competencies?${params}`)
      const result = await response.json()
      
      if (result.success) {
        const mappedCompetencies = result.data.competencies.map((comp: any) => ({
          code: comp.code,
          text: comp.text,
          subject: comp.subject || comp.area || '',
          year: comp.year,
          skillType: comp.skillType,
          cognitiveType: comp.cognitiveType,
          cognitiveProcesses: comp.cognitiveProcesses || []
        }))
        
        setCompetencies(mappedCompetencies)
        setTotalPages(result.data.pagination.totalPages)
        setTotalResults(result.data.pagination.total)
      }
    } catch (error) {
      console.error('Error fetching competencies:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch competencies on component mount and when filters change
  useEffect(() => {
    fetchCompetencies()
  }, [currentPage, selectedLevel, selectedSubject])

  // Search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentPage === 1) {
        fetchCompetencies()
      } else {
        setCurrentPage(1)
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const subjects = [
    "Língua Portuguesa", "Matemática", "História", "Geografia", 
    "Ciências", "Língua Inglesa", "Ensino Religioso"
  ]

  const areas = [
    "Linguagens e suas Tecnologias", 
    "Matemática e suas Tecnologias",
    "Ciências da Natureza e suas Tecnologias", 
    "Ciências Humanas e Sociais Aplicadas"
  ]

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
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
                  Módulo Builder
                </h1>
                <p className="text-primary-gray">Estrutura Curricular BNCC - Gestão de Competências e Habilidades</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar BNCC
              </Button>
              <Button variant="builder" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Importar Dados
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: 'Visão Geral', icon: Eye },
            { id: 'competencies', label: 'Competências', icon: Target },
            { id: 'subjects', label: 'Disciplinas', icon: BookOpen },
            { id: 'series', label: 'Séries', icon: GraduationCap }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'builder' : 'outline'}
              onClick={() => setSelectedView(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* BNCC Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Total Competências</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{stats.totalCompetencies.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Mapeadas na BNCC</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Ensino Fundamental</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{stats.fundamentalSkills}</div>
                  <p className="text-xs text-primary-gray">Habilidades 1º-9º ano</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Ensino Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{stats.medioSkills}</div>
                  <p className="text-xs text-primary-gray">Habilidades 10º-12º ano</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Tipos Cognitivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-builder">{stats.cognitiveTypes}</div>
                  <p className="text-xs text-primary-gray">Processos mapeados</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedView('competencies')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-builder" />
                    Explorar Competências
                  </CardTitle>
                  <CardDescription>
                    Navegue pelas {stats.totalCompetencies} competências BNCC organizadas por série e disciplina
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="builder" size="sm">Ver Competências</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedView('subjects')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-builder" />
                    Gerenciar Disciplinas
                  </CardTitle>
                  <CardDescription>
                    {stats.subjects} disciplinas do Fundamental e {stats.areas} áreas do Médio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="builder" size="sm">Ver Disciplinas</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-creator/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PencilRuler className="w-5 h-5 text-creator" />
                    Criar Aula BNCC
                  </CardTitle>
                  <CardDescription>
                    Use as competências para criar aulas alinhadas com a BNCC
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/creator">
                    <Button variant="creator" size="sm">
                      <PencilRuler className="w-4 h-4 mr-2" />
                      Ir para Creator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Competencies Section */}
        {selectedView === 'competencies' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros e Busca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-gray" />
                      <input
                        type="text"
                        placeholder="Código ou descrição..."
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
                      onChange={(e) => setSelectedLevel(e.target.value as any)}
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
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Ensino Médio">
                        {areas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="builder" className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competencies List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Competências Encontradas ({totalResults})
                  {loading && <span className="text-sm text-primary-gray ml-2">Carregando...</span>}
                </h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Competência
                </Button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-primary-gray">Carregando competências BNCC...</div>
                </div>
              ) : (
                competencies.map((competency, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-builder font-mono text-sm bg-builder/10 px-2 py-1 rounded">
                            {competency.code}
                          </span>
                          <span className="text-sm text-primary-gray">
                            {competency.subject} - {competency.year}º Ano
                          </span>
                        </CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary-black mb-4">{competency.text}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-primary-gray">Tipo de Habilidade:</span>
                        <div className="bg-primary-powder px-2 py-1 rounded mt-1">
                          {competency.skillType}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-primary-gray">Tipo Cognitivo:</span>
                        <div className="bg-primary-powder px-2 py-1 rounded mt-1">
                          {competency.cognitiveType}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-primary-gray">Processos Cognitivos:</span>
                        <div className="bg-primary-powder px-2 py-1 rounded mt-1">
                          {competency.cognitiveProcesses.join(' | ')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-primary-gray">
                    Página {currentPage} de {totalPages} ({totalResults} competências total)
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subjects Section */}
        {selectedView === 'subjects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Disciplinas e Áreas do Conhecimento</h3>
              <Button variant="builder" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Disciplina
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ensino Fundamental */}
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Fundamental (1º-9º ano)</CardTitle>
                  <CardDescription>{subjects.length} disciplinas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-primary-powder rounded-lg">
                        <div>
                          <span className="font-medium">{subject}</span>
                          <p className="text-xs text-primary-gray">
                            {subject === 'Língua Inglesa' ? '6º-9º ano' : '1º-9º ano'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ensino Médio */}
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Médio (10º-12º ano)</CardTitle>
                  <CardDescription>{areas.length} áreas do conhecimento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {areas.map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-primary-powder rounded-lg">
                        <div>
                          <span className="font-medium">{area}</span>
                          <p className="text-xs text-primary-gray">10º-12º ano</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Series Section */}
        {selectedView === 'series' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Séries e Níveis Educacionais</h3>
              <Button variant="builder" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Série
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ensino Fundamental */}
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Fundamental</CardTitle>
                  <CardDescription>9 anos de escolaridade (1º ao 9º ano)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3,4,5,6,7,8,9].map(year => (
                      <div key={year} className="p-4 bg-primary-powder rounded-lg text-center">
                        <div className="text-lg font-bold text-builder">{year}º</div>
                        <div className="text-xs text-primary-gray">Ano</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ensino Médio */}
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Médio</CardTitle>
                  <CardDescription>3 anos de escolaridade (1º ao 3º ano)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3].map(year => (
                      <div key={year} className="p-4 bg-primary-powder rounded-lg text-center">
                        <div className="text-lg font-bold text-builder">{year}º</div>
                        <div className="text-xs text-primary-gray">Médio</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
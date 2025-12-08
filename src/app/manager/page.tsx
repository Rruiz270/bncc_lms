'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  School,
  GraduationCap,
  UserCheck,
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  ArrowLeft,
  Edit,
  Eye,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Settings,
  BarChart3
} from "lucide-react"
import Link from 'next/link'

// Mock data based on our system requirements
interface School {
  id: string
  name: string
  code: string
  city: string
  students: number
  teachers: number
  classes: number
  director: string
  phone: string
  active: boolean
}

interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  type: 'Contratado' | 'ACT'
  specialization: string
  schools: string[]
  classes: number
  active: boolean
  hireDate: string
}

interface Student {
  id: string
  name: string
  code: string
  school: string
  series: string
  class: string
  guardian: string
  enrollmentDate: string
  active: boolean
}

export default function ManagerModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'schools' | 'teachers' | 'students' | 'classes'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock statistics
  const stats = {
    totalSchools: 1038,
    totalTeachers: 51000,
    totalStudents: 780000,
    totalClasses: 12500,
    activeTeachers: 48500,
    actTeachers: 2500,
    contractedTeachers: 46000
  }

  // Mock data
  const sampleSchools: School[] = [
    {
      id: '1',
      name: 'E.E.B. Prof. Maria Silva',
      code: 'SC001',
      city: 'Florianópolis',
      students: 850,
      teachers: 45,
      classes: 28,
      director: 'João Santos',
      phone: '(48) 3333-4444',
      active: true
    },
    {
      id: '2', 
      name: 'E.E.B. Dom Pedro II',
      code: 'SC002',
      city: 'Joinville',
      students: 1200,
      teachers: 68,
      classes: 42,
      director: 'Ana Costa',
      phone: '(47) 3555-6666',
      active: true
    },
    {
      id: '3',
      name: 'E.E.B. Irmão José Otão',
      code: 'SC003', 
      city: 'Blumenau',
      students: 950,
      teachers: 52,
      classes: 35,
      director: 'Carlos Mendes',
      phone: '(47) 3777-8888',
      active: true
    }
  ]

  const sampleTeachers: Teacher[] = [
    {
      id: '1',
      name: 'Maria Fernanda Silva',
      email: 'maria.silva@educacao.sc.gov.br',
      phone: '(48) 99999-1111',
      type: 'Contratado',
      specialization: 'Língua Portuguesa',
      schools: ['E.E.B. Prof. Maria Silva'],
      classes: 6,
      active: true,
      hireDate: '2020-02-15'
    },
    {
      id: '2',
      name: 'João Carlos Santos',
      email: 'joao.santos@educacao.sc.gov.br', 
      phone: '(48) 99999-2222',
      type: 'ACT',
      specialization: 'Matemática',
      schools: ['E.E.B. Prof. Maria Silva', 'E.E.B. Dom Pedro II'],
      classes: 8,
      active: true,
      hireDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Ana Paula Costa',
      email: 'ana.costa@educacao.sc.gov.br',
      phone: '(47) 99999-3333', 
      type: 'Contratado',
      specialization: 'História',
      schools: ['E.E.B. Dom Pedro II'],
      classes: 5,
      active: true,
      hireDate: '2018-03-10'
    }
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
                  <Users className="w-8 h-8 text-manager" />
                  Módulo Manager
                </h1>
                <p className="text-primary-gray">Gestão Escolar - Administração de Escolas, Professores e Alunos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Relatório Geral
              </Button>
              <Button variant="manager" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
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
            { id: 'schools', label: 'Escolas', icon: School },
            { id: 'teachers', label: 'Professores', icon: UserCheck },
            { id: 'students', label: 'Alunos', icon: GraduationCap },
            { id: 'classes', label: 'Turmas', icon: BookOpen }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? 'manager' : 'outline'}
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
            {/* Network Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <School className="w-4 h-4" />
                    Escolas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.totalSchools.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Rede estadual SC</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Professores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.totalTeachers.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">
                    {stats.contractedTeachers.toLocaleString()} Efetivos | {stats.actTeachers.toLocaleString()} ACT
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Alunos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Matriculados em 2024</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Turmas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.totalClasses.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Distribuídas na rede</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedView('schools')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5 text-manager" />
                    Gestão de Escolas
                  </CardTitle>
                  <CardDescription>
                    Administrar {stats.totalSchools} escolas da rede estadual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="manager" size="sm">Gerenciar Escolas</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedView('teachers')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-manager" />
                    Gestão de Professores
                  </CardTitle>
                  <CardDescription>
                    {stats.totalTeachers.toLocaleString()} professores cadastrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="manager" size="sm">Gerenciar Professores</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-manager" />
                    Importação em Lote
                  </CardTitle>
                  <CardDescription>
                    Importar dados via planilhas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Dados
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Regional Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Regional</CardTitle>
                <CardDescription>Escolas por região administrativa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { region: 'Grande Florianópolis', schools: 156, students: 125000 },
                    { region: 'Norte/Nordeste', schools: 298, students: 180000 },
                    { region: 'Vale do Itajaí', schools: 245, students: 195000 },
                    { region: 'Sul', schools: 189, students: 145000 },
                    { region: 'Oeste', schools: 150, students: 135000 }
                  ].map((region, index) => (
                    <div key={index} className="p-4 bg-primary-powder rounded-lg">
                      <div className="font-semibold text-manager">{region.region}</div>
                      <div className="text-sm text-primary-gray">
                        {region.schools} escolas • {region.students.toLocaleString()} alunos
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Schools Section */}
        {selectedView === 'schools' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Buscar Escolas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-gray" />
                      <input
                        type="text"
                        placeholder="Nome da escola, código ou cidade..."
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Região</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md">
                      <option value="">Todas as regiões</option>
                      <option value="florianopolis">Grande Florianópolis</option>
                      <option value="norte">Norte/Nordeste</option>
                      <option value="itajai">Vale do Itajaí</option>
                      <option value="sul">Sul</option>
                      <option value="oeste">Oeste</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="manager" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Escola
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schools List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Escolas Encontradas ({sampleSchools.length})</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar
                  </Button>
                </div>
              </div>

              {sampleSchools.map((school) => (
                <Card key={school.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <School className="w-5 h-5 text-manager" />
                          {school.name}
                          <span className="text-sm font-normal text-primary-gray bg-primary-powder px-2 py-1 rounded">
                            {school.code}
                          </span>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {school.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {school.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3 h-3" />
                              Diretor: {school.director}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-primary-powder rounded-lg">
                        <div className="text-lg font-bold text-manager">{school.students}</div>
                        <div className="text-xs text-primary-gray">Alunos</div>
                      </div>
                      <div className="p-3 bg-primary-powder rounded-lg">
                        <div className="text-lg font-bold text-manager">{school.teachers}</div>
                        <div className="text-xs text-primary-gray">Professores</div>
                      </div>
                      <div className="p-3 bg-primary-powder rounded-lg">
                        <div className="text-lg font-bold text-manager">{school.classes}</div>
                        <div className="text-xs text-primary-gray">Turmas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Teachers Section */}
        {selectedView === 'teachers' && (
          <div className="space-y-6">
            {/* Teacher Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Total Professores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.totalTeachers.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Na rede estadual</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Efetivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.contractedTeachers.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Contratados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Temporários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.actTeachers.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">ACT</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-primary-gray">Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-manager">{stats.activeTeachers.toLocaleString()}</div>
                  <p className="text-xs text-primary-gray">Em exercício</p>
                </CardContent>
              </Card>
            </div>

            {/* Teachers List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Professores Cadastrados</CardTitle>
                  <Button variant="manager" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Professor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleTeachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 bg-primary-powder rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-manager rounded-full flex items-center justify-center text-white font-medium">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-primary-gray">{teacher.specialization}</div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            teacher.type === 'Contratado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {teacher.type}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-primary-gray">
                          {teacher.classes} turmas • {teacher.schools.join(', ')}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Students and Classes sections would follow similar patterns */}
        {selectedView === 'students' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Alunos</CardTitle>
                <CardDescription>Módulo de gestão de alunos em desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <GraduationCap className="w-16 h-16 text-manager mx-auto mb-4" />
                  <p className="text-primary-gray">Funcionalidade em implementação</p>
                  <p className="text-sm text-primary-gray mt-2">
                    Gestão completa de {stats.totalStudents.toLocaleString()} alunos
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === 'classes' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Turmas</CardTitle>
                <CardDescription>Módulo de gestão de turmas em desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-manager mx-auto mb-4" />
                  <p className="text-primary-gray">Funcionalidade em implementação</p>
                  <p className="text-sm text-primary-gray mt-2">
                    Gestão de {stats.totalClasses.toLocaleString()} turmas da rede
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
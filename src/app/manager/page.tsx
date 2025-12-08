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
    <div className="min-h-screen bg-gradient-to-br from-pearl via-primary-powder to-slate/5">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate via-charcoal to-slate bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-manager flex items-center justify-center animate-float shadow-glow">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  Manager Studio
                </h1>
                <p className="text-slate/80 font-medium">Gestão Inteligente • Administração Escolar Avançada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* System Status with Modern Design */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-morphism">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate animate-pulse-glow"></div>
                  <span className="text-xs font-medium text-charcoal">Rede Ativa</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-1">
                  <School className="w-4 h-4 text-slate" />
                  <UserCheck className="w-4 h-4 text-charcoal" />
                  <GraduationCap className="w-4 h-4 text-slate" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="glass-morphism hover:shadow-medium transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Relatório Geral
              </Button>
              
              <Button size="sm" className="gradient-manager text-white shadow-medium hover:shadow-strong transition-all duration-300">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
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
              { id: 'overview', label: 'Visão Geral', icon: BarChart3, color: 'slate' },
              { id: 'schools', label: 'Escolas', icon: School, color: 'charcoal' },
              { id: 'teachers', label: 'Professores', icon: UserCheck, color: 'emerald' },
              { id: 'students', label: 'Alunos', icon: GraduationCap, color: 'teal' },
              { id: 'classes', label: 'Turmas', icon: BookOpen, color: 'sage' }
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
                
                {/* Network status indicators */}
                {tab.id === 'schools' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-charcoal to-slate text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    {stats.totalSchools}
                  </div>
                )}
                
                {tab.id === 'teachers' && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-emerald to-teal text-white text-xs rounded-lg font-bold shadow-medium animate-pulse-glow">
                    {Math.round(stats.totalTeachers/1000)}K
                  </div>
                )}
                
                {/* Selection indicator */}
                {selectedView === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-slate to-transparent rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate/30 to-transparent"></div>
        </div>

        {/* Modern Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Modern Network Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-slate rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-slate transition-colors duration-300">Escolas Ativas</h4>
                    <p className="text-sm text-slate">Rede Estadual SC</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{stats.totalSchools.toLocaleString()}</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-charcoal to-slate h-2 rounded-full transition-all duration-500" 
                      style={{ width: '95%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-slate">95% operacionais</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald to-teal rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-emerald transition-colors duration-300">Professores</h4>
                    <p className="text-sm text-slate">Força Docente</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{Math.round(stats.totalTeachers/1000)}K</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald to-teal h-2 rounded-full transition-all duration-500" 
                      style={{ width: '90%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-emerald">{Math.round(stats.contractedTeachers/1000)}K Efetivos • {Math.round(stats.actTeachers/1000)}K ACT</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal to-sage rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-teal transition-colors duration-300">Alunos</h4>
                    <p className="text-sm text-slate">Matriculados 2024</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{Math.round(stats.totalStudents/1000)}K</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal to-sage h-2 rounded-full transition-all duration-500" 
                      style={{ width: '88%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-teal">88% frequência ativa</p>
                </div>
              </div>

              <div className="group glass-morphism p-6 rounded-2xl border-white/20 shadow-medium hover:shadow-strong transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-emerald rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal group-hover:text-sage transition-colors duration-300">Turmas</h4>
                    <p className="text-sm text-slate">Distribuídas</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-charcoal">{Math.round(stats.totalClasses/1000)}K</div>
                  <div className="w-full bg-slate/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sage to-emerald h-2 rounded-full transition-all duration-500" 
                      style={{ width: '92%' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-sage">92% capacidade média</p>
                </div>
              </div>
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
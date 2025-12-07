import { NextRequest, NextResponse } from 'next/server'
import { 
  sampleBNCCCompetencies, 
  filterCompetencies, 
  bnccStats,
  BNCCCompetency 
} from '@/lib/bncc-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const search = searchParams.get('search') || undefined
    const level = searchParams.get('level') as 'all' | 'fundamental' | 'medio' || 'all'
    const subject = searchParams.get('subject') || 'all'
    const skillType = searchParams.get('skillType') || 'all'
    const cognitiveType = searchParams.get('cognitiveType') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Filter competencies based on parameters
    const filtered = filterCompetencies(sampleBNCCCompetencies, {
      search,
      level,
      subject: subject === 'all' ? undefined : subject,
      skillType: skillType === 'all' ? undefined : skillType,
      cognitiveType: cognitiveType === 'all' ? undefined : cognitiveType
    })

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCompetencies = filtered.slice(startIndex, endIndex)

    // Return response with pagination info
    return NextResponse.json({
      success: true,
      data: {
        competencies: paginatedCompetencies,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
          hasMore: endIndex < filtered.length
        },
        stats: bnccStats
      }
    })

  } catch (error) {
    console.error('Error fetching BNCC competencies:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch competencies' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const competency: Partial<BNCCCompetency> = await request.json()

    // Basic validation
    if (!competency.code || !competency.text) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Code and text are required' 
        },
        { status: 400 }
      )
    }

    // In a real implementation, this would save to the database
    // For now, we'll just return success
    const newCompetency: BNCCCompetency = {
      code: competency.code,
      text: competency.text,
      subject: competency.subject,
      area: competency.area,
      year: competency.year || 1,
      skillType: competency.skillType || 'Compreensão Geral',
      cognitiveType: competency.cognitiveType || 'Compreensão (Interpretação)',
      domainTypology: competency.domainTypology,
      cognitiveProcesses: competency.cognitiveProcesses || ['Processamento Geral']
    }

    return NextResponse.json({
      success: true,
      data: newCompetency,
      message: 'Competency created successfully'
    })

  } catch (error) {
    console.error('Error creating competency:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create competency' 
      },
      { status: 500 }
    )
  }
}
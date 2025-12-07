import { NextResponse } from 'next/server'
import { 
  bnccStats, 
  fundamentalSubjects, 
  medioAreas, 
  skillTypes, 
  cognitiveTypes,
  sampleBNCCCompetencies 
} from '@/lib/bncc-data'

export async function GET() {
  try {
    // Calculate detailed statistics from the sample data
    const fundamentalCompetencies = sampleBNCCCompetencies.filter(comp => typeof comp.year === 'number')
    const medioCompetencies = sampleBNCCCompetencies.filter(comp => typeof comp.year === 'string')
    
    // Subject breakdown
    const subjectStats = fundamentalSubjects.map(subject => ({
      subject,
      count: sampleBNCCCompetencies.filter(comp => comp.subject === subject).length
    }))

    // Area breakdown  
    const areaStats = medioAreas.map(area => ({
      area,
      count: sampleBNCCCompetencies.filter(comp => comp.area === area).length
    }))

    // Skill type breakdown
    const skillTypeStats = skillTypes.map(type => ({
      type,
      count: sampleBNCCCompetencies.filter(comp => comp.skillType === type).length
    }))

    // Cognitive type breakdown
    const cognitiveTypeStats = cognitiveTypes.map(type => ({
      type,
      count: sampleBNCCCompetencies.filter(comp => comp.cognitiveType === type).length
    }))

    // Year breakdown for Fundamental
    const fundamentalYearStats = [1,2,3,4,5,6,7,8,9].map(year => ({
      year,
      count: sampleBNCCCompetencies.filter(comp => comp.year === year).length
    }))

    const detailedStats = {
      ...bnccStats,
      breakdown: {
        subjects: subjectStats,
        areas: areaStats, 
        skillTypes: skillTypeStats,
        cognitiveTypes: cognitiveTypeStats,
        fundamentalYears: fundamentalYearStats
      },
      sampleSize: sampleBNCCCompetencies.length,
      actualFundamental: fundamentalCompetencies.length,
      actualMedio: medioCompetencies.length
    }

    return NextResponse.json({
      success: true,
      data: detailedStats
    })

  } catch (error) {
    console.error('Error fetching BNCC statistics:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch statistics' 
      },
      { status: 500 }
    )
  }
}
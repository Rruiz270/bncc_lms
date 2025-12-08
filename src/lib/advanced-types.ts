// Advanced Database Types for Sophisticated LMS
// Based on the comprehensive database schema provided

// ===============================
// COURSE AND CONTENT STRUCTURE
// ===============================

export interface Course {
  id: string
  title: string
  description: string
  courseType: CourseType
  deliveryModel: CourseDeliveryModel
  accessType: CourseAccessType
  status: 'draft' | 'published' | 'archived' | 'suspended'
  createdAt: string
  updatedAt: string
  modules: CourseModule[]
  bundles: CourseBundle[]
  objectives: CourseObjective[]
  metadata: CourseMetadata
}

export interface CourseType {
  id: string
  name: string
  description: string
  typology: CourseTypology
}

export interface CourseTypology {
  id: string
  name: string
  category: 'academic' | 'professional' | 'technical' | 'certification'
  description: string
}

export interface CourseDeliveryModel {
  id: string
  name: string
  type: 'synchronous' | 'asynchronous' | 'hybrid' | 'blended'
  description: string
}

export interface CourseAccessType {
  id: string
  name: string
  level: 'public' | 'restricted' | 'private' | 'institutional'
  requirements: string[]
}

export interface CourseBundle {
  id: string
  name: string
  description: string
  bundleType: CourseBundleType
  courses: string[] // Course IDs
  sequence: number
}

export interface CourseBundleType {
  id: string
  name: string
  description: string
  structure: 'sequential' | 'parallel' | 'adaptive' | 'prerequisite'
}

// ===============================
// COURSE MODULES AND THEMES
// ===============================

export interface CourseModule {
  id: string
  courseId: string
  title: string
  description: string
  sequence: number
  moduleType: CourseModuleType
  model: CourseModuleModel
  themes: CourseModuleTheme[]
  lessons: CourseModuleLesson[]
  objectives: CourseModuleObjective[]
  linkTypes: CourseModuleLinkType[]
}

export interface CourseModuleType {
  id: string
  name: string
  description: string
  category: 'theoretical' | 'practical' | 'assessment' | 'project' | 'seminar'
}

export interface CourseModuleModel {
  id: string
  name: string
  modelType: CourseModuleModelType
  typology: CourseModuleModelTypology
  structure: CourseModuleModelStructure
}

export interface CourseModuleModelType {
  id: string
  name: string
  framework: string
  description: string
}

export interface CourseModuleModelTypology {
  id: string
  name: string
  pedagogicalApproach: 'constructivist' | 'behaviorist' | 'cognitivist' | 'connectivist'
  methodology: string[]
}

export interface CourseModuleModelStructure {
  id: string
  name: string
  stages: CourseModuleModelStructureStage[]
  flow: 'linear' | 'branching' | 'adaptive' | 'network'
}

export interface CourseModuleModelStructureStage {
  id: string
  structureId: string
  name: string
  sequence: number
  stageType: 'introduction' | 'development' | 'practice' | 'assessment' | 'reflection'
  activities: CourseModuleLessonModelStructureStageActivity[]
}

export interface CourseModuleTheme {
  id: string
  moduleId: string
  title: string
  description: string
  themeType: CourseModuleThemeType
  typology: CourseModuleThemeTypology
  knowledgeObjects: CourseThemeKnowledgeObject[]
  sequence: number
}

export interface CourseModuleThemeType {
  id: string
  name: string
  category: 'conceptual' | 'procedural' | 'factual' | 'metacognitive'
  description: string
}

export interface CourseModuleThemeTypology {
  id: string
  name: string
  domain: string
  cognitiveLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert'
}

export interface CourseThemeKnowledgeObject {
  id: string
  themeId: string
  title: string
  description: string
  objectType: 'concept' | 'principle' | 'procedure' | 'fact' | 'strategy'
  skills: CourseThemeKnowledgeObjectSkill[]
}

export interface CourseThemeKnowledgeObjectSkill {
  id: string
  knowledgeObjectId: string
  skillName: string
  skillLevel: 'novice' | 'advanced_beginner' | 'competent' | 'proficient' | 'expert'
  bnccCode?: string
  assessment: boolean
}

// ===============================
// LESSON STRUCTURE SYSTEM
// ===============================

export interface CourseModuleLesson {
  id: string
  moduleId: string
  title: string
  description: string
  sequence: number
  lessonType: CourseModuleLessonType
  typology: CourseModuleLessonTypology
  framework: CourseModuleLessonFramework
  model: CourseModuleLessonModel
  structure: CourseModuleLessonStructure
  objectives: CourseModuleLessonObjectiveType[]
  keyWords: CourseModuleLessonKeyWord[]
  linkTypes: CourseModuleLessonLinkType[]
  duration: number // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
}

export interface CourseModuleLessonType {
  id: string
  name: string
  category: 'lecture' | 'workshop' | 'laboratory' | 'seminar' | 'tutorial' | 'assessment'
  interactionLevel: 'low' | 'medium' | 'high'
}

export interface CourseModuleLessonTypology {
  id: string
  name: string
  pedagogicalPattern: string
  learningOutcomes: string[]
  assessmentStrategy: string
}

export interface CourseModuleLessonFramework {
  id: string
  name: string
  description: string
  structure: 'engage_explore_explain_elaborate_evaluate' | 'think_pair_share' | 'problem_based' | 'case_study' | 'flipped' | 'gamified'
  phases: string[]
}

export interface CourseModuleLessonModel {
  id: string
  name: string
  lessonModelType: CourseModuleLessonModelType
  typology: CourseModuleLessonModelTypology
  structure: CourseModuleLessonModelStructure
}

export interface CourseModuleLessonModelType {
  id: string
  name: string
  framework: string
  description: string
}

export interface CourseModuleLessonModelTypology {
  id: string
  name: string
  approach: string
  methodology: string[]
  tools: string[]
}

export interface CourseModuleLessonModelStructure {
  id: string
  name: string
  stages: CourseModuleLessonModelStructureStage[]
  flow: 'sequential' | 'parallel' | 'conditional' | 'adaptive'
}

export interface CourseModuleLessonModelStructureStage {
  id: string
  structureId: string
  name: string
  sequence: number
  duration: number
  activities: CourseModuleLessonModelStructureStageActivity[]
}

export interface CourseModuleLessonStructure {
  id: string
  lessonId: string
  name: string
  structureType: CourseModuleLessonStructureType
  stages: CourseModuleLessonStructureStage[]
}

export interface CourseModuleLessonStructureType {
  id: string
  name: string
  pattern: string
  description: string
}

export interface CourseModuleLessonStructureStage {
  id: string
  structureId: string
  stageName: string
  sequence: number
  duration: number
  stageTypology: CourseModuleLessonStructureStageTypology
  activities: CourseModuleLessonStructureStageActivity[]
  objectives: string[]
  resources: string[]
}

export interface CourseModuleLessonStructureStageTypology {
  id: string
  name: string
  purpose: string
  characteristics: string[]
}

// ===============================
// ACTIVITY AND FORM SYSTEM
// ===============================

export interface CourseModuleLessonModelStructureStageActivity {
  id: string
  stageId: string
  name: string
  description: string
  sequence: number
  activityType: CourseModuleLessonStructureStageActivityType
  forms: CourseModuleLessonStructureStageActivityForm[]
  duration: number
  interactionLevel: 'individual' | 'pair' | 'group' | 'class'
  tools: string[]
}

export interface CourseModuleLessonStructureStageActivity {
  id: string
  stageId: string
  name: string
  description: string
  sequence: number
  activityType: CourseModuleLessonStructureStageActivityType
  forms: CourseModuleLessonStructureStageActivityForm[]
  duration: number
  interactionLevel: 'individual' | 'pair' | 'group' | 'class'
  tools: string[]
  assessment: boolean
  mandatory: boolean
}

export interface CourseModuleLessonStructureStageActivityType {
  id: string
  name: string
  category: 'input' | 'processing' | 'output' | 'assessment' | 'reflection'
  description: string
  cognitiveLoad: 'low' | 'medium' | 'high'
}

export interface CourseModuleLessonStructureStageActivityForm {
  id: string
  activityId: string
  formName: string
  formType: CourseModuleLessonStructureStageActivityFormType
  items: CourseModuleLessonStructureStageActivityFormItem[]
  sequence: number
  required: boolean
  adaptive: boolean
}

export interface CourseModuleLessonStructureStageActivityFormType {
  id: string
  name: string
  category: 'quiz' | 'survey' | 'assignment' | 'discussion' | 'simulation' | 'game'
  description: string
  scorable: boolean
}

export interface CourseModuleLessonStructureStageActivityFormItem {
  id: string
  formId: string
  itemText: string
  itemType: CourseModuleLessonStructureStageActivityFormItemType
  artifacts: CourseModuleLessonStructureStageActivityFormItemArtifact[]
  sequence: number
  points?: number
  required: boolean
  feedback: string
}

export interface CourseModuleLessonStructureStageActivityFormItemType {
  id: string
  name: string
  inputType: 'text' | 'number' | 'choice' | 'multiple_choice' | 'file' | 'audio' | 'video' | 'drawing'
  validation: string[]
  scoring: boolean
}

export interface CourseModuleLessonStructureStageActivityFormItemArtifact {
  id: string
  itemId: string
  artifactName: string
  artifactType: 'document' | 'image' | 'video' | 'audio' | 'simulation' | 'interactive'
  url: string
  size?: string
  receivingType: CourseModuleLessonStructureStageActivityFormItemArtifactReceivingType
  metadata: Record<string, any>
}

export interface CourseModuleLessonStructureStageActivityFormItemArtifactReceivingType {
  id: string
  name: string
  format: string[]
  maxSize?: string
  description: string
}

// ===============================
// OBJECTIVES AND KEYWORDS
// ===============================

export interface CourseObjective {
  id: string
  courseId: string
  objectiveText: string
  objectiveType: CourseObjectiveType
  typology: CourseObjectiveTypology
  sequence: number
  assessment: boolean
  bnccAlignment?: string
}

export interface CourseObjectiveType {
  id: string
  name: string
  level: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation'
  description: string
}

export interface CourseObjectiveTypology {
  id: string
  name: string
  domain: 'cognitive' | 'affective' | 'psychomotor'
  category: string
}

export interface CourseModuleObjective {
  id: string
  moduleId: string
  objectiveText: string
  objectiveType: CourseModuleObjectiveType
  sequence: number
  parentObjectiveId?: string
}

export interface CourseModuleObjectiveType {
  id: string
  name: string
  scope: 'module' | 'lesson' | 'activity'
  measurable: boolean
}

export interface CourseModuleLessonObjectiveType {
  id: string
  lessonId: string
  objectiveText: string
  objectiveCategory: 'learning' | 'performance' | 'behavioral'
  assessment: boolean
  sequence: number
}

export interface CourseModuleLessonKeyWord {
  id: string
  lessonId: string
  keyword: string
  keywordType: CourseModuleLessonKeyWordType
  typology: CourseModuleLessonKeyWordTypology
  relevance: 'primary' | 'secondary' | 'supporting'
}

export interface CourseModuleLessonKeyWordType {
  id: string
  name: string
  category: 'concept' | 'skill' | 'topic' | 'method' | 'tool'
  description: string
}

export interface CourseModuleLessonKeyWordTypology {
  id: string
  name: string
  domain: string
  classification: string[]
}

// ===============================
// LINK TYPES AND RELATIONSHIPS
// ===============================

export interface CourseLinkType {
  id: string
  name: string
  description: string
  linkCategory: 'prerequisite' | 'corequisite' | 'recommended' | 'related' | 'advanced'
  strength: 'weak' | 'moderate' | 'strong' | 'required'
}

export interface CourseModuleLinkType {
  id: string
  name: string
  description: string
  linkCategory: 'sequential' | 'parallel' | 'optional' | 'branching'
  direction: 'forward' | 'backward' | 'bidirectional'
}

export interface CourseModuleLessonLinkType {
  id: string
  name: string
  description: string
  linkCategory: 'previous' | 'next' | 'related' | 'reference' | 'assessment'
  automatic: boolean
}

// ===============================
// WIDGET AND INTERACTION SYSTEM
// ===============================

export interface Widget {
  id: string
  name: string
  description: string
  widgetType: WidgetType
  typology: WidgetTypology
  supplier: WidgetSupplier
  componentType: WidgetComponentType
  contentType: WidgetContentType
  interactionType: WidgetInteractionType
  attributes: WidgetAttributeType[]
  version: string
  status: 'active' | 'deprecated' | 'beta' | 'disabled'
  configuration: Record<string, any>
}

export interface WidgetType {
  id: string
  name: string
  category: 'content' | 'assessment' | 'interaction' | 'multimedia' | 'communication' | 'analytics'
  description: string
  complexity: 'simple' | 'moderate' | 'complex' | 'advanced'
}

export interface WidgetTypology {
  id: string
  name: string
  pedagogicalFunction: string[]
  learningTheory: string[]
  interactionPattern: string
}

export interface WidgetSupplier {
  id: string
  name: string
  company: string
  contactInfo: string
  certificationLevel: 'basic' | 'standard' | 'premium' | 'enterprise'
  supportLevel: string
}

export interface WidgetComponentType {
  id: string
  name: string
  technicalSpec: string
  framework: string[]
  compatibility: string[]
  renderingType: 'static' | 'dynamic' | 'interactive' | 'real-time'
}

export interface WidgetContentType {
  id: string
  name: string
  mediaType: string[]
  format: string[]
  accessibility: string[]
  localization: boolean
}

export interface WidgetInteractionType {
  id: string
  name: string
  userAction: string[]
  feedbackType: string[]
  dataCapture: string[]
  analytics: boolean
}

export interface WidgetAttributeType {
  id: string
  name: string
  dataType: 'string' | 'number' | 'boolean' | 'object' | 'array'
  required: boolean
  defaultValue?: any
  validation?: string[]
  typology: WidgetAttributeTypology
}

export interface WidgetAttributeTypology {
  id: string
  name: string
  category: 'configuration' | 'content' | 'behavior' | 'styling' | 'data'
  scope: 'global' | 'instance' | 'user' | 'session'
}

export interface WidgetFormContentType {
  id: string
  name: string
  inputMethod: string[]
  validationType: string[]
  storageFormat: string
  processingRequired: boolean
}

export interface WidgetContentReferenceType {
  id: string
  name: string
  referenceScope: 'internal' | 'external' | 'cross-platform' | 'embedded'
  accessMethod: string[]
  caching: boolean
}

export interface WidgetContentInteractionType {
  id: string
  name: string
  interactionMode: string[]
  responseTime: 'immediate' | 'delayed' | 'asynchronous' | 'batch'
  persistence: boolean
}

// ===============================
// INSTITUTIONAL MANAGEMENT
// ===============================

export interface SchoolInstitution {
  id: string
  name: string
  code: string
  category: SchoolInstitutionCategory
  group: SchoolInstitutionGroup
  address: string
  city: string
  state: string
  phone: string
  email: string
  director: string
  calendar: SchoolInstitutionCalendar
  status: 'active' | 'inactive' | 'suspended'
  metadata: Record<string, any>
}

export interface SchoolInstitutionCategory {
  id: string
  name: string
  level: 'elementary' | 'middle' | 'high' | 'higher_education' | 'technical' | 'mixed'
  type: 'public' | 'private' | 'charter' | 'international'
  accreditation: string[]
}

export interface SchoolInstitutionGroup {
  id: string
  name: string
  description: string
  region: string
  coordinator: string
  institutions: string[] // Institution IDs
}

export interface SchoolInstitutionCalendar {
  id: string
  institutionId: string
  academicYear: string
  startDate: string
  endDate: string
  terms: CalendarTerm[]
  holidays: CalendarHoliday[]
  events: CalendarEvent[]
}

export interface CalendarTerm {
  id: string
  name: string
  startDate: string
  endDate: string
  termType: 'semester' | 'quarter' | 'trimester' | 'custom'
  active: boolean
}

export interface CalendarHoliday {
  id: string
  name: string
  date: string
  type: 'national' | 'regional' | 'institutional' | 'religious'
  recurring: boolean
}

export interface CalendarEvent {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  eventType: 'academic' | 'administrative' | 'social' | 'assessment'
  participants: string[]
}

export interface SchoolInstitutionClass {
  id: string
  institutionId: string
  className: string
  grade: string
  section: string
  capacity: number
  enrolled: number
  subjects: SchoolInstitutionClassSubject[]
  schedule: SchoolInstitutionLessonSchedule[]
  homeroom: string
  status: 'active' | 'inactive' | 'completed'
}

export interface SchoolInstitutionClassSubject {
  id: string
  classId: string
  subject: SchoolInstitutionSubject
  professor: Professor
  credits: number
  hoursPerWeek: number
  planning: SchoolInstitutionClassSubjectPlanning
  assessment: AssessmentConfiguration
}

export interface SchoolInstitutionSubject {
  id: string
  name: string
  code: string
  description: string
  department: string
  level: string
  prerequisites: string[]
  bnccAlignment: string[]
}

export interface SchoolInstitutionClassSubjectPlanning {
  id: string
  subjectId: string
  planningDocument: string
  objectives: string[]
  methodology: string[]
  resources: string[]
  evaluation: string[]
  timeline: PlanningTimeline[]
  bnccCompetencies: string[]
}

export interface PlanningTimeline {
  id: string
  unit: string
  topic: string
  startDate: string
  endDate: string
  hours: number
  activities: string[]
  assessment: string
}

export interface AssessmentConfiguration {
  id: string
  gradingScale: string
  passingGrade: number
  assessmentTypes: AssessmentType[]
  rubrics: string[]
}

export interface AssessmentType {
  id: string
  name: string
  weight: number
  frequency: string
  type: 'formative' | 'summative' | 'diagnostic' | 'peer' | 'self'
}

export interface SchoolInstitutionLessonSchedule {
  id: string
  institutionId: string
  classId: string
  subjectId: string
  professorId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  room: string
  recurring: boolean
  exceptions: ScheduleException[]
}

export interface ScheduleException {
  id: string
  date: string
  reason: string
  alternativeTime?: string
  alternativeRoom?: string
  cancelled: boolean
}

// ===============================
// PROFESSOR AND FACULTY
// ===============================

export interface Professor {
  id: string
  name: string
  email: string
  phone: string
  employeeId: string
  department: string
  specialization: string[]
  qualifications: Qualification[]
  employmentType: 'full_time' | 'part_time' | 'adjunct' | 'visiting' | 'emeritus'
  hireDate: string
  subjects: ProfessorSubjectInstitution[]
  schedule: ProfessorSchedule
  performance: ProfessorPerformance
  status: 'active' | 'inactive' | 'on_leave' | 'retired'
}

export interface Qualification {
  id: string
  degree: string
  institution: string
  field: string
  year: string
  verified: boolean
}

export interface ProfessorSubjectInstitution {
  id: string
  professorId: string
  subjectId: string
  institutionId: string
  role: 'primary' | 'assistant' | 'substitute' | 'coordinator'
  startDate: string
  endDate?: string
  load: number // hours per week
}

export interface ProfessorSchedule {
  id: string
  professorId: string
  scheduleItems: ScheduleItem[]
  officeHours: OfficeHours[]
  availability: Availability[]
}

export interface ScheduleItem {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  activity: 'teaching' | 'office_hours' | 'meeting' | 'research' | 'administrative'
  location: string
  description?: string
}

export interface OfficeHours {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  location: string
  appointmentRequired: boolean
}

export interface Availability {
  id: string
  date: string
  available: boolean
  reason?: string
  alternativeContact?: string
}

export interface ProfessorPerformance {
  id: string
  professorId: string
  evaluationPeriod: string
  studentRatings: number
  peerReviews: number
  administrativeRating: number
  professionalDevelopment: string[]
  achievements: string[]
  improvementAreas: string[]
}

// ===============================
// METADATA AND CONFIGURATION
// ===============================

export interface CourseMetadata {
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedHours: number
  language: string
  version: string
  lastReview: string
  nextReview: string
  author: string
  contributors: string[]
  license: string
  keywords: string[]
  bnccAlignment: string[]
}

// ===============================
// BNCC COMPETENCY SYSTEM
// ===============================

export interface BNCCCompetency {
  id: string
  code: string
  description: string
  subject: string
  year: number | string
  component: string
  thematicUnit: string
  skillsObjects: string[]
  cognitiveLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  complexity: 'basic' | 'intermediate' | 'advanced'
  prerequisites: string[]
  assessment: BNCCAssessmentCriteria
  scope: 'local' | 'regional' | 'national'
}

export interface BNCCAssessmentCriteria {
  id: string
  competencyId: string
  criteria: string[]
  indicators: string[]
  rubric: string
  weight: number
  minimumScore: number
}

export interface BNCCAlignment {
  id: string
  competencyCode: string
  contentId: string
  contentType: 'lesson' | 'activity' | 'assessment' | 'resource'
  alignmentLevel: 'full' | 'partial' | 'supporting'
  justification: string
  evidence: string[]
}

// ===============================
// LINK TYPES ENUM
// ===============================

export type LinkType = 
  | 'prerequisite' 
  | 'corequisite' 
  | 'recommended' 
  | 'related' 
  | 'advanced'
  | 'sequential'
  | 'parallel'
  | 'optional'
  | 'branching'
  | 'previous'
  | 'next'
  | 'reference'
  | 'assessment';
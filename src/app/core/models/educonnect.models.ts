export type AnnouncementPriority = 'URGENT' | 'NORMAL' | 'INFO';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  priority: AnnouncementPriority;
  createdAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  priority: AnnouncementPriority;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface ArticleSummary {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  readTimeMinutes: number;
  createdAt: string;
}

export interface ArticleDetail {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  readTimeMinutes: number;
  createdAt: string;
}

export interface HomeSummary {
  title: string;
  motto: string;
  theme: string;
  articlesCount: number;
  quizQuestionsCount: number;
  announcementsCount: number;
  recentAnnouncements: Announcement[];
  featuredArticles: ArticleSummary[];
}

export interface QuizOption {
  id: string;
  optionText: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  orderIndex: number;
  options: QuizOption[];
}

export interface QuizSubmitRequest {
  participantName: string;
  selectedOptionIds: string[];
}

export interface QuizResult {
  id: string;
  participantName: string;
  score: number;
  totalScore: number;
  percentage: number;
  feedback: string;
  createdAt: string;
}

export interface StudentQuery {
  id: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface CreateStudentQueryRequest {
  studentName: string;
  studentEmail: string;
  topic: string;
  message: string;
}

export interface DeveloperMember {
  name: string;
  role: string;
  github: string;
  bio: string;
}

export interface TechStackItem {
  layer: string;
  name: string;
  version: string;
  justification: string;
}

export interface DevelopersInfo {
  teamName: string;
  course: string;
  institution: string;
  academicYear: number;
  members: DeveloperMember[];
  techStack: TechStackItem[];
  projectObjective: string;
  features: string[];
}

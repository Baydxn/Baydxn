export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  heroImage: string;
  mockupType: 'ecommerce' | 'experience' | 'platform';
  accentColor?: string;
  technologies: string[];
  year: string;
  client?: string;
  role: string;
  problem: string;
  concept: string;
  designDirection: string;
  development: string;
  features: string[];
  outcome: string;
  galleryImages: {
    title: string;
    caption: string;
    aspectRatio?: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
}

export interface ProblemSolution {
  id: string;
  number: string;
  problem: string;
  solution: string;
  impact: string;
}

export interface ProcessStage {
  step: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  durationEstimate?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  project: string;
  quote: string;
  avatarPlaceholder?: string;
  isPlaceholderNote?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

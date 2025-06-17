export interface BlogPost {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  excerpt: {
    zh: string;
    en: string;
  };
  content: {
    zh: string;
    en: string;
  };
  publishDate: string;
  tags: string[];
  featured: boolean;
}

export interface Project {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  date: string;
  imageUrl?: string;
  certificateUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: string;
}

export interface CacheConfig {
  ttl: number;
  key: string;
} 
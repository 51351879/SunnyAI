export const CACHE_CONFIG = {
  BLOG: {
    key: 'blog_posts',
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  PROJECTS: {
    key: 'projects',
    ttl: 5 * 60 * 1000,
  },
  ACHIEVEMENTS: {
    key: 'achievements',
    ttl: 5 * 60 * 1000,
  },
} as const;

export const API_CONFIG = {
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  CORS: {
    origin: process.env.NEXT_PUBLIC_SITE_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
} as const;

export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: '必填字段不能为空',
    INVALID_DATE: '日期格式无效',
    DUPLICATE_ID: 'ID已存在',
  },
  API: {
    FETCH_ERROR: '获取数据失败',
    SAVE_ERROR: '保存数据失败',
    UPDATE_ERROR: '更新数据失败',
    DELETE_ERROR: '删除数据失败',
  },
  GITHUB: {
    AUTH_ERROR: 'GitHub认证失败',
    API_ERROR: 'GitHub API调用失败',
    FILE_NOT_FOUND: '文件不存在',
  },
} as const;

export const FILE_PATHS = {
  BLOG: 'data/blog.ts',
  PROJECTS: 'data/projects.ts',
  ACHIEVEMENTS: 'data/achievements.ts',
} as const;

export const BLOG_FILE_PATH = 'data/blog.ts';
export const PROJECTS_FILE_PATH = 'data/projects.ts';
export const ACHIEVEMENTS_FILE_PATH = 'data/achievements.ts';

export const CACHE_KEYS = {
  BLOG: 'blog-posts',
  PROJECTS: 'projects',
  ACHIEVEMENTS: 'achievements',
} as const;

export const CACHE_TTL = {
  BLOG: 60 * 60, // 1 hour
  PROJECTS: 60 * 60, // 1 hour
  ACHIEVEMENTS: 60 * 60, // 1 hour
} as const; 
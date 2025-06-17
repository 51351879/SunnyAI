import { z } from 'zod';

// 多语言文本验证
const multiLanguageTextSchema = z.object({
  zh: z.string().min(1, '中文内容不能为空'),
  en: z.string().min(1, 'English content cannot be empty'),
});

// 博客文章验证
export const blogPostSchema = z.object({
  id: z.string(),
  title: multiLanguageTextSchema,
  excerpt: multiLanguageTextSchema,
  content: multiLanguageTextSchema,
  coverImage: z.string().url('封面图片URL格式不正确'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式应为YYYY-MM-DD'),
  readTime: multiLanguageTextSchema,
  category: z.enum(['tech', 'life', 'thoughts', 'tutorial']),
  tags: z.array(z.string()),
  slug: z.string(),
  views: z.number().min(0),
  status: z.enum(['draft', 'published', 'archived']),
  visible: z.boolean().optional(),
});

// 项目验证
export const projectSchema = z.object({
  id: z.string(),
  title: multiLanguageTextSchema,
  description: multiLanguageTextSchema,
  image: z.string().url('项目图片URL格式不正确'),
  tags: z.array(z.string()),
  category: z.enum(['web', 'mobile', 'ai', 'blockchain']),
  date: z.string().regex(/^\d{4}-\d{2}$/, '日期格式应为YYYY-MM'),
  slug: z.string(),
  githubUrl: z.string().url('GitHub URL格式不正确'),
  demoUrl: z.string().url('演示URL格式不正确'),
  overview: multiLanguageTextSchema,
  technologies: z.array(z.string()),
  features: z.object({
    zh: z.array(z.string()),
    en: z.array(z.string()),
  }),
  challenges: multiLanguageTextSchema,
  solutions: multiLanguageTextSchema,
  results: multiLanguageTextSchema,
  visible: z.boolean().optional(),
});

// 成就验证
export const achievementSchema = z.object({
  id: z.string(),
  title: multiLanguageTextSchema,
  organization: multiLanguageTextSchema,
  date: z.string().regex(/^\d{4}-\d{2}$/, '日期格式应为YYYY-MM'),
  description: multiLanguageTextSchema,
  type: z.enum(['certification', 'achievement', 'award', 'honor']),
  image: z.string().url('证书图片URL格式不正确').optional(),
  credentialUrl: z.string().url('证书URL格式不正确').optional(),
  visible: z.boolean().optional(),
});

// 内容验证函数
export function validateContent(data: any, type: 'blog' | 'project' | 'achievement') {
  let schema;
  switch (type) {
    case 'blog':
      schema = blogPostSchema;
      break;
    case 'project':
      schema = projectSchema;
      break;
    case 'achievement':
      schema = achievementSchema;
      break;
    default:
      throw new Error('未知的内容类型');
  }

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      throw new Error(JSON.stringify(errors));
    }
    throw error;
  }
}

// 内容清理函数
export function sanitizeContent(content: string): string {
  // 移除HTML标签
  content = content.replace(/<[^>]*>/g, '');
  // 移除多余的空格
  content = content.replace(/\s+/g, ' ').trim();
  return content;
}

// 日期格式化函数
export function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('无效的日期格式');
  }
  return date; // 保持原始格式
} 
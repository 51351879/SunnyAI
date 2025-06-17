import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '../../../lib/github-api';
import { projectSchema, validateContent, sanitizeContent, formatDate } from '../../../lib/validation';
import { cache } from '../../../lib/cache';
import { ERROR_MESSAGES, FILE_PATHS, CACHE_CONFIG } from '../../../lib/constants';
import { generateTsExport } from '@/lib/utils';

interface Project {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  image: string;
  tags: string[];
  category: string;
  date: string;
  slug: string;
  githubUrl: string;
  demoUrl: string;
  overview: {
    zh: string;
    en: string;
  };
  technologies: string[];
  features: {
    zh: string[];
    en: string[];
  };
  challenges: {
    zh: string;
    en: string;
  };
  solutions: {
    zh: string;
    en: string;
  };
  results: {
    zh: string;
    en: string;
  };
}

// 解析TypeScript文件内容为JSON
function extractProjectsArray(tsContent: string) {
  const match = tsContent.match(/export const projects\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('无法解析项目数据');
  // eslint-disable-next-line no-new-func
  return (new Function('return ' + match[1]))();
}

// 检查ID是否已存在
function isIdUnique(projects: Project[], newId: string): boolean {
  return !projects.some(project => project.id === newId);
}

export async function GET() {
  try {
    // 尝试从缓存获取数据
    const cachedData = cache.get(CACHE_CONFIG.PROJECTS.key);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // 如果缓存中没有，从GitHub获取
    const file = await githubAPI.getFile(FILE_PATHS.PROJECTS);
    const projectsData = extractProjectsArray(file.content);
    
    // 存入缓存
    cache.set(CACHE_CONFIG.PROJECTS.key, projectsData, CACHE_CONFIG.PROJECTS.ttl);
    
    return NextResponse.json(projectsData);
  } catch (error) {
    console.error('获取项目数据失败:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API.FETCH_ERROR, details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();
    
    // 验证数据
    const validatedProject = validateContent(newProject, 'project');
    
    // 获取现有数据
    const file = await githubAPI.getFile(FILE_PATHS.PROJECTS);
    const existingProjects = extractProjectsArray(file.content);
    
    // 检查ID唯一性
    if (!isIdUnique(existingProjects, validatedProject.id)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION.DUPLICATE_ID },
        { status: 400 }
      );
    }
    
    // 清理和格式化数据
    const sanitizedProject = {
      ...validatedProject,
      overview: {
        zh: sanitizeContent(validatedProject.overview.zh),
        en: sanitizeContent(validatedProject.overview.en),
      },
      challenges: {
        zh: sanitizeContent(validatedProject.challenges.zh),
        en: sanitizeContent(validatedProject.challenges.en),
      },
      solutions: {
        zh: sanitizeContent(validatedProject.solutions.zh),
        en: sanitizeContent(validatedProject.solutions.en),
      },
      results: {
        zh: sanitizeContent(validatedProject.results.zh),
        en: sanitizeContent(validatedProject.results.en),
      },
      date: formatDate(validatedProject.date),
    };
    
    const updatedProjects = [...existingProjects, sanitizedProject];
    
    // 生成新的文件内容
    const newContent = generateTsExport('projects', updatedProjects);
    
    await githubAPI.updateFile({
      message: `Add new project: ${sanitizedProject.title.zh}`,
      content: newContent,
      path: FILE_PATHS.PROJECTS,
      sha: file.sha,
    });
    
    // 更新缓存
    cache.set(CACHE_CONFIG.PROJECTS.key, updatedProjects, CACHE_CONFIG.PROJECTS.ttl);
    
    return NextResponse.json({
      success: true,
      message: '项目已保存',
      data: sanitizedProject
    });
  } catch (error) {
    console.error('保存项目失败:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.API.SAVE_ERROR, details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.API.SAVE_ERROR, details: '未知错误' },
      { status: 500 }
    );
  }
} 
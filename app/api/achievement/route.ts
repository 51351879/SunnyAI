import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '../../../lib/github-api';
import { achievementSchema, validateContent, sanitizeContent, formatDate } from '../../../lib/validation';
import { cache } from '../../../lib/cache';
import { ERROR_MESSAGES, FILE_PATHS, CACHE_CONFIG } from '../../../lib/constants';
import { generateTsExport } from '@/lib/utils';

interface Achievement {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  organization: {
    zh: string;
    en: string;
  };
  date: string;
  description: {
    zh: string;
    en: string;
  };
  type: 'certification' | 'achievement' | 'award' | 'honor';
  image?: string;
  credentialUrl?: string;
}

// 解析TypeScript文件内容为JSON
function extractAchievementsArray(tsContent: string) {
  const match = tsContent.match(/export const achievements\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('无法解析成就数据');
  // eslint-disable-next-line no-new-func
  return (new Function('return ' + match[1]))();
}

// 检查ID是否已存在
function isIdUnique(achievements: Achievement[], newId: string): boolean {
  return !achievements.some(achievement => achievement.id === newId);
}

export async function GET() {
  try {
    // 尝试从缓存获取数据
    const cachedData = cache.get(CACHE_CONFIG.ACHIEVEMENTS.key);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // 如果缓存中没有，从GitHub获取
    const file = await githubAPI.getFile(FILE_PATHS.ACHIEVEMENTS);
    const achievementsData = extractAchievementsArray(file.content);
    
    // 存入缓存
    cache.set(CACHE_CONFIG.ACHIEVEMENTS.key, achievementsData, CACHE_CONFIG.ACHIEVEMENTS.ttl);
    
    return NextResponse.json(achievementsData);
  } catch (error) {
    console.error('获取成就数据失败:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API.FETCH_ERROR, details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newAchievement = await request.json();
    
    // 验证数据
    const validatedAchievement = validateContent(newAchievement, 'achievement');
    
    // 获取现有数据
    const file = await githubAPI.getFile(FILE_PATHS.ACHIEVEMENTS);
    const existingAchievements = extractAchievementsArray(file.content);
    
    // 检查ID唯一性
    if (!isIdUnique(existingAchievements, validatedAchievement.id)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION.DUPLICATE_ID },
        { status: 400 }
      );
    }
    
    // 清理和格式化数据
    const sanitizedAchievement = {
      ...validatedAchievement,
      description: {
        zh: sanitizeContent(validatedAchievement.description.zh),
        en: sanitizeContent(validatedAchievement.description.en),
      },
      date: formatDate(validatedAchievement.date),
    };
    
    const updatedAchievements = [...existingAchievements, sanitizedAchievement];
    
    // 生成新的文件内容
    const newContent = generateTsExport('achievements', updatedAchievements);
    
    await githubAPI.updateFile({
      message: `Add new achievement: ${sanitizedAchievement.title.zh}`,
      content: newContent,
      path: FILE_PATHS.ACHIEVEMENTS,
      sha: file.sha,
    });
    
    // 更新缓存
    cache.set(CACHE_CONFIG.ACHIEVEMENTS.key, updatedAchievements, CACHE_CONFIG.ACHIEVEMENTS.ttl);
    
    return NextResponse.json({
      success: true,
      message: '成就已保存',
      data: sanitizedAchievement
    });
  } catch (error) {
    console.error('保存成就失败:', error);
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
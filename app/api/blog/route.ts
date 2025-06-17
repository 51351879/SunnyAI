import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '../../../lib/github-api';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
}

export async function GET() {
  try {
    const file = await githubAPI.getFile('data/blog.ts');
    
    // 解析TypeScript文件内容
    const match = file.content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
    if (!match) {
      throw new Error('无法解析博客数据');
    }
    
    const blogData = eval(match[1]);
    return NextResponse.json(blogData);
  } catch (error) {
    console.error('获取博客数据失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPost: BlogPost = await request.json();
    
    // 获取现有文件
    const file = await githubAPI.getFile('data/blog.ts');
    
    // 解析现有数据
    const match = file.content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
    if (!match) {
      throw new Error('无法解析现有博客数据');
    }
    
    const existingPosts = eval(match[1]);
    
    // 添加新文章
    const updatedPosts = [...existingPosts, newPost];
    
    // 生成新的文件内容
    const newContent = `export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(updatedPosts, null, 2)};
`;

    // 提交到GitHub
    await githubAPI.updateFile({
      message: `Add new blog post: ${newPost.title}`,
      content: newContent,
      path: 'data/blog.ts',
      sha: file.sha,
    });

    return NextResponse.json({ success: true, message: '博客文章已保存' });
  } catch (error) {
    console.error('保存博客失败:', error);
    return NextResponse.json({ error: '保存失败' }, { status: 500 });
  }
}
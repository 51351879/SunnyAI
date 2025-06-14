'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  FileText, 
  FolderOpen, 
  Trophy,
  Calendar,
  Tag,
  Globe,
  Languages
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Define proper TypeScript interfaces
interface MultiLanguageText {
  zh: string;
  en: string;
}

interface BlogPost {
  id: string;
  title: MultiLanguageText;
  excerpt: MultiLanguageText;
  content?: MultiLanguageText;
  category: string;
  status: string;
  date: string;
  coverImage?: string;
  tags?: string[];
}

interface Project {
  id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  category: string;
  status: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  tags?: string[];
}

interface Achievement {
  id: string;
  title: MultiLanguageText;
  organization: MultiLanguageText;
  description?: MultiLanguageText;
  type: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

type ContentItem = BlogPost | Project | Achievement;

export default function ContentEditor() {
  const [activeContentType, setActiveContentType] = useState<'blog' | 'projects' | 'achievements'>('blog');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  // 模拟数据
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: { zh: 'React 18新特性', en: 'React 18 New Features' },
      excerpt: { zh: '探索React 18的新功能', en: 'Exploring React 18 new features' },
      category: 'tech',
      status: 'published',
      date: '2024-03-15'
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: { zh: 'AI聊天助手', en: 'AI Chat Assistant' },
      description: { zh: '智能对话系统', en: 'Intelligent dialogue system' },
      category: 'ai',
      status: 'published',
      date: '2024-03'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: { zh: 'AWS认证', en: 'AWS Certification' },
      organization: { zh: 'Amazon Web Services', en: 'Amazon Web Services' },
      type: 'certification',
      date: '2024-01'
    }
  ]);

  const contentTypes = [
    { id: 'blog' as const, name: '博客文章', icon: FileText },
    { id: 'projects' as const, name: '项目作品', icon: FolderOpen },
    { id: 'achievements' as const, name: '个人成就', icon: Trophy }
  ];

  const getCurrentData = (): ContentItem[] => {
    switch (activeContentType) {
      case 'blog':
        return blogPosts;
      case 'projects':
        return projects;
      case 'achievements':
        return achievements;
      default:
        return [];
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingItem) return;

    // 这里应该调用API保存数据
    console.log('Saving:', editingItem);
    
    // Update the appropriate state based on content type
    if (activeContentType === 'blog' && 'excerpt' in editingItem) {
      const existingIndex = blogPosts.findIndex(post => post.id === editingItem.id);
      if (existingIndex >= 0) {
        setBlogPosts(prev => prev.map(post => post.id === editingItem.id ? editingItem as BlogPost : post));
      } else {
        setBlogPosts(prev => [...prev, editingItem as BlogPost]);
      }
    } else if (activeContentType === 'projects' && 'description' in editingItem) {
      const existingIndex = projects.findIndex(project => project.id === editingItem.id);
      if (existingIndex >= 0) {
        setProjects(prev => prev.map(project => project.id === editingItem.id ? editingItem as Project : project));
      } else {
        setProjects(prev => [...prev, editingItem as Project]);
      }
    } else if (activeContentType === 'achievements' && 'organization' in editingItem) {
      const existingIndex = achievements.findIndex(achievement => achievement.id === editingItem.id);
      if (existingIndex >= 0) {
        setAchievements(prev => prev.map(achievement => achievement.id === editingItem.id ? editingItem as Achievement : achievement));
      } else {
        setAchievements(prev => [...prev, editingItem as Achievement]);
      }
    }

    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个项目吗？')) {
      switch (activeContentType) {
        case 'blog':
          setBlogPosts(prev => prev.filter(item => item.id !== id));
          break;
        case 'projects':
          setProjects(prev => prev.filter(item => item.id !== id));
          break;
        case 'achievements':
          setAchievements(prev => prev.filter(item => item.id !== id));
          break;
      }
    }
  };

  const createNewItem = (): ContentItem => {
    const baseItem = {
      id: Date.now().toString(),
      title: { zh: '', en: '' },
      date: new Date().toISOString().split('T')[0]
    };

    switch (activeContentType) {
      case 'blog':
        return {
          ...baseItem,
          excerpt: { zh: '', en: '' },
          content: { zh: '', en: '' },
          category: 'tech',
          status: 'draft',
          tags: []
        } as BlogPost;
      case 'projects':
        return {
          ...baseItem,
          description: { zh: '', en: '' },
          category: 'web',
          status: 'development',
          tags: []
        } as Project;
      case 'achievements':
        return {
          ...baseItem,
          organization: { zh: '', en: '' },
          description: { zh: '', en: '' },
          type: 'achievement'
        } as Achievement;
      default:
        return baseItem as ContentItem;
    }
  };

  const renderContentForm = () => {
    if (!editingItem) return null;

    switch (activeContentType) {
      case 'blog':
        const blogItem = editingItem as BlogPost;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>标题 (中文)</Label>
                <Input
                  value={blogItem.title?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, zh: e.target.value }
                  }))}
                  placeholder="请输入中文标题"
                />
              </div>
              <div>
                <Label>Title (English)</Label>
                <Input
                  value={blogItem.title?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, en: e.target.value }
                  }))}
                  placeholder="Enter English title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>摘要 (中文)</Label>
                <Textarea
                  value={blogItem.excerpt?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    excerpt: { ...(prev as BlogPost).excerpt, zh: e.target.value }
                  }))}
                  placeholder="请输入中文摘要"
                  rows={3}
                />
              </div>
              <div>
                <Label>Excerpt (English)</Label>
                <Textarea
                  value={blogItem.excerpt?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    excerpt: { ...(prev as BlogPost).excerpt, en: e.target.value }
                  }))}
                  placeholder="Enter English excerpt"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>分类</Label>
                <Select
                  value={blogItem.category}
                  onValueChange={(value) => setEditingItem(prev => ({ ...prev!, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">技术</SelectItem>
                    <SelectItem value="life">生活</SelectItem>
                    <SelectItem value="reading">读书</SelectItem>
                    <SelectItem value="thoughts">思考</SelectItem>
                    <SelectItem value="tutorial">教程</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>状态</Label>
                <Select
                  value={blogItem.status}
                  onValueChange={(value) => setEditingItem(prev => ({ ...prev!, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="published">已发布</SelectItem>
                    <SelectItem value="archived">已归档</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>发布日期</Label>
                <Input
                  type="date"
                  value={blogItem.date}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label>封面图片URL</Label>
              <Input
                value={blogItem.coverImage || ''}
                onChange={(e) => setEditingItem(prev => ({ ...prev!, coverImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label>标签 (用逗号分隔)</Label>
              <Input
                value={blogItem.tags?.join(', ') || ''}
                onChange={(e) => setEditingItem(prev => ({
                  ...prev!,
                  tags: e.target.value.split(',').map(tag => tag.trim())
                }))}
                placeholder="React, JavaScript, 前端"
              />
            </div>

            <Tabs value={language} onValueChange={(value) => setLanguage(value as 'zh' | 'en')}>
              <TabsList>
                <TabsTrigger value="zh">中文内容</TabsTrigger>
                <TabsTrigger value="en">English Content</TabsTrigger>
              </TabsList>
              <TabsContent value="zh">
                <div>
                  <Label>文章内容 (中文)</Label>
                  <Textarea
                    value={blogItem.content?.zh || ''}
                    onChange={(e) => setEditingItem(prev => ({
                      ...prev!,
                      content: { ...(prev as BlogPost).content || { zh: '', en: '' }, zh: e.target.value }
                    }))}
                    placeholder="请输入文章内容..."
                    rows={10}
                  />
                </div>
              </TabsContent>
              <TabsContent value="en">
                <div>
                  <Label>Article Content (English)</Label>
                  <Textarea
                    value={blogItem.content?.en || ''}
                    onChange={(e) => setEditingItem(prev => ({
                      ...prev!,
                      content: { ...(prev as BlogPost).content || { zh: '', en: '' }, en: e.target.value }
                    }))}
                    placeholder="Enter article content..."
                    rows={10}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'projects':
        const projectItem = editingItem as Project;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>项目名称 (中文)</Label>
                <Input
                  value={projectItem.title?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, zh: e.target.value }
                  }))}
                  placeholder="请输入项目中文名称"
                />
              </div>
              <div>
                <Label>Project Name (English)</Label>
                <Input
                  value={projectItem.title?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, en: e.target.value }
                  }))}
                  placeholder="Enter project English name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>项目描述 (中文)</Label>
                <Textarea
                  value={projectItem.description?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    description: { ...(prev as Project).description, zh: e.target.value }
                  }))}
                  placeholder="请输入项目中文描述"
                  rows={3}
                />
              </div>
              <div>
                <Label>Project Description (English)</Label>
                <Textarea
                  value={projectItem.description?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    description: { ...(prev as Project).description, en: e.target.value }
                  }))}
                  placeholder="Enter project English description"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>项目分类</Label>
                <Select
                  value={projectItem.category}
                  onValueChange={(value) => setEditingItem(prev => ({ ...prev!, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web开发</SelectItem>
                    <SelectItem value="mobile">移动应用</SelectItem>
                    <SelectItem value="ai">人工智能</SelectItem>
                    <SelectItem value="blockchain">区块链</SelectItem>
                    <SelectItem value="design">设计</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>项目状态</Label>
                <Select
                  value={projectItem.status}
                  onValueChange={(value) => setEditingItem(prev => ({ ...prev!, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">开发中</SelectItem>
                    <SelectItem value="published">已完成</SelectItem>
                    <SelectItem value="maintenance">维护中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>完成日期</Label>
                <Input
                  value={projectItem.date}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, date: e.target.value }))}
                  placeholder="2024-03"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>GitHub链接</Label>
                <Input
                  value={projectItem.githubUrl || ''}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <Label>演示链接</Label>
                <Input
                  value={projectItem.demoUrl || ''}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, demoUrl: e.target.value }))}
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            <div>
              <Label>项目图片URL</Label>
              <Input
                value={projectItem.image || ''}
                onChange={(e) => setEditingItem(prev => ({ ...prev!, image: e.target.value }))}
                placeholder="https://example.com/project-image.jpg"
              />
            </div>

            <div>
              <Label>技术标签 (用逗号分隔)</Label>
              <Input
                value={projectItem.tags?.join(', ') || ''}
                onChange={(e) => setEditingItem(prev => ({
                  ...prev!,
                  tags: e.target.value.split(',').map(tag => tag.trim())
                }))}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>
        );

      case 'achievements':
        const achievementItem = editingItem as Achievement;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>成就名称 (中文)</Label>
                <Input
                  value={achievementItem.title?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, zh: e.target.value }
                  }))}
                  placeholder="请输入成就中文名称"
                />
              </div>
              <div>
                <Label>Achievement Name (English)</Label>
                <Input
                  value={achievementItem.title?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    title: { ...prev!.title, en: e.target.value }
                  }))}
                  placeholder="Enter achievement English name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>颁发机构 (中文)</Label>
                <Input
                  value={achievementItem.organization?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    organization: { ...(prev as Achievement).organization, zh: e.target.value }
                  }))}
                  placeholder="请输入颁发机构中文名称"
                />
              </div>
              <div>
                <Label>Organization (English)</Label>
                <Input
                  value={achievementItem.organization?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    organization: { ...(prev as Achievement).organization, en: e.target.value }
                  }))}
                  placeholder="Enter organization English name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>成就类型</Label>
                <Select
                  value={achievementItem.type}
                  onValueChange={(value) => setEditingItem(prev => ({ ...prev!, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="award">奖项</SelectItem>
                    <SelectItem value="certification">认证</SelectItem>
                    <SelectItem value="achievement">成就</SelectItem>
                    <SelectItem value="honor">荣誉</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>获得日期</Label>
                <Input
                  value={achievementItem.date}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, date: e.target.value }))}
                  placeholder="2024-01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>描述 (中文)</Label>
                <Textarea
                  value={achievementItem.description?.zh || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    description: { ...(prev as Achievement).description || { zh: '', en: '' }, zh: e.target.value }
                  }))}
                  placeholder="请输入成就中文描述"
                  rows={3}
                />
              </div>
              <div>
                <Label>Description (English)</Label>
                <Textarea
                  value={achievementItem.description?.en || ''}
                  onChange={(e) => setEditingItem(prev => ({
                    ...prev!,
                    description: { ...(prev as Achievement).description || { zh: '', en: '' }, en: e.target.value }
                  }))}
                  placeholder="Enter achievement English description"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>证书图片URL</Label>
                <Input
                  value={achievementItem.image || ''}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, image: e.target.value }))}
                  placeholder="https://example.com/certificate.jpg"
                />
              </div>
              <div>
                <Label>证书链接</Label>
                <Input
                  value={achievementItem.credentialUrl || ''}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, credentialUrl: e.target.value }))}
                  placeholder="https://credential.example.com"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">内容管理</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#17f700] text-black hover:bg-[#17f700]/90"
              onClick={() => {
                setEditingItem(createNewItem());
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              新建内容
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem?.id && getCurrentData().find((item: ContentItem) => item.id === editingItem.id) 
                  ? '编辑内容' 
                  : '新建内容'
                }
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {renderContentForm()}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  取消
                </Button>
                <Button 
                  className="bg-[#17f700] text-black hover:bg-[#17f700]/90"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content Type Tabs */}
      <Tabs value={activeContentType} onValueChange={(value) => setActiveContentType(value as 'blog' | 'projects' | 'achievements')}>
        <TabsList className="grid w-full grid-cols-3">
          {contentTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
              <type.icon className="w-4 h-4" />
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {contentTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-4">
            <div className="grid gap-4">
              {getCurrentData().map((item: ContentItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {item.title.zh}
                          </h3>
                          {'status' in item && item.status && (
                            <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                              {item.status === 'published' ? '已发布' : 
                               item.status === 'draft' ? '草稿' : 
                               item.status === 'development' ? '开发中' : item.status}
                            </Badge>
                          )}
                        </div>
                        
                        {'excerpt' in item && item.excerpt && (
                          <p className="text-muted-foreground mb-2">
                            {item.excerpt.zh}
                          </p>
                        )}
                        
                        {'description' in item && item.description && (
                          <p className="text-muted-foreground mb-2">
                            {item.description.zh}
                          </p>
                        )}
                        
                        {'organization' in item && item.organization && (
                          <p className="text-muted-foreground mb-2">
                            {item.organization.zh}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                          </div>
                          {'category' in item && item.category && (
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {item.category}
                            </div>
                          )}
                          {'type' in item && item.type && (
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {item.type}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
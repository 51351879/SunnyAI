'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Settings,
  Palette,
  Shield,
  Database
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    // 基本信息
    siteName: 'DEVFOLIO',
    siteDescription: '创造数字未来的全栈开发者',
    siteUrl: 'https://yoursite.com',
    
    // 个人信息
    name: 'JIEJOE',
    title: '全栈开发者',
    bio: '我是一名充满激情的全栈开发者，专注于创建有意义的数字体验。',
    email: 'hello@jiejoe.com',
    phone: '+86 138-0000-0000',
    location: '中国 · 深圳',
    
    // 社交媒体
    github: 'https://github.com/jiejoe',
    linkedin: 'https://linkedin.com/in/jiejoe',
    twitter: 'https://twitter.com/jiejoe',
    
    // 网站设置
    language: 'zh',
    theme: 'dark',
    enableAnalytics: true,
    enableComments: false,
    enableNewsletter: false,
    
    // SEO设置
    metaTitle: 'DEVFOLIO - 创造数字未来',
    metaDescription: '全栈开发者作品集，展示创新的数字产品和解决方案',
    metaKeywords: '全栈开发,React,Node.js,作品集,开发者',
    
    // 安全设置
    adminPassword: '',
    enableTwoFactor: false,
    sessionTimeout: 30
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // 模拟保存过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 这里应该调用API保存设置
    console.log('Saving settings:', settings);
    
    setIsSaving(false);
    // 显示成功消息
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">网站设置</h2>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#17f700] text-black hover:bg-[#17f700]/90"
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>保存中...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>保存设置</span>
            </div>
          )}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            基本信息
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            个人资料
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            外观设置
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            SEO设置
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            安全设置
          </TabsTrigger>
        </TabsList>

        {/* 基本信息 */}
        <TabsContent value="basic">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">网站基本信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName">网站名称</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                    placeholder="网站名称"
                  />
                </div>
                
                <div>
                  <Label htmlFor="siteUrl">网站URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => updateSetting('siteUrl', e.target.value)}
                    placeholder="https://yoursite.com"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="siteDescription">网站描述</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateSetting('siteDescription', e.target.value)}
                    placeholder="网站描述"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="language">默认语言</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => updateSetting('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="analytics"
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
                  />
                  <Label htmlFor="analytics">启用网站分析</Label>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* 个人资料 */}
        <TabsContent value="personal">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">个人信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => updateSetting('name', e.target.value)}
                    placeholder="您的姓名"
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">职位</Label>
                  <Input
                    id="title"
                    value={settings.title}
                    onChange={(e) => updateSetting('title', e.target.value)}
                    placeholder="您的职位"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    placeholder="个人简介"
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">联系信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">电话</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      placeholder="+86 138-0000-0000"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="location">位置</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="location"
                      value={settings.location}
                      onChange={(e) => updateSetting('location', e.target.value)}
                      placeholder="您的位置"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">社交媒体</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="github"
                      value={settings.github}
                      onChange={(e) => updateSetting('github', e.target.value)}
                      placeholder="https://github.com/username"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="linkedin"
                      value={settings.linkedin}
                      onChange={(e) => updateSetting('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="twitter"
                      value={settings.twitter}
                      onChange={(e) => updateSetting('twitter', e.target.value)}
                      placeholder="https://twitter.com/username"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* 外观设置 */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">外观和主题</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="theme">主题</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => updateSetting('theme', value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">深色主题</SelectItem>
                      <SelectItem value="light">浅色主题</SelectItem>
                      <SelectItem value="auto">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="comments"
                      checked={settings.enableComments}
                      onCheckedChange={(checked) => updateSetting('enableComments', checked)}
                    />
                    <Label htmlFor="comments">启用评论功能</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="newsletter"
                      checked={settings.enableNewsletter}
                      onCheckedChange={(checked) => updateSetting('enableNewsletter', checked)}
                    />
                    <Label htmlFor="newsletter">启用邮件订阅</Label>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* SEO设置 */}
        <TabsContent value="seo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">搜索引擎优化</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle">页面标题</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => updateSetting('metaTitle', e.target.value)}
                    placeholder="网站标题"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    建议长度：50-60个字符
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="metaDescription">页面描述</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.metaDescription}
                    onChange={(e) => updateSetting('metaDescription', e.target.value)}
                    placeholder="网站描述"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    建议长度：150-160个字符
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="metaKeywords">关键词</Label>
                  <Input
                    id="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={(e) => updateSetting('metaKeywords', e.target.value)}
                    placeholder="关键词1, 关键词2, 关键词3"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    用逗号分隔多个关键词
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">安全设置</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="adminPassword">管理员密码</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={settings.adminPassword}
                    onChange={(e) => updateSetting('adminPassword', e.target.value)}
                    placeholder="输入新密码（留空则不修改）"
                  />
                </div>
                
                <div>
                  <Label htmlFor="sessionTimeout">会话超时时间（分钟）</Label>
                  <Select
                    value={settings.sessionTimeout.toString()}
                    onValueChange={(value) => updateSetting('sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15分钟</SelectItem>
                      <SelectItem value="30">30分钟</SelectItem>
                      <SelectItem value="60">1小时</SelectItem>
                      <SelectItem value="120">2小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactor"
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => updateSetting('enableTwoFactor', checked)}
                  />
                  <Label htmlFor="twoFactor">启用双因素认证</Label>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
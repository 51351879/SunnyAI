'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  FolderOpen, 
  Trophy, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  User,
  Globe,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AdminAuth from '@/components/admin/AdminAuth';
import ContentEditor from '@/components/admin/ContentEditor';
import MediaManager from '@/components/admin/MediaManager';
import SiteSettings from '@/components/admin/SiteSettings';
import Analytics from '@/components/admin/Analytics';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    posts: 6,
    projects: 6,
    achievements: 9,
    views: 12847
  });

  useEffect(() => {
    // 检查认证状态
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const quickActions = [
    {
      title: '新建博客文章',
      description: '创建新的博客文章',
      icon: FileText,
      action: () => setActiveTab('content'),
      color: 'bg-blue-500'
    },
    {
      title: '添加项目',
      description: '展示新的项目作品',
      icon: FolderOpen,
      action: () => setActiveTab('content'),
      color: 'bg-green-500'
    },
    {
      title: '记录成就',
      description: '添加新的个人成就',
      icon: Trophy,
      action: () => setActiveTab('content'),
      color: 'bg-yellow-500'
    },
    {
      title: '管理媒体',
      description: '上传和管理图片',
      icon: ImageIcon,
      action: () => setActiveTab('media'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">
                管理<span className="text-[#17f700]">后台</span>
              </h1>
              <Badge variant="outline" className="text-[#17f700] border-[#17f700]">
                Admin Panel
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                预览网站
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('admin_authenticated');
                  setIsAuthenticated(false);
                }}
              >
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              仪表板
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              内容管理
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              媒体库
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              网站设置
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              数据分析
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-6">欢迎回来！</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">博客文章</p>
                      <p className="text-3xl font-bold text-[#17f700]">{stats.posts}</p>
                    </div>
                    <FileText className="w-8 h-8 text-[#17f700]" />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">项目作品</p>
                      <p className="text-3xl font-bold text-[#17f700]">{stats.projects}</p>
                    </div>
                    <FolderOpen className="w-8 h-8 text-[#17f700]" />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">个人成就</p>
                      <p className="text-3xl font-bold text-[#17f700]">{stats.achievements}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-[#17f700]" />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总浏览量</p>
                      <p className="text-3xl font-bold text-[#17f700]">{stats.views.toLocaleString()}</p>
                    </div>
                    <Eye className="w-8 h-8 text-[#17f700]" />
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-semibold mb-4">快速操作</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card 
                        className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                        onClick={action.action}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-[#17f700] transition-colors">
                              {action.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="mb-20">
            <ContentEditor />
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media" className="mb-20">
            <MediaManager />
          </TabsContent>

          {/* Site Settings */}
          <TabsContent value="settings" className="mb-20">
            <SiteSettings />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="mb-20">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}
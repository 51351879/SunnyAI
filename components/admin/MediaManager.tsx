'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Download,
  Search,
  Filter,
  Grid,
  List,
  FolderPlus,
  Folder
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  folder: string;
  uploadDate: string;
  alt?: string;
}

export default function MediaManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-background.jpg',
      url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      type: 'image/jpeg',
      size: 2048000,
      folder: 'backgrounds',
      uploadDate: '2024-03-15',
      alt: '英雄区背景图'
    },
    {
      id: '2',
      name: 'project-screenshot.png',
      url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
      type: 'image/png',
      size: 1536000,
      folder: 'projects',
      uploadDate: '2024-03-14',
      alt: '项目截图'
    },
    {
      id: '3',
      name: 'blog-cover.webp',
      url: 'https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg',
      type: 'image/webp',
      size: 512000,
      folder: 'blog',
      uploadDate: '2024-03-13',
      alt: '博客封面图'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = ['all', 'backgrounds', 'projects', 'blog', 'avatars', 'icons'];

  const filteredFiles = mediaFiles.filter(file => {
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.alt && file.alt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    // 模拟文件上传
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newFile: MediaFile = {
        id: Date.now().toString() + i,
        name: file.name,
        url: URL.createObjectURL(file), // 实际应用中应该上传到服务器
        type: file.type,
        size: file.size,
        folder: selectedFolder === 'all' ? 'uploads' : selectedFolder,
        uploadDate: new Date().toISOString().split('T')[0],
        alt: ''
      };

      setMediaFiles(prev => [...prev, newFile]);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // 这里可以添加一个toast通知
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('确定要删除这个文件吗？')) {
      setMediaFiles(prev => prev.filter(file => file.id !== id));
      setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
    }
  };

  const handleBatchDelete = () => {
    if (selectedFiles.length === 0) return;
    if (confirm(`确定要删除选中的 ${selectedFiles.length} 个文件吗？`)) {
      setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id) 
        ? prev.filter(fileId => fileId !== id)
        : [...prev, id]
    );
  };

  const getStorageUsage = () => {
    const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);
    const maxSize = 1024 * 1024 * 1024; // 1GB
    const percentage = (totalSize / maxSize) * 100;
    return {
      used: formatFileSize(totalSize),
      total: formatFileSize(maxSize),
      percentage: Math.min(percentage, 100)
    };
  };

  const storageUsage = getStorageUsage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">媒体库</h2>
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-[#17f700] text-black hover:bg-[#17f700]/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? '上传中...' : '上传文件'}
          </Button>
        </div>
      </div>

      {/* Storage Usage */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">存储使用情况</span>
          <span className="text-sm text-muted-foreground">
            {storageUsage.used} / {storageUsage.total}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-[#17f700] h-2 rounded-full transition-all duration-300"
            style={{ width: `${storageUsage.percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          已使用 {storageUsage.percentage.toFixed(1)}% 的存储空间
        </p>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="搜索文件..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择文件夹" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有文件夹</SelectItem>
              <SelectItem value="backgrounds">背景图</SelectItem>
              <SelectItem value="projects">项目图片</SelectItem>
              <SelectItem value="blog">博客图片</SelectItem>
              <SelectItem value="avatars">头像</SelectItem>
              <SelectItem value="icons">图标</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          {selectedFiles.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBatchDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              删除选中 ({selectedFiles.length})
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* File Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'space-y-2'
      }>
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {viewMode === 'grid' ? (
              <Card className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-[#17f700]' : ''
              }`}>
                <div className="space-y-3">
                  <div 
                    className="relative aspect-video bg-muted rounded-lg overflow-hidden"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <img
                      src={file.url}
                      alt={file.alt || file.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedFiles.includes(file.id) && (
                      <div className="absolute inset-0 bg-[#17f700]/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#17f700] rounded-full flex items-center justify-center">
                          <span className="text-black text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge variant="outline" className="text-xs">
                        {file.folder}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyUrl(file.url)}
                      className="flex-1"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      复制
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className={`p-4 ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-[#17f700]' : ''
              }`}>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 bg-muted rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <img
                      src={file.url}
                      alt={file.alt || file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.uploadDate}</span>
                      <Badge variant="outline">{file.folder}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyUrl(file.url)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">没有找到文件</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedFolder !== 'all' 
              ? '尝试调整搜索条件或文件夹筛选'
              : '开始上传您的第一个文件'
            }
          </p>
          {!searchTerm && selectedFolder === 'all' && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#17f700] text-black hover:bg-[#17f700]/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
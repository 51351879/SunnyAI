'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  // 模拟数据
  const stats = {
    totalViews: 12847,
    uniqueVisitors: 8234,
    avgSessionTime: '3:42',
    bounceRate: '32%',
    topPages: [
      { path: '/', views: 4521, title: '首页' },
      { path: '/projects', views: 2834, title: '项目展示' },
      { path: '/blog', views: 2156, title: '博客' },
      { path: '/about', views: 1892, title: '关于我' },
      { path: '/contact', views: 1444, title: '联系方式' }
    ],
    deviceStats: [
      { device: 'Desktop', percentage: 65, count: 5352 },
      { device: 'Mobile', percentage: 28, count: 2305 },
      { device: 'Tablet', percentage: 7, count: 577 }
    ],
    trafficSources: [
      { source: 'Direct', percentage: 45, count: 3705 },
      { source: 'Search', percentage: 32, count: 2635 },
      { source: 'Social', percentage: 15, count: 1235 },
      { source: 'Referral', percentage: 8, count: 659 }
    ],
    recentVisitors: [
      { country: '中国', city: '深圳', visits: 1234 },
      { country: '美国', city: '纽约', visits: 567 },
      { country: '日本', city: '东京', visits: 432 },
      { country: '德国', city: '柏林', visits: 321 },
      { country: '英国', city: '伦敦', visits: 298 }
    ]
  };

  const timeRanges = [
    { value: '1d', label: '今天' },
    { value: '7d', label: '过去7天' },
    { value: '30d', label: '过去30天' },
    { value: '90d', label: '过去90天' }
  ];

  const getChangePercentage = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0
    };
  };

  // 模拟变化数据
  const changes = {
    views: getChangePercentage(stats.totalViews, 10234),
    visitors: getChangePercentage(stats.uniqueVisitors, 6789),
    sessionTime: getChangePercentage(222, 198), // 3:42 = 222 seconds
    bounceRate: getChangePercentage(32, 38)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">数据分析</h2>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总浏览量</p>
                <p className="text-3xl font-bold text-[#17f700]">
                  {stats.totalViews.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    changes.views.isPositive ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm ${
                    changes.views.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {changes.views.isPositive ? '+' : '-'}{changes.views.value}%
                  </span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-[#17f700]" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">独立访客</p>
                <p className="text-3xl font-bold text-[#17f700]">
                  {stats.uniqueVisitors.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    changes.visitors.isPositive ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm ${
                    changes.visitors.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {changes.visitors.isPositive ? '+' : '-'}{changes.visitors.value}%
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-[#17f700]" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均停留时间</p>
                <p className="text-3xl font-bold text-[#17f700]">
                  {stats.avgSessionTime}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    changes.sessionTime.isPositive ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm ${
                    changes.sessionTime.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {changes.sessionTime.isPositive ? '+' : '-'}{changes.sessionTime.value}%
                  </span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-[#17f700]" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">跳出率</p>
                <p className="text-3xl font-bold text-[#17f700]">
                  {stats.bounceRate}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    !changes.bounceRate.isPositive ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm ${
                    !changes.bounceRate.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {!changes.bounceRate.isPositive ? '-' : '+'}{changes.bounceRate.value}%
                  </span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-[#17f700]" />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 热门页面 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">热门页面</h3>
            <div className="space-y-4">
              {stats.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{page.title}</p>
                      <p className="text-sm text-muted-foreground">{page.path}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {page.views.toLocaleString()} 次浏览
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 设备统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">设备统计</h3>
            <div className="space-y-4">
              {stats.deviceStats.map((device) => {
                const Icon = device.device === 'Desktop' ? Monitor : 
                           device.device === 'Mobile' ? Smartphone : 
                           Monitor;
                
                return (
                  <div key={device.device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-[#17f700]" />
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {device.percentage}% ({device.count.toLocaleString()})
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-[#17f700] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* 流量来源 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">流量来源</h3>
            <div className="space-y-4">
              {stats.trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">
                      {source.percentage}% ({source.count.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-[#17f700] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 访客地理位置 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">访客地理位置</h3>
            <div className="space-y-4">
              {stats.recentVisitors.map((visitor, index) => (
                <div key={`${visitor.country}-${visitor.city}`} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-[#17f700]" />
                      <span className="font-medium">{visitor.country}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{visitor.city}</span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {visitor.visits.toLocaleString()} 次访问
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
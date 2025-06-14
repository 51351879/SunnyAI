'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  excerpt: {
    zh: string;
    en: string;
  };
  coverImage: string;
  date: string;
  readTime: {
    zh: string;
    en: string;
  };
  category: string;
  tags: string[];
  slug: string;
  views: number;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const { language, t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title[language]}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">{t(`common.category.${post.category}`)}</Badge>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime[language]}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views} {t('blog.views')}
            </div>
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#17f700] transition-colors cursor-pointer line-clamp-2 min-h-[3.5rem]">
              {post.title[language]}
            </h3>
          </Link>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
            {post.excerpt[language]}
          </p>
          
          <div className="flex flex-wrap gap-2 min-h-[2rem]">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
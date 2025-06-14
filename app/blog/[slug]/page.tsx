'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Eye } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language, t } = useLanguage();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{t('blog.page.article.not.found')}</h1>
            <Link href="/blog">
              <Button>{t('blog.page.back')}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#17f700] hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blog.page.back')}
            </Link>

            <div className="mb-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={post.coverImage}
                alt={post.title[language]}
                className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                <Badge variant="secondary">{t(`common.category.${post.category}`)}</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{post.title[language]}</h1>
              <p className="text-xl text-muted-foreground mb-6">{post.excerpt[language]}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <div dangerouslySetInnerHTML={{ __html: post.content[language] }} />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
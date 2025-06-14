'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import SearchFilter from '@/components/SearchFilter';
import { blogPosts } from '@/data/blog';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { language, t } = useLanguage();

  const categories = ['all', 'tech', 'life', 'reading', 'thoughts', 'tutorial'];

  const handleFilter = (category: string, searchTerm: string) => {
    let filtered = blogPosts;
    
    if (category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t('blog.page.title')}<span className="text-[#17f700]">{t('blog.page.title.highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('blog.page.subtitle')}
            </p>
          </motion.div>

          <SearchFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onFilter={handleFilter}
          />

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-16"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground">{t('blog.page.not.found')}</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
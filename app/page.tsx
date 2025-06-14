'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProjectsPreview from '@/components/ProjectsPreview';
import BlogPreview from '@/components/BlogPreview';
import AchievementsPreview from '@/components/AchievementsPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <ProjectsPreview />
        <BlogPreview />
        <AchievementsPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
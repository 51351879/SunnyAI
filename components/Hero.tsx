'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Mouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [showMouseIndicator, setShowMouseIndicator] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowMouseIndicator(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Generate stars for background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 3;
      
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-background">
      {/* Starfield Background */}
      <div className="starfield">
        {generateStars()}
      </div>

      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#17f700]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#17f700]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            {t('hero.title.create')}
            <span className="block text-[#17f700] mt-2 gradient-text">{t('hero.title.digital')}</span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          {t('hero.subtitle')}
          <br />
          <span className="text-[#17f700]">{t('hero.subtitle.highlight')}</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button size="lg" className="bg-[#17f700] text-black hover:bg-[#17f700]/90 btn-glow">
            {t('hero.cta.portfolio')}
          </Button>
          <Button size="lg" variant="outline" className="border-[#17f700]/30 hover:border-[#17f700] hover:bg-[#17f700]/10">
            {t('hero.cta.about')}
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center space-x-6 mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-full bg-muted/20 hover:bg-[#17f700]/10 hover:text-[#17f700] transition-colors backdrop-blur-sm border border-[#17f700]/20"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-full bg-muted/20 hover:bg-[#17f700]/10 hover:text-[#17f700] transition-colors backdrop-blur-sm border border-[#17f700]/20"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:hello@jiejoe.com"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-full bg-muted/20 hover:bg-[#17f700]/10 hover:text-[#17f700] transition-colors backdrop-blur-sm border border-[#17f700]/20"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Mouse Scroll Indicator - Positioned at bottom edge */}
      {showMouseIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="mouse-indicator">
            <div className="w-6 h-10 border-2 border-[#17f700]/60 rounded-full relative">
              <div className="w-1 h-2 bg-[#17f700] rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
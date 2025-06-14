'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.achievements'), href: '/achievements' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/90 backdrop-blur-md border-b border-[#17f700]/20 shadow-lg shadow-[#17f700]/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-2xl font-bold">
              DEV<span className="text-[#17f700]">FOLIO</span>
            </Link>
          </motion.div>

          {/* Centered Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center justify-center flex-1"
          >
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-[#17f700] ${
                    isActive(item.href) ? 'text-[#17f700]' : 'text-foreground'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#17f700] shadow-sm shadow-[#17f700]"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Language Toggle - Desktop */}
          <div className="hidden md:flex items-center">
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-1 p-2 rounded-lg bg-muted/20 hover:bg-[#17f700]/10 transition-colors border border-[#17f700]/20 backdrop-blur-sm"
              >
                <Languages className="w-5 h-5 text-[#17f700]" />
                <span className="text-sm font-medium text-[#17f700]">
                  {language === 'zh' ? 'EN' : '中'}
                </span>
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-muted/20 hover:bg-[#17f700]/10 transition-colors border border-[#17f700]/20 backdrop-blur-sm"
          >
            {isOpen ? <X className="w-6 h-6 text-[#17f700]" /> : <Menu className="w-6 h-6 text-[#17f700]" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-[#17f700]/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-[#17f700] rounded-lg hover:bg-[#17f700]/10 ${
                    isActive(item.href) ? 'text-[#17f700] bg-[#17f700]/10' : 'text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {mounted && (
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-foreground hover:text-[#17f700] transition-colors rounded-lg hover:bg-[#17f700]/10 w-full"
                >
                  <Languages className="w-5 h-5" />
                  <span>{language === 'zh' ? 'English' : '中文'}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
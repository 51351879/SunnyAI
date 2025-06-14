'use client';

import { motion } from 'framer-motion';
import { Code, Coffee, Music, Mountain, Book, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'AI/ML', level: 70 },
  ];

  const interests = [
    { 
      icon: Code, 
      title: t('about.interests.programming'), 
      description: t('about.interests.programming.desc') 
    },
    { 
      icon: Book, 
      title: t('about.interests.reading'), 
      description: t('about.interests.reading.desc') 
    },
    { 
      icon: Coffee, 
      title: t('about.interests.coffee'), 
      description: t('about.interests.coffee.desc') 
    },
    { 
      icon: Music, 
      title: t('about.interests.music'), 
      description: t('about.interests.music.desc') 
    },
    { 
      icon: Mountain, 
      title: t('about.interests.outdoor'), 
      description: t('about.interests.outdoor.desc') 
    },
    { 
      icon: Heart, 
      title: t('about.interests.sharing'), 
      description: t('about.interests.sharing.desc') 
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t('about.title')}<span className="text-[#17f700]">{t('about.title.highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
                alt="About me"
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-6">{t('about.greeting')}</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>{t('about.intro.p1')}</p>
                <p>{t('about.intro.p2')}</p>
                <p>{t('about.intro.p3')}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{t('about.skills.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[#17f700]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.8 + 0.1 * index }}
                      className="bg-[#17f700] h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{t('about.interests.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <interest.icon className="w-12 h-12 text-[#17f700] mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
                    <p className="text-muted-foreground">{interest.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
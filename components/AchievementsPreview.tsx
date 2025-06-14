'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { achievements } from '@/data/achievements';
import { useLanguage } from '@/contexts/LanguageContext';

const AchievementsPreview = () => {
  const featuredAchievements = achievements.slice(0, 3);
  const { t, language } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'award':
        return Award;
      case 'certification':
        return Star;
      case 'achievement':
        return Trophy;
      default:
        return Award;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('achievements.title')}<span className="text-[#17f700]">{t('achievements.title.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('achievements.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAchievements.map((achievement, index) => {
            const IconComponent = getIcon(achievement.type);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="group p-6 text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#17f700]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#17f700]/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-[#17f700]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 min-h-[3.5rem] line-clamp-2 flex items-center justify-center">
                    {achievement.title[language]}
                  </h3>
                  <p className="text-muted-foreground mb-2 min-h-[1.5rem]">
                    {achievement.organization[language]}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[1.25rem]">
                    {achievement.date}
                  </p>
                  <p className="text-sm flex-1 min-h-[4rem] line-clamp-3">
                    {achievement.description[language]}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/achievements">
            <Button size="lg" variant="outline">
              {t('achievements.cta')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsPreview;
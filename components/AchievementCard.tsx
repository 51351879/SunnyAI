'use client';

import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Achievement {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  organization: {
    zh: string;
    en: string;
  };
  date: string;
  description: {
    zh: string;
    en: string;
  };
  type: 'award' | 'certification' | 'achievement' | 'honor';
  image?: string;
  credentialUrl?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  const { language, t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'award':
        return Award;
      case 'certification':
        return Star;
      case 'achievement':
        return Trophy;
      case 'honor':
        return Medal;
      default:
        return Award;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'award':
        return 'text-yellow-500';
      case 'certification':
        return 'text-blue-500';
      case 'achievement':
        return 'text-[#17f700]';
      case 'honor':
        return 'text-purple-500';
      default:
        return 'text-[#17f700]';
    }
  };

  const IconComponent = getIcon(achievement.type);
  const iconColor = getIconColor(achievement.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group p-6 text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {achievement.image ? (
          <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src={achievement.image}
              alt={achievement.title[language]}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-muted/80 transition-colors">
            <IconComponent className={`w-8 h-8 ${iconColor}`} />
          </div>
        )}
        
        <Badge variant="outline" className="mb-3 mx-auto">
          {achievement.type}
        </Badge>
        
        <h3 className="text-xl font-semibold mb-2 min-h-[3.5rem] line-clamp-2 flex items-center justify-center">
          {achievement.title[language]}
        </h3>
        <p className="text-muted-foreground font-medium mb-2 min-h-[1.5rem]">
          {achievement.organization[language]}
        </p>
        <p className="text-sm text-muted-foreground mb-4 min-h-[1.25rem]">
          {achievement.date}
        </p>
        <p className="text-sm flex-1 min-h-[4rem] line-clamp-3">
          {achievement.description[language]}
        </p>
        
        {achievement.credentialUrl && (
          <div className="mt-4">
            <a
              href={achievement.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17f700] hover:underline text-sm"
            >
              {t('achievements.view.credential')}
            </a>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default AchievementCard;
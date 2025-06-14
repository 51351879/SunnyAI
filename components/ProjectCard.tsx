'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  image: string;
  tags: string[];
  category: string;
  date: string;
  slug: string;
  githubUrl: string;
  demoUrl: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { language } = useLanguage();

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
            src={project.image}
            alt={project.title[language]}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary">{project.category}</Badge>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" variant="secondary" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            {project.date}
          </div>
          
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#17f700] transition-colors cursor-pointer min-h-[3.5rem] line-clamp-2">
              {project.title[language]}
            </h3>
          </Link>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
            {project.description[language]}
          </p>
          
          <div className="flex flex-wrap gap-2 min-h-[2rem]">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
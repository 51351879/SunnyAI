'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language, t } = useLanguage();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{t('projects.page.project.not.found')}</h1>
            <Link href="/projects">
              <Button>{t('projects.page.back')}</Button>
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
              href="/projects"
              className="inline-flex items-center text-[#17f700] hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('projects.page.back')}
            </Link>

            <div className="mb-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={project.image}
                alt={project.title[language]}
                className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
                <Badge variant="secondary">{project.category}</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title[language]}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.description[language]}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 mb-12">
                <Button asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('projects.view.demo')}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    {t('projects.source.code')}
                  </a>
                </Button>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <h2>{t('projects.page.overview')}</h2>
              <p>{project.overview[language]}</p>

              <h2>{t('projects.page.tech.stack')}</h2>
              <ul>
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <h2>{t('projects.page.features')}</h2>
              <ul>
                {project.features[language].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h2>{t('projects.page.challenges')}</h2>
              <p>{project.challenges[language]}</p>

              <h2>{t('projects.page.solutions')}</h2>
              <p>{project.solutions[language]}</p>

              <h2>{t('projects.page.results')}</h2>
              <p>{project.results[language]}</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
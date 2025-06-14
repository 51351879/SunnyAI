'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('contact.title')}<span className="text-[#17f700]">{t('contact.title.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                href="mailto:hello@jiejoe.com"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-[#17f700]/10 transition-colors"
              >
                <Mail className="w-8 h-8 text-[#17f700] mb-2" />
                <span className="font-medium">{t('contact.email')}</span>
                <span className="text-sm text-muted-foreground">hello@jiejoe.com</span>
              </motion.a>
              
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-[#17f700]/10 transition-colors"
              >
                <Github className="w-8 h-8 text-[#17f700] mb-2" />
                <span className="font-medium">GitHub</span>
                <span className="text-sm text-muted-foreground">{t('contact.github')}</span>
              </motion.a>
              
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-[#17f700]/10 transition-colors"
              >
                <Linkedin className="w-8 h-8 text-[#17f700] mb-2" />
                <span className="font-medium">LinkedIn</span>
                <span className="text-sm text-muted-foreground">{t('contact.linkedin')}</span>
              </motion.a>
            </div>
          </Card>

          <Link href="/contact">
            <Button size="lg" className="bg-[#17f700] text-black hover:bg-[#17f700]/90">
              {t('contact.cta')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
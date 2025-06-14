'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.page.email.title'),
      value: 'hello@jiejoe.com',
      href: 'mailto:hello@jiejoe.com',
    },
    {
      icon: Phone,
      title: t('contact.page.phone.title'),
      value: '+86 138-0000-0000',
      href: 'tel:+8613800000000',
    },
    {
      icon: MapPin,
      title: t('contact.page.location.title'),
      value: t('contact.page.location.value'),
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/jiejoe',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/jiejoe',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://twitter.com/jiejoe',
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
              {t('contact.page.title')}<span className="text-[#17f700]">{t('contact.page.title.highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.page.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8">{t('contact.page.start.conversation')}</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-[#17f700]/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-[#17f700]" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-muted-foreground hover:text-[#17f700] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">{t('contact.page.social.title')}</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-[#17f700]/10 hover:text-[#17f700] transition-colors"
                    >
                      <link.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.page.form.title')}</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.page.form.name')}
                      </label>
                      <Input placeholder={t('contact.page.form.name.placeholder')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.page.form.email')}
                      </label>
                      <Input type="email" placeholder={t('contact.page.form.email.placeholder')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.page.form.subject')}
                    </label>
                    <Input placeholder={t('contact.page.form.subject.placeholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.page.form.message')}
                    </label>
                    <Textarea 
                      placeholder={t('contact.page.form.message.placeholder')}
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-[#17f700] text-black hover:bg-[#17f700]/90">
                    {t('contact.page.form.send')}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
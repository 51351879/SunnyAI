'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type TranslationMap = {
  [key: string]: string;
  // Navigation
  'nav.home': string;
  'nav.projects': string;
  'nav.blog': string;
  'nav.achievements': string;
  'nav.about': string;
  'nav.contact': string;
  
  // Hero Section
  'hero.title.create': string;
  'hero.title.digital': string;
  'hero.subtitle': string;
  'hero.subtitle.highlight': string;
  'hero.cta.portfolio': string;
  'hero.cta.about': string;
  
  // Projects Section
  'projects.title': string;
  'projects.title.highlight': string;
  'projects.subtitle': string;
  'projects.cta': string;
  'projects.learn.more': string;
  'projects.view.demo': string;
  'projects.source.code': string;
  
  // Blog Section
  'blog.title': string;
  'blog.title.highlight': string;
  'blog.subtitle': string;
  'blog.cta': string;
  'blog.read.more': string;
  'blog.views': string;
  
  // Achievements Section
  'achievements.title': string;
  'achievements.title.highlight': string;
  'achievements.subtitle': string;
  'achievements.cta': string;
  'achievements.view.credential': string;
  
  // Contact Section
  'contact.title': string;
  'contact.title.highlight': string;
  'contact.subtitle': string;
  'contact.email': string;
  'contact.github': string;
  'contact.linkedin': string;
  'contact.cta': string;
  
  // Footer
  'footer.description': string;
  'footer.quick.links': string;
  'footer.contact': string;
  'footer.location': string;
  'footer.available': string;
  'footer.made.with': string;
  'footer.by': string;
  'footer.back.to.top': string;
  
  // About Page
  'about.title': string;
  'about.title.highlight': string;
  'about.subtitle': string;
  'about.greeting': string;
  'about.intro.p1': string;
  'about.intro.p2': string;
  'about.intro.p3': string;
  'about.skills.title': string;
  'about.interests.title': string;
  'about.interests.programming': string;
  'about.interests.programming.desc': string;
  'about.interests.reading': string;
  'about.interests.reading.desc': string;
  'about.interests.coffee': string;
  'about.interests.coffee.desc': string;
  'about.interests.music': string;
  'about.interests.music.desc': string;
  'about.interests.outdoor': string;
  'about.interests.outdoor.desc': string;
  'about.interests.sharing': string;
  'about.interests.sharing.desc': string;
  
  // Contact Page
  'contact.page.title': string;
  'contact.page.title.highlight': string;
  'contact.page.subtitle': string;
  'contact.page.start.conversation': string;
  'contact.page.email.title': string;
  'contact.page.phone.title': string;
  'contact.page.location.title': string;
  'contact.page.location.value': string;
  'contact.page.social.title': string;
  'contact.page.form.title': string;
  'contact.page.form.name': string;
  'contact.page.form.name.placeholder': string;
  'contact.page.form.email': string;
  'contact.page.form.email.placeholder': string;
  'contact.page.form.subject': string;
  'contact.page.form.subject.placeholder': string;
  'contact.page.form.message': string;
  'contact.page.form.message.placeholder': string;
  'contact.page.form.send': string;
  
  // Projects Page
  'projects.page.title': string;
  'projects.page.title.highlight': string;
  'projects.page.subtitle': string;
  'projects.page.not.found': string;
  'projects.page.back': string;
  'projects.page.project.not.found': string;
  'projects.page.overview': string;
  'projects.page.tech.stack': string;
  'projects.page.features': string;
  'projects.page.challenges': string;
  'projects.page.solutions': string;
  'projects.page.results': string;
  
  // Blog Page
  'blog.page.title': string;
  'blog.page.title.highlight': string;
  'blog.page.subtitle': string;
  'blog.page.not.found': string;
  'blog.page.back': string;
  'blog.page.article.not.found': string;
  
  // Achievements Page
  'achievements.page.title': string;
  'achievements.page.title.highlight': string;
  'achievements.page.subtitle': string;
  
  // Common
  'common.search.placeholder': string;
  'common.category.all': string;
  'common.category.web': string;
  'common.category.mobile': string;
  'common.category.ai': string;
  'common.category.blockchain': string;
  'common.category.design': string;
  'common.category.tech': string;
  'common.category.life': string;
  'common.category.reading': string;
  'common.category.thoughts': string;
  'common.category.tutorial': string;
  'common.read.time': string;
  'common.date': string;
  'common.views': string;
};

const translations: Record<Language, TranslationMap> = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.blog': '思考',
    'nav.achievements': '成就',
    'nav.about': '关于',
    'nav.contact': '联系',
    
    // Hero Section
    'hero.title.create': '创造',
    'hero.title.digital': '数字未来',
    'hero.subtitle': '我是一名全栈开发者，专注于构建创新的数字产品和解决方案。',
    'hero.subtitle.highlight': '通过技术改变世界，用代码书写未来。',
    'hero.cta.portfolio': '查看我的作品',
    'hero.cta.about': '了解更多',
    
    // Projects Section
    'projects.title': '精选',
    'projects.title.highlight': '项目',
    'projects.subtitle': '展示我最引以为豪的技术项目，从概念到实现的完整过程',
    'projects.cta': '查看所有项目',
    'projects.learn.more': '了解更多',
    'projects.view.demo': '查看演示',
    'projects.source.code': '源代码',
    
    // Blog Section
    'blog.title': '最新',
    'blog.title.highlight': '思考',
    'blog.subtitle': '分享我在技术学习和生活思考中的收获与感悟',
    'blog.cta': '查看所有文章',
    'blog.read.more': '阅读全文',
    'blog.views': '次阅读',
    
    // Achievements Section
    'achievements.title': '个人',
    'achievements.title.highlight': '成就',
    'achievements.subtitle': '记录我在技术领域和个人发展中获得的认可与里程碑',
    'achievements.cta': '查看所有成就',
    'achievements.view.credential': '查看证书',
    
    // Contact Section
    'contact.title': '让我们',
    'contact.title.highlight': '合作',
    'contact.subtitle': '有想法要实现？项目需要合作？或者只是想聊聊技术，随时联系我',
    'contact.email': '邮箱联系',
    'contact.github': '查看代码',
    'contact.linkedin': '专业网络',
    'contact.cta': '详细联系方式',
    
    // Footer
    'footer.description': '一名充满激情的全栈开发者，专注于创建有意义的数字体验。通过技术改变世界，用代码书写未来。',
    'footer.quick.links': '快速链接',
    'footer.contact': '联系方式',
    'footer.location': '中国 · 深圳',
    'footer.available': '随时欢迎合作',
    'footer.made.with': '用',
    'footer.by': '制作于',
    'footer.back.to.top': '回到顶部',
    
    // About Page
    'about.title': '关于',
    'about.title.highlight': '我',
    'about.subtitle': '一个热爱技术、追求创新、享受生活的全栈开发者',
    'about.greeting': '你好，我是JIEJOE',
    'about.intro.p1': '我是一名充满激情的全栈开发者，专注于创建有意义的数字体验。从前端的用户界面到后端的系统架构，我喜欢在技术的各个层面探索和创新。',
    'about.intro.p2': '在过去的几年里，我参与了多个项目的开发，涵盖Web应用、移动应用、人工智能和区块链等领域。我相信技术的力量能够改变世界，也致力于通过自己的代码为用户创造价值。',
    'about.intro.p3': '除了编程，我还热衷于学习新知识、分享经验，以及探索生活的美好。我认为保持好奇心和终身学习的态度是成为优秀开发者的关键。',
    'about.skills.title': '技能水平',
    'about.interests.title': '兴趣爱好',
    'about.interests.programming': '编程',
    'about.interests.programming.desc': '热衷于探索新技术和解决复杂问题',
    'about.interests.reading': '阅读',
    'about.interests.reading.desc': '喜欢阅读技术书籍和哲学思辨',
    'about.interests.coffee': '咖啡',
    'about.interests.coffee.desc': '咖啡爱好者，享受手冲的宁静时光',
    'about.interests.music': '音乐',
    'about.interests.music.desc': '音乐是创作灵感的重要来源',
    'about.interests.outdoor': '户外',
    'about.interests.outdoor.desc': '徒步和登山让我保持身心平衡',
    'about.interests.sharing': '分享',
    'about.interests.sharing.desc': '乐于分享知识和帮助他人成长',
    
    // Contact Page
    'contact.page.title': '联系',
    'contact.page.title.highlight': '我',
    'contact.page.subtitle': '有想法要分享？项目合作？或者只是想聊聊技术，随时联系我',
    'contact.page.start.conversation': '让我们开始对话',
    'contact.page.email.title': '邮箱',
    'contact.page.phone.title': '电话',
    'contact.page.location.title': '位置',
    'contact.page.location.value': '中国 · 深圳',
    'contact.page.social.title': '关注我的社交媒体',
    'contact.page.form.title': '发送消息',
    'contact.page.form.name': '姓名',
    'contact.page.form.name.placeholder': '您的姓名',
    'contact.page.form.email': '邮箱',
    'contact.page.form.email.placeholder': 'your@email.com',
    'contact.page.form.subject': '主题',
    'contact.page.form.subject.placeholder': '消息主题',
    'contact.page.form.message': '消息内容',
    'contact.page.form.message.placeholder': '请输入您想说的话...',
    'contact.page.form.send': '发送消息',
    
    // Projects Page
    'projects.page.title': '我的',
    'projects.page.title.highlight': '项目',
    'projects.page.subtitle': '展示我在技术领域的探索与创新，从Web开发到AI应用的完整项目集合',
    'projects.page.not.found': '没有找到匹配的项目',
    'projects.page.back': '返回项目列表',
    'projects.page.project.not.found': '项目未找到',
    'projects.page.overview': '项目概述',
    'projects.page.tech.stack': '技术栈',
    'projects.page.features': '主要功能',
    'projects.page.challenges': '开发挑战',
    'projects.page.solutions': '解决方案',
    'projects.page.results': '项目成果',
    
    // Blog Page
    'blog.page.title': '思考',
    'blog.page.title.highlight': '日志',
    'blog.page.subtitle': '记录我的思考过程、学习心得和对技术与生活的感悟',
    'blog.page.not.found': '没有找到匹配的文章',
    'blog.page.back': '返回博客列表',
    'blog.page.article.not.found': '文章未找到',
    
    // Achievements Page
    'achievements.page.title': '个人',
    'achievements.page.title.highlight': '成就',
    'achievements.page.subtitle': '记录我在技术领域和个人发展中获得的认可与成就',
    
    // Common
    'common.search.placeholder': '搜索...',
    'common.category.all': '全部',
    'common.category.web': 'Web开发',
    'common.category.mobile': '移动应用',
    'common.category.ai': '人工智能',
    'common.category.blockchain': '区块链',
    'common.category.design': '设计',
    'common.category.tech': '技术',
    'common.category.life': '生活',
    'common.category.reading': '读书',
    'common.category.thoughts': '思考',
    'common.category.tutorial': '教程',
    'common.read.time': '分钟',
    'common.date': '日期',
    'common.views': '浏览量',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.achievements': 'Achievements',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title.create': 'Creating',
    'hero.title.digital': 'Digital Future',
    'hero.subtitle': 'I am a full-stack developer focused on building innovative digital products and solutions.',
    'hero.subtitle.highlight': 'Changing the world through technology, writing the future with code.',
    'hero.cta.portfolio': 'View My Work',
    'hero.cta.about': 'Learn More',
    
    // Projects Section
    'projects.title': 'Featured',
    'projects.title.highlight': 'Projects',
    'projects.subtitle': 'Showcasing my most proud technical projects, from concept to implementation',
    'projects.cta': 'View All Projects',
    'projects.learn.more': 'Learn More',
    'projects.view.demo': 'View Demo',
    'projects.source.code': 'Source Code',
    
    // Blog Section
    'blog.title': 'Latest',
    'blog.title.highlight': 'Thoughts',
    'blog.subtitle': 'Sharing my insights and reflections on technology learning and life experiences',
    'blog.cta': 'View All Articles',
    'blog.read.more': 'Read More',
    'blog.views': 'views',
    
    // Achievements Section
    'achievements.title': 'Personal',
    'achievements.title.highlight': 'Achievements',
    'achievements.subtitle': 'Recording the recognition and milestones I have achieved in technology and personal development',
    'achievements.cta': 'View All Achievements',
    'achievements.view.credential': 'View Credential',
    
    // Contact Section
    'contact.title': "Let's",
    'contact.title.highlight': 'Collaborate',
    'contact.subtitle': 'Have an idea to implement? Need project collaboration? Or just want to chat about technology, feel free to contact me',
    'contact.email': 'Email Contact',
    'contact.github': 'View Code',
    'contact.linkedin': 'Professional Network',
    'contact.cta': 'Detailed Contact Info',
    
    // Footer
    'footer.description': 'A passionate full-stack developer focused on creating meaningful digital experiences. Changing the world through technology, writing the future with code.',
    'footer.quick.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.location': 'China · Shenzhen',
    'footer.available': 'Available for collaboration',
    'footer.made.with': 'Made with',
    'footer.by': 'by',
    'footer.back.to.top': 'Back to Top',
    
    // About Page
    'about.title': 'About',
    'about.title.highlight': 'Me',
    'about.subtitle': 'A full-stack developer who loves technology, pursues innovation, and enjoys life',
    'about.greeting': 'Hello, I am JIEJOE',
    'about.intro.p1': 'I am a passionate full-stack developer focused on creating meaningful digital experiences. From frontend user interfaces to backend system architecture, I enjoy exploring and innovating at all levels of technology.',
    'about.intro.p2': 'Over the past few years, I have participated in the development of multiple projects, covering web applications, mobile applications, artificial intelligence, and blockchain. I believe in the power of technology to change the world and am committed to creating value for users through my code.',
    'about.intro.p3': 'Besides programming, I am also passionate about learning new knowledge, sharing experiences, and exploring the beauty of life. I believe that maintaining curiosity and a lifelong learning attitude is key to becoming an excellent developer.',
    'about.skills.title': 'Skill Level',
    'about.interests.title': 'Interests & Hobbies',
    'about.interests.programming': 'Programming',
    'about.interests.programming.desc': 'Passionate about exploring new technologies and solving complex problems',
    'about.interests.reading': 'Reading',
    'about.interests.reading.desc': 'Enjoy reading technical books and philosophical thinking',
    'about.interests.coffee': 'Coffee',
    'about.interests.coffee.desc': 'Coffee enthusiast, enjoying the peaceful moments of hand brewing',
    'about.interests.music': 'Music',
    'about.interests.music.desc': 'Music is an important source of creative inspiration',
    'about.interests.outdoor': 'Outdoor',
    'about.interests.outdoor.desc': 'Hiking and mountaineering help me maintain physical and mental balance',
    'about.interests.sharing': 'Sharing',
    'about.interests.sharing.desc': 'Happy to share knowledge and help others grow',
    
    // Contact Page
    'contact.page.title': 'Contact',
    'contact.page.title.highlight': 'Me',
    'contact.page.subtitle': 'Have ideas to share? Project collaboration? Or just want to chat about technology, feel free to contact me',
    'contact.page.start.conversation': "Let's Start a Conversation",
    'contact.page.email.title': 'Email',
    'contact.page.phone.title': 'Phone',
    'contact.page.location.title': 'Location',
    'contact.page.location.value': 'China · Shenzhen',
    'contact.page.social.title': 'Follow My Social Media',
    'contact.page.form.title': 'Send Message',
    'contact.page.form.name': 'Name',
    'contact.page.form.name.placeholder': 'Your Name',
    'contact.page.form.email': 'Email',
    'contact.page.form.email.placeholder': 'your@email.com',
    'contact.page.form.subject': 'Subject',
    'contact.page.form.subject.placeholder': 'Message Subject',
    'contact.page.form.message': 'Message',
    'contact.page.form.message.placeholder': 'Please enter what you want to say...',
    'contact.page.form.send': 'Send Message',
    
    // Projects Page
    'projects.page.title': 'My',
    'projects.page.title.highlight': 'Projects',
    'projects.page.subtitle': 'Showcasing my exploration and innovation in the technology field, a complete collection of projects from web development to AI applications',
    'projects.page.not.found': 'No matching projects found',
    'projects.page.back': 'Back to Projects',
    'projects.page.project.not.found': 'Project Not Found',
    'projects.page.overview': 'Project Overview',
    'projects.page.tech.stack': 'Technology Stack',
    'projects.page.features': 'Key Features',
    'projects.page.challenges': 'Development Challenges',
    'projects.page.solutions': 'Solutions',
    'projects.page.results': 'Project Results',
    
    // Blog Page
    'blog.page.title': 'Thought',
    'blog.page.title.highlight': 'Journal',
    'blog.page.subtitle': 'Recording my thought processes, learning insights, and reflections on technology and life',
    'blog.page.not.found': 'No matching articles found',
    'blog.page.back': 'Back to Blog',
    'blog.page.article.not.found': 'Article Not Found',
    
    // Achievements Page
    'achievements.page.title': 'Personal',
    'achievements.page.title.highlight': 'Achievements',
    'achievements.page.subtitle': 'Recording the recognition and achievements I have gained in the technology field and personal development',
    
    // Common
    'common.search.placeholder': 'Search...',
    'common.category.all': 'All',
    'common.category.web': 'Web Development',
    'common.category.mobile': 'Mobile Apps',
    'common.category.ai': 'Artificial Intelligence',
    'common.category.blockchain': 'Blockchain',
    'common.category.design': 'Design',
    'common.category.tech': 'Technology',
    'common.category.life': 'Life',
    'common.category.reading': 'Reading',
    'common.category.thoughts': 'Thoughts',
    'common.category.tutorial': 'Tutorial',
    'common.read.time': 'min read',
    'common.date': 'Date',
    'common.views': 'views',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
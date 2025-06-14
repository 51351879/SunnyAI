export const blogPosts = [
  {
    id: '1',
    title: {
      zh: '深入理解React 18的新特性',
      en: 'Deep Dive into React 18 New Features'
    },
    excerpt: {
      zh: '探索React 18带来的并发特性、Suspense改进和新的Hook，以及它们如何改变我们构建用户界面的方式。',
      en: 'Exploring React 18\'s concurrent features, Suspense improvements, and new Hooks, and how they change the way we build user interfaces.'
    },
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    date: '2024-03-15',
    readTime: {
      zh: '8分钟',
      en: '8 min read'
    },
    category: 'tech',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    slug: 'react-18-new-features',
    views: 1247,
    content: {
      zh: `
        <h2>React 18的革命性变化</h2>
        <p>React 18是React生态系统中的一个重要里程碑，它引入了许多令人兴奋的新特性...</p>
        
        <h3>并发特性</h3>
        <p>并发渲染是React 18最重要的新特性之一。它允许React在渲染过程中暂停、恢复或放弃渲染...</p>
        
        <h3>Suspense的改进</h3>
        <p>Suspense组件在React 18中得到了显著改进，现在支持服务端渲染...</p>
        
        <h3>新的Hook</h3>
        <p>React 18引入了一些新的Hook，如useId、useDeferredValue和useTransition...</p>
      `,
      en: `
        <h2>Revolutionary Changes in React 18</h2>
        <p>React 18 is an important milestone in the React ecosystem, introducing many exciting new features...</p>
        
        <h3>Concurrent Features</h3>
        <p>Concurrent rendering is one of the most important new features in React 18. It allows React to pause, resume, or abandon rendering during the process...</p>
        
        <h3>Suspense Improvements</h3>
        <p>The Suspense component has been significantly improved in React 18, now supporting server-side rendering...</p>
        
        <h3>New Hooks</h3>
        <p>React 18 introduces some new Hooks, such as useId, useDeferredValue, and useTransition...</p>
      `
    }
  },
  {
    id: '2',
    title: {
      zh: '我的全栈开发学习之路',
      en: 'My Full-Stack Development Learning Journey'
    },
    excerpt: {
      zh: '分享我从前端转向全栈开发的经历，包括学习路径、遇到的挑战和收获的经验。',
      en: 'Sharing my experience transitioning from frontend to full-stack development, including learning paths, challenges encountered, and lessons learned.'
    },
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    date: '2024-03-10',
    readTime: {
      zh: '12分钟',
      en: '12 min read'
    },
    category: 'life',
    tags: ['Career', 'Learning', 'Full Stack', 'Personal Growth'],
    slug: 'fullstack-learning-journey',
    views: 892,
    content: {
      zh: `
        <h2>从前端到全栈的转变</h2>
        <p>回顾我的开发生涯，从最初只会写HTML/CSS到现在能够独立开发完整的Web应用...</p>
        
        <h3>学习路径</h3>
        <p>我的学习路径并不是线性的，而是螺旋式上升的过程...</p>
        
        <h3>技术栈的选择</h3>
        <p>在选择技术栈时，我考虑了市场需求、学习曲线和个人兴趣...</p>
      `,
      en: `
        <h2>Transition from Frontend to Full-Stack</h2>
        <p>Looking back at my development career, from initially only knowing HTML/CSS to now being able to independently develop complete web applications...</p>
        
        <h3>Learning Path</h3>
        <p>My learning path was not linear, but rather a spiral upward process...</p>
        
        <h3>Technology Stack Selection</h3>
        <p>When choosing technology stacks, I considered market demand, learning curve, and personal interests...</p>
      `
    }
  },
  {
    id: '3',
    title: {
      zh: '《代码大全》读后感',
      en: 'Code Complete Book Review'
    },
    excerpt: {
      zh: '这本经典的软件开发著作给我带来了深刻的思考，关于代码质量、软件工程和专业素养。',
      en: 'This classic software development book brought me profound thoughts about code quality, software engineering, and professional competence.'
    },
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    date: '2024-03-05',
    readTime: {
      zh: '6分钟',
      en: '6 min read'
    },
    category: 'reading',
    tags: ['Books', 'Software Engineering', 'Code Quality', 'Professional Development'],
    slug: 'code-complete-review',
    views: 654,
    content: {
      zh: `
        <h2>软件开发的艺术与科学</h2>
        <p>《代码大全》这本书让我重新思考了什么是优秀的代码...</p>
        
        <h3>代码质量的重要性</h3>
        <p>作者强调，代码不仅仅是给机器看的，更重要的是给人看的...</p>
        
        <h3>软件构建的最佳实践</h3>
        <p>书中介绍了许多实用的编程技巧和最佳实践...</p>
      `,
      en: `
        <h2>The Art and Science of Software Development</h2>
        <p>The book "Code Complete" made me rethink what constitutes excellent code...</p>
        
        <h3>The Importance of Code Quality</h3>
        <p>The author emphasizes that code is not just for machines to read, but more importantly for humans to read...</p>
        
        <h3>Best Practices in Software Construction</h3>
        <p>The book introduces many practical programming techniques and best practices...</p>
      `
    }
  },
  {
    id: '4',
    title: {
      zh: 'Next.js 14性能优化实践',
      en: 'Next.js 14 Performance Optimization Practices'
    },
    excerpt: {
      zh: '详细介绍在Next.js 14项目中实施的性能优化策略，包括图片优化、代码分割和缓存策略。',
      en: 'Detailed introduction to performance optimization strategies implemented in Next.js 14 projects, including image optimization, code splitting, and caching strategies.'
    },
    coverImage: 'https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg',
    date: '2024-02-28',
    readTime: {
      zh: '10分钟',
      en: '10 min read'
    },
    category: 'tech',
    tags: ['Next.js', 'Performance', 'Optimization', 'Web Development'],
    slug: 'nextjs-14-performance-optimization',
    views: 1156,
    content: {
      zh: `
        <h2>Next.js 14的性能优化之道</h2>
        <p>在现代Web开发中，性能优化是一个永恒的话题...</p>
        
        <h3>图片优化</h3>
        <p>Next.js 14的Image组件提供了强大的图片优化功能...</p>
        
        <h3>代码分割策略</h3>
        <p>合理的代码分割可以显著提升应用的加载速度...</p>
      `,
      en: `
        <h2>The Path to Next.js 14 Performance Optimization</h2>
        <p>In modern web development, performance optimization is an eternal topic...</p>
        
        <h3>Image Optimization</h3>
        <p>Next.js 14's Image component provides powerful image optimization features...</p>
        
        <h3>Code Splitting Strategies</h3>
        <p>Proper code splitting can significantly improve application loading speed...</p>
      `
    }
  },
  {
    id: '5',
    title: {
      zh: '思考：技术与人文的平衡',
      en: 'Reflection: Balancing Technology and Humanities'
    },
    excerpt: {
      zh: '在技术快速发展的时代，如何在追求技术卓越的同时保持人文关怀和哲学思考。',
      en: 'In an era of rapid technological development, how to maintain humanistic care and philosophical thinking while pursuing technical excellence.'
    },
    coverImage: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg',
    date: '2024-02-20',
    readTime: {
      zh: '7分钟',
      en: '7 min read'
    },
    category: 'thoughts',
    tags: ['Philosophy', 'Technology', 'Humanities', 'Reflection'],
    slug: 'tech-humanities-balance',
    views: 723,
    content: {
      zh: `
        <h2>技术人的人文修养</h2>
        <p>作为一名程序员，我经常思考技术与人文之间的关系...</p>
        
        <h3>技术的双刃剑</h3>
        <p>技术为我们带来便利的同时，也带来了新的挑战...</p>
        
        <h3>保持初心</h3>
        <p>在技术的浪潮中，我们需要时刻提醒自己为什么开始...</p>
      `,
      en: `
        <h2>Humanistic Cultivation for Technologists</h2>
        <p>As a programmer, I often think about the relationship between technology and humanities...</p>
        
        <h3>The Double-Edged Sword of Technology</h3>
        <p>While technology brings us convenience, it also brings new challenges...</p>
        
        <h3>Staying True to Our Original Intentions</h3>
        <p>In the wave of technology, we need to constantly remind ourselves why we started...</p>
      `
    }
  },
  {
    id: '6',
    title: {
      zh: 'TypeScript最佳实践指南',
      en: 'TypeScript Best Practices Guide'
    },
    excerpt: {
      zh: '总结在大型项目中使用TypeScript的经验，包括类型设计、性能优化和团队协作。',
      en: 'Summarizing experience using TypeScript in large projects, including type design, performance optimization, and team collaboration.'
    },
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    date: '2024-02-15',
    readTime: {
      zh: '15分钟',
      en: '15 min read'
    },
    category: 'tutorial',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Team Work'],
    slug: 'typescript-best-practices',
    views: 1834,
    content: {
      zh: `
        <h2>TypeScript在企业级项目中的应用</h2>
        <p>TypeScript已经成为现代JavaScript开发的标准...</p>
        
        <h3>类型设计原则</h3>
        <p>良好的类型设计是TypeScript项目成功的关键...</p>
        
        <h3>性能考虑</h3>
        <p>在大型项目中，TypeScript的编译性能变得尤为重要...</p>
      `,
      en: `
        <h2>TypeScript in Enterprise Projects</h2>
        <p>TypeScript has become the standard for modern JavaScript development...</p>
        
        <h3>Type Design Principles</h3>
        <p>Good type design is key to the success of TypeScript projects...</p>
        
        <h3>Performance Considerations</h3>
        <p>In large projects, TypeScript compilation performance becomes particularly important...</p>
      `
    }
  }
];
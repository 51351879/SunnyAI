export const projects = [
  {
    id: '1',
    title: {
      zh: 'AI智能聊天助手',
      en: 'AI Smart Chat Assistant'
    },
    description: {
      zh: '基于GPT的智能对话系统，支持多轮对话和上下文理解',
      en: 'GPT-based intelligent dialogue system with multi-turn conversation and context understanding'
    },
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    tags: ['React', 'Node.js', 'OpenAI API', 'WebSocket', 'MongoDB'],
    category: 'ai',
    date: '2024-03',
    slug: 'ai-chat-assistant',
    githubUrl: 'https://github.com/jiejoe/ai-chat-assistant',
    demoUrl: 'https://ai-chat-demo.com',
    overview: {
      zh: '这是一个基于最新GPT技术的智能聊天助手，能够进行自然流畅的对话，理解上下文，并提供有价值的信息和建议。',
      en: 'This is an intelligent chat assistant based on the latest GPT technology, capable of natural and fluent conversations, understanding context, and providing valuable information and suggestions.'
    },
    technologies: ['React 18', 'Node.js', 'Express', 'OpenAI GPT-4', 'WebSocket', 'MongoDB', 'Redis', 'Docker'],
    features: {
      zh: [
        '实时对话功能',
        '上下文记忆能力',
        '多语言支持',
        '个性化设置',
        '对话历史记录',
        '智能建议功能'
      ],
      en: [
        'Real-time conversation functionality',
        'Context memory capability',
        'Multi-language support',
        'Personalized settings',
        'Conversation history',
        'Intelligent suggestion features'
      ]
    },
    challenges: {
      zh: '主要挑战在于如何有效管理对话上下文、控制API调用成本，以及确保响应速度。',
      en: 'The main challenges were effectively managing conversation context, controlling API call costs, and ensuring response speed.'
    },
    solutions: {
      zh: '通过实现智能的上下文截断算法、缓存机制和异步处理来解决这些问题。',
      en: 'These problems were solved by implementing intelligent context truncation algorithms, caching mechanisms, and asynchronous processing.'
    },
    results: {
      zh: '成功部署后，用户满意度达到95%，平均响应时间控制在2秒以内。',
      en: 'After successful deployment, user satisfaction reached 95%, with average response time controlled within 2 seconds.'
    }
  },
  {
    id: '2',
    title: {
      zh: '全栈电商平台',
      en: 'Full-Stack E-commerce Platform'
    },
    description: {
      zh: '现代化的电商解决方案，包含用户管理、支付集成和库存管理',
      en: 'Modern e-commerce solution with user management, payment integration, and inventory management'
    },
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    category: 'web',
    date: '2024-02',
    slug: 'fullstack-ecommerce',
    githubUrl: 'https://github.com/jiejoe/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.com',
    overview: {
      zh: '一个功能完整的电商平台，包含商品展示、购物车、支付处理、订单管理等核心功能。',
      en: 'A fully functional e-commerce platform with product display, shopping cart, payment processing, order management, and other core features.'
    },
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma ORM', 'NextAuth.js'],
    features: {
      zh: [
        '响应式商品展示',
        '购物车功能',
        'Stripe支付集成',
        '用户认证系统',
        '订单管理',
        '库存管理',
        '管理员后台'
      ],
      en: [
        'Responsive product display',
        'Shopping cart functionality',
        'Stripe payment integration',
        'User authentication system',
        'Order management',
        'Inventory management',
        'Admin dashboard'
      ]
    },
    challenges: {
      zh: '如何设计可扩展的数据库架构，以及处理高并发的支付请求。',
      en: 'How to design a scalable database architecture and handle high-concurrency payment requests.'
    },
    solutions: {
      zh: '采用了微服务架构思想，使用队列处理支付请求，并实现了乐观锁来处理库存并发问题。',
      en: 'Adopted microservice architecture concepts, used queues to process payment requests, and implemented optimistic locking to handle inventory concurrency issues.'
    },
    results: {
      zh: '平台支持日均1000+订单处理，支付成功率达到99.5%。',
      en: 'The platform supports 1000+ daily order processing with a payment success rate of 99.5%.'
    }
  },
  {
    id: '3',
    title: {
      zh: 'React Native健身应用',
      en: 'React Native Fitness App'
    },
    description: {
      zh: '跨平台移动健身应用，包含运动追踪和社交功能',
      en: 'Cross-platform mobile fitness app with exercise tracking and social features'
    },
    image: 'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg',
    tags: ['React Native', 'Expo', 'Firebase', 'Redux', 'Charts'],
    category: 'mobile',
    date: '2024-01',
    slug: 'fitness-tracker-app',
    githubUrl: 'https://github.com/jiejoe/fitness-tracker',
    demoUrl: 'https://fitness-app-demo.com',
    overview: {
      zh: '一款专注于用户体验的健身追踪应用，帮助用户记录运动数据、制定健身计划并与朋友分享进度。',
      en: 'A user experience-focused fitness tracking app that helps users record exercise data, create fitness plans, and share progress with friends.'
    },
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux Toolkit', 'React Navigation', 'Chart.js'],
    features: {
      zh: [
        '运动数据追踪',
        '个性化健身计划',
        '社交分享功能',
        '数据可视化',
        '离线数据同步',
        '推送通知'
      ],
      en: [
        'Exercise data tracking',
        'Personalized fitness plans',
        'Social sharing features',
        'Data visualization',
        'Offline data synchronization',
        'Push notifications'
      ]
    },
    challenges: {
      zh: '如何在不同设备间保持一致的用户体验，以及处理大量的实时数据同步。',
      en: 'How to maintain consistent user experience across different devices and handle large amounts of real-time data synchronization.'
    },
    solutions: {
      zh: '使用了原生模块优化性能，实现了增量同步算法来减少数据传输量。',
      en: 'Used native modules to optimize performance and implemented incremental synchronization algorithms to reduce data transmission.'
    },
    results: {
      zh: '应用在App Store获得4.8星评分，日活跃用户超过5000人。',
      en: 'The app received a 4.8-star rating on the App Store with over 5000 daily active users.'
    }
  },
  {
    id: '4',
    title: {
      zh: 'DeFi收益聚合器',
      en: 'DeFi Yield Aggregator'
    },
    description: {
      zh: '去中心化金融协议，自动寻找最优收益策略',
      en: 'Decentralized finance protocol that automatically finds optimal yield strategies'
    },
    image: 'https://images.pexels.com/photos/8358165/pexels-photo-8358165.jpeg',
    tags: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'DeFi'],
    category: 'blockchain',
    date: '2023-12',
    slug: 'defi-yield-aggregator',
    githubUrl: 'https://github.com/jiejoe/defi-aggregator',
    demoUrl: 'https://defi-demo.com',
    overview: {
      zh: '一个智能的DeFi收益聚合器，通过算法自动寻找和切换到最优的收益策略。',
      en: 'An intelligent DeFi yield aggregator that automatically finds and switches to optimal yield strategies through algorithms.'
    },
    technologies: ['Solidity', 'Hardhat', 'Web3.js', 'React', 'ethers.js', 'The Graph'],
    features: {
      zh: [
        '智能合约自动执行',
        '多协议收益比较',
        '自动资金重新分配',
        '收益历史追踪',
        '风险评估系统',
        'Gas费优化'
      ],
      en: [
        'Smart contract automation',
        'Multi-protocol yield comparison',
        'Automatic fund reallocation',
        'Yield history tracking',
        'Risk assessment system',
        'Gas fee optimization'
      ]
    },
    challenges: {
      zh: '如何在保证安全性的同时实现高效的资金管理和策略切换。',
      en: 'How to achieve efficient fund management and strategy switching while ensuring security.'
    },
    solutions: {
      zh: '实现了多重安全检查机制，使用了时间锁和多签验证，并优化了合约执行逻辑。',
      en: 'Implemented multiple security check mechanisms, used time locks and multi-signature verification, and optimized contract execution logic.'
    },
    results: {
      zh: '合约管理资金超过100万美元，平均年化收益率提升15%。',
      en: 'The contract manages over $1 million in funds with an average annual yield increase of 15%.'
    }
  },
  {
    id: '5',
    title: {
      zh: '在线协作白板',
      en: 'Online Collaborative Whiteboard'
    },
    description: {
      zh: '实时协作的数字白板工具，支持多人同时编辑',
      en: 'Real-time collaborative digital whiteboard tool supporting multi-user editing'
    },
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    tags: ['React', 'Socket.io', 'Canvas API', 'Node.js', 'Redis'],
    category: 'web',
    date: '2023-11',
    slug: 'collaborative-whiteboard',
    githubUrl: 'https://github.com/jiejoe/collaborative-whiteboard',
    demoUrl: 'https://whiteboard-demo.com',
    overview: {
      zh: '一个支持实时协作的数字白板，让团队可以在同一画布上进行头脑风暴和创意讨论。',
      en: 'A real-time collaborative digital whiteboard that allows teams to brainstorm and discuss ideas on the same canvas.'
    },
    technologies: ['React', 'Socket.io', 'Canvas API', 'Node.js', 'Express', 'Redis', 'MongoDB'],
    features: {
      zh: [
        '实时多人协作',
        '丰富的绘图工具',
        '图形和文本支持',
        '无限画布',
        '版本历史记录',
        '导出功能'
      ],
      en: [
        'Real-time multi-user collaboration',
        'Rich drawing tools',
        'Graphics and text support',
        'Infinite canvas',
        'Version history',
        'Export functionality'
      ]
    },
    challenges: {
      zh: '如何处理高频的实时数据同步，以及确保绘图操作的顺序一致性。',
      en: 'How to handle high-frequency real-time data synchronization and ensure sequential consistency of drawing operations.'
    },
    solutions: {
      zh: '实现了操作变换算法(OT)来处理并发编辑冲突，使用了防抖和节流来优化性能。',
      en: 'Implemented Operational Transformation (OT) algorithms to handle concurrent editing conflicts, and used debouncing and throttling to optimize performance.'
    },
    results: {
      zh: '支持同时100+用户协作，操作延迟控制在50ms以内。',
      en: 'Supports 100+ simultaneous users with operation latency controlled within 50ms.'
    }
  },
  {
    id: '6',
    title: {
      zh: '智能图片编辑器',
      en: 'AI Image Editor'
    },
    description: {
      zh: '基于AI的图片编辑工具，支持智能抠图和风格转换',
      en: 'AI-based image editing tool with intelligent background removal and style transfer'
    },
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'React'],
    category: 'ai',
    date: '2023-10',
    slug: 'ai-image-editor',
    githubUrl: 'https://github.com/jiejoe/ai-image-editor',
    demoUrl: 'https://image-editor-demo.com',
    overview: {
      zh: '结合人工智能技术的图片编辑器，提供智能抠图、风格转换等高级功能。',
      en: 'An image editor combining artificial intelligence technology, providing advanced features like intelligent background removal and style transfer.'
    },
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'React', 'PIL', 'NumPy'],
    features: {
      zh: [
        '智能背景移除',
        '艺术风格转换',
        '人像美化',
        '批量处理',
        '高清图片放大',
        'AI修复功能'
      ],
      en: [
        'Intelligent background removal',
        'Artistic style transfer',
        'Portrait enhancement',
        'Batch processing',
        'HD image upscaling',
        'AI repair functionality'
      ]
    },
    challenges: {
      zh: '如何平衡处理质量和速度，以及处理大尺寸图片的内存管理。',
      en: 'How to balance processing quality and speed, and manage memory for large-sized images.'
    },
    solutions: {
      zh: '使用了模型量化技术提升推理速度，实现了分块处理来支持大图片编辑。',
      en: 'Used model quantization techniques to improve inference speed and implemented chunk processing to support large image editing.'
    },
    results: {
      zh: '处理速度比传统方法提升3倍，用户满意度达到92%。',
      en: 'Processing speed improved 3x compared to traditional methods, with user satisfaction reaching 92%.'
    }
  }
];
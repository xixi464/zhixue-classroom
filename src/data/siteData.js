const TTI_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image'

const image = (prompt, size = 'landscape_16_9') =>
  `${TTI_BASE}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

export const userInfo = {
  name: '林晓',
  level: '成长会员',
  avatar: image(
    'professional friendly young asian woman developer avatar portrait, soft studio lighting, clean light blue background, natural smile, high quality headshot, photorealistic',
    'square_hd'
  )
}

export const hotTutorials = [
  { title: '《Vue3 + TypeScript 企业级实战》', heat: '3.2 万人在学' },
  { title: '《AIGC 应用开发：大模型落地》', heat: '2.8 万人在学' },
  { title: '《Spring Boot 3 微服务架构》', heat: '2.1 万人在学' },
  { title: '《Python 数据分析与可视化》', heat: '1.9 万人在学' },
  { title: '《UI/UX 全链路设计系统》', heat: '1.5 万人在学' },
  { title: '《React 18 全栈进阶实战》', heat: '2.4 万人在学' },
  { title: '《MySQL 高性能调优实战》', heat: '1.8 万人在学' },
  { title: '《Go 云原生高并发架构》', heat: '1.2 万人在学' },
  { title: '《uni-app 跨端开发实战》', heat: '1.6 万人在学' },
  { title: '《机器学习到 Kaggle 实战》', heat: '1.4 万人在学' }
]

export const hotKeywords = [
  'Vue3 组合式 API',
  '大模型 RAG 实战',
  '微服务治理',
  '高并发架构设计',
  '设计系统搭建',
  'Python 数据可视化',
  'uni-app 跨端小程序',
  'Figma 交互动效',
  '手写 JS 核心原理',
  '云原生与 K8s'
]

export const categories = ['前端开发', '后端开发', '人工智能', '视觉设计']

export const courses = [
  {
    id: 1,
    title: 'Vue3 + TypeScript 企业级实战',
    category: '前端开发',
    focus: 'Vue3 · TypeScript 工程化',
    teacher: '林逸风',
    lessons: 48,
    price: 299,
    originPrice: 499,
    students: '3.2 万',
    rating: '4.9',
    badge: '热门',
    badgeType: 'hot',
    coverFrom: '#1e40af',
    coverTo: '#22d3ee',
    coverLetter: 'V',
    cover: image(
      'abstract minimal tech illustration for Vue.js frontend development course, floating glass UI cards, deep blue and cyan gradient, soft glow, modern clean design, no text, no letters'
    )
  },
  {
    id: 2,
    title: 'React 18 全栈进阶：从组件到部署',
    category: '前端开发',
    focus: 'React18 · 全栈实战',
    teacher: '沈知行',
    lessons: 56,
    price: 329,
    originPrice: 499,
    students: '2.4 万',
    rating: '4.8',
    badge: '新课',
    badgeType: 'new',
    coverFrom: '#0ea5e9',
    coverTo: '#6366f1',
    coverLetter: 'R',
    cover: image(
      'abstract atom orbit network illustration for React development course, cyan and indigo gradient, glowing connected nodes, minimal futuristic tech design, no text'
    )
  },
  {
    id: 3,
    title: '深入浅出 JavaScript 核心原理',
    category: '前端开发',
    focus: 'JS 原理 · 手写源码',
    teacher: '周一鸣',
    lessons: 36,
    price: 199,
    originPrice: 299,
    students: '4.1 万',
    rating: '4.9',
    badge: '口碑',
    badgeType: 'top',
    coverFrom: '#f59e0b',
    coverTo: '#f97316',
    coverLetter: 'JS',
    cover: image(
      'abstract JavaScript programming theme illustration, dark navy background with warm golden light streams and floating geometric blocks, minimal modern design, no text'
    )
  },
  {
    id: 4,
    title: 'uni-app 跨端开发：一套代码多端发布',
    category: '前端开发',
    focus: '小程序 · 多端发布',
    teacher: '苏晚晴',
    lessons: 40,
    price: 259,
    originPrice: 399,
    students: '1.6 万',
    rating: '4.7',
    badge: '热门',
    badgeType: 'hot',
    coverFrom: '#8b5cf6',
    coverTo: '#ec4899',
    coverLetter: 'U',
    cover: image(
      'mobile app development illustration with two floating smartphone mockups, purple and pink gradient, clean interface cards, minimal modern design, no text'
    )
  },
  {
    id: 5,
    title: 'Spring Boot 3 微服务架构实战',
    category: '后端开发',
    focus: 'Spring Cloud · 微服务',
    teacher: '顾承宇',
    lessons: 60,
    price: 399,
    originPrice: 599,
    students: '2.1 万',
    rating: '4.8',
    badge: '热门',
    badgeType: 'hot',
    coverFrom: '#10b981',
    coverTo: '#0ea5e9',
    coverLetter: 'S',
    cover: image(
      'abstract microservice architecture illustration, server nodes connected by glowing lines, emerald and teal gradient, minimal tech style, no text'
    )
  },
  {
    id: 6,
    title: 'MySQL 高性能调优实战',
    category: '后端开发',
    focus: '索引优化 · 执行计划',
    teacher: '陈默',
    lessons: 32,
    price: 229,
    originPrice: 329,
    students: '1.8 万',
    rating: '4.7',
    badge: '',
    badgeType: '',
    coverFrom: '#2563eb',
    coverTo: '#0ea5e9',
    coverLetter: 'DB',
    cover: image(
      'abstract database optimization illustration, glowing database cylinders and data flow lines, deep blue gradient, minimal modern tech design, no text'
    )
  },
  {
    id: 7,
    title: 'Go 云原生高并发架构设计',
    category: '后端开发',
    focus: 'Go · 云原生高并发',
    teacher: '韩程',
    lessons: 44,
    price: 289,
    originPrice: 429,
    students: '1.2 万',
    rating: '4.8',
    badge: '新课',
    badgeType: 'new',
    coverFrom: '#06b6d4',
    coverTo: '#2563eb',
    coverLetter: 'GO',
    cover: image(
      'abstract high concurrency network illustration, glowing cyan data streams and geometric grid, cloud native servers, minimal, no text'
    )
  },
  {
    id: 8,
    title: 'AIGC 应用开发：大模型落地',
    category: '人工智能',
    focus: 'LLM · RAG · Agent',
    teacher: '罗嘉树',
    lessons: 52,
    price: 459,
    originPrice: 699,
    students: '2.8 万',
    rating: '4.9',
    badge: '爆款',
    badgeType: 'hot',
    coverFrom: '#7c3aed',
    coverTo: '#2563eb',
    coverLetter: 'AI',
    cover: image(
      'abstract artificial intelligence neural network illustration, glowing purple and blue nodes, layered circuits, futuristic minimal tech design, no text'
    )
  },
  {
    id: 9,
    title: 'Python 数据分析与可视化',
    category: '人工智能',
    focus: 'Pandas · 数据可视化',
    teacher: '许知渔',
    lessons: 38,
    price: 219,
    originPrice: 329,
    students: '1.9 万',
    rating: '4.8',
    badge: '',
    badgeType: '',
    coverFrom: '#10b981',
    coverTo: '#84cc16',
    coverLetter: 'PY',
    cover: image(
      'abstract data analytics illustration, colorful bar charts and line graphs floating over a dark green gradient, minimal modern dashboard concept, no text'
    )
  },
  {
    id: 10,
    title: '机器学习入门到 Kaggle 实战',
    category: '人工智能',
    focus: 'ML 算法 · Kaggle 竞赛',
    teacher: '江白鹭',
    lessons: 50,
    price: 359,
    originPrice: 499,
    students: '1.4 万',
    rating: '4.7',
    badge: '新课',
    badgeType: 'new',
    coverFrom: '#f59e0b',
    coverTo: '#8b5cf6',
    coverLetter: 'ML',
    cover: image(
      'abstract machine learning illustration, glowing geometric brain made of connected nodes, orange and violet gradient, minimal futuristic, no text'
    )
  },
  {
    id: 11,
    title: 'UI/UX 全链路设计系统搭建',
    category: '视觉设计',
    focus: '设计系统 · 交互规范',
    teacher: '温以宁',
    lessons: 42,
    price: 279,
    originPrice: 399,
    students: '1.5 万',
    rating: '4.8',
    badge: '精选',
    badgeType: 'top',
    coverFrom: '#6366f1',
    coverTo: '#0ea5e9',
    coverLetter: 'UI',
    cover: image(
      'abstract design system illustration, floating color swatches, typography grid and clean UI components, pastel gradient, minimal, no text'
    )
  },
  {
    id: 12,
    title: '动效设计：Figma + AE 进阶',
    category: '视觉设计',
    focus: '动效设计 · 落地交付',
    teacher: '叶清和',
    lessons: 30,
    price: 189,
    originPrice: 259,
    students: '0.9 万',
    rating: '4.7',
    badge: '',
    badgeType: '',
    coverFrom: '#ec4899',
    coverTo: '#8b5cf6',
    coverLetter: 'MO',
    cover: image(
      'abstract motion design illustration, flowing gradient ribbons and light trails, pink and purple palette, minimal modern, no text'
    )
  }
]

export const learningRecords = [
  {
    id: 1,
    title: 'Vue3 + TypeScript 企业级实战',
    teacher: '林逸风',
    chapter: '第 12 章 · 组件库工程化',
    updated: '2 小时前学习',
    progress: 68,
    status: '学习中',
    letter: 'V',
    coverFrom: '#1e40af',
    coverTo: '#22d3ee'
  },
  {
    id: 2,
    title: 'AIGC 应用开发：大模型落地',
    teacher: '罗嘉树',
    chapter: '第 6 章 · RAG 检索增强',
    updated: '昨天学习',
    progress: 42,
    status: '学习中',
    letter: 'AI',
    coverFrom: '#7c3aed',
    coverTo: '#2563eb'
  },
  {
    id: 3,
    title: 'MySQL 高性能调优实战',
    teacher: '陈默',
    chapter: '第 8 章 · 索引优化策略',
    updated: '3 小时前学习',
    progress: 85,
    status: '学习中',
    letter: 'DB',
    coverFrom: '#2563eb',
    coverTo: '#0ea5e9'
  },
  {
    id: 4,
    title: 'Go 云原生高并发架构设计',
    teacher: '韩程',
    chapter: '第 2 章 · 并发模型',
    updated: '3 天前学习',
    progress: 15,
    status: '待继续',
    letter: 'GO',
    coverFrom: '#06b6d4',
    coverTo: '#2563eb'
  },
  {
    id: 5,
    title: 'UI/UX 全链路设计系统搭建',
    teacher: '温以宁',
    chapter: '全部章节已完成',
    updated: '上周学完',
    progress: 100,
    status: '已完成',
    letter: 'UI',
    coverFrom: '#6366f1',
    coverTo: '#0ea5e9'
  }
]

export const faqs = [
  {
    id: 'faq-1',
    question: '购买课程后可以学习多久？',
    answer:
      '所有付费课程自购买之日起 2 年内可无限次回看，课程更新内容会同步开放，不再额外收费。购买后可在「我的学习记录」中随时继续学习，支持多端同步进度。'
  },
  {
    id: 'faq-2',
    question: '支持哪些支付方式？可以开发票吗？',
    answer:
      '支持微信支付、支付宝与银联在线支付。企业用户可在支付完成后联系在线客服申请增值税普通发票或专用发票，通常 1-3 个工作日内开具。'
  },
  {
    id: 'faq-3',
    question: '学习过程中遇到问题如何获得帮助？',
    answer:
      '每门课程都配有专属答疑社群，讲师与助教会在 24 小时内响应。你也可以在课程详情页提交问题工单，或通过本页帮助中心联系在线客服获取一对一支持。'
  },
  {
    id: 'faq-4',
    question: '课程支持退款吗？',
    answer:
      '购买后 7 天内且学习进度不超过 10% 的课程支持无理由退款。退款将原路退回支付账户，到账时间一般为 1-3 个工作日，已开具的发票需一并退回。'
  },
  {
    id: 'faq-5',
    question: '如何获得结业证书？',
    answer:
      '完成课程全部章节并通过结业测验后，可在「学习记录」页申领电子结业证书。证书支持在线验证与 PDF 导出，可用于求职作品集或企业内部学习证明。'
  }
]

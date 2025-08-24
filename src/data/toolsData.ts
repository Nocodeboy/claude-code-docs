/**
 * Tools Directory Data Schema
 * Academy NoCode - Comprehensive tools database
 */

export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ToolCategory;
  subcategory?: string;
  website: string;
  documentation?: string;
  github?: string;
  pricing: 'free' | 'freemium' | 'paid' | 'enterprise';
  tags: string[];
  logo: string;
  logoHq?: string; // High quality logo from Brandfetch
  screenshots: string[];
  features: string[];
  useCases: string[];
  alternatives: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number; // 1-10 scale
  lastUpdated: string;
  isRecommended?: boolean;
  integrations?: string[];
  platforms: Platform[];
  languages?: string[];
}

export type ToolCategory = 
  | 'frontend'
  | 'backend' 
  | 'fullstack'
  | 'devops'
  | 'design'
  | 'automation'
  | 'testing'
  | 'database'
  | 'ai-ml'
  | 'documentation'
  | 'deployment'
  | 'monitoring'
  | 'security'
  | 'productivity';

export type Platform = 
  | 'web'
  | 'desktop'
  | 'mobile'
  | 'cli'
  | 'vscode'
  | 'browser-extension'
  | 'api'
  | 'saas';

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full-Stack',
  devops: 'DevOps',
  design: 'Diseño',
  automation: 'Automatización',
  testing: 'Testing',
  database: 'Base de Datos',
  'ai-ml': 'IA & ML',
  documentation: 'Documentación',
  deployment: 'Deployment',
  monitoring: 'Monitoreo',
  security: 'Seguridad',
  productivity: 'Productividad'
};

export const CATEGORY_ICONS: Record<ToolCategory, string> = {
  frontend: '🎨',
  backend: '⚙️',
  fullstack: '🌐',
  devops: '🚀',
  design: '✨',
  automation: '🤖',
  testing: '🧪',
  database: '🗄️',
  'ai-ml': '🤖',
  documentation: '📚',
  deployment: '☁️',
  monitoring: '📊',
  security: '🔒',
  productivity: '⚡'
};

export const TOOLS_DATA: Tool[] = [
  // Frontend Tools
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'El framework de React para producción que ofrece renderizado híbrido estático y del servidor, tipado TypeScript, bundling inteligente, enrutamiento de archivos y más, sin configuración.',
    shortDescription: 'Framework de React para aplicaciones web modernas',
    category: 'frontend',
    subcategory: 'React Framework',
    website: 'https://nextjs.org',
    documentation: 'https://nextjs.org/docs',
    github: 'https://github.com/vercel/next.js',
    pricing: 'free',
    tags: ['React', 'SSR', 'SSG', 'TypeScript', 'Vercel'],
    logo: '/img/tools/logos/nextjs-logo.png',
    logoHq: '/img/tools/logos/nextjs-logo.png',
    screenshots: [
      '/img/tools/screenshots/nextjs-homepage.jpg'
    ],
    features: [
      'Renderizado híbrido (SSR/SSG)',
      'Optimización automática de imágenes',
      'API Routes integradas',
      'TypeScript nativo',
      'CSS Modules y Sass',
      'Optimización de performance automática'
    ],
    useCases: [
      'Aplicaciones web empresariales',
      'E-commerce',
      'Sitios web estáticos',
      'Blogs y portafolios',
      'Dashboards y panels admin'
    ],
    alternatives: ['Nuxt.js', 'Gatsby', 'SvelteKit', 'Remix'],
    difficulty: 'intermediate',
    popularity: 9,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Vercel', 'Netlify', 'AWS', 'Sanity', 'Prisma'],
    platforms: ['web', 'cli'],
    languages: ['JavaScript', 'TypeScript']
  },
  {
    id: 'react',
    name: 'React',
    description: 'Una biblioteca de JavaScript para construir interfaces de usuario declarativas, eficientes y flexibles. React te permite crear interfaces complejas a partir de pequeños trozos de código aislados llamados componentes.',
    shortDescription: 'Biblioteca para interfaces de usuario reactivas',
    category: 'frontend',
    subcategory: 'UI Library',
    website: 'https://reactjs.org',
    documentation: 'https://react.dev',
    github: 'https://github.com/facebook/react',
    pricing: 'free',
    tags: ['JavaScript', 'UI', 'Components', 'Virtual DOM', 'JSX'],
    logo: '/img/tools/logos/react-logo.png',
    logoHq: '/img/tools/logos/react-logo.png',
    screenshots: [
      '/img/tools/screenshots/react-homepage.jpg'
    ],
    features: [
      'Componentes reutilizables',
      'Virtual DOM',
      'Hooks para lógica de estado',
      'JSX syntax',
      'Unidirectional data flow',
      'Rich ecosystem'
    ],
    useCases: [
      'Single Page Applications',
      'Aplicaciones web interactivas',
      'Dashboards',
      'Aplicaciones móviles con React Native',
      'Componentes UI reutilizables'
    ],
    alternatives: ['Vue.js', 'Angular', 'Svelte'],
    difficulty: 'intermediate',
    popularity: 10,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Next.js', 'Gatsby', 'Create React App', 'Vite'],
    platforms: ['web'],
    languages: ['JavaScript', 'TypeScript']
  },
  {
    id: 'docusaurus',
    name: 'Docusaurus',
    description: 'Plataforma para construir, desplegar y mantener sitios web de documentación de código abierto fácilmente. Enfocado en hacer que escribir documentación sea una experiencia agradable y productiva.',
    shortDescription: 'Generador de sitios de documentación moderno',
    category: 'documentation',
    subcategory: 'Static Site Generator',
    website: 'https://docusaurus.io',
    documentation: 'https://docusaurus.io/docs',
    github: 'https://github.com/facebook/docusaurus',
    pricing: 'free',
    tags: ['Documentation', 'React', 'MDX', 'Static Site', 'Meta'],
    logo: '/img/tools/logos/docusaurus-logo.png',
    logoHq: '/img/tools/logos/docusaurus-logo.png',
    screenshots: [
      '/img/tools/screenshots/docusaurus-homepage.jpg'
    ],
    features: [
      'Powered by React y MDX',
      'Temas dark/light integrados',
      'Versionado de documentación',
      'Búsqueda integrada',
      'Internacionalización (i18n)',
      'SEO optimizado'
    ],
    useCases: [
      'Documentación de API',
      'Sitios de documentación técnica',
      'Knowledge bases',
      'Blogs técnicos',
      'Sitios de proyectos open source'
    ],
    alternatives: ['GitBook', 'VuePress', 'Notion', 'Sphinx'],
    difficulty: 'beginner',
    popularity: 8,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['GitHub Pages', 'Netlify', 'Vercel', 'Algolia'],
    platforms: ['web', 'cli'],
    languages: ['JavaScript', 'TypeScript', 'MDX']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Plataforma de desarrollo frontend que permite a los equipos desarrollar, previsualizar y enviar aplicaciones web de manera instantánea. Optimizada para frameworks modernos como Next.js.',
    shortDescription: 'Plataforma de deployment para aplicaciones frontend',
    category: 'deployment',
    subcategory: 'Cloud Platform',
    website: 'https://vercel.com',
    documentation: 'https://vercel.com/docs',
    github: 'https://github.com/vercel/vercel',
    pricing: 'freemium',
    tags: ['Deployment', 'Serverless', 'CDN', 'Next.js', 'Frontend'],
    logo: '/img/tools/logos/vercel-logo.png',
    logoHq: '/img/tools/logos/vercel-logo.png',
    screenshots: [
      '/img/tools/screenshots/vercel-homepage.jpg'
    ],
    features: [
      'Deploy instantáneo desde Git',
      'Edge Network global',
      'Serverless Functions',
      'Preview deployments',
      'Custom domains',
      'Analytics integrado'
    ],
    useCases: [
      'Deploy de aplicaciones Next.js',
      'Sitios web estáticos',
      'JAMstack applications',
      'APIs serverless',
      'Frontend para microservicios'
    ],
    alternatives: ['Netlify', 'AWS Amplify', 'GitHub Pages', 'Firebase Hosting'],
    difficulty: 'beginner',
    popularity: 9,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['GitHub', 'GitLab', 'Bitbucket', 'Next.js', 'React'],
    platforms: ['web', 'cli'],
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Ruby']
  },

  // Backend Tools
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Runtime de JavaScript construido en el motor V8 de Chrome. Node.js usa un modelo de I/O dirigido por eventos, no bloqueante, que lo hace liviano y eficiente.',
    shortDescription: 'Runtime de JavaScript para el servidor',
    category: 'backend',
    subcategory: 'Runtime',
    website: 'https://nodejs.org',
    documentation: 'https://nodejs.org/docs',
    github: 'https://github.com/nodejs/node',
    pricing: 'free',
    tags: ['JavaScript', 'Server', 'Runtime', 'NPM', 'Async'],
    logo: '/img/tools/logos/nodejs-logo.png',
    logoHq: '/img/tools/logos/nodejs-logo.png',
    screenshots: [
      '/img/tools/screenshots/nodejs-homepage.jpg'
    ],
    features: [
      'Event-driven architecture',
      'Non-blocking I/O',
      'NPM ecosystem',
      'Cross-platform',
      'Built-in modules',
      'Microservices friendly'
    ],
    useCases: [
      'APIs RESTful',
      'Aplicaciones en tiempo real',
      'Microservicios',
      'Tools de desarrollo',
      'Aplicaciones de línea de comandos'
    ],
    alternatives: ['Deno', 'Bun', 'Python', 'Go', 'Rust'],
    difficulty: 'intermediate',
    popularity: 10,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'Docker'],
    platforms: ['cli', 'api'],
    languages: ['JavaScript', 'TypeScript']
  },
  {
    id: 'express',
    name: 'Express.js',
    description: 'Framework web rápido, minimalista y flexible para Node.js. Proporciona un conjunto robusto de características para aplicaciones web y móviles.',
    shortDescription: 'Framework web minimalista para Node.js',
    category: 'backend',
    subcategory: 'Web Framework',
    website: 'https://expressjs.com',
    documentation: 'https://expressjs.com/guide',
    github: 'https://github.com/expressjs/express',
    pricing: 'free',
    tags: ['Node.js', 'Web Framework', 'API', 'Middleware', 'HTTP'],
    logo: '/img/tools/logos/express-logo.png',
    logoHq: '/img/tools/logos/express-logo.png',
    screenshots: [
      '/img/tools/screenshots/express-homepage.jpg'
    ],
    features: [
      'Routing robusto',
      'Sistema de middleware',
      'HTTP helpers',
      'Content negotiation',
      'Template engine support',
      'Ejecutable para generar aplicaciones rápidamente'
    ],
    useCases: [
      'APIs REST',
      'Aplicaciones web full-stack',
      'Microservicios',
      'Proxy servers',
      'Aplicaciones en tiempo real con WebSockets'
    ],
    alternatives: ['Koa.js', 'Fastify', 'Hapi.js', 'NestJS'],
    difficulty: 'beginner',
    popularity: 9,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['MongoDB', 'PostgreSQL', 'Redis', 'Socket.io', 'Passport'],
    platforms: ['api', 'web'],
    languages: ['JavaScript', 'TypeScript']
  },

  // DevOps Tools
  {
    id: 'github',
    name: 'GitHub',
    description: 'Plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git. Incluye funcionalidades de red social entre desarrolladores.',
    shortDescription: 'Plataforma de desarrollo colaborativo con Git',
    category: 'devops',
    subcategory: 'Version Control',
    website: 'https://github.com',
    documentation: 'https://docs.github.com',
    pricing: 'freemium',
    tags: ['Git', 'Version Control', 'Collaboration', 'CI/CD', 'Open Source'],
    logo: '/img/tools/logos/github-logo.png',
    logoHq: '/img/tools/logos/github-logo.png',
    screenshots: [
      '/img/tools/screenshots/github-homepage.jpg'
    ],
    features: [
      'Repositorios Git ilimitados',
      'GitHub Actions (CI/CD)',
      'GitHub Pages',
      'Issue tracking',
      'Pull requests',
      'Code review tools'
    ],
    useCases: [
      'Control de versiones',
      'Colaboración en código',
      'CI/CD pipelines',
      'Documentación y wikis',
      'Hosting de sitios estáticos'
    ],
    alternatives: ['GitLab', 'Bitbucket', 'SourceForge', 'Azure DevOps'],
    difficulty: 'beginner',
    popularity: 10,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Vercel', 'Netlify', 'VS Code', 'Slack', 'Jira'],
    platforms: ['web', 'desktop', 'mobile', 'cli'],
    languages: ['Git', 'YAML', 'Markdown']
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Plataforma de contenedores que permite a los desarrolladores empaquetar aplicaciones con todas sus dependencias en contenedores ligeros y portátiles.',
    shortDescription: 'Plataforma de contenedores para aplicaciones',
    category: 'devops',
    subcategory: 'Containerization',
    website: 'https://docker.com',
    documentation: 'https://docs.docker.com',
    github: 'https://github.com/docker',
    pricing: 'freemium',
    tags: ['Containers', 'DevOps', 'Microservices', 'Infrastructure', 'Deployment'],
    logo: '/img/tools/logos/docker-logo.png',
    logoHq: '/img/tools/logos/docker-logo.png',
    screenshots: [
      '/img/tools/screenshots/docker-homepage.jpg'
    ],
    features: [
      'Containerización ligera',
      'Docker Compose para multi-contenedor',
      'Docker Hub registry',
      'Orquestación con Swarm',
      'Isolation y seguridad',
      'Cross-platform compatibility'
    ],
    useCases: [
      'Desarrollo local consistente',
      'Despliegue de microservicios',
      'CI/CD pipelines',
      'Aplicaciones cloud-native',
      'Testing en ambientes aislados'
    ],
    alternatives: ['Podman', 'LXC', 'rkt', 'Containerd'],
    difficulty: 'intermediate',
    popularity: 9,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Kubernetes', 'GitHub Actions', 'AWS', 'Azure', 'Jenkins'],
    platforms: ['desktop', 'cli', 'api'],
    languages: ['Dockerfile', 'YAML', 'Shell']
  },

  // Automation Tools
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    description: 'Biblioteca de Node.js que proporciona una API de alto nivel para controlar Chrome/Chromium a través del protocolo DevTools. Ejecuta headless por defecto pero puede configurarse para ejecutar Chrome completo.',
    shortDescription: 'API para controlar Chrome/Chromium desde Node.js',
    category: 'automation',
    subcategory: 'Browser Automation',
    website: 'https://pptr.dev',
    documentation: 'https://pptr.dev/api',
    github: 'https://github.com/puppeteer/puppeteer',
    pricing: 'free',
    tags: ['Browser Automation', 'Testing', 'Scraping', 'PDF Generation', 'Screenshots'],
    logo: '/img/tools/logos/puppeteer-logo.png',
    logoHq: '/img/tools/logos/puppeteer-logo.png',
    screenshots: [
      '/img/tools/screenshots/puppeteer-homepage.jpg'
    ],
    features: [
      'Headless Chrome control',
      'Screenshot y PDF generation',
      'Crawling de SPAs',
      'Automatización de formularios',
      'Performance monitoring',
      'Testing de UI automatizado'
    ],
    useCases: [
      'Web scraping',
      'Testing automatizado',
      'Generación de PDFs',
      'Capturas de pantalla',
      'Performance testing'
    ],
    alternatives: ['Playwright', 'Selenium', 'Cypress', 'Webdriver.io'],
    difficulty: 'intermediate',
    popularity: 8,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Jest', 'Mocha', 'GitHub Actions', 'Docker', 'AWS Lambda'],
    platforms: ['cli', 'api'],
    languages: ['JavaScript', 'TypeScript']
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Framework para testing web y automatización que permite testing confiable de end-to-end para aplicaciones web modernas. Soporta todos los navegadores modernos.',
    shortDescription: 'Framework de testing cross-browser moderno',
    category: 'automation',
    subcategory: 'E2E Testing',
    website: 'https://playwright.dev',
    documentation: 'https://playwright.dev/docs',
    github: 'https://github.com/microsoft/playwright',
    pricing: 'free',
    tags: ['E2E Testing', 'Cross-browser', 'Automation', 'Microsoft', 'Testing'],
    logo: '/img/tools/logos/playwright-logo.png',
    logoHq: '/img/tools/logos/playwright-logo.png',
    screenshots: [
      '/img/tools/screenshots/playwright-homepage.jpg'
    ],
    features: [
      'Cross-browser testing',
      'Auto-wait y retry logic',
      'Trace viewer integrado',
      'Multiple language support',
      'Mobile testing',
      'Visual comparisons'
    ],
    useCases: [
      'Testing de aplicaciones web',
      'Automatización cross-browser',
      'Testing en mobile',
      'CI/CD testing',
      'Visual regression testing'
    ],
    alternatives: ['Cypress', 'Puppeteer', 'Selenium', 'TestCafe'],
    difficulty: 'intermediate',
    popularity: 8,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Jest', 'GitHub Actions', 'Azure DevOps', 'Docker', 'VS Code'],
    platforms: ['cli', 'desktop'],
    languages: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Java']
  },

  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    description: 'Herramienta de diseño de interfaces colaborativa basada en la web. Permite a los equipos diseñar, crear prototipos y colaborar en tiempo real.',
    shortDescription: 'Herramienta de diseño colaborativo web-based',
    category: 'design',
    subcategory: 'UI/UX Design',
    website: 'https://figma.com',
    documentation: 'https://help.figma.com',
    pricing: 'freemium',
    tags: ['UI Design', 'UX', 'Prototyping', 'Collaboration', 'Design System'],
    logo: '/img/tools/logos/figma-logo.png',
    logoHq: '/img/tools/logos/figma-logo.png',
    screenshots: [
      '/img/tools/screenshots/figma-homepage.jpg'
    ],
    features: [
      'Diseño colaborativo en tiempo real',
      'Prototipado interactivo',
      'Sistema de componentes',
      'Auto-layout',
      'Version history',
      'Dev handoff tools'
    ],
    useCases: [
      'Diseño de interfaces web y móvil',
      'Creación de prototipos',
      'Sistemas de diseño',
      'Wireframing',
      'Colaboración de equipos de diseño'
    ],
    alternatives: ['Sketch', 'Adobe XD', 'InVision', 'Framer'],
    difficulty: 'beginner',
    popularity: 9,
    lastUpdated: '2025-08-23',
    isRecommended: true,
    integrations: ['Slack', 'Notion', 'Zeplin', 'Principle', 'Abstract'],
    platforms: ['web', 'desktop', 'mobile'],
    languages: ['Design', 'Prototyping']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    description: 'Framework CSS utility-first que permite crear diseños únicos sin salir del HTML. Proporciona todas las piezas de construcción necesarias para construir diseños personalizados.',
    shortDescription: 'Framework CSS utility-first para diseño moderno',
    category: 'design',
    subcategory: 'CSS Framework',
    website: 'https://tailwindcss.com',
    documentation: 'https://tailwindcss.com/docs',
    github: 'https://github.com/tailwindlabs/tailwindcss',
    pricing: 'free',
    tags: ['CSS', 'Utility-First', 'Design System', 'Responsive', 'Modern CSS'],
    logo: '/img/tools/logos/tailwindcss-logo.png',
    logoHq: '/img/tools/logos/tailwindcss-logo.png',
    screenshots: [
      '/img/tools/screenshots/tailwindcss-homepage.jpg'
    ],
    features: [
      'Utility-first CSS approach',
      'Responsive design integrado',
      'Dark mode nativo',
      'JIT (Just-In-Time) compilation',
      'Plugin system extensible',
      'Purge CSS automático'
    ],
    useCases: [
      'Rapid UI development',
      'Sistemas de diseño consistentes',
      'Prototyping rápido',
      'Aplicaciones React/Vue/Angular',
      'Landing pages modernas'
    ],
    alternatives: ['Bootstrap', 'Foundation', 'Bulma', 'Semantic UI'],
    difficulty: 'beginner',
    popularity: 9,
    lastUpdated: '2025-08-24',
    isRecommended: true,
    integrations: ['React', 'Vue', 'Angular', 'Next.js', 'Vite'],
    platforms: ['web', 'cli'],
    languages: ['CSS', 'PostCSS', 'JavaScript']
  },
  {
    id: 'shadcnui',
    name: 'shadcn/ui',
    description: 'Componentes React copiables y personalizables construidos con Radix UI y Tailwind CSS. No es una librería, es una colección de componentes reutilizables que puedes copiar y pegar.',
    shortDescription: 'Componentes React copiables con Radix UI y Tailwind',
    category: 'design',
    subcategory: 'Component Library',
    website: 'https://ui.shadcn.com',
    documentation: 'https://ui.shadcn.com/docs',
    github: 'https://github.com/shadcn-ui/ui',
    pricing: 'free',
    tags: ['React', 'Components', 'Tailwind CSS', 'Radix UI', 'Design System'],
    logo: '/img/tools/logos/shadcnui-logo.png',
    logoHq: '/img/tools/logos/shadcnui-logo.png',
    screenshots: [
      '/img/tools/screenshots/shadcnui-homepage.jpg'
    ],
    features: [
      'Componentes accesibles con Radix UI',
      'Estilos con Tailwind CSS',
      'Sistema de temas dark/light',
      'TypeScript nativo',
      'Copy & paste, no NPM install',
      'Totalmente customizable'
    ],
    useCases: [
      'Aplicaciones React modernas',
      'Design systems empresariales',
      'Dashboard y admin panels',
      'Landing pages profesionales',
      'Aplicaciones Next.js'
    ],
    alternatives: ['Material UI', 'Ant Design', 'Chakra UI', 'Mantine'],
    difficulty: 'intermediate',
    popularity: 8,
    lastUpdated: '2025-08-24',
    isRecommended: true,
    integrations: ['React', 'Next.js', 'Tailwind CSS', 'Radix UI', 'TypeScript'],
    platforms: ['web', 'cli'],
    languages: ['React', 'TypeScript', 'CSS']
  },

  // AI & ML Tools
  {
    id: 'claude',
    name: 'Claude',
    description: 'Claude es un asistente de IA conversacional desarrollado por Anthropic, diseñado para ser útil, inofensivo y honesto. Ofrece capacidades avanzadas de procesamiento de lenguaje natural para una amplia gama de tareas.',
    shortDescription: 'Asistente de IA conversacional avanzado',
    category: 'ai-ml',
    subcategory: 'AI Assistant',
    website: 'https://claude.ai',
    documentation: 'https://docs.anthropic.com',
    github: 'https://github.com/anthropics',
    pricing: 'freemium',
    tags: ['AI', 'Machine Learning', 'Natural Language Processing', 'Conversational AI', 'Assistant'],
    logo: '/img/tools/logos/claude-logo.png',
    logoHq: '/img/tools/logos/claude-logo.png',
    screenshots: [
      '/img/tools/screenshots/claude-homepage.jpg'
    ],
    features: [
      'Conversaciones naturales y contextuales',
      'Análisis y generación de código',
      'Procesamiento de documentos y textos',
      'Razonamiento complejo y lógico',
      'Multimodal (texto e imágenes)',
      'Seguridad y alineación avanzada'
    ],
    useCases: [
      'Asistencia en programación y desarrollo',
      'Análisis de datos y documentos',
      'Generación de contenido creativo',
      'Educación y tutoría',
      'Automatización de tareas cognitivas'
    ],
    alternatives: ['ChatGPT', 'Gemini', 'Copilot', 'Perplexity'],
    difficulty: 'beginner',
    popularity: 9,
    lastUpdated: '2025-08-24',
    isRecommended: true,
    integrations: ['API', 'Slack', 'Claude Code', 'Various SDKs'],
    platforms: ['web', 'api'],
    languages: ['Natural Language', 'Code Analysis']
  }
];

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return TOOLS_DATA.filter(tool => tool.category === category);
};

export const getToolById = (id: string): Tool | undefined => {
  return TOOLS_DATA.find(tool => tool.id === id);
};

export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return TOOLS_DATA.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecommendedTools = (): Tool[] => {
  return TOOLS_DATA.filter(tool => tool.isRecommended);
};

export const getPopularTools = (limit: number = 6): Tool[] => {
  return TOOLS_DATA
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getAllCategories = (): ToolCategory[] => {
  return [...new Set(TOOLS_DATA.map(tool => tool.category))];
};

export const getToolsByTags = (tags: string[]): Tool[] => {
  return TOOLS_DATA.filter(tool => 
    tags.some(tag => tool.tags.includes(tag))
  );
};

/**
 * Get the best available logo for a tool
 * Prioritizes high-quality logos from Brandfetch
 */
export const getToolLogo = (tool: Tool): string => {
  return tool.logoHq || tool.logo;
};

/**
 * Get the primary screenshot for a tool (usually homepage)
 */
export const getToolPrimaryScreenshot = (tool: Tool): string => {
  return tool.screenshots[0] || '/img/tools/placeholder-screenshot.png';
};

/**
 * Check if tool has high-quality assets
 */
export const hasHighQualityAssets = (tool: Tool): boolean => {
  return Boolean(tool.logoHq);
};

/**
 * Get tools with complete asset sets (logo + screenshots)
 */
export const getToolsWithCompleteAssets = (): Tool[] => {
  return TOOLS_DATA.filter(tool => 
    tool.logoHq && tool.screenshots.length > 0
  );
};

/**
 * Asset validation helpers
 */
export const validateToolAssets = (tool: Tool) => {
  return {
    id: tool.id,
    name: tool.name,
    hasBasicLogo: Boolean(tool.logo),
    hasHqLogo: Boolean(tool.logoHq),
    screenshotCount: tool.screenshots.length,
    hasHomepageScreenshot: tool.screenshots.some(s => s.includes('homepage')),
    assetScore: (tool.logoHq ? 2 : 1) + tool.screenshots.length
  };
};
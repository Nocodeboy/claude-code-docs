import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Centro de Documentación Claude Code',
  tagline: 'Tu centro completo para dominar Claude Code - El CLI de IA de Anthropic',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://claude-code-docs.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'claude-code-community', // Usually your GitHub org/user name.
  projectName: 'claude-code-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/claude-code-community/claude-code-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Claude Code Blog',
          blogDescription: 'Últimas novedades, proyectos y tutoriales sobre Claude Code',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/claude-code-community/claude-code-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/claude-code-social-card.jpg',
    navbar: {
      title: 'Claude Code Docs',
      logo: {
        alt: 'Claude Code Logo',
        src: 'img/claude-code-logo.svg',
      },
      items: [
        {to: '/explorer', label: '🔍 Explorador', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentación',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/anthropics/claude-code',
          label: 'Claude Code GitHub',
          position: 'right',
        },
        {
          href: 'https://claude.ai/code',
          label: 'Claude Code Web',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {
              label: 'Proyectos',
              to: '/docs/proyectos',
            },
            {
              label: 'Herramientas',
              to: '/docs/herramientas',
            },
            {
              label: 'Guías',
              to: '/docs/guias',
            },
            {
              label: 'Recursos',
              to: '/docs/recursos',
            },
          ],
        },
        {
          title: 'Categorías',
          items: [
            {
              label: 'Desarrollo Web',
              to: '/docs/casos-uso/desarrollo-web',
            },
            {
              label: 'Automatización',
              to: '/docs/casos-uso/automation',
            },
            {
              label: 'IA & ML',
              to: '/docs/casos-uso/ai-development',
            },
            {
              label: 'Data Science',
              to: '/docs/casos-uso/data-science',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'Claude Code GitHub',
              href: 'https://github.com/anthropics/claude-code',
            },
            {
              label: 'Claude Code Issues',
              href: 'https://github.com/anthropics/claude-code/issues',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Contribuir',
              href: 'https://github.com/claude-code-community/claude-code-docs/blob/main/CONTRIBUTING.md',
            },
          ],
        },
      ],
      copyright: `Copyright © 2025 Claude Code Documentation Center. Construido con Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash', 
        'json', 
        'javascript', 
        'typescript', 
        'python',
        'jsx',
        'tsx',
        'css',
        'markup',
        'markdown',
        'yaml',
        'toml'
      ],
    },
    // Enhanced search (commented out until Algolia is configured)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'claude-code-docs',
    //   contextualSearch: true,
    //   searchParameters: {},
    //   searchPagePath: 'search',
    // },
    // Announcement bar for important updates
    announcementBar: {
      id: 'claude-code-docs-launch',
      content:
        '🚀 ¡Bienvenido al Centro de Documentación de Claude Code! Este sitio está en desarrollo activo.',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
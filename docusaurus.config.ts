import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Academy NoCode - Centro Claude Code',
  tagline: 'Tu centro completo para dominar Claude Code con Germán Huertas',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://claude-code-docs.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Nocodeboy', // Usually your GitHub org/user name.
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
      title: 'Academy NoCode',
      logo: {
        alt: 'Academy NoCode Logo',
        src: 'img/logo-light.png',
        srcDark: 'img/logo-dark.png',
        width: 32,
        height: 32,
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
          href: 'https://x.com/Nocodeboy',
          label: '𝕏 Twitter',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/germán-huertas-piquero-b89a80b1/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://academynocode.com',
          label: 'Academy NoCode',
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
              label: 'Academy NoCode',
              href: 'https://academynocode.com',
            },
            {
              label: '𝕏 Twitter/X',
              href: 'https://x.com/Nocodeboy',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/germán-huertas-piquero-b89a80b1/',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Claude Code',
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
              label: 'Documentación Oficial',
              href: 'https://docs.anthropic.com/claude-code',
            },
          ],
        },
      ],
      copyright: `Copyright © 2025 Academy NoCode by Germán Huertas. Construido con Docusaurus y Claude Code.`,
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
      id: 'academy-nocode-claude-code',
      content:
        '🚀 ¡Bienvenido a Academy NoCode! Aprende Claude Code con Germán Huertas.',
      backgroundColor: '#fff3e0',
      textColor: '#e65100',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
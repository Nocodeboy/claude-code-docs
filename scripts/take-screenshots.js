const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function takeScreenshots(customConfig = {}) {
  console.log('🚀 Iniciando captura de screenshots...');
  
  const config = {
    baseUrl: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    timeout: 30000,
    delay: 2000,
    ...customConfig
  };
  
  const browser = await puppeteer.launch({
    headless: config.headless,
    defaultViewport: config.viewport,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Para mejor compatibilidad
  });
  
  const page = await browser.newPage();
  
  // Configurar timeout y esperar por redes
  await page.setDefaultTimeout(config.timeout);
  
  // Función para crear directorios de forma segura
  const ensureDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
  
  // Definir categorías de screenshots
  const screenshotCategories = {
    // Documentación general del sitio
    site: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'screenshots', 'site'),
      screenshots: [
        {
          name: 'homepage',
          url: config.baseUrl,
          description: 'Página de inicio completa'
        },
        {
          name: 'blog',
          url: `${config.baseUrl}/blog`,
          description: 'Sistema de blog'
        },
        {
          name: 'documentation',
          url: `${config.baseUrl}/docs/intro`,
          description: 'Página de documentación principal'
        },
        {
          name: 'explorer',
          url: `${config.baseUrl}/explorer`,
          description: 'Explorador de documentación interactivo'
        }
      ]
    },
    
    // Screenshots para guías de instalación
    installation: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'screenshots', 'installation'),
      screenshots: [
        {
          name: 'claude-ai-site',
          url: 'https://claude.ai/code',
          description: 'Sitio oficial de Claude Code'
        },
        {
          name: 'anthropic-console',
          url: 'https://console.anthropic.com',
          description: 'Consola de Anthropic'
        }
      ]
    },
    
    // Screenshots de herramientas y recursos
    tools: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'screenshots', 'tools'),
      screenshots: [
        {
          name: 'claude-code-templates',
          url: 'https://github.com/davila7/claude-code-templates',
          description: 'Repositorio Claude Code Templates'
        },
        {
          name: 'anthropic-docs',
          url: 'https://docs.anthropic.com/en/docs/claude-code',
          description: 'Documentación oficial'
        }
      ]
    },

    // Screenshots de herramientas del directorio
    tool_homepages: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'tools', 'screenshots'),
      screenshots: [
        {
          name: 'nextjs-homepage',
          url: 'https://nextjs.org',
          description: 'Next.js - Homepage principal',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'react-homepage',
          url: 'https://react.dev',
          description: 'React - Nueva documentación oficial',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'docusaurus-homepage',
          url: 'https://docusaurus.io',
          description: 'Docusaurus - Sitio principal',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'vercel-homepage',
          url: 'https://vercel.com',
          description: 'Vercel - Plataforma de deployment',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        },
        {
          name: 'vercel-dashboard',
          url: 'https://vercel.com/dashboard',
          description: 'Vercel - Dashboard de usuario',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000,
          requireAuth: true
        },
        {
          name: 'nodejs-homepage',
          url: 'https://nodejs.org',
          description: 'Node.js - Sitio oficial',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'express-homepage',
          url: 'https://expressjs.com',
          description: 'Express.js - Framework web',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'github-homepage',
          url: 'https://github.com',
          description: 'GitHub - Plataforma de desarrollo',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'docker-homepage',
          url: 'https://docker.com',
          description: 'Docker - Plataforma de contenedores',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        },
        {
          name: 'puppeteer-homepage',
          url: 'https://pptr.dev',
          description: 'Puppeteer - Documentación oficial',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'playwright-homepage',
          url: 'https://playwright.dev',
          description: 'Playwright - Framework de testing',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'figma-homepage',
          url: 'https://figma.com',
          description: 'Figma - Herramienta de diseño',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        },
        {
          name: 'tailwindcss-homepage',
          url: 'https://tailwindcss.com',
          description: 'Tailwind CSS - Framework utility-first',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'shadcnui-homepage',
          url: 'https://ui.shadcn.com',
          description: 'shadcn/ui - Componentes React copiables',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'claude-homepage',
          url: 'https://claude.ai',
          description: 'Claude - Asistente de IA conversacional',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        }
      ]
    },
    
    // Screenshots de casos de uso
    use_cases: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'screenshots', 'use-cases'),
      screenshots: [
        {
          name: 'terminal-claude',
          url: 'https://claude.ai/code',
          description: 'Claude Code en terminal',
          selector: '.terminal-demo', // Selector específico si existe
          fullPage: false
        }
      ]
    },
    
    // Screenshots de herramientas para el directorio
    tools: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'tools', 'screenshots'),
      screenshots: [
        {
          name: 'nextjs-homepage',
          url: 'https://nextjs.org',
          description: 'Next.js - Homepage principal',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'react-homepage',
          url: 'https://react.dev',
          description: 'React - Nueva documentación oficial',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'docusaurus-homepage',
          url: 'https://docusaurus.io',
          description: 'Docusaurus - Sitio principal',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'vercel-homepage',
          url: 'https://vercel.com',
          description: 'Vercel - Plataforma de deployment',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        },
        {
          name: 'nodejs-homepage',
          url: 'https://nodejs.org',
          description: 'Node.js - Sitio oficial',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'express-homepage',
          url: 'https://expressjs.com',
          description: 'Express.js - Framework web',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'github-homepage',
          url: 'https://github.com',
          description: 'GitHub - Plataforma de desarrollo',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'docker-homepage',
          url: 'https://docker.com',
          description: 'Docker - Containerización',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        },
        {
          name: 'puppeteer-homepage',
          url: 'https://pptr.dev',
          description: 'Puppeteer - Automatización browser',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'playwright-homepage',
          url: 'https://playwright.dev',
          description: 'Playwright - Testing framework',
          viewport: { width: 1920, height: 1080 },
          waitFor: 2000
        },
        {
          name: 'figma-homepage',
          url: 'https://figma.com',
          description: 'Figma - Herramienta de diseño',
          viewport: { width: 1920, height: 1080 },
          waitFor: 3000
        }
      ]
    },
    
    // Screenshots del proyecto actual
    project: {
      outputDir: path.join(__dirname, '..', 'static', 'img', 'projects', 'documentation-center'),
      screenshots: [
        {
          name: 'projects',
          url: `${config.baseUrl}/docs/proyectos`,
          description: 'Sección de proyectos'
        },
        {
          name: 'project-detail',
          url: `${config.baseUrl}/docs/proyectos/centro-documentacion-docusaurus`,
          description: 'Detalle del proyecto'
        },
        {
          name: 'guides',
          url: `${config.baseUrl}/docs/guias`,
          description: 'Sección de guías'
        },
        {
          name: 'resources',
          url: `${config.baseUrl}/docs/recursos`,
          description: 'Sección de recursos'
        }
      ]
    }
  };
  
  // Función para capturar screenshot individual
  const captureScreenshot = async (screenshot, outputDir) => {
    try {
      console.log(`📸 Capturando: ${screenshot.description}...`);
      
      // Set custom viewport if specified
      if (screenshot.viewport) {
        await page.setViewport(screenshot.viewport);
        console.log(`🖥️  Viewport ajustado: ${screenshot.viewport.width}x${screenshot.viewport.height}`);
      } else {
        // Reset to default viewport
        await page.setViewport(config.viewport);
      }
      
      // Skip if authentication is required and we're not authenticated
      if (screenshot.requireAuth) {
        console.log(`🔒 Requiere autenticación, saltando: ${screenshot.name}`);
        return;
      }
      
      await page.goto(screenshot.url, { 
        waitUntil: 'networkidle0',
        timeout: config.timeout
      });
      
      // Wait for custom delay if specified, otherwise use default
      const waitTime = screenshot.waitFor || config.delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Handle cookie banners and popups (common on many sites)
      try {
        // Common cookie banner selectors
        const cookieSelectors = [
          'button[id*="accept"]',
          'button[class*="accept"]',
          'button[class*="cookie"]',
          '[data-testid*="accept"]',
          '.cookie-banner button',
          '#cookie-accept'
        ];
        
        for (const selector of cookieSelectors) {
          const button = await page.$(selector);
          if (button) {
            await button.click();
            console.log(`🍪 Cookie banner cerrado`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
          }
        }
      } catch (e) {
        // Ignore cookie banner errors
      }
      
      // Si hay un selector específico, enfocar en él
      if (screenshot.selector) {
        try {
          await page.waitForSelector(screenshot.selector, { timeout: 5000 });
        } catch (e) {
          console.log(`⚠️  Selector ${screenshot.selector} no encontrado, capturando página completa`);
        }
      }
      
      const outputPath = path.join(outputDir, `${screenshot.name}.png`);
      
      const screenshotOptions = {
        path: outputPath,
        fullPage: screenshot.fullPage !== false, // Por defecto true, a menos que se especifique false
        type: 'png'
      };
      
      // Si hay selector, capturar solo ese elemento
      if (screenshot.selector) {
        try {
          const element = await page.$(screenshot.selector);
          if (element) {
            await element.screenshot({ path: outputPath, type: 'png' });
            console.log(`✅ Guardado (elemento): ${screenshot.name}.png`);
            return;
          }
        } catch (e) {
          // Si falla, continúa con screenshot completo
        }
      }
      
      await page.screenshot(screenshotOptions);
      console.log(`✅ Guardado: ${screenshot.name}.png`);
      
    } catch (error) {
      console.error(`❌ Error capturando ${screenshot.name}:`, error.message);
      
      // Create a placeholder screenshot on error
      try {
        const placeholderPath = path.join(outputDir, `${screenshot.name}.png`);
        const canvas = require('canvas');
        const { createCanvas, loadImage } = canvas;
        
        const canvasWidth = 1200;
        const canvasHeight = 630;
        const canvasObj = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvasObj.getContext('2d');
        
        // Create error placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.fillStyle = '#666666';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Screenshot not available', canvasWidth / 2, canvasHeight / 2 - 20);
        ctx.fillText(screenshot.url, canvasWidth / 2, canvasHeight / 2 + 20);
        
        const buffer = canvasObj.toBuffer('image/png');
        fs.writeFileSync(placeholderPath, buffer);
        console.log(`📝 Placeholder creado para: ${screenshot.name}.png`);
      } catch (placeholderError) {
        // If placeholder creation fails, just log the original error
        console.error(`❌ No se pudo crear placeholder:`, placeholderError.message);
      }
    }
  };
  
  // Función principal de captura
  const captureCategory = async (categoryName, category) => {
    console.log(`\n🗂️  Procesando categoría: ${categoryName}`);
    ensureDirectory(category.outputDir);
    
    for (const screenshot of category.screenshots) {
      await captureScreenshot(screenshot, category.outputDir);
      
      // Pausa entre screenshots para evitar sobrecarga
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };
  
  // Capturar todas las categorías o solo las especificadas
  const categoriesToCapture = config.categories || Object.keys(screenshotCategories);
  
  for (const categoryName of categoriesToCapture) {
    if (screenshotCategories[categoryName]) {
      await captureCategory(categoryName, screenshotCategories[categoryName]);
    } else {
      console.warn(`⚠️  Categoría '${categoryName}' no encontrada`);
    }
  }
  
  await browser.close();
  console.log('\n🎯 ¡Screenshots completados!');
  
  return { success: true, categories: categoriesToCapture };
}

// Funciones de utilidad para diferentes casos de uso

// Capturar solo screenshots locales (para desarrollo)
async function takeLocalScreenshots() {
  return takeScreenshots({
    categories: ['site', 'project'],
    baseUrl: 'http://localhost:3000'
  });
}

// Capturar solo screenshots externos (herramientas y recursos)
async function takeExternalScreenshots() {
  return takeScreenshots({
    categories: ['installation', 'tools'],
    delay: 3000 // Más tiempo para sitios externos
  });
}

// Capturar screenshots específicos de casos de uso
async function takeUseCaseScreenshots() {
  return takeScreenshots({
    categories: ['use_cases'],
    delay: 3000
  });
}

// Capturar screenshots de herramientas (homepages)
async function takeToolScreenshots() {
  return takeScreenshots({
    categories: ['tool_homepages'],
    delay: 3000,
    timeout: 45000 // Longer timeout for external sites
  });
}

// Capturar screenshots completos incluyendo herramientas
async function takeAllScreenshotsWithTools() {
  return takeScreenshots({
    categories: ['site', 'project', 'tools', 'tool_homepages'],
    delay: 3000,
    timeout: 45000
  });
}

// Capturar todo con configuración personalizada
async function takeAllScreenshots(customConfig = {}) {
  return takeScreenshots({
    delay: 3000,
    ...customConfig
  });
}

// CLI interface mejorada
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'all';
  
  const commands = {
    'all': takeAllScreenshots,
    'all-with-tools': takeAllScreenshotsWithTools,
    'local': takeLocalScreenshots,
    'external': takeExternalScreenshots,
    'tools': takeToolScreenshots,
    'use-cases': takeUseCaseScreenshots,
    'help': () => {
      console.log(`
🔧 Scripts de Screenshots - Claude Code Docs

Comandos disponibles:
  all             - Capturar todos los screenshots básicos (por defecto)
  all-with-tools  - Capturar todos incluyendo herramientas
  local           - Solo screenshots locales (site, project)
  external        - Solo screenshots externos (installation, tools)
  tools           - Solo screenshots de herramientas (homepages)
  use-cases       - Solo screenshots de casos de uso
  help            - Mostrar esta ayuda

Ejemplos:
  node scripts/take-screenshots.js all
  node scripts/take-screenshots.js tools
  node scripts/take-screenshots.js all-with-tools
  node scripts/take-screenshots.js local

Configuración:
- Por defecto usa localhost:3000
- Viewport: 1920x1080
- Timeout: 30 segundos (45 para herramientas)
- Delay entre screenshots: 2-3 segundos
- Auto-dismiss cookie banners
- Placeholders en caso de error
      `);
      return Promise.resolve();
    }
  };
  
  const commandFunction = commands[command];
  
  if (!commandFunction) {
    console.error(`❌ Comando '${command}' no reconocido`);
    commands.help();
    process.exit(1);
  }
  
  commandFunction().catch(error => {
    console.error('❌ Error ejecutando screenshots:', error);
    process.exit(1);
  });
}

module.exports = {
  takeScreenshots,
  takeLocalScreenshots,
  takeExternalScreenshots,
  takeUseCaseScreenshots,
  takeToolScreenshots,
  takeAllScreenshots,
  takeAllScreenshotsWithTools
};
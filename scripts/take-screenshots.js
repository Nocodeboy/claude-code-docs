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
      
      await page.goto(screenshot.url, { 
        waitUntil: 'networkidle0',
        timeout: config.timeout
      });
      
      // Esperar tiempo adicional para asegurar que todo se cargue
      await new Promise(resolve => setTimeout(resolve, config.delay));
      
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
        fullPage: screenshot.fullPage !== false // Por defecto true, a menos que se especifique false
      };
      
      // Si hay selector, capturar solo ese elemento
      if (screenshot.selector) {
        try {
          const element = await page.$(screenshot.selector);
          if (element) {
            await element.screenshot({ path: outputPath });
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
    'local': takeLocalScreenshots,
    'external': takeExternalScreenshots,
    'use-cases': takeUseCaseScreenshots,
    'help': () => {
      console.log(`
🔧 Scripts de Screenshots - Claude Code Docs

Comandos disponibles:
  all        - Capturar todos los screenshots (por defecto)
  local      - Solo screenshots locales (site, project)
  external   - Solo screenshots externos (installation, tools)  
  use-cases  - Solo screenshots de casos de uso
  help       - Mostrar esta ayuda

Ejemplos:
  node scripts/take-screenshots.js all
  node scripts/take-screenshots.js local
  node scripts/take-screenshots.js external

Configuración:
- Por defecto usa localhost:3000
- Viewport: 1920x1080
- Timeout: 30 segundos
- Delay entre screenshots: 2 segundos (3 para externos)
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
  takeAllScreenshots
};
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuración optimizada para screenshots de herramientas (16:9 aspect ratio)
const SCREENSHOT_CONFIG = {
  viewport: { width: 1200, height: 800 },
  quality: 85,
  type: 'jpeg',
  optimizeForSpeed: false,
  clip: {
    x: 0,
    y: 0,
    width: 1200,
    height: 675 // 16:9 aspect ratio (1200x675)
  }
};

// Herramientas para capturar con configuración específica
const TOOLS_CONFIG = [
  {
    name: 'nextjs',
    url: 'https://nextjs.org',
    filename: 'nextjs-homepage.jpg',
    description: 'Next.js - The React Framework',
    waitTime: 3000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'react',
    url: 'https://react.dev',
    filename: 'react-homepage.jpg',
    description: 'React - The library for web and native user interfaces',
    waitTime: 3000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'docusaurus',
    url: 'https://docusaurus.io',
    filename: 'docusaurus-homepage.jpg',
    description: 'Docusaurus - Build optimized websites quickly',
    waitTime: 2500,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'vercel',
    url: 'https://vercel.com',
    filename: 'vercel-homepage.jpg',
    description: 'Vercel - Develop. Preview. Ship.',
    waitTime: 4000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'nodejs',
    url: 'https://nodejs.org',
    filename: 'nodejs-homepage.jpg',
    description: 'Node.js - JavaScript runtime',
    waitTime: 2500,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'express',
    url: 'https://expressjs.com',
    filename: 'express-homepage.jpg',
    description: 'Express - Fast, unopinionated, minimalist web framework',
    waitTime: 2000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'github',
    url: 'https://github.com',
    filename: 'github-homepage.jpg',
    description: 'GitHub - Where the world builds software',
    waitTime: 3000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'docker',
    url: 'https://docker.com',
    filename: 'docker-homepage.jpg',
    description: 'Docker - Accelerated Container Application Development',
    waitTime: 4000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'puppeteer',
    url: 'https://pptr.dev',
    filename: 'puppeteer-homepage.jpg',
    description: 'Puppeteer - Headless Chrome Node.js API',
    waitTime: 2500,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'playwright',
    url: 'https://playwright.dev',
    filename: 'playwright-homepage.jpg',
    description: 'Playwright - Reliable end-to-end testing',
    waitTime: 3000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  },
  {
    name: 'figma',
    url: 'https://figma.com',
    filename: 'figma-homepage.jpg',
    description: 'Figma - The collaborative interface design tool',
    waitTime: 4000,
    scrollTo: 0,
    customClip: { x: 0, y: 0, width: 1200, height: 675 }
  }
];

// Función para crear directorio si no existe
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para capturar screenshot optimizado
async function captureOptimizedScreenshot(page, tool, outputDir) {
  try {
    console.log(`📸 Capturando ${tool.description}...`);

    // Configurar viewport
    await page.setViewport(SCREENSHOT_CONFIG.viewport);
    
    // Navegar a la página
    await page.goto(tool.url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Esperar tiempo específico para la herramienta
    await new Promise(resolve => setTimeout(resolve, tool.waitTime));

    // Scroll si es necesario
    if (tool.scrollTo !== undefined) {
      await page.evaluate((scrollY) => {
        window.scrollTo(0, scrollY);
      }, tool.scrollTo);
      
      // Esperar un poco después del scroll
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Cerrar banners de cookies si existen (común en sitios web)
    try {
      const cookieBanners = [
        'button[aria-label*="cookie" i]',
        'button[aria-label*="accept" i]',
        '[data-testid*="cookie"]',
        '.cookie-banner button',
        '#cookie-banner button',
        '[id*="cookie"] button',
        '[class*="cookie"] button'
      ];

      for (const selector of cookieBanners) {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          console.log('🍪 Banner de cookies cerrado');
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
      }
    } catch (e) {
      // Ignorar errores de cierre de banner
    }

    const outputPath = path.join(outputDir, tool.filename);
    const clip = tool.customClip || SCREENSHOT_CONFIG.clip;

    // Capturar screenshot optimizado
    await page.screenshot({
      path: outputPath,
      type: SCREENSHOT_CONFIG.type,
      quality: SCREENSHOT_CONFIG.quality,
      clip: clip,
      optimizeForSpeed: SCREENSHOT_CONFIG.optimizeForSpeed
    });

    console.log(`✅ Capturado: ${tool.filename} (${clip.width}x${clip.height})`);
    
    return {
      success: true,
      filename: tool.filename,
      dimensions: `${clip.width}x${clip.height}`,
      size: fs.statSync(outputPath).size
    };

  } catch (error) {
    console.error(`❌ Error capturando ${tool.name}:`, error.message);
    return {
      success: false,
      filename: tool.filename,
      error: error.message
    };
  }
}

// Función principal para optimizar screenshots
async function optimizeToolScreenshots() {
  console.log('🚀 Iniciando captura de screenshots optimizados...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'screenshots');
  ensureDirectory(outputDir);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: SCREENSHOT_CONFIG.viewport,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();
  
  // Configurar headers para aparecer como un navegador real
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  const results = [];

  for (const tool of TOOLS_CONFIG) {
    const result = await captureOptimizedScreenshot(page, tool, outputDir);
    results.push({ tool: tool.name, ...result });
    
    // Pausa entre capturas para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await browser.close();

  // Generar reporte
  console.log('\n📊 Reporte de screenshots optimizados:');
  console.log('======================================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Screenshots capturados: ${successful.length}`);
  console.log(`❌ Screenshots fallidos: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\nCapturas exitosas:');
    successful.forEach(r => {
      const sizeKB = r.size ? Math.round(r.size / 1024) : 'unknown';
      console.log(`  - ${r.tool}: ${r.filename} (${r.dimensions}, ${sizeKB}KB)`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\nCapturas fallidas:');
    failed.forEach(r => {
      console.log(`  - ${r.tool}: ${r.error}`);
    });
  }
  
  console.log(`\n📁 Screenshots guardados en: static/img/tools/screenshots/`);
  console.log('🎉 Proceso completado!');
  
  return results;
}

// CLI interface
if (require.main === module) {
  optimizeToolScreenshots()
    .catch(error => {
      console.error('💥 Error general:', error);
      process.exit(1);
    });
}

module.exports = {
  optimizeToolScreenshots,
  TOOLS_CONFIG
};
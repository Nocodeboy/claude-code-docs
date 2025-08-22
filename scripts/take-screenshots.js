const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function takeScreenshots() {
  console.log('🚀 Iniciando captura de screenshots...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  
  const page = await browser.newPage();
  
  // Configurar timeout y esperar por redes
  await page.setDefaultTimeout(30000);
  
  const baseUrl = 'http://localhost:3011';
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'projects', 'documentation-center');
  
  // Asegurar que el directorio existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const screenshots = [
    {
      name: 'homepage',
      url: baseUrl,
      description: 'Página de inicio completa'
    },
    {
      name: 'blog',
      url: `${baseUrl}/blog`,
      description: 'Sistema de blog'
    },
    {
      name: 'documentation',
      url: `${baseUrl}/docs/intro`,
      description: 'Página de documentación'
    },
    {
      name: 'projects',
      url: `${baseUrl}/docs/proyectos`,
      description: 'Sección de proyectos'
    },
    {
      name: 'project-detail',
      url: `${baseUrl}/docs/proyectos/centro-documentacion-docusaurus`,
      description: 'Documentación del proyecto'
    }
  ];
  
  for (const screenshot of screenshots) {
    try {
      console.log(`📸 Capturando: ${screenshot.description}...`);
      
      await page.goto(screenshot.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Esperar un poco más para asegurar que todo se cargue
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const outputPath = path.join(outputDir, `${screenshot.name}.png`);
      
      await page.screenshot({
        path: outputPath,
        fullPage: true
      });
      
      console.log(`✅ Guardado: ${screenshot.name}.png`);
      
    } catch (error) {
      console.error(`❌ Error capturando ${screenshot.name}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎯 Screenshots completados!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  takeScreenshots().catch(console.error);
}

module.exports = takeScreenshots;
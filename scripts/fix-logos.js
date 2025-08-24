const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs específicas para logos PNG reales de alta calidad
const REAL_PNG_SOURCES = {
  'nextjs': {
    name: 'Next.js',
    url: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
    fallback: 'https://nextjs.org/favicon.ico',
    filename: 'nextjs-logo.png'
  },
  'react': {
    name: 'React',
    url: 'https://react.dev/favicon-32x32.png',
    filename: 'react-logo.png'
  },
  'docusaurus': {
    name: 'Docusaurus',
    url: 'https://docusaurus.io/img/docusaurus.png',
    filename: 'docusaurus-logo.png'
  },
  'vercel': {
    name: 'Vercel',
    url: 'https://vercel.com/favicon.ico',
    filename: 'vercel-logo.png'
  },
  'nodejs': {
    name: 'Node.js',
    url: 'https://nodejs.org/static/images/favicons/apple-touch-icon.png',
    fallback: 'https://raw.githubusercontent.com/nodejs/nodejs.org/main/public/static/images/favicons/favicon-32x32.png',
    filename: 'nodejs-logo.png'
  },
  'express': {
    name: 'Express',
    url: 'https://expressjs.com/images/favicon.png',
    filename: 'express-logo.png'
  },
  'github': {
    name: 'GitHub',
    url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    fallback: 'https://github.com/favicon.ico',
    filename: 'github-logo.png'
  },
  'docker': {
    name: 'Docker',
    url: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
    fallback: 'https://raw.githubusercontent.com/docker/docs/main/content/assets/images/docker-icon.png',
    filename: 'docker-logo.png'
  },
  'puppeteer': {
    name: 'Puppeteer',
    url: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png',
    filename: 'puppeteer-logo.png'
  },
  'playwright': {
    name: 'Playwright',
    url: 'https://playwright.dev/img/playwright-logo.png',
    fallback: 'https://raw.githubusercontent.com/microsoft/playwright/main/utils/docker/playwright-logo.png',
    filename: 'playwright-logo.png'
  },
  'figma': {
    name: 'Figma',
    url: 'https://static.figma.com/app/icon/1/icon-192.png',
    fallback: 'https://figma.com/favicon.ico',
    filename: 'figma-logo.png'
  }
};

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    console.log(`  🔄 Descargando desde: ${url}`);
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const contentType = response.headers['content-type'] || '';
        
        // Verificar que realmente sea una imagen válida
        if (!contentType.includes('image/')) {
          file.close();
          fs.unlink(filepath, () => {});
          reject(new Error(`Invalid content type: ${contentType}`));
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(filepath).size;
          console.log(`  ✅ Descargado: ${path.basename(filepath)} (${Math.round(size/1024)}KB, ${contentType})`);
          resolve({ success: true, filepath, size, contentType });
        });
      } else {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });
    
    request.on('error', (error) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(error);
    });
    
    request.on('timeout', () => {
      request.destroy();
      file.close();
      fs.unlink(filepath, () => {});
      reject(new Error('Download timeout'));
    });
    
    file.on('error', (error) => {
      fs.unlink(filepath, () => {});
      reject(error);
    });
  });
}

async function fixLogos() {
  console.log('🔧 Arreglando logos con fuentes PNG reales...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'logos');
  ensureDirectory(outputDir);
  
  const results = [];
  
  for (const [toolId, config] of Object.entries(REAL_PNG_SOURCES)) {
    console.log(`\\n📡 Procesando ${config.name}...`);
    
    let downloaded = false;
    let downloadResult = null;
    
    try {
      const filepath = path.join(outputDir, config.filename);
      downloadResult = await downloadImage(config.url, filepath);
      downloaded = true;
    } catch (error) {
      console.log(`  ❌ Error con URL principal: ${error.message}`);
      
      if (config.fallback) {
        console.log(`  🔄 Intentando fallback...`);
        try {
          const filepath = path.join(outputDir, config.filename);
          downloadResult = await downloadImage(config.fallback, filepath);
          downloaded = true;
        } catch (fallbackError) {
          console.log(`  ❌ Error con fallback: ${fallbackError.message}`);
        }
      }
    }
    
    results.push({
      tool: toolId,
      name: config.name,
      success: downloaded,
      filename: downloaded ? config.filename : null,
      size: downloadResult ? downloadResult.size : null,
      contentType: downloadResult ? downloadResult.contentType : null,
      error: downloaded ? null : 'No se pudo descargar desde ninguna fuente'
    });
    
    // Pausa entre descargas
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Generar reporte
  console.log('\\n📊 Reporte de arreglo de logos:');
  console.log('===============================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Logos arreglados: ${successful.length}`);
  console.log(`❌ Logos fallidos: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\\nLogos exitosos:');
    successful.forEach(r => {
      const sizeKB = r.size ? Math.round(r.size / 1024) : 'unknown';
      console.log(`  - ${r.name}: ${r.filename} (${sizeKB}KB, ${r.contentType})`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\\nLogos fallidos:');
    failed.forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }
  
  console.log('\\n🎯 Logos guardados en: static/img/tools/logos/');
  console.log('🎉 Proceso completado!');
  
  return results;
}

if (require.main === module) {
  fixLogos()
    .catch(error => {
      console.error('💥 Error general:', error);
      process.exit(1);
    });
}

module.exports = { fixLogos };
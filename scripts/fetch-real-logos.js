const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs directas a logos oficiales de alta calidad (PNG/JPG)
const LOGO_SOURCES = {
  'nextjs': {
    name: 'Next.js',
    urls: [
      'https://nextjs.org/static/favicon/favicon-32x32.png',
      'https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png',
      'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg'
    ],
    filename: 'nextjs-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nextdotjs.svg'
  },
  'react': {
    name: 'React',
    urls: [
      'https://react.dev/favicon-32x32.png',
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg'
    ],
    filename: 'react-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg'
  },
  'docusaurus': {
    name: 'Docusaurus',
    urls: [
      'https://docusaurus.io/img/docusaurus.png',
      'https://docusaurus.io/img/favicon.ico',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docusaurus.svg'
    ],
    filename: 'docusaurus-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docusaurus.svg'
  },
  'vercel': {
    name: 'Vercel',
    urls: [
      'https://vercel.com/favicon.ico',
      'https://assets.vercel.com/image/upload/front/favicon/vercel/32x32.png',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg'
    ],
    filename: 'vercel-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg'
  },
  'nodejs': {
    name: 'Node.js',
    urls: [
      'https://nodejs.org/static/images/favicons/favicon-32x32.png',
      'https://nodejs.org/static/images/logo.svg',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodedotjs.svg'
    ],
    filename: 'nodejs-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodedotjs.svg'
  },
  'express': {
    name: 'Express',
    urls: [
      'https://expressjs.com/images/favicon.png',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/express.svg'
    ],
    filename: 'express-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/express.svg'
  },
  'github': {
    name: 'GitHub',
    urls: [
      'https://github.com/favicon.ico',
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg'
    ],
    filename: 'github-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg'
  },
  'docker': {
    name: 'Docker',
    urls: [
      'https://docker.com/favicon.ico',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg'
    ],
    filename: 'docker-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg'
  },
  'puppeteer': {
    name: 'Puppeteer',
    urls: [
      'https://pptr.dev/img/puppeteer.png',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/puppeteer.svg'
    ],
    filename: 'puppeteer-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/puppeteer.svg'
  },
  'playwright': {
    name: 'Playwright',
    urls: [
      'https://playwright.dev/img/playwright-logo.svg',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/playwright.svg'
    ],
    filename: 'playwright-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/playwright.svg'
  },
  'figma': {
    name: 'Figma',
    urls: [
      'https://figma.com/favicon.ico',
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg'
    ],
    filename: 'figma-logo.png',
    fallback: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg'
  }
};

// Función para crear directorio si no existe
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para verificar si una URL devuelve contenido válido
function checkUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, { timeout: 10000 }, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const contentType = response.headers['content-type'] || '';
        const contentLength = parseInt(response.headers['content-length'] || '0');
        
        // Verificar que sea una imagen y tenga un tamaño razonable
        if (contentType.includes('image') && contentLength > 100) {
          resolve({ valid: true, url, contentType, size: contentLength });
        } else {
          resolve({ valid: false, reason: `Invalid content: ${contentType}, size: ${contentLength}` });
        }
      } else {
        resolve({ valid: false, reason: `HTTP ${response.statusCode}` });
      }
      response.destroy();
    });
    
    request.on('error', () => {
      resolve({ valid: false, reason: 'Network error' });
    });
    
    request.on('timeout', () => {
      request.destroy();
      resolve({ valid: false, reason: 'Timeout' });
    });
  });
}

// Función para descargar imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve({ success: true, filepath, size: fs.statSync(filepath).size });
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

// Función principal para obtener logos reales
async function fetchRealLogos() {
  console.log('🎨 Obteniendo logos reales de herramientas...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'logos');
  ensureDirectory(outputDir);
  
  const results = [];
  
  for (const [toolId, config] of Object.entries(LOGO_SOURCES)) {
    console.log(`\n📡 Procesando ${config.name}...`);
    
    let downloaded = false;
    let downloadResult = null;
    
    // Probar cada URL hasta encontrar una válida
    for (const url of config.urls) {
      console.log(`  🔍 Verificando: ${url}`);
      
      const check = await checkUrl(url);
      if (check.valid) {
        console.log(`  ✅ URL válida: ${check.contentType}, ${check.size} bytes`);
        
        try {
          const filepath = path.join(outputDir, config.filename);
          downloadResult = await downloadImage(url, filepath);
          console.log(`  💾 Descargado: ${config.filename} (${Math.round(downloadResult.size / 1024)}KB)`);
          downloaded = true;
          break;
        } catch (error) {
          console.log(`  ❌ Error descargando: ${error.message}`);
        }
      } else {
        console.log(`  ⏭️  URL no válida: ${check.reason}`);
      }
    }
    
    // Si no se pudo descargar, usar fallback
    if (!downloaded && config.fallback) {
      console.log(`  🔄 Intentando fallback: ${config.fallback}`);
      
      try {
        const filepath = path.join(outputDir, config.filename);
        downloadResult = await downloadImage(config.fallback, filepath);
        console.log(`  💾 Fallback descargado: ${config.filename} (${Math.round(downloadResult.size / 1024)}KB)`);
        downloaded = true;
      } catch (error) {
        console.log(`  ❌ Error con fallback: ${error.message}`);
      }
    }
    
    results.push({
      tool: toolId,
      name: config.name,
      success: downloaded,
      filename: downloaded ? config.filename : null,
      size: downloadResult ? downloadResult.size : null,
      error: downloaded ? null : 'No se pudo descargar desde ninguna fuente'
    });
    
    // Pausa entre descargas
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Generar reporte
  console.log('\n📊 Reporte de descarga de logos:');
  console.log('=================================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Logos descargados: ${successful.length}`);
  console.log(`❌ Logos fallidos: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\nLogos exitosos:');
    successful.forEach(r => {
      const sizeKB = r.size ? Math.round(r.size / 1024) : 'unknown';
      console.log(`  - ${r.name}: ${r.filename} (${sizeKB}KB)`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\nLogos fallidos:');
    failed.forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }
  
  console.log('\n🎯 Logos guardados en: static/img/tools/logos/');
  console.log('🎉 Proceso completado!');
  
  return results;
}

// CLI interface
if (require.main === module) {
  fetchRealLogos()
    .catch(error => {
      console.error('💥 Error general:', error);
      process.exit(1);
    });
}

module.exports = {
  fetchRealLogos,
  LOGO_SOURCES
};
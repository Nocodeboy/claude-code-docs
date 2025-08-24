const https = require('https');
const fs = require('fs');
const path = require('path');

// Fuentes premium de logos con múltiples opciones de alta calidad
const PREMIUM_LOGO_SOURCES = {
  'nextjs': {
    name: 'Next.js',
    sources: [
      {
        url: 'https://raw.githubusercontent.com/vercel/next.js/canary/docs/public/favicon/favicon-32x32.png',
        quality: 'high'
      },
      {
        url: 'https://nextjs.org/favicon.ico',
        quality: 'medium'
      },
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/nextjs.svg',
        quality: 'high'
      }
    ],
    filename: 'nextjs-logo.png'
  },
  'react': {
    name: 'React',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/react.svg',
        quality: 'high'
      },
      {
        url: 'https://react.dev/favicon-32x32.png',
        quality: 'medium'
      },
      {
        url: 'https://raw.githubusercontent.com/facebook/react/main/packages/react-devtools-extensions/icons/32-padded.png',
        quality: 'high'
      }
    ],
    filename: 'react-logo.png'
  },
  'docusaurus': {
    name: 'Docusaurus',
    sources: [
      {
        url: 'https://docusaurus.io/img/docusaurus_keytar.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/facebook/docusaurus/main/website/static/img/docusaurus.svg',
        quality: 'high'
      },
      {
        url: 'https://docusaurus.io/img/favicon.ico',
        quality: 'medium'
      }
    ],
    filename: 'docusaurus-logo.png'
  },
  'vercel': {
    name: 'Vercel',
    sources: [
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/vercel.svg',
        quality: 'high'
      },
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
        quality: 'high'
      },
      {
        url: 'https://vercel.com/favicon.ico',
        quality: 'medium'
      }
    ],
    filename: 'vercel-logo.png'
  },
  'nodejs': {
    name: 'Node.js',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/nodejs.svg',
        quality: 'high'
      },
      {
        url: 'https://nodejs.org/static/images/favicons/favicon-32x32.png',
        quality: 'medium'
      },
      {
        url: 'https://raw.githubusercontent.com/nodejs/nodejs.org/main/public/static/images/logo-light.svg',
        quality: 'high'
      }
    ],
    filename: 'nodejs-logo.png'
  },
  'express': {
    name: 'Express',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/express.svg',
        quality: 'high'
      },
      {
        url: 'https://expressjs.com/images/favicon.png',
        quality: 'low'
      }
    ],
    filename: 'express-logo.png'
  },
  'github': {
    name: 'GitHub',
    sources: [
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/github.svg',
        quality: 'high'
      },
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        quality: 'high'
      },
      {
        url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
        quality: 'high'
      },
      {
        url: 'https://github.com/favicon.ico',
        quality: 'medium'
      }
    ],
    filename: 'github-logo.png'
  },
  'docker': {
    name: 'Docker',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/docker.svg',
        quality: 'high'
      },
      {
        url: 'https://www.docker.com/wp-content/uploads/2023/05/symbol_blue-docker-logo.png',
        quality: 'high'
      }
    ],
    filename: 'docker-logo.png'
  },
  'puppeteer': {
    name: 'Puppeteer',
    sources: [
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/puppeteer.svg',
        quality: 'high'
      },
      {
        url: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/puppeteer/puppeteer/main/website/static/img/puppeteer.png',
        quality: 'high'
      }
    ],
    filename: 'puppeteer-logo.png'
  },
  'playwright': {
    name: 'Playwright',
    sources: [
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/playwright.svg',
        quality: 'high'
      },
      {
        url: 'https://playwright.dev/img/playwright-logo.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/microsoft/playwright/main/utils/docker/Dockerfile.jammy',
        quality: 'low'
      }
    ],
    filename: 'playwright-logo.png'
  },
  'figma': {
    name: 'Figma',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/figma.svg',
        quality: 'high'
      },
      {
        url: 'https://static.figma.com/app/icon/1/favicon.png',
        quality: 'medium'
      }
    ],
    filename: 'figma-logo.png'
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
    sources: [
      {
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        quality: 'high'
      },
      {
        url: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/tailwind.svg',
        quality: 'high'
      },
      {
        url: 'https://tailwindcss.com/favicon-32x32.png',
        quality: 'medium'
      },
      {
        url: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg',
        quality: 'high'
      }
    ],
    filename: 'tailwindcss-logo.png'
  },
  'shadcnui': {
    name: 'shadcn/ui',
    sources: [
      {
        url: 'https://ui.shadcn.com/favicon.ico',
        quality: 'medium'
      },
      {
        url: 'https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/favicon.ico',
        quality: 'medium'
      },
      {
        url: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
        quality: 'high'
      },
      {
        url: 'https://ui.shadcn.com/apple-touch-icon.png',
        quality: 'high'
      }
    ],
    filename: 'shadcnui-logo.png'
  }
};

// Función para crear directorio si no existe
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para verificar calidad de URL
function checkUrlQuality(url) {
  return new Promise((resolve) => {
    const request = https.get(url, { timeout: 15000 }, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const contentType = response.headers['content-type'] || '';
        const contentLength = parseInt(response.headers['content-length'] || '0');
        
        let score = 0;
        
        // Puntuación por tamaño
        if (contentLength > 10000) score += 3;
        else if (contentLength > 5000) score += 2;
        else if (contentLength > 1000) score += 1;
        
        // Puntuación por tipo
        if (contentType.includes('svg')) score += 3;
        else if (contentType.includes('png')) score += 2;
        else if (contentType.includes('image')) score += 1;
        
        resolve({ 
          valid: true, 
          url, 
          contentType, 
          size: contentLength, 
          score,
          quality: score > 4 ? 'premium' : score > 2 ? 'good' : 'acceptable'
        });
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

// Función para descargar con reintentos
function downloadWithRetry(url, filepath, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (attemptsLeft) => {
      const file = fs.createWriteStream(filepath);
      
      const request = https.get(url, { timeout: 30000 }, (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(filepath);
            resolve({ success: true, filepath, size: stats.size });
          });
        } else if (attemptsLeft > 0) {
          file.close();
          fs.unlink(filepath, () => {});
          console.log(`  🔄 Reintentando descarga (${attemptsLeft} intentos restantes)...`);
          setTimeout(() => attempt(attemptsLeft - 1), 2000);
        } else {
          file.close();
          fs.unlink(filepath, () => {});
          reject(new Error(`HTTP ${response.statusCode} after ${retries} retries`));
        }
      });
      
      request.on('error', (error) => {
        file.close();
        fs.unlink(filepath, () => {});
        if (attemptsLeft > 0) {
          console.log(`  🔄 Reintentando por error de red (${attemptsLeft} intentos restantes)...`);
          setTimeout(() => attempt(attemptsLeft - 1), 2000);
        } else {
          reject(error);
        }
      });
      
      request.on('timeout', () => {
        request.destroy();
        file.close();
        fs.unlink(filepath, () => {});
        if (attemptsLeft > 0) {
          console.log(`  🔄 Reintentando por timeout (${attemptsLeft} intentos restantes)...`);
          setTimeout(() => attempt(attemptsLeft - 1), 2000);
        } else {
          reject(new Error('Download timeout after retries'));
        }
      });
    };
    
    attempt(retries);
  });
}

// Función principal mejorada
async function getPremiumLogos() {
  console.log('🎨 Obteniendo logos premium de múltiples fuentes...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'logos');
  ensureDirectory(outputDir);
  
  const results = [];
  
  for (const [toolId, config] of Object.entries(PREMIUM_LOGO_SOURCES)) {
    console.log(`\n📡 Procesando ${config.name}...`);
    
    // Evaluar todas las fuentes
    const sourceQualities = [];
    for (const source of config.sources) {
      console.log(`  🔍 Evaluando: ${source.url}`);
      const quality = await checkUrlQuality(source.url);
      if (quality.valid) {
        sourceQualities.push({ ...source, ...quality });
        console.log(`  📊 Calidad: ${quality.quality} (${quality.contentType}, ${quality.size} bytes, score: ${quality.score})`);
      } else {
        console.log(`  ❌ No válido: ${quality.reason}`);
      }
    }
    
    // Ordenar por calidad (score más alto primero)
    sourceQualities.sort((a, b) => b.score - a.score);
    
    let downloaded = false;
    let downloadResult = null;
    
    // Intentar descargar desde la mejor fuente disponible
    for (const source of sourceQualities) {
      if (source.score >= 3) { // Solo fuentes de calidad decente
        console.log(`  🎯 Descargando desde mejor fuente: ${source.quality} (score: ${source.score})`);
        
        try {
          const filepath = path.join(outputDir, config.filename);
          downloadResult = await downloadWithRetry(source.url, filepath);
          console.log(`  ✅ Descargado: ${config.filename} (${Math.round(downloadResult.size / 1024)}KB)`);
          downloaded = true;
          break;
        } catch (error) {
          console.log(`  ❌ Error descargando: ${error.message}`);
        }
      }
    }
    
    results.push({
      tool: toolId,
      name: config.name,
      success: downloaded,
      filename: downloaded ? config.filename : null,
      size: downloadResult ? downloadResult.size : null,
      quality: downloaded ? sourceQualities[0]?.quality || 'unknown' : null,
      error: downloaded ? null : 'No se encontraron fuentes de calidad suficiente'
    });
    
    // Pausa entre herramientas
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Generar reporte detallado
  console.log('\n📊 Reporte de logos premium:');
  console.log('==============================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Logos premium descargados: ${successful.length}`);
  console.log(`❌ Logos fallidos: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\nLogos premium exitosos:');
    successful.forEach(r => {
      const sizeKB = r.size ? Math.round(r.size / 1024) : 'unknown';
      console.log(`  - ${r.name}: ${r.filename} (${r.quality}, ${sizeKB}KB)`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\nLogos fallidos:');
    failed.forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
  }
  
  console.log('\n🎯 Logos premium guardados en: static/img/tools/logos/');
  console.log('🎉 Proceso completado!');
  
  return results;
}

// CLI interface
if (require.main === module) {
  getPremiumLogos()
    .catch(error => {
      console.error('💥 Error general:', error);
      process.exit(1);
    });
}

module.exports = {
  getPremiumLogos,
  PREMIUM_LOGO_SOURCES
};
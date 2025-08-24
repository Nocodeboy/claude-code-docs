const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuración de la API de Brandfetch
const BRANDFETCH_API_KEY = 'l4Ook05/n9c63L6KGSSffdbmkiKEQ9jmrIog4CwLqE=';
const BRANDFETCH_BASE_URL = 'https://api.brandfetch.io/v2/brands';

// Herramientas para obtener logos
const TOOLS_TO_FETCH = [
  { name: 'nextjs', domain: 'nextjs.org', filename: 'nextjs-logo.svg' },
  { name: 'react', domain: 'reactjs.org', filename: 'react-logo.svg' },
  { name: 'docusaurus', domain: 'docusaurus.io', filename: 'docusaurus-logo.svg' },
  { name: 'vercel', domain: 'vercel.com', filename: 'vercel-logo.svg' },
  { name: 'nodejs', domain: 'nodejs.org', filename: 'nodejs-logo.svg' },
  { name: 'express', domain: 'expressjs.com', filename: 'express-logo.svg' },
  { name: 'github', domain: 'github.com', filename: 'github-logo.svg' },
  { name: 'docker', domain: 'docker.com', filename: 'docker-logo.svg' },
  { name: 'puppeteer', domain: 'pptr.dev', filename: 'puppeteer-logo.svg' },
  { name: 'playwright', domain: 'playwright.dev', filename: 'playwright-logo.svg' },
  { name: 'figma', domain: 'figma.com', filename: 'figma-logo.svg' }
];

// Función para crear directorio si no existe
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para hacer peticiones HTTPS
function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${BRANDFETCH_API_KEY}`,
        'User-Agent': 'Academy NoCode Tools Directory',
        ...headers
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (e) {
            resolve(data); // Para imágenes u otros datos binarios
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

// Función para descargar imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// Función principal para obtener logos
async function fetchToolLogos() {
  console.log('🎨 Iniciando descarga de logos desde Brandfetch...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'logos');
  ensureDirectory(outputDir);
  
  const results = [];
  
  for (const tool of TOOLS_TO_FETCH) {
    try {
      console.log(`\n📡 Obteniendo logo para ${tool.name} (${tool.domain})...`);
      
      // Obtener información de la marca
      const brandUrl = `${BRANDFETCH_BASE_URL}/${tool.domain}`;
      const brandData = await makeRequest(brandUrl);
      
      if (brandData.logos && brandData.logos.length > 0) {
        // Buscar el mejor logo (preferiblemente SVG, o el de mayor resolución)
        let bestLogo = brandData.logos[0];
        
        for (const logo of brandData.logos) {
          // Priorizar SVG
          if (logo.formats && logo.formats.some(f => f.format === 'svg')) {
            bestLogo = logo;
            break;
          }
          // O el de mayor resolución
          if (logo.formats && logo.formats[0] && 
              (!bestLogo.formats || !bestLogo.formats[0] || 
               (logo.formats[0].width || 0) > (bestLogo.formats[0].width || 0))) {
            bestLogo = logo;
          }
        }
        
        if (bestLogo.formats && bestLogo.formats.length > 0) {
          const logoFormat = bestLogo.formats[0];
          const logoUrl = logoFormat.src;
          
          // Determinar extensión del archivo
          const extension = logoFormat.format === 'svg' ? 'svg' : 
                          logoFormat.format === 'png' ? 'png' : 'jpg';
          const filename = tool.filename.replace('.svg', `.${extension}`);
          const filepath = path.join(outputDir, filename);
          
          // Descargar logo
          await downloadImage(logoUrl, filepath);
          
          console.log(`✅ Logo descargado: ${filename}`);
          results.push({
            tool: tool.name,
            success: true,
            filename: filename,
            format: extension,
            size: logoFormat.width ? `${logoFormat.width}x${logoFormat.height}` : 'unknown'
          });
        } else {
          throw new Error('No se encontraron formatos de logo válidos');
        }
      } else {
        throw new Error('No se encontraron logos para esta marca');
      }
      
    } catch (error) {
      console.error(`❌ Error obteniendo logo para ${tool.name}:`, error.message);
      results.push({
        tool: tool.name,
        success: false,
        error: error.message
      });
      
      // Crear un logo de fallback simple
      const fallbackPath = path.join(outputDir, tool.filename);
      const fallbackSvg = createFallbackLogo(tool.name);
      fs.writeFileSync(fallbackPath, fallbackSvg);
      console.log(`📦 Logo de fallback creado: ${tool.filename}`);
    }
    
    // Pausa entre peticiones para no sobrecargar la API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Función para crear logos de fallback
function createFallbackLogo(toolName) {
  const initial = toolName.charAt(0).toUpperCase();
  const color = getToolColor(toolName);
  
  return `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="${color}"/>
    <text x="32" y="40" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="white">${initial}</text>
  </svg>`;
}

// Función para obtener colores por herramienta
function getToolColor(toolName) {
  const colors = {
    nextjs: '#000000',
    react: '#61DAFB',
    docusaurus: '#3ECC5F',
    vercel: '#000000',
    nodejs: '#339933',
    express: '#000000',
    github: '#181717',
    docker: '#2496ED',
    puppeteer: '#40E0D0',
    playwright: '#2EAD33',
    figma: '#F24E1E'
  };
  
  return colors[toolName] || '#ff5722';
}

// Función para generar reporte
function generateReport(results) {
  console.log('\n📊 Reporte de descarga de logos:');
  console.log('================================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Logos descargados exitosamente: ${successful.length}`);
  console.log(`❌ Logos fallidos: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\nLogos exitosos:');
    successful.forEach(r => {
      console.log(`  - ${r.tool}: ${r.filename} (${r.format}, ${r.size})`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\nLogos fallidos:');
    failed.forEach(r => {
      console.log(`  - ${r.tool}: ${r.error}`);
    });
  }
  
  console.log('\n🎯 Todos los logos están disponibles en static/img/tools/logos/');
}

// CLI interface
if (require.main === module) {
  fetchToolLogos()
    .then(results => {
      generateReport(results);
      console.log('\n🎉 Proceso completado!');
    })
    .catch(error => {
      console.error('💥 Error general:', error);
      process.exit(1);
    });
}

module.exports = {
  fetchToolLogos,
  TOOLS_TO_FETCH
};
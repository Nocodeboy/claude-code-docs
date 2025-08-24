/**
 * Brandfetch API Integration for Tool Logos
 * Academy NoCode - Enhanced Tools Directory
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

class BrandfetchClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.brandfetch.io/v2';
    this.rateLimitDelay = 1000; // 1 second between requests
  }

  /**
   * Fetch brand data from Brandfetch API
   */
  async fetchBrandData(domain) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/brands/${domain}`;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
          'User-Agent': 'AcademyNoCode-Tools/1.0'
        }
      };

      console.log(`🔍 Buscando datos de marca para: ${domain}...`);

      const req = https.request(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              const brandData = JSON.parse(data);
              console.log(`✅ Datos encontrados para ${domain}`);
              resolve(brandData);
            } else if (res.statusCode === 429) {
              console.log(`⏳ Rate limit alcanzado para ${domain}, reintentando...`);
              // Retry after longer delay
              setTimeout(() => {
                this.fetchBrandData(domain).then(resolve).catch(reject);
              }, 3000);
            } else {
              console.log(`⚠️  No se encontraron datos para ${domain} (${res.statusCode})`);
              resolve(null);
            }
          } catch (error) {
            console.error(`❌ Error parseando respuesta para ${domain}:`, error.message);
            resolve(null);
          }
        });
      });

      req.on('error', (error) => {
        console.error(`❌ Error de red para ${domain}:`, error.message);
        resolve(null);
      });

      req.setTimeout(10000, () => {
        req.abort();
        console.error(`⏱️  Timeout para ${domain}`);
        resolve(null);
      });

      req.end();
    });
  }

  /**
   * Download logo from URL
   */
  async downloadLogo(logoUrl, outputPath) {
    return new Promise((resolve, reject) => {
      const url = new URL(logoUrl);
      const client = url.protocol === 'https:' ? https : http;

      console.log(`📥 Descargando logo desde: ${logoUrl}`);

      const req = client.request(logoUrl, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(outputPath);
          
          res.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✅ Logo guardado: ${path.basename(outputPath)}`);
            resolve(outputPath);
          });

          fileStream.on('error', (error) => {
            fs.unlink(outputPath, () => {}); // Clean up failed download
            console.error(`❌ Error guardando logo:`, error.message);
            reject(error);
          });
        } else {
          console.error(`❌ Error descargando logo: HTTP ${res.statusCode}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', (error) => {
        console.error(`❌ Error de red descargando logo:`, error.message);
        reject(error);
      });

      req.setTimeout(15000, () => {
        req.abort();
        reject(new Error('Download timeout'));
      });

      req.end();
    });
  }

  /**
   * Get best logo from brand data
   */
  getBestLogo(brandData, preferredType = 'symbol') {
    if (!brandData || !brandData.logos) {
      return null;
    }

    // Priority order: symbol, icon, logo
    const typePreference = ['symbol', 'icon', 'logo'];
    const formatPreference = ['svg', 'png', 'jpg', 'jpeg'];

    let bestLogo = null;
    let bestScore = -1;

    for (const logo of brandData.logos) {
      let score = 0;
      
      // Type preference
      const typeIndex = typePreference.indexOf(logo.type);
      if (typeIndex !== -1) {
        score += (typePreference.length - typeIndex) * 10;
      }

      // Format preference  
      const format = logo.formats?.[0]?.format?.toLowerCase();
      const formatIndex = formatPreference.indexOf(format);
      if (formatIndex !== -1) {
        score += (formatPreference.length - formatIndex) * 5;
      }

      // Size preference (prefer medium sizes)
      const size = logo.formats?.[0]?.size || 0;
      if (size >= 100 && size <= 500) {
        score += 3;
      } else if (size > 500) {
        score += 1;
      }

      if (score > bestScore) {
        bestScore = score;
        bestLogo = logo;
      }
    }

    return bestLogo?.formats?.[0]?.src || null;
  }
}

/**
 * Tool configuration for logo fetching
 */
const TOOL_CONFIGS = [
  { id: 'nextjs', domain: 'nextjs.org', filename: 'nextjs-logo' },
  { id: 'react', domain: 'reactjs.org', filename: 'react-logo' },
  { id: 'docusaurus', domain: 'docusaurus.io', filename: 'docusaurus-logo' },
  { id: 'vercel', domain: 'vercel.com', filename: 'vercel-logo' },
  { id: 'nodejs', domain: 'nodejs.org', filename: 'nodejs-logo' },
  { id: 'express', domain: 'expressjs.com', filename: 'express-logo' },
  { id: 'github', domain: 'github.com', filename: 'github-logo' },
  { id: 'docker', domain: 'docker.com', filename: 'docker-logo' },
  { id: 'puppeteer', domain: 'pptr.dev', filename: 'puppeteer-logo' },
  { id: 'playwright', domain: 'playwright.dev', filename: 'playwright-logo' },
  { id: 'figma', domain: 'figma.com', filename: 'figma-logo' }
];

/**
 * Main function to fetch all logos
 */
async function fetchAllLogos(customConfig = {}) {
  console.log('🚀 Iniciando descarga de logos con Brandfetch API...\n');
  
  const config = {
    apiKey: '/l4Ook05/n9c63L6KGSSffdbmkiKEQ9jmrIog4CwLqE=',
    outputDir: path.join(__dirname, '..', 'static', 'img', 'tools', 'logos'),
    overwrite: false,
    ...customConfig
  };

  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
    console.log(`📁 Directorio creado: ${config.outputDir}`);
  }

  const client = new BrandfetchClient(config.apiKey);
  const results = [];

  for (const toolConfig of TOOL_CONFIGS) {
    try {
      console.log(`\n🔧 Procesando: ${toolConfig.id}`);
      
      // Check if logo already exists
      const svgPath = path.join(config.outputDir, `${toolConfig.filename}.svg`);
      const pngPath = path.join(config.outputDir, `${toolConfig.filename}.png`);
      
      if (!config.overwrite && (fs.existsSync(svgPath) || fs.existsSync(pngPath))) {
        console.log(`⏭️  Logo ya existe, saltando: ${toolConfig.filename}`);
        results.push({
          tool: toolConfig.id,
          status: 'skipped',
          reason: 'already exists'
        });
        continue;
      }

      // Fetch brand data
      const brandData = await client.fetchBrandData(toolConfig.domain);
      
      if (!brandData) {
        console.log(`❌ No se encontraron datos para ${toolConfig.domain}`);
        results.push({
          tool: toolConfig.id,
          status: 'failed',
          reason: 'no brand data'
        });
        continue;
      }

      // Get best logo URL
      const logoUrl = client.getBestLogo(brandData);
      
      if (!logoUrl) {
        console.log(`❌ No se encontró logo válido para ${toolConfig.domain}`);
        results.push({
          tool: toolConfig.id,
          status: 'failed',
          reason: 'no logo found'
        });
        continue;
      }

      // Determine file extension
      const logoUrlObj = new URL(logoUrl);
      const urlPath = logoUrlObj.pathname;
      const extension = path.extname(urlPath).toLowerCase() || '.svg';
      const outputPath = path.join(config.outputDir, `${toolConfig.filename}${extension}`);

      // Download logo
      await client.downloadLogo(logoUrl, outputPath);
      
      results.push({
        tool: toolConfig.id,
        status: 'success',
        path: outputPath,
        url: logoUrl
      });

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, client.rateLimitDelay));

    } catch (error) {
      console.error(`❌ Error procesando ${toolConfig.id}:`, error.message);
      results.push({
        tool: toolConfig.id,
        status: 'error',
        error: error.message
      });
    }
  }

  // Generate report
  console.log('\n📊 Resumen de descarga de logos:');
  console.log('================================');
  
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed' || r.status === 'error');
  const skipped = results.filter(r => r.status === 'skipped');

  console.log(`✅ Exitosos: ${successful.length}`);
  console.log(`❌ Fallidos: ${failed.length}`);
  console.log(`⏭️  Saltados: ${skipped.length}`);
  
  if (successful.length > 0) {
    console.log('\nLogos descargados exitosamente:');
    successful.forEach(result => {
      console.log(`  • ${result.tool}: ${path.basename(result.path)}`);
    });
  }

  if (failed.length > 0) {
    console.log('\nLogos con errores:');
    failed.forEach(result => {
      console.log(`  • ${result.tool}: ${result.reason || result.error}`);
    });
  }

  // Save report
  const reportPath = path.join(config.outputDir, 'fetch-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    config: {
      outputDir: config.outputDir,
      overwrite: config.overwrite
    },
    results,
    summary: {
      total: results.length,
      successful: successful.length,
      failed: failed.length,
      skipped: skipped.length
    }
  }, null, 2));

  console.log(`\n📄 Reporte guardado en: ${reportPath}`);
  console.log('\n🎯 ¡Descarga de logos completada!');
  
  return results;
}

/**
 * Utility functions
 */

// Fetch only missing logos
async function fetchMissingLogos() {
  return fetchAllLogos({ overwrite: false });
}

// Fetch all logos (overwrite existing)
async function refetchAllLogos() {
  return fetchAllLogos({ overwrite: true });
}

// Fetch specific tools
async function fetchSpecificLogos(toolIds) {
  const filteredConfigs = TOOL_CONFIGS.filter(config => toolIds.includes(config.id));
  console.log(`🎯 Descargando logos específicos: ${toolIds.join(', ')}`);
  
  return fetchAllLogos({
    overwrite: true,
    // Override the tool configs temporarily
    customConfigs: filteredConfigs
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'missing';
  
  const commands = {
    'all': refetchAllLogos,
    'missing': fetchMissingLogos,
    'specific': () => {
      const toolIds = args.slice(1);
      if (toolIds.length === 0) {
        console.error('❌ Por favor especifica los IDs de herramientas');
        console.log('Ejemplo: node fetch-brand-logos.js specific nextjs react vercel');
        process.exit(1);
      }
      return fetchSpecificLogos(toolIds);
    },
    'help': () => {
      console.log(`
🎨 Script de Descarga de Logos - Academy NoCode

Comandos disponibles:
  missing   - Descargar solo logos faltantes (por defecto)
  all       - Descargar todos los logos (sobrescribir existentes)
  specific  - Descargar logos específicos por ID
  help      - Mostrar esta ayuda

Ejemplos:
  node scripts/fetch-brand-logos.js missing
  node scripts/fetch-brand-logos.js all
  node scripts/fetch-brand-logos.js specific nextjs react vercel

Herramientas disponibles:
${TOOL_CONFIGS.map(t => `  • ${t.id} (${t.domain})`).join('\n')}

Configuración:
- API Key: Brandfetch API configurada
- Output: static/img/tools/logos/
- Formatos preferidos: SVG > PNG > JPG
- Tipos preferidos: symbol > icon > logo
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
    console.error('❌ Error ejecutando descarga de logos:', error);
    process.exit(1);
  });
}

module.exports = {
  BrandfetchClient,
  fetchAllLogos,
  fetchMissingLogos,
  refetchAllLogos,
  fetchSpecificLogos,
  TOOL_CONFIGS
};
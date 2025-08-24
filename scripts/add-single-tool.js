/**
 * Add Single Tool Script
 * Academy NoCode - Selective tool addition without affecting existing tools
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Tool sources for logo download (priority order)
const LOGO_SOURCES = {
  github_avatar: (org_id) => `https://avatars.githubusercontent.com/u/${org_id}?s=200&v=4`,
  official_favicon: (domain) => `https://${domain}/favicon.ico`,
  official_apple_touch: (domain) => `https://${domain}/apple-touch-icon.png`,
  devicons: (tool_name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tool_name}/${tool_name}-original.svg`,
  simple_icons: (tool_name) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool_name}.svg`
};

class SingleToolManager {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.logosDir = path.join(this.rootDir, 'static', 'img', 'tools', 'logos');
    this.screenshotsDir = path.join(this.rootDir, 'static', 'img', 'tools', 'screenshots');
  }

  /**
   * Check if tool already exists in toolsData.ts
   */
  toolExists(toolId) {
    const toolsDataPath = path.join(this.rootDir, 'src', 'data', 'toolsData.ts');
    if (!fs.existsSync(toolsDataPath)) {
      console.log('❌ toolsData.ts not found');
      return false;
    }
    
    const content = fs.readFileSync(toolsDataPath, 'utf8');
    return content.includes(`id: '${toolId}'`);
  }

  /**
   * Check if logo already exists
   */
  logoExists(toolId) {
    const logoPath = path.join(this.logosDir, `${toolId}-logo.png`);
    return fs.existsSync(logoPath);
  }

  /**
   * Check if screenshot already exists
   */
  screenshotExists(toolId) {
    const screenshotPath = path.join(this.screenshotsDir, `${toolId}-homepage.jpg`);
    return fs.existsSync(screenshotPath);
  }

  /**
   * Download logo from URL
   */
  async downloadLogo(url, filepath) {
    return new Promise((resolve, reject) => {
      console.log(`  📥 Descargando logo desde: ${url}`);
      
      const file = fs.createWriteStream(filepath);
      const request = https.get(url, { timeout: 30000 }, (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          const contentType = response.headers['content-type'] || '';
          
          // Verificar que sea una imagen válida
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
            console.log(`  ✅ Logo descargado: ${path.basename(filepath)} (${Math.round(size/1024)}KB)`);
            resolve({ success: true, size, contentType });
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
      
      request.setTimeout(30000, () => {
        request.abort();
        reject(new Error('Download timeout'));
      });
    });
  }

  /**
   * Try multiple logo sources for a tool
   */
  async fetchLogo(toolConfig) {
    const logoPath = path.join(this.logosDir, `${toolConfig.id}-logo.png`);
    
    console.log(`🎯 Obteniendo logo para: ${toolConfig.name}`);
    
    // Check if logo already exists
    if (this.logoExists(toolConfig.id)) {
      console.log(`⏭️  Logo ya existe: ${toolConfig.id}-logo.png`);
      return { success: true, skipped: true };
    }
    
    // Try each logo source in priority order
    const sources = toolConfig.logoSources || [];
    
    for (const source of sources) {
      try {
        console.log(`  🔍 Probando fuente: ${source.type}`);
        await this.downloadLogo(source.url, logoPath);
        return { success: true, source: source.type };
      } catch (error) {
        console.log(`  ❌ Fallo en ${source.type}: ${error.message}`);
        continue;
      }
    }
    
    return { success: false, error: 'No se pudo descargar desde ninguna fuente' };
  }

  /**
   * Add a single tool (logo only, no screenshots for now)
   */
  async addTool(toolConfig) {
    console.log(`\n🆕 Añadiendo herramienta: ${toolConfig.name}`);
    console.log(`📋 ID: ${toolConfig.id}`);
    
    // Verify tool is not already in toolsData.ts
    if (this.toolExists(toolConfig.id)) {
      console.log(`⚠️  La herramienta ${toolConfig.id} ya existe en toolsData.ts`);
    }
    
    // Ensure directories exist
    if (!fs.existsSync(this.logosDir)) {
      fs.mkdirSync(this.logosDir, { recursive: true });
      console.log(`📁 Directorio creado: ${this.logosDir}`);
    }
    
    // Fetch logo
    const logoResult = await this.fetchLogo(toolConfig);
    
    // Report results
    console.log(`\n📊 Resultado para ${toolConfig.name}:`);
    if (logoResult.success) {
      if (logoResult.skipped) {
        console.log(`✅ Logo: Ya existe`);
      } else {
        console.log(`✅ Logo: Descargado desde ${logoResult.source}`);
      }
    } else {
      console.log(`❌ Logo: ${logoResult.error}`);
    }
    
    return logoResult;
  }
}

// Tool configuration examples
const EXAMPLE_TOOLS = {
  vite: {
    id: 'vite',
    name: 'Vite',
    logoSources: [
      {
        type: 'official_favicon',
        url: 'https://vitejs.dev/favicon.ico'
      },
      {
        type: 'github_avatar',
        url: 'https://avatars.githubusercontent.com/u/65625612?s=200&v=4'
      },
      {
        type: 'devicons',
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg'
      }
    ]
  }
};

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🔧 Add Single Tool Script - Academy NoCode

Uso:
  node add-single-tool.js <tool-id> [options]
  node add-single-tool.js --example

Opciones:
  --example    Mostrar configuración de ejemplo
  --help       Mostrar esta ayuda

Ejemplos:
  node add-single-tool.js vite
  node add-single-tool.js --example

⚠️  IMPORTANTE: Este script solo descarga logos sin afectar herramientas existentes
    `);
    process.exit(0);
  }
  
  if (args[0] === '--example') {
    console.log('📋 Configuración de ejemplo para herramientas:');
    console.log(JSON.stringify(EXAMPLE_TOOLS, null, 2));
    process.exit(0);
  }
  
  if (args[0] === '--help') {
    console.log('Ver ayuda arriba');
    process.exit(0);
  }
  
  const toolId = args[0];
  
  if (EXAMPLE_TOOLS[toolId]) {
    const manager = new SingleToolManager();
    manager.addTool(EXAMPLE_TOOLS[toolId])
      .then((result) => {
        console.log('\n🎉 Proceso completado');
        process.exit(result.success ? 0 : 1);
      })
      .catch((error) => {
        console.error('💥 Error:', error);
        process.exit(1);
      });
  } else {
    console.log(`❌ Herramienta '${toolId}' no encontrada en configuraciones de ejemplo`);
    console.log('💡 Usa --example para ver configuraciones disponibles');
    process.exit(1);
  }
}

module.exports = { SingleToolManager, LOGO_SOURCES, EXAMPLE_TOOLS };
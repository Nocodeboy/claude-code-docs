/**
 * Tool Assets Management Script
 * Academy NoCode - Complete solution for logos and screenshots
 */

const fs = require('fs');
const path = require('path');
const { BrandfetchClient, fetchAllLogos, TOOL_CONFIGS } = require('./fetch-brand-logos');
const { takeToolScreenshots } = require('./take-screenshots');

class ToolAssetsManager {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.toolsDir = path.join(this.rootDir, 'static', 'img', 'tools');
    this.logosDir = path.join(this.toolsDir, 'logos');
    this.screenshotsDir = path.join(this.toolsDir, 'screenshots');
    this.fallbacksDir = path.join(this.toolsDir);
  }

  /**
   * Ensure all required directories exist
   */
  ensureDirectories() {
    const directories = [
      this.toolsDir,
      this.logosDir,
      this.screenshotsDir
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Directorio creado: ${path.relative(this.rootDir, dir)}`);
      }
    });
  }

  /**
   * Move existing logos to the new logos directory
   */
  async organizeLegacyLogos() {
    console.log('🗂️  Organizando logos existentes...');
    
    const logoFiles = fs.readdirSync(this.toolsDir)
      .filter(file => file.endsWith('-logo.svg') || file.endsWith('-logo.png'));

    if (logoFiles.length === 0) {
      console.log('📝 No se encontraron logos existentes para mover');
      return;
    }

    for (const logoFile of logoFiles) {
      try {
        const sourcePath = path.join(this.toolsDir, logoFile);
        const targetPath = path.join(this.logosDir, logoFile);
        
        // Check if target already exists
        if (fs.existsSync(targetPath)) {
          console.log(`⏭️  Ya existe en logos/: ${logoFile}`);
          continue;
        }

        // Copy (don't move yet, for safety)
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copiado a logos/: ${logoFile}`);
        
      } catch (error) {
        console.error(`❌ Error moviendo ${logoFile}:`, error.message);
      }
    }
    
    console.log(`📦 Logos organizados en: ${path.relative(this.rootDir, this.logosDir)}`);
  }

  /**
   * Create fallback logos for missing tools
   */
  async createFallbackLogos() {
    console.log('🎨 Creando logos de respaldo...');
    
    try {
      // Try to load canvas for creating fallback logos
      const canvas = require('canvas');
      const { createCanvas } = canvas;
      
      for (const toolConfig of TOOL_CONFIGS) {
        const logoPath = path.join(this.logosDir, `${toolConfig.filename}.svg`);
        const pngLogoPath = path.join(this.logosDir, `${toolConfig.filename}.png`);
        
        // Skip if logo already exists
        if (fs.existsSync(logoPath) || fs.existsSync(pngLogoPath)) {
          continue;
        }

        // Create simple text-based logo
        const canvasSize = 200;
        const canvasObj = createCanvas(canvasSize, canvasSize);
        const ctx = canvasObj.getContext('2d');
        
        // Background
        ctx.fillStyle = '#FF6B35'; // Orange theme
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        // Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Get first letter or two of tool name
        const initials = toolConfig.id.charAt(0).toUpperCase() + 
          (toolConfig.id.length > 1 ? toolConfig.id.charAt(1).toLowerCase() : '');
        
        ctx.fillText(initials, canvasSize / 2, canvasSize / 2);
        
        // Save as PNG
        const buffer = canvasObj.toBuffer('image/png');
        const fallbackPath = path.join(this.logosDir, `${toolConfig.filename}.png`);
        fs.writeFileSync(fallbackPath, buffer);
        
        console.log(`🎨 Logo de respaldo creado: ${toolConfig.filename}.png`);
      }
      
    } catch (error) {
      console.log('⚠️  Canvas no disponible, saltando creación de logos de respaldo');
      console.log('   Para habilitar: npm install canvas');
    }
  }

  /**
   * Validate existing assets
   */
  validateAssets() {
    console.log('🔍 Validando assets existentes...');
    
    const report = {
      logos: { found: 0, missing: [] },
      screenshots: { found: 0, missing: [] }
    };

    for (const toolConfig of TOOL_CONFIGS) {
      // Check logos
      const logoSvg = path.join(this.logosDir, `${toolConfig.filename}.svg`);
      const logoPng = path.join(this.logosDir, `${toolConfig.filename}.png`);
      
      if (fs.existsSync(logoSvg) || fs.existsSync(logoPng)) {
        report.logos.found++;
      } else {
        report.logos.missing.push(toolConfig.id);
      }

      // Check screenshots
      const screenshotPath = path.join(this.screenshotsDir, `${toolConfig.id}-homepage.png`);
      
      if (fs.existsSync(screenshotPath)) {
        report.screenshots.found++;
      } else {
        report.screenshots.missing.push(toolConfig.id);
      }
    }

    console.log(`\n📊 Reporte de Assets:`);
    console.log(`   Logos: ${report.logos.found}/${TOOL_CONFIGS.length} encontrados`);
    console.log(`   Screenshots: ${report.screenshots.found}/${TOOL_CONFIGS.length} encontrados`);
    
    if (report.logos.missing.length > 0) {
      console.log(`   Logos faltantes: ${report.logos.missing.join(', ')}`);
    }
    
    if (report.screenshots.missing.length > 0) {
      console.log(`   Screenshots faltantes: ${report.screenshots.missing.join(', ')}`);
    }

    return report;
  }

  /**
   * Generate updated tools data with correct paths
   */
  generateToolsDataPaths() {
    console.log('📝 Generando rutas actualizadas para tools data...');
    
    const pathMappings = {};
    
    for (const toolConfig of TOOL_CONFIGS) {
      const toolPaths = {
        id: toolConfig.id,
        logos: [],
        screenshots: []
      };
      
      // Check for logos
      const logoSvg = path.join(this.logosDir, `${toolConfig.filename}.svg`);
      const logoPng = path.join(this.logosDir, `${toolConfig.filename}.png`);
      
      if (fs.existsSync(logoSvg)) {
        toolPaths.logos.push(`/img/tools/logos/${toolConfig.filename}.svg`);
      }
      if (fs.existsSync(logoPng)) {
        toolPaths.logos.push(`/img/tools/logos/${toolConfig.filename}.png`);
      }
      
      // Fallback to existing logo if new one doesn't exist
      if (toolPaths.logos.length === 0) {
        const fallbackLogo = path.join(this.toolsDir, `${toolConfig.filename}.svg`);
        if (fs.existsSync(fallbackLogo)) {
          toolPaths.logos.push(`/img/tools/${toolConfig.filename}.svg`);
        }
      }
      
      // Check for screenshots
      const screenshotPath = path.join(this.screenshotsDir, `${toolConfig.id}-homepage.png`);
      if (fs.existsSync(screenshotPath)) {
        toolPaths.screenshots.push(`/img/tools/screenshots/${toolConfig.id}-homepage.png`);
      }
      
      pathMappings[toolConfig.id] = toolPaths;
    }
    
    // Save path mappings
    const mappingsPath = path.join(this.toolsDir, 'asset-mappings.json');
    fs.writeFileSync(mappingsPath, JSON.stringify(pathMappings, null, 2));
    
    console.log(`💾 Mapeo de rutas guardado en: ${path.relative(this.rootDir, mappingsPath)}`);
    return pathMappings;
  }

  /**
   * Complete setup process
   */
  async setupComplete() {
    console.log('🚀 Iniciando configuración completa de tool assets...\n');
    
    // Step 1: Setup directories
    this.ensureDirectories();
    
    // Step 2: Organize existing logos
    await this.organizeLegacyLogos();
    
    // Step 3: Fetch new logos from Brandfetch
    console.log('\n📥 Descargando logos desde Brandfetch...');
    try {
      await fetchAllLogos({
        outputDir: this.logosDir,
        overwrite: false
      });
    } catch (error) {
      console.error('❌ Error descargando logos:', error.message);
    }
    
    // Step 4: Create fallback logos for missing ones
    await this.createFallbackLogos();
    
    // Step 5: Take tool screenshots
    console.log('\n📸 Capturando screenshots de herramientas...');
    try {
      await takeToolScreenshots();
    } catch (error) {
      console.error('❌ Error capturando screenshots:', error.message);
    }
    
    // Step 6: Validate and generate report
    console.log('\n🔍 Validando assets finales...');
    const report = this.validateAssets();
    
    // Step 7: Generate path mappings
    const pathMappings = this.generateToolsDataPaths();
    
    console.log('\n🎯 ¡Configuración completa de tool assets terminada!');
    console.log('\nPróximos pasos:');
    console.log('1. Revisar los assets en static/img/tools/');
    console.log('2. Actualizar src/data/toolsData.ts con las nuevas rutas');
    console.log('3. Ejecutar npm start para ver los cambios');
    
    return {
      report,
      pathMappings,
      success: true
    };
  }

  /**
   * Quick update - only missing assets
   */
  async updateMissing() {
    console.log('⚡ Actualizando solo assets faltantes...\n');
    
    this.ensureDirectories();
    
    // Get current status
    const initialReport = this.validateAssets();
    
    // Download missing logos
    if (initialReport.logos.missing.length > 0) {
      console.log('\n📥 Descargando logos faltantes...');
      await fetchAllLogos({
        outputDir: this.logosDir,
        overwrite: false
      });
    }
    
    // Create fallbacks for still missing logos
    await this.createFallbackLogos();
    
    // Take missing screenshots
    if (initialReport.screenshots.missing.length > 0) {
      console.log('\n📸 Capturando screenshots faltantes...');
      await takeToolScreenshots();
    }
    
    // Final validation
    const finalReport = this.validateAssets();
    const pathMappings = this.generateToolsDataPaths();
    
    console.log('\n✅ Actualización de assets faltantes completada');
    return { finalReport, pathMappings };
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';
  
  const manager = new ToolAssetsManager();
  
  const commands = {
    'setup': () => manager.setupComplete(),
    'update': () => manager.updateMissing(),
    'validate': () => {
      manager.ensureDirectories();
      const report = manager.validateAssets();
      manager.generateToolsDataPaths();
      return Promise.resolve(report);
    },
    'organize': () => {
      manager.ensureDirectories();
      return manager.organizeLegacyLogos();
    },
    'help': () => {
      console.log(`
🛠️  Tool Assets Manager - Academy NoCode

Comandos disponibles:
  setup     - Configuración completa (logos + screenshots + organización)
  update    - Actualizar solo assets faltantes
  validate  - Validar assets existentes y generar mapeo de rutas  
  organize  - Organizar logos existentes en directorios
  help      - Mostrar esta ayuda

Ejemplos:
  node scripts/manage-tool-assets.js setup
  node scripts/manage-tool-assets.js update
  node scripts/manage-tool-assets.js validate

Estructura generada:
  static/img/tools/
    ├── logos/           - Logos de Brandfetch + fallbacks
    ├── screenshots/     - Screenshots de homepages  
    └── asset-mappings.json - Mapeo de rutas para toolsData.ts

Herramientas incluidas:
${TOOL_CONFIGS.map(t => `  • ${t.id} (${t.domain})`).join('\n')}
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
  
  commandFunction()
    .then((result) => {
      if (result) {
        console.log('\n✅ Comando ejecutado exitosamente');
      }
    })
    .catch(error => {
      console.error('❌ Error ejecutando comando:', error);
      process.exit(1);
    });
}

module.exports = {
  ToolAssetsManager
};
/**
 * Update Tools Data Script
 * Academy NoCode - Add tools to toolsData.ts without affecting existing entries
 */

const fs = require('fs');
const path = require('path');

class ToolsDataManager {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.toolsDataPath = path.join(this.rootDir, 'src', 'data', 'toolsData.ts');
  }

  /**
   * Check if tool already exists in toolsData.ts
   */
  toolExists(toolId) {
    if (!fs.existsSync(this.toolsDataPath)) {
      console.log('❌ toolsData.ts not found');
      return false;
    }
    
    const content = fs.readFileSync(this.toolsDataPath, 'utf8');
    return content.includes(`id: '${toolId}'`);
  }

  /**
   * Add new tool to toolsData.ts
   */
  addToolToData(toolConfig) {
    console.log(`\n📝 Añadiendo ${toolConfig.id} a toolsData.ts...`);
    
    // Check if tool already exists
    if (this.toolExists(toolConfig.id)) {
      console.log(`⚠️  La herramienta ${toolConfig.id} ya existe en toolsData.ts`);
      return { success: true, skipped: true };
    }
    
    try {
      let content = fs.readFileSync(this.toolsDataPath, 'utf8');
      
      // Generate tool entry
      const toolEntry = this.generateToolEntry(toolConfig);
      
      // Find the insertion point (before the closing of TOOLS_DATA array)
      const insertionPoint = content.lastIndexOf('];');
      if (insertionPoint === -1) {
        throw new Error('No se pudo encontrar el final del array TOOLS_DATA');
      }
      
      // Insert the new tool
      const beforeInsertion = content.substring(0, insertionPoint);
      const afterInsertion = content.substring(insertionPoint);
      
      // Add comma if there are existing tools
      const needsComma = beforeInsertion.trim().endsWith('}');
      const separator = needsComma ? ',\n' : '\n';
      
      const newContent = beforeInsertion + separator + toolEntry + '\n' + afterInsertion;
      
      // Write back to file
      fs.writeFileSync(this.toolsDataPath, newContent, 'utf8');
      
      console.log(`✅ Herramienta ${toolConfig.id} añadida a toolsData.ts`);
      return { success: true };
      
    } catch (error) {
      console.log(`❌ Error añadiendo herramienta: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate TypeScript tool entry
   */
  generateToolEntry(config) {
    return `  {
    id: '${config.id}',
    name: '${config.name}',
    description: '${config.description}',
    shortDescription: '${config.shortDescription}',
    category: '${config.category}',
    subcategory: '${config.subcategory || ''}',
    website: '${config.website}',
    documentation: '${config.documentation || ''}',
    github: '${config.github || ''}',
    pricing: '${config.pricing}',
    tags: [${config.tags.map(tag => `'${tag}'`).join(', ')}],
    logo: '/img/tools/logos/${config.id}-logo.png',
    logoHq: '/img/tools/logos/${config.id}-logo.png',
    screenshots: [
      '/img/tools/screenshots/${config.id}-homepage.jpg'
    ],
    features: [${config.features.map(feature => `\n      '${feature}'`).join(',')}
    ],
    useCases: [${config.useCases.map(useCase => `\n      '${useCase}'`).join(',')}
    ],
    alternatives: [${config.alternatives.map(alt => `'${alt}'`).join(', ')}],
    difficulty: '${config.difficulty}',
    popularity: ${config.popularity},
    lastUpdated: '${config.lastUpdated || new Date().toISOString().split('T')[0]}',
    isRecommended: ${config.isRecommended || false},
    integrations: [${(config.integrations || []).map(integration => `'${integration}'`).join(', ')}],
    platforms: [${config.platforms.map(platform => `'${platform}'`).join(', ')}],
    languages: [${(config.languages || []).map(lang => `'${lang}'`).join(', ')}]
  }`;
  }

  /**
   * Complete tool addition workflow
   */
  async addCompleteToolWorkflow(toolConfig) {
    console.log(`🚀 Iniciando flujo completo para: ${toolConfig.name}`);
    
    // Step 1: Add to toolsData.ts
    const dataResult = this.addToolToData(toolConfig);
    
    // Step 2: Download logo (using existing SingleToolManager)
    const { SingleToolManager } = require('./add-single-tool.js');
    const logoManager = new SingleToolManager();
    const logoResult = await logoManager.addTool(toolConfig);
    
    // Report final results
    console.log(`\n📋 Resumen para ${toolConfig.name}:`);
    console.log(`📝 toolsData.ts: ${dataResult.success ? (dataResult.skipped ? 'Ya existe' : 'Añadido') : 'Error'}`);
    console.log(`🎨 Logo: ${logoResult.success ? (logoResult.skipped ? 'Ya existe' : 'Descargado') : 'Error'}`);
    console.log(`📸 Screenshot: Pendiente (usar npm run screenshots:tools)`);
    
    return {
      data: dataResult,
      logo: logoResult,
      success: dataResult.success && logoResult.success
    };
  }
}

// Tool templates for common cases
const TOOL_TEMPLATES = {
  frontend: (id, name, website) => ({
    id,
    name,
    description: `${name} es una herramienta moderna para desarrollo frontend...`,
    shortDescription: `Herramienta para desarrollo frontend`,
    category: 'frontend',
    subcategory: 'Framework',
    website,
    documentation: `${website}/docs`,
    github: '',
    pricing: 'free',
    tags: ['Frontend', 'JavaScript', 'Modern'],
    features: [
      'Desarrollo rápido',
      'Hot reload',
      'Optimización automática'
    ],
    useCases: [
      'Aplicaciones web modernas',
      'Sitios estáticos',
      'PWAs'
    ],
    alternatives: ['React', 'Vue', 'Angular'],
    difficulty: 'intermediate',
    popularity: 8,
    platforms: ['web', 'desktop'],
    languages: ['JavaScript', 'TypeScript']
  }),
  
  backend: (id, name, website) => ({
    id,
    name,
    description: `${name} es una solución backend robusta...`,
    shortDescription: `Framework backend para APIs`,
    category: 'backend',
    subcategory: 'Framework',
    website,
    documentation: `${website}/docs`,
    github: '',
    pricing: 'free',
    tags: ['Backend', 'API', 'Server'],
    features: [
      'API REST',
      'Base de datos integrada',
      'Autenticación'
    ],
    useCases: [
      'APIs REST',
      'Microservicios',
      'Aplicaciones backend'
    ],
    alternatives: ['Express', 'FastAPI', 'Spring'],
    difficulty: 'intermediate',
    popularity: 7,
    platforms: ['server'],
    languages: ['JavaScript', 'Python']
  })
};

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📝 Update Tools Data Script - Academy NoCode

Uso:
  node update-tools-data.js --template <type> <id> <name> <website>
  node update-tools-data.js --help

Plantillas disponibles:
  frontend    Para herramientas de desarrollo frontend
  backend     Para herramientas de desarrollo backend

Ejemplos:
  node update-tools-data.js --template frontend vite Vite https://vitejs.dev
  node update-tools-data.js --template backend fastify Fastify https://fastify.io

⚠️  IMPORTANTE: Este script solo modifica toolsData.ts, no descarga assets
    `);
    process.exit(0);
  }
  
  if (args[0] === '--template' && args.length === 5) {
    const [, templateType, id, name, website] = args;
    
    if (!TOOL_TEMPLATES[templateType]) {
      console.log(`❌ Plantilla '${templateType}' no encontrada`);
      console.log(`💡 Plantillas disponibles: ${Object.keys(TOOL_TEMPLATES).join(', ')}`);
      process.exit(1);
    }
    
    const toolConfig = TOOL_TEMPLATES[templateType](id, name, website);
    const manager = new ToolsDataManager();
    
    manager.addCompleteToolWorkflow(toolConfig)
      .then((result) => {
        console.log('\n🎉 Proceso completado');
        console.log(`💡 Siguiente paso: npm run screenshots:tools para generar screenshot`);
        process.exit(result.success ? 0 : 1);
      })
      .catch((error) => {
        console.error('💥 Error:', error);
        process.exit(1);
      });
  } else {
    console.log('❌ Argumentos inválidos. Usa --help para ver la ayuda');
    process.exit(1);
  }
}

module.exports = { ToolsDataManager, TOOL_TEMPLATES };
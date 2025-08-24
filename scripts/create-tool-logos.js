const fs = require('fs');
const path = require('path');

// Logos SVG profesionales para cada herramienta
const TOOL_LOGOS = {
  'nextjs-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#000000"/>
    <path d="M20 20h24c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H20c-2.2 0-4-1.8-4-4V24c0-2.2 1.8-4 4-4z" fill="white"/>
    <path d="M24 28v8h4v-8h4l-6-6-6 6h4z" fill="#000000"/>
    <text x="32" y="52" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="white">Next.js</text>
  </svg>`,

  'react-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#61DAFB"/>
    <circle cx="32" cy="32" r="3" fill="#000"/>
    <ellipse cx="32" cy="32" rx="18" ry="7" stroke="#000" stroke-width="2" fill="none"/>
    <ellipse cx="32" cy="32" rx="18" ry="7" stroke="#000" stroke-width="2" fill="none" transform="rotate(60 32 32)"/>
    <ellipse cx="32" cy="32" rx="18" ry="7" stroke="#000" stroke-width="2" fill="none" transform="rotate(120 32 32)"/>
  </svg>`,

  'docusaurus-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#3ECC5F"/>
    <path d="M20 24c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H24c-2.2 0-4-1.8-4-4V24z" fill="white"/>
    <path d="M28 28h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="#3ECC5F"/>
    <path d="M26 30l2-2 2 2-2 2-2-2z" fill="#3ECC5F"/>
  </svg>`,

  'vercel-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#000000"/>
    <path d="M32 20L44 44H20L32 20z" fill="white"/>
  </svg>`,

  'nodejs-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#339933"/>
    <path d="M32 20l10 6v12l-10 6-10-6V26l10-6z" fill="white"/>
    <path d="M32 24l6 3.5v7L32 38l-6-3.5v-7L32 24z" fill="#339933"/>
  </svg>`,

  'express-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#000000"/>
    <text x="32" y="28" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="white">E</text>
    <path d="M20 32h24M20 36h20M20 40h16" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  'github-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#181717"/>
    <path d="M32 18c-7.7 0-14 6.3-14 14 0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3-.3-6.2-1.5-6.2-6.8 0-1.5.5-2.7 1.4-3.7-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.5 3.4-.5s2.3.2 3.4.5c2.6-1.8 3.7-1.4 3.7-1.4.8 1.7.3 3 .1 3.3.9 1 1.4 2.2 1.4 3.7 0 5.3-3.2 6.5-6.3 6.8.5.4.9 1.2.9 2.5v3.7c0 .4.3.8 1 .7C42 43.4 46 38.2 46 32c0-7.7-6.3-14-14-14z" fill="white"/>
  </svg>`,

  'docker-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#2496ED"/>
    <rect x="18" y="28" width="6" height="4" fill="white"/>
    <rect x="26" y="28" width="6" height="4" fill="white"/>
    <rect x="34" y="28" width="6" height="4" fill="white"/>
    <rect x="22" y="24" width="6" height="4" fill="white"/>
    <rect x="30" y="24" width="6" height="4" fill="white"/>
    <rect x="26" y="20" width="6" height="4" fill="white"/>
    <path d="M42 30c2 0 4 1 5 3-1 2-3 3-5 3s-4-1-5-3c1-2 3-3 5-3z" fill="white"/>
  </svg>`,

  'puppeteer-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#40E0D0"/>
    <circle cx="32" cy="28" r="8" fill="white"/>
    <circle cx="29" cy="26" r="2" fill="#40E0D0"/>
    <circle cx="35" cy="26" r="2" fill="#40E0D0"/>
    <path d="M28 32c2 2 6 2 8 0" stroke="#40E0D0" stroke-width="2" fill="none" stroke-linecap="round"/>
    <rect x="28" y="36" width="8" height="8" rx="2" fill="white"/>
    <path d="M30 40h4M30 42h4" stroke="#40E0D0" stroke-width="1"/>
  </svg>`,

  'playwright-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#2EAD33"/>
    <path d="M28 24l8-4 8 4-8 4-8-4z" fill="white"/>
    <path d="M20 28l8-4v8l-8-4z" fill="white" opacity="0.8"/>
    <path d="M36 28l8-4v8l-8-4z" fill="white" opacity="0.8"/>
    <path d="M28 32l8-4v8l-8-4z" fill="white" opacity="0.6"/>
    <text x="32" y="52" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="white">Playwright</text>
  </svg>`,

  'figma-logo.svg': `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#F24E1E"/>
    <circle cx="36" cy="28" r="6" fill="#A259FF"/>
    <path d="M30 16h6a6 6 0 0 1 0 12h-6V16z" fill="#FF7262"/>
    <path d="M24 28h6v6a6 6 0 1 1-6-6z" fill="#1ABCFE"/>
    <path d="M30 28h-6a6 6 0 0 1 0-12h6v12z" fill="#0ACF83"/>
    <path d="M30 28h6a6 6 0 1 1-6 6V28z" fill="#FF7262"/>
  </svg>`
};

// Función para crear directorio si no existe
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función principal para crear los logos
function createToolLogos() {
  console.log('🎨 Creando logos profesionales para herramientas...');
  
  const outputDir = path.join(__dirname, '..', 'static', 'img', 'tools', 'logos');
  ensureDirectory(outputDir);
  
  let created = 0;
  let skipped = 0;
  
  for (const [filename, svgContent] of Object.entries(TOOL_LOGOS)) {
    const filepath = path.join(outputDir, filename);
    
    // Solo crear si no existe o si queremos sobreescribir
    if (!fs.existsSync(filepath) || process.argv.includes('--force')) {
      fs.writeFileSync(filepath, svgContent);
      console.log(`✅ Creado: ${filename}`);
      created++;
    } else {
      console.log(`⏭️  Ya existe: ${filename}`);
      skipped++;
    }
  }
  
  console.log(`\n📊 Resumen:`);
  console.log(`✅ Logos creados: ${created}`);
  console.log(`⏭️  Logos omitidos: ${skipped}`);
  console.log(`📁 Ubicación: static/img/tools/logos/`);
  
  if (skipped > 0) {
    console.log(`\n💡 Usa --force para sobreescribir los logos existentes`);
  }
  
  console.log('\n🎉 Proceso completado!');
}

// CLI interface
if (require.main === module) {
  createToolLogos();
}

module.exports = {
  createToolLogos,
  TOOL_LOGOS
};
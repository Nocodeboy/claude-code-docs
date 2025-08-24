# 🛠️ Tools Directory - Internal Guide

Guía interna para el equipo de desarrollo sobre cómo añadir y mantener herramientas en el directorio.

## 🚀 Añadir Nueva Herramienta (5 minutos)

### 1️⃣ Añadir datos en TypeScript
```typescript
// src/data/toolsData.ts - Añadir al final del array antes de ];
{
  id: 'nombre-herramienta',              // Unique kebab-case ID
  name: 'Nombre Oficial',               // Official tool name
  description: 'Descripción completa que explique qué hace la herramienta...',
  shortDescription: 'Descripción breve para cards',
  category: 'frontend',                 // Ver categorías disponibles
  subcategory: 'Framework',            
  website: 'https://tool.com',
  documentation: 'https://docs.tool.com', // opcional
  github: 'https://github.com/...',    // opcional
  pricing: 'free',                     // free|freemium|paid|enterprise
  tags: ['React', 'TypeScript'],       // Para búsquedas
  logo: '/img/tools/logos/tool-logo.png',
  logoHq: '/img/tools/logos/tool-logo.png',
  screenshots: ['/img/tools/screenshots/tool-homepage.jpg'],
  features: [
    'Feature principal 1',
    'Feature principal 2',
    // 4-6 features
  ],
  useCases: [
    'Caso de uso específico 1',
    'Caso de uso específico 2', 
    // 4-6 casos de uso
  ],
  alternatives: ['Tool1', 'Tool2'],
  difficulty: 'beginner',              // beginner|intermediate|advanced
  popularity: 8,                       // 1-10 scale
  lastUpdated: '2025-08-24',          // Today's date
  isRecommended: true,                 // true if Academy NoCode recommends
  integrations: ['React', 'Next.js'],  // opcional
  platforms: ['web'],                   // web|desktop|mobile|cli|api|saas
  languages: ['JavaScript']            // opcional
}
```

### 2️⃣ Generar assets automáticamente
```bash
# Opción 1: Todo automático (recomendado)
npm run setup-tools

# Opción 2: Paso a paso
npm run get-premium-logos          # Descarga logo PNG desde fuentes oficiales
npm run optimize-screenshots       # Captura screenshot 16:9 homepage
```

### 3️⃣ Verificar resultado
```bash
# Iniciar servidor
npm start

# Ir a http://localhost:3000/tools
# Buscar la nueva herramienta
# Verificar logo, screenshot, e información
```

## 📂 Categorías Disponibles

```typescript
'frontend'      // React, Vue, Angular, CSS frameworks
'backend'       // Node.js, Express, APIs, databases  
'fullstack'     // Next.js, Nuxt, full-stack solutions
'devops'        // Docker, CI/CD, deployment tools
'design'        // Figma, Sketch, design tools
'automation'    // Puppeteer, Playwright, testing
'testing'       // Jest, Cypress, testing frameworks
'database'      // MongoDB, PostgreSQL, ORMs
'ai-ml'         // AI/ML tools and platforms
'documentation' // Docusaurus, GitBook, docs tools
'deployment'    // Vercel, Netlify, hosting
'monitoring'    // Analytics, monitoring tools
'security'      // Security and auth tools
'productivity'  // Developer productivity tools
```

## 🎨 Asset Management

### 📸 Screenshots
- **Formato**: JPG, 1200x675px (16:9)
- **Ubicación**: `static/img/tools/screenshots/`
- **Naming**: `{tool-id}-homepage.jpg`
- **Generación**: `npm run optimize-screenshots`

### 🎨 Logos
- **Formato**: PNG, 1-15KB optimizado
- **Ubicación**: `static/img/tools/logos/`  
- **Naming**: `{tool-id}-logo.png`
- **Generación**: `npm run get-premium-logos`

### 🔧 Scripts Útiles

```bash
# Asset generation
npm run setup-tools               # Setup completo: logos + screenshots
npm run get-premium-logos         # Solo logos premium de fuentes oficiales
npm run optimize-screenshots      # Solo screenshots 16:9
npm run fetch-real-logos         # Logos PNG alternativos

# Troubleshooting  
node scripts/fix-logos.js        # Reparar logos corruptos
npm run typecheck                # Verificar tipos TypeScript

# Validation
node -e "
const { TOOLS_DATA, validateToolAssets } = require('./src/data/toolsData.ts');
const tool = TOOLS_DATA.find(t => t.id === 'tu-tool-id');
console.log(validateToolAssets(tool));
"
```

## ⚡ Quick Examples

### Ejemplo: Añadir Tailwind CSS
```typescript
{
  id: 'tailwindcss',
  name: 'Tailwind CSS', 
  description: 'Framework de CSS utilitario para diseño rápido...',
  shortDescription: 'Framework de CSS utilitario',
  category: 'frontend',
  subcategory: 'CSS Framework',
  website: 'https://tailwindcss.com',
  pricing: 'free',
  tags: ['CSS', 'Styling', 'Utility-First'],
  // ... resto de campos
}
```

### Ejemplo: Herramienta Backend
```typescript
{
  id: 'nestjs',
  name: 'NestJS',
  category: 'backend',
  subcategory: 'Node.js Framework', 
  pricing: 'free',
  difficulty: 'intermediate',
  // ... resto de campos
}
```

## 🚨 Common Issues

### ❌ Logo no se muestra
```bash
# Verificar formato
file static/img/tools/logos/tool-logo.png
# Debe ser: PNG image data (no SVG)

# Reparar
node scripts/fix-logos.js
```

### ❌ Screenshot se ve mal  
```bash
# Recapturar
npm run optimize-screenshots

# O editar configuración en scripts/optimize-screenshots.js
```

### ❌ TypeScript errors
```bash
npm run typecheck
# Verificar: ID único, categoría válida, campos requeridos
```

## 📊 Quality Standards

### Popularity Scoring (1-10)
- **10**: Herramientas esenciales (React, GitHub, Docker)
- **8-9**: Muy populares (Next.js, Tailwind, Vercel) 
- **6-7**: Populares en nicho (Puppeteer, Playwright)
- **4-5**: Útiles pero menos adoptadas
- **1-3**: Muy específicas o nuevas

### Recommended Tools (`isRecommended: true`)
- Ampliamente usadas en la industria
- Bien documentadas y mantenidas
- Relevantes para workflows de Claude Code
- Comunidad activa de usuarios

## 📝 Maintenance

### Regular Updates
- Actualizar `lastUpdated` cuando se modifica info
- Revisar pricing changes trimestralmente  
- Actualizar popularity scores anualmente
- Regenerar screenshots si cambian homepages

### Asset Cleanup
```bash
# Limpiar assets no utilizados
ls static/img/tools/logos/ | grep -v $(grep -o "'[^']*-logo.png'" src/data/toolsData.ts)
ls static/img/tools/screenshots/ | grep -v $(grep -o "'[^']*-homepage.jpg'" src/data/toolsData.ts)
```

---

**Academy NoCode Tools Directory** - Directorio interno de herramientas 🧡
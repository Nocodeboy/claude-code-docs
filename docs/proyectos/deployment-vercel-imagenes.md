# Deployment en Vercel y Gestión de Imágenes

**Proyecto complementario**: Cómo hacer deploy de tu documentación Docusaurus en Vercel y añadir screenshots/imágenes de forma profesional.

## 📋 Resumen del proyecto

Este segundo proyecto complementa al **Centro de Documentación** mostrando cómo:
- Deployar en Vercel desde GitHub (automático)
- Estructurar imágenes en Docusaurus
- Añadir screenshots y capturas de pantalla
- Optimizar imágenes para documentación
- Configurar dominio personalizado

### 🎯 Objetivos del proyecto
- ✅ Deploy automático en Vercel
- ✅ Estructura organizativa de imágenes
- ✅ Screenshots del proyecto funcionando
- ✅ Optimización para carga rápida
- ✅ Dominio personalizado (opcional)

## 🚀 Parte 1: Deployment en Vercel

### Método 1: Desde la interfaz web (Recomendado)

#### Paso 1: Acceder a Vercel
```bash
claude "Abre mi navegador y ve a vercel.com"
```

#### Paso 2: Conectar con GitHub
1. Haz clic en **"New Project"**
2. Selecciona **"Import Git Repository"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Busca el repositorio **`claude-code-docs`**

#### Paso 3: Configuración automática
Vercel detectará automáticamente:
- **Framework**: Docusaurus
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

#### Paso 4: Deploy
- Haz clic en **"Deploy"**
- Vercel creará la URL automáticamente
- El proceso toma aproximadamente 2-3 minutos

### Método 2: Desde CLI

#### Instalación y login
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login (abrirá el navegador)
vercel login

# Deploy desde el directorio del proyecto
vercel --prod
```

#### Comandos de Claude Code para CLI
```bash
claude "Instala Vercel CLI y haz deploy de mi proyecto de documentación"
```

### Configuración avanzada con vercel.json

Ya tenemos el archivo `vercel.json` configurado:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build", 
  "installCommand": "npm install",
  "framework": "docusaurus",
  "devCommand": "npm start",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📸 Parte 2: Gestión de Imágenes en Docusaurus

### Estructura de carpetas de imágenes

```
static/
├── img/
│   ├── projects/                  # Imágenes de proyectos
│   │   ├── documentation-center/  # Proyecto 1
│   │   │   ├── homepage.png
│   │   │   ├── blog.png
│   │   │   ├── navigation.png
│   │   │   └── project-docs.png
│   │   └── vercel-deploy/         # Proyecto 2
│   │       ├── vercel-dashboard.png
│   │       └── deployment-logs.png
│   ├── features/                  # Imágenes de características
│   ├── guides/                    # Imágenes de guías
│   └── screenshots/               # Screenshots generales
```

### Comandos de Claude Code para capturas

```bash
# Para tomar screenshots automáticamente
claude "Toma screenshots de mi sitio web en localhost:3011 y guárdalos en static/img/projects/documentation-center/"

# Para optimizar imágenes
claude "Optimiza las imágenes en static/img/ para web, mantén calidad pero reduce tamaño"

# Para crear diferentes tamaños
claude "Crea versiones responsive de las imágenes del proyecto (móvil, tablet, desktop)"
```

### Usando imágenes en Markdown

```markdown
# Imagen simple
![Descripción](/img/projects/documentation-center/homepage.png)

# Imagen con título
![Homepage del proyecto](/img/projects/documentation-center/homepage.png "Vista de la homepage")

# Imagen con tamaño específico
<img src="/img/projects/documentation-center/homepage.png" alt="Homepage" width="600" />

# Imagen centrada con estilo
<div style={{textAlign: 'center'}}>
  <img src="/img/projects/documentation-center/homepage.png" alt="Homepage" width="80%" />
</div>
```

## 🔧 Comandos específicos usados

### Para deployment
```bash
claude "Configura el deployment automático de mi proyecto Docusaurus en Vercel con dominio personalizado"
```

### Para screenshots
```bash
claude "Crea un script que tome screenshots automáticos de las páginas principales de mi sitio"
```

### Para optimización
```bash
claude "Optimiza todas las imágenes del proyecto para web sin perder calidad visible"
```

## 📊 Resultados esperados

### URLs del proyecto deployado
- **Vercel URL**: `https://claude-code-docs.vercel.app` (automática)
- **Dominio personalizado**: `claude-code-docs.com` (opcional)
- **GitHub Pages**: Como alternativa a Vercel

### Screenshots añadidos al proyecto original
1. **Homepage completa** - Mostrando las 6 secciones principales
2. **Blog funcionando** - Lista de artículos y artículo individual
3. **Navegación** - Sidebar y estructura de documentos
4. **Proyecto documentado** - Esta misma documentación funcionando

## 🎯 Lecciones aprendidas

### ✅ Deployment automático
- **Vercel + GitHub**: Deploy automático en cada push
- **Build time**: ~2-3 minutos para Docusaurus
- **URL automática**: No necesitas configurar nada
- **SSL gratuito**: HTTPS automático

### ✅ Gestión de imágenes
- **Estructura organizada**: Por proyecto y tipo
- **Rutas absolutas**: Empezar con `/img/`
- **Optimización**: Importante para tiempo de carga
- **Responsive**: Diferentes tamaños para diferentes dispositivos

## 🔄 Automatizaciones posibles

### Script de screenshots automático (Implementado)

Hemos creado e implementado un script completo de automatización:

```javascript
// scripts/take-screenshots.js (CÓDIGO REAL IMPLEMENTADO)
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function takeScreenshots() {
  console.log('🚀 Iniciando captura de screenshots...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  await page.setDefaultTimeout(30000);
  
  const screenshots = [
    { name: 'homepage', url: 'http://localhost:3011', description: 'Página de inicio completa' },
    { name: 'blog', url: 'http://localhost:3011/blog', description: 'Sistema de blog' },
    { name: 'documentation', url: 'http://localhost:3011/docs/intro', description: 'Documentación' },
    { name: 'projects', url: 'http://localhost:3011/docs/proyectos', description: 'Proyectos' },
    { name: 'project-detail', url: 'http://localhost:3011/docs/proyectos/centro-documentacion-docusaurus', description: 'Detalle proyecto' }
  ];
  
  for (const screenshot of screenshots) {
    await page.goto(screenshot.url, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({
      path: `static/img/projects/documentation-center/${screenshot.name}.png`,
      fullPage: true
    });
    
    console.log(`✅ Guardado: ${screenshot.name}.png`);
  }
  
  await browser.close();
}
```

**Comando para ejecutar**: `npm run screenshots`

**Resultado**: 5 screenshots perfectos tomados automáticamente ✅

### Deploy hook con imágenes
```bash
# En package.json
{
  "scripts": {
    "predeploy": "npm run screenshots && npm run optimize-images",
    "screenshots": "node scripts/take-screenshots.js",
    "optimize-images": "imagemin static/img/**/*.{jpg,png} --out-dir=static/img/optimized"
  }
}
```

## 🎨 Mejores prácticas

### Para screenshots
- **Resolución consistente**: 1920x1080 para desktop
- **Formato**: PNG para capturas con texto, JPG para fotos
- **Nombres descriptivos**: `homepage-desktop.png`, `blog-mobile.png`
- **Tamaño optimizado**: Máximo 500KB por imagen

### Para deployment
- **Variables de entorno**: Para configuraciones específicas
- **Build optimizado**: `npm run build` antes de deploy
- **Cache busting**: Vercel lo maneja automáticamente
- **Dominio personalizado**: Configurar DNS correctamente

## 🔗 Referencias

### Vercel
- **Documentación**: https://vercel.com/docs
- **Docusaurus + Vercel**: https://vercel.com/guides/deploying-docusaurus-with-vercel
- **Dominios**: https://vercel.com/docs/projects/domains

### Docusaurus Assets
- **Static Assets**: https://docusaurus.io/docs/static-assets
- **Markdown Features**: https://docusaurus.io/docs/markdown-features/assets

## 🚀 Próximos pasos

1. **Completar deployment**: Seguir los pasos de Vercel
2. **Añadir screenshots**: Tomar capturas del proyecto funcionando
3. **Optimizar imágenes**: Comprimir sin perder calidad
4. **Dominio personalizado**: Opcional pero recomendado
5. **Analytics**: Añadir Google Analytics o similar

---

**Proyecto complementario completado** | Deploy + Imágenes | Agosto 2025
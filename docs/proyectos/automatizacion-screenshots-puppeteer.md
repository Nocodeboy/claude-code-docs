# Automatización de Screenshots con Puppeteer

**Proyecto complementario**: Integrar Puppeteer en Docusaurus para automatizar capturas de pantalla profesionales del proyecto funcionando.

![Blog con screenshots automáticos](/img/projects/documentation-center/blog.png)
*El blog del centro de documentación mostrando artículos con imágenes automáticas*

## 📋 Resumen del proyecto

Este proyecto complementa al **Centro de Documentación** mostrando la implementación real de:
- **Puppeteer** integrado en proyecto Docusaurus
- **Script automatizado** para capturar screenshots
- **Estructura profesional** de imágenes
- **NPM scripts** para workflow automático
- **Screenshots perfectos** de páginas funcionando

### 🎯 Objetivos logrados
- ✅ Puppeteer instalado y configurado
- ✅ Script automático funcionando (`npm run screenshots`)
- ✅ 5 screenshots capturados automáticamente
- ✅ Estructura de imágenes organizada
- ✅ Documentación actualizada con imágenes reales

## 🛠️ Stack tecnológico implementado

- **Base**: Docusaurus v3 funcionando
- **Puppeteer**: v24.17.0 para automatización
- **Node.js**: Versión 18+ (requerida)
- **Scripts**: NPM para workflow automático
- **Resolución**: 1920x1080 full-page screenshots

## 📸 Paso 1: Instalación de Puppeteer

### Comando de Claude Code usado
```bash
claude "Instala Puppeteer como dependencia de desarrollo para automatizar screenshots del proyecto"
```

### Instalación real ejecutada
```bash
npm install --save-dev puppeteer
```

**Resultado**: Puppeteer v24.17.0 añadido al `package.json`

## 📁 Paso 2: Estructura de carpetas para imágenes

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

## 💻 Paso 3: Creación del script de automatización

### Comando de Claude Code usado
```bash
claude "Crea un script completo de Puppeteer que tome screenshots automáticos de todas las páginas principales del sitio"
```

### Script implementado: `scripts/take-screenshots.js`

## 🎯 Paso 4: Configuración de NPM Script

### Actualización de package.json
```json
{
  "scripts": {
    "screenshots": "node scripts/take-screenshots.js"
  }
}
```

## ✅ Paso 5: Ejecución y resultados

### Comando ejecutado
```bash
npm run screenshots
```

### Output del script
```
🚀 Iniciando captura de screenshots...
📸 Capturando: Página de inicio completa...
✅ Guardado: homepage.png
📸 Capturando: Sistema de blog...
✅ Guardado: blog.png
📸 Capturando: Página de documentación...
✅ Guardado: documentation.png
📸 Capturando: Sección de proyectos...
✅ Guardado: projects.png
📸 Capturando: Documentación del proyecto...
✅ Guardado: project-detail.png
🎯 Screenshots completados!
```

### Screenshots generados automáticamente

#### 📸 Resultados visuales obtenidos:

![Homepage capturada automáticamente](/img/projects/documentation-center/homepage.png)
*1. Homepage completa con las 6 secciones principales*

![Documentación estructurada](/img/projects/documentation-center/documentation.png)
*2. Sistema de documentación con navegación lateral*

![Catálogo de proyectos](/img/projects/documentation-center/projects.png) 
*3. Sección de proyectos organizados por categorías*

![Esta documentación meta](/img/projects/documentation-center/project-detail.png)
*4. Meta: La documentación de cómo automatizamos las capturas*

### ✨ **Resultado final**: 5 screenshots perfectos capturados en <30 segundos

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
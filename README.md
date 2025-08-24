# Academy NoCode - Centro Claude Code 🧡

Centro de documentación completo y especializado en **Claude Code** creado por **Germán Huertas**. El recurso más completo en español para dominar Claude Code, el CLI oficial de Anthropic.

![Academy NoCode](./static/img/logo.png)

🌐 **Sitio web**: [https://claude-code-docs.vercel.app](https://claude-code-docs.vercel.app)

## 🎯 Sobre Academy NoCode

**Academy NoCode** es el centro educativo liderado por **Germán Huertas** que se especializa en enseñar desarrollo sin código y herramientas de IA como Claude Code. Este proyecto recopila toda la información, proyectos, herramientas y recursos necesarios para dominar Claude Code desde cero hasta nivel experto.

### 👨‍💻 Sobre Germán Huertas
- **𝕏 Twitter**: [@Nocodeboy](https://x.com/Nocodeboy)
- **LinkedIn**: [Germán Huertas Piquero](https://www.linkedin.com/in/germán-huertas-piquero-b89a80b1/)
- **Web**: [academynocode.com](https://academynocode.com)

## 🎨 Características del Sitio

### 🔍 Explorador Interactivo
- **Búsqueda inteligente** con filtros por categoría y dificultad
- **Navegación intuitiva** para encontrar contenido específico
- **Cards organizadas** con metadata detallada

### 🎯 Contenido Especializado
- **Documentación completa** en español
- **Proyectos reales** desarrollados con Claude Code
- **Guías paso a paso** para principiantes
- **Recursos descargables** y templates

## 🏗️ Estructura del Proyecto

```
academy-nocode-claude-code/
├── docs/                          # Documentación principal
│   ├── proyectos/                 # Proyectos desarrollados con Claude Code
│   │   ├── web-development/       # Desarrollo web con IA
│   │   ├── automation/            # Automatizaciones inteligentes
│   │   ├── ai-integration/        # Integraciones con IA
│   │   └── tools/                 # Herramientas CLI personalizadas
│   ├── herramientas/              # Herramientas para Claude Code
│   │   ├── extensions/            # Extensiones VS Code
│   │   ├── templates/             # Templates Academy NoCode
│   │   ├── workflows/             # Workflows optimizados
│   │   └── integraciones/         # Integraciones con otras herramientas
│   ├── guias/                     # Guías por Germán Huertas
│   │   ├── instalacion.md         # Instalación completa
│   │   ├── primeros-pasos.md      # Tutorial para principiantes
│   │   ├── conceptos-basicos.md   # Fundamentos explicados
│   │   └── mejores-practicas.md   # Best practices
│   ├── recursos/                  # Recursos Academy NoCode
│   │   ├── repositorios-utiles.md # Colección curada de repos
│   │   ├── templates/             # Templates de proyectos
│   │   ├── snippets/              # Code snippets útiles
│   │   └── configuraciones/       # Configuraciones optimizadas
│   └── casos-uso/                 # Casos de uso específicos
│       ├── desarrollo-web/        # Desarrollo web con Claude Code
│       ├── data-science/          # Ciencia de datos con IA
│       ├── automation/            # Automatización de tareas
│       └── ai-development/        # Desarrollo con IA avanzado
├── blog/                          # Blog Academy NoCode
├── src/                           # Componentes React personalizados
│   ├── components/
│   │   └── DocExplorer/           # Explorador interactivo
│   ├── pages/
│   │   └── explorer.tsx           # Página del explorador
│   └── css/custom.css             # Branding Academy NoCode
└── static/                        # Recursos estáticos
    ├── img/                       # Imágenes y logos
    └── screenshots/               # Capturas automáticas
```

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18.0 o superior
- npm o yarn
- Claude Code CLI instalado (opcional para desarrollo)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Nocodeboy/claude-code-docs.git
cd claude-code-docs

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El sitio estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo
npm start              # Servidor de desarrollo
npm run build          # Build de producción
npm run serve          # Servir build localmente
npm run clear          # Limpiar cache de Docusaurus
npm run typecheck      # Verificar tipos TypeScript

# 🎨 Asset Management Academy NoCode
npm run fetch-logos          # Obtener logos básicos
npm run fetch-real-logos     # Descargar logos PNG reales
npm run get-premium-logos    # Obtener logos premium de múltiples fuentes
npm run optimize-screenshots # Capturar screenshots optimizados (1200x675px, 16:9)
npm run setup-tools         # Setup completo: logos + screenshots

# 📸 Screenshot Management
npm run screenshots         # Capturar todos los screenshots
npm run screenshots:local   # Solo screenshots locales
npm run screenshots:external # Solo screenshots externos
npm run screenshots:tools   # Solo screenshots de herramientas
npm run screenshots:help    # Ver ayuda de screenshots

# 🔧 Development Utils
node scripts/fix-logos.js   # Reparar logos corruptos
node scripts/take-screenshots.js help  # Ver opciones avanzadas
```

## 🎨 Branding Academy NoCode

### Colores Principales
- **Naranja principal**: `#ff3d00` (Academy NoCode Orange)
- **Paleta complementaria**: Variantes de naranja y grises elegantes
- **Paleta elegante**: Grises sofisticados para fondos y texto

### Logo
- **Logo unificado**: `static/img/logo.png`
- **Dimensiones**: 32x32px optimizado
- **Uso**: Funciona en modo claro y oscuro

### Tipografía
- **Font family**: Inter (Google Fonts)
- **Jerarquía visual**: Optimizada para documentación técnica
- **Accesibilidad**: Cumple estándares WCAG AA

## 📚 Contenido Principal

### 🛠️ Directorio de Herramientas Interactivo
**Nuevo**: Directorio completo de herramientas de desarrollo con:
- **11 herramientas catalogadas** (Next.js, React, Docker, GitHub, etc.)
- **Búsqueda y filtros inteligentes** por categoría, dificultad y popularidad
- **Screenshots optimizados** capturados automáticamente (1200x675px, formato 16:9)
- **Logos premium en PNG** descargados de fuentes oficiales
- **Metadata completa** con casos de uso, alternativas e integraciones
- **Sistema de puntuación** y recomendaciones curadas
- **Páginas de detalle** con información técnica completa

🌐 **Acceso**: `/tools` - Explora herramientas modernas de desarrollo

### 🚀 Proyectos Reales
Documentación completa de proyectos desarrollados por Academy NoCode:
- **Centro de documentación** (este mismo sitio) - Creado en 35 minutos
- **Directorio de herramientas** con asset management automatizado
- **Sistema de screenshots automáticos** con Puppeteer
- **Aplicaciones web** completas con IA integrada
- **Scripts de automatización** inteligentes

### 🛠️ Herramientas Especializadas
Herramientas que potencian tu experiencia con Claude Code:
- **Extensiones** de VS Code para Claude Code
- **Templates Academy NoCode** listos para usar
- **Workflows** optimizados por Germán Huertas
- **Integraciones** con GitHub, Docker, y más

### 📖 Guías por Germán Huertas
Tutoriales paso a paso creados específicamente para hispanohablantes:
- **Instalación completa** con troubleshooting
- **Primeros pasos** con proyecto práctico
- **Conceptos fundamentales** explicados de forma simple
- **Mejores prácticas** basadas en experiencia real

### 📦 Recursos Academy NoCode
Recursos descargables y reutilizables:
- **Repositorios útiles** curados por la comunidad
- **Code snippets** frecuentemente usados
- **Configuraciones optimizadas** para máxima productividad
- **Templates** de proyectos Academy NoCode

## 🌟 Características Técnicas

### ⚡ Rendimiento
- ✅ **Build optimizado** con Docusaurus 3.8.1
- ✅ **Imágenes optimizadas** y lazy loading
- ✅ **CSS minificado** con variables CSS custom
- ✅ **TypeScript** para mejor desarrollo

### 🎯 UX/UI
- ✅ **Explorador interactivo** con búsqueda y filtros
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Dark/Light mode** automático
- ✅ **Navegación intuitiva** con sidebar automático
- ✅ **Accesibilidad WCAG AA** compliant

### 🔧 Características Avanzadas
- ✅ **Directorio de herramientas interactivo** con TypeScript
- ✅ **Asset management automático** (logos PNG + screenshots JPG)
- ✅ **Screenshots optimizados** con Puppeteer (1200x675px, 16:9, 85% quality)
- ✅ **Sistema de logos premium** con múltiples fuentes de respaldo
- ✅ **Búsqueda y filtros avanzados** por metadata
- ✅ **Syntax highlighting** para múltiples lenguajes
- ✅ **SEO optimizado** para mejor discoverabilidad
- ✅ **PWA ready** para instalación offline
- ✅ **Analytics integrado** para tracking de uso

## 🚀 Deployment

### Vercel (Recomendado)
El sitio se despliega automáticamente en Vercel:
- **URL**: [https://claude-code-docs.vercel.app](https://claude-code-docs.vercel.app)
- **Deploy automático** con cada push a `master`
- **Optimizaciones automáticas** de Vercel

### Otros Providers
Compatible con:
- Netlify
- GitHub Pages
- Docker
- Cualquier hosting estático

## 📊 Roadmap Academy NoCode

### ✅ Fase 1: Fundación (Completada)
- [x] Setup inicial con branding Academy NoCode
- [x] Explorador interactivo de documentación
- [x] Guías fundamentales por Germán Huertas
- [x] Sistema de screenshots automáticos
- [x] Deploy en producción
- [x] **Directorio de herramientas interactivo** con 11 tools
- [x] **Asset management automático** (logos + screenshots)
- [x] **Sistema de búsqueda y filtros** avanzado

### 🚧 Fase 2: Expansión de Contenido
- [x] 11 herramientas catalogadas con metadata completa
- [ ] 50 herramientas adicionales (VS Code, Tailwind, etc.)
- [ ] 20 proyectos documentados
- [ ] 25 guías especializadas
- [ ] 100 recursos descargables

### 📅 Fase 3: Funcionalidades Avanzadas
- [ ] Integración con Algolia Search
- [ ] Sistema de comentarios de la comunidad
- [ ] Newsletter Academy NoCode
- [ ] API de contenido para developers

### 🔮 Fase 4: Comunidad Academy NoCode
- [ ] Contribuciones de estudiantes
- [ ] Sistema de ratings y reviews
- [ ] Foro de discusión integrado
- [ ] Showcase de proyectos de la comunidad

## 🤝 Contribuir

### 🛠️ Añadir Herramientas al Directorio
¿Conoces una herramienta increíble que debería estar en nuestro directorio?

**📖 Guía de Desarrollo**: [TOOLS_README.md](./TOOLS_README.md)

**🚀 Proceso Rápido**:
1. Añade datos en `src/data/toolsData.ts`
2. Ejecuta `npm run setup-tools` para generar assets
3. Prueba localmente en `/tools`
4. Crea Pull Request con la nueva herramienta

### Para Estudiantes
1. **Fork** el repositorio
2. **Crea** una nueva rama para tu contribución
3. **Documenta** tu proyecto o herramienta
4. **Envía** un Pull Request con descripción detallada

### Para la Comunidad
- **Añade herramientas** siguiendo nuestra [guía de desarrollo](./TOOLS_README.md)
- **Comparte** tus proyectos de Claude Code
- **Sugiere** mejoras al contenido
- **Reporta** bugs o problemas
- **Traducte** contenido a otros idiomas

## 📄 Licencia

MIT License - Ver `LICENSE` para más detalles.

## 🤝 Contacto Academy NoCode

### Germán Huertas
- **𝕏 Twitter**: [@Nocodeboy](https://x.com/Nocodeboy)
- **LinkedIn**: [Germán Huertas Piquero](https://www.linkedin.com/in/germán-huertas-piquero-b89a80b1/)
- **Web**: [academynocode.com](https://academynocode.com)

### Soporte
- **GitHub Issues**: [Reportar problemas](https://github.com/Nocodeboy/claude-code-docs/issues)
- **Documentación oficial**: [Claude Code](https://docs.anthropic.com/claude-code)
- **Academy NoCode**: [Cursos y recursos](https://academynocode.com)

---

**Academy NoCode** - Aprende Claude Code con Germán Huertas 🧡  
*El centro más completo en español para dominar Claude Code*

[![Academy NoCode](https://img.shields.io/badge/Academy-NoCode-FF3D00?style=for-the-badge)](https://academynocode.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://claude-code-docs.vercel.app)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Claude Code](https://img.shields.io/badge/Powered%20by-Claude%20Code-8B5CF6?style=for-the-badge)](https://claude.ai/code)
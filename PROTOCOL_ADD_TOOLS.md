# 🔧 Protocolo para Añadir Herramientas al Directorio

## ⚠️ REGLA FUNDAMENTAL

**NUNCA regenerar logos o screenshots de herramientas existentes que ya funcionan correctamente.**

Este protocolo garantiza que solo se generen assets para herramientas nuevas sin afectar las existentes.

## 📋 Protocolo de Adición de Herramientas

### Método 1: Adición Completa Automatizada

Para añadir una herramienta completa usando plantillas predefinidas:

```bash
# Frontend tools
npm run add-tool:frontend <id> <name> <website>

# Backend tools  
npm run add-tool:backend <id> <name> <website>

# Ejemplos:
npm run add-tool:frontend vite "Vite" "https://vitejs.dev"
npm run add-tool:backend fastify "Fastify" "https://fastify.io"
```

**Lo que hace:**
- ✅ Añade entrada a `src/data/toolsData.ts`
- ✅ Descarga logo PNG automáticamente
- ❌ NO toca herramientas existentes
- ❌ NO genera screenshots automáticamente

### Método 2: Adición Manual Paso a Paso

#### Paso 1: Añadir a toolsData.ts

Editar manualmente `src/data/toolsData.ts` y añadir la nueva herramienta al final del array TOOLS_DATA:

```typescript
{
  id: 'nueva-herramienta',
  name: 'Nueva Herramienta',
  description: 'Descripción completa...',
  shortDescription: 'Descripción corta',
  category: 'frontend', // frontend|backend|fullstack|devops|design|etc
  // ... resto de campos
}
```

#### Paso 2: Descargar Logo

```bash
# Solo para la herramienta específica
npm run add-tool nueva-herramienta
```

#### Paso 3: Generar Screenshot (Opcional)

```bash
# Solo screenshot de la nueva herramienta
npm run screenshots:tools -- nueva-herramienta
```

### Método 3: Solo Logo

Si solo necesitas descargar el logo de una herramienta:

```bash
npm run add-tool <tool-id>
```

## 🎯 Comandos Disponibles

### Comandos Principales

- `npm run add-tool:frontend <id> <name> <website>` - Añadir herramienta frontend completa
- `npm run add-tool:backend <id> <name> <website>` - Añadir herramienta backend completa
- `npm run add-tool <tool-id>` - Solo descargar logo
- `npm run screenshots:tools -- <tool-id>` - Solo screenshot específico

### Comandos de Ayuda

- `npm run add-tool:help` - Ayuda para logos
- `npm run add-tool:complete --help` - Ayuda para adición completa

## 🔍 Verificaciones Automáticas

Los scripts automáticamente verifican:

- ✅ Si la herramienta ya existe en `toolsData.ts`
- ✅ Si el logo ya existe en `static/img/tools/logos/`
- ✅ Si el screenshot ya existe en `static/img/tools/screenshots/`

**Si cualquier asset ya existe, se omite automáticamente.**

## 📁 Estructura de Assets

### Logos
- **Ubicación**: `static/img/tools/logos/`
- **Formato**: `{tool-id}-logo.png`
- **Fuentes**: GitHub avatars, favicons oficiales, devicons

### Screenshots  
- **Ubicación**: `static/img/tools/screenshots/`
- **Formato**: `{tool-id}-homepage.jpg`
- **Especificaciones**: 1200x675px, 16:9, 85% calidad

## ⚡ Flujo Recomendado

Para añadir una nueva herramienta:

```bash
# 1. Añadir herramienta completa (toolsData.ts + logo)
npm run add-tool:frontend nuxt "Nuxt.js" "https://nuxtjs.org"

# 2. Verificar en desarrollo
npm start
# Visitar http://localhost:3000/tools

# 3. Generar screenshot si es necesario
npm run screenshots:tools -- nuxt

# 4. Commit cambios
git add .
git commit -m "feat: add Nuxt.js to tools directory

🆕 Nueva herramienta: Nuxt.js
✅ Logo: descargado automáticamente  
✅ Screenshot: generado
✅ toolsData.ts: actualizado

🤖 Generated with Claude Code"
```

## 🚫 Lo que NO Hacer

❌ **NO ejecutar comandos que afecten todas las herramientas:**
- ~~`npm run get-premium-logos`~~ (regenera TODOS los logos)
- ~~`npm run setup-tools`~~ (regenera TODOS los assets)
- ~~`npm run screenshots`~~ (regenera TODAS las screenshots)

❌ **NO editar scripts existentes para añadir herramientas**

✅ **SÍ usar los comandos específicos del protocolo**

## 🔧 Configuración de Herramientas

### Plantilla Frontend
```typescript
{
  id: 'tool-id',
  name: 'Tool Name',
  category: 'frontend',
  subcategory: 'Framework',
  pricing: 'free',
  tags: ['Frontend', 'JavaScript', 'Modern'],
  platforms: ['web', 'desktop'],
  languages: ['JavaScript', 'TypeScript']
}
```

### Plantilla Backend
```typescript
{
  id: 'tool-id', 
  name: 'Tool Name',
  category: 'backend',
  subcategory: 'Framework',
  pricing: 'free',
  tags: ['Backend', 'API', 'Server'],
  platforms: ['server'],
  languages: ['JavaScript', 'Python']
}
```

## 📊 Monitoreo y Validación

### Verificar Assets Generados

```bash
# Verificar logo existe
ls static/img/tools/logos/nueva-herramienta-logo.png

# Verificar screenshot existe  
ls static/img/tools/screenshots/nueva-herramienta-homepage.jpg

# Verificar en toolsData.ts
grep -n "nueva-herramienta" src/data/toolsData.ts
```

### Validar Funcionamiento

1. **Desarrollo**: `npm start` → `http://localhost:3000/tools`
2. **Producción**: `npm run build` → verificar sin errores
3. **Deploy**: Push a repositorio → verificar en Vercel

## 🎯 Objetivos del Protocolo

- ✅ **Selectividad**: Solo afectar herramientas nuevas
- ✅ **Eficiencia**: No regenerar assets existentes
- ✅ **Consistencia**: Mantener calidad y formato
- ✅ **Automatización**: Reducir pasos manuales
- ✅ **Escalabilidad**: Fácil añadir más herramientas

---

**💡 Recuerda**: Este protocolo protege el trabajo ya hecho y garantiza que añadir herramientas sea rápido y seguro.
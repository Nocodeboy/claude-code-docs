---
title: "Configuraciones Optimizadas para Claude Code"
description: "Configuraciones profesionales y optimizaciones para maximizar la productividad con Claude Code"
sidebar_position: 2
---

# Configuraciones Optimizadas para Claude Code

Esta guía incluye configuraciones profesionales, optimizaciones de rendimiento y configuraciones específicas para diferentes entornos de desarrollo con Claude Code.

## Configuración General del CLI

### Configuración Global (~/.claude/config.json)

```json
{
  "default_model": "claude-3-5-sonnet-20241022",
  "context": {
    "max_files": 50,
    "max_file_size": "1MB",
    "auto_include": [
      "CLAUDE.md",
      "README.md",
      "package.json",
      "requirements.txt",
      "Cargo.toml",
      "go.mod"
    ],
    "exclude_patterns": [
      "node_modules/**",
      ".git/**",
      "dist/**",
      "build/**",
      "*.log",
      ".env*",
      "coverage/**"
    ]
  },
  "prompts": {
    "default_prefix": "Como desarrollador experimentado, ",
    "include_file_tree": true,
    "include_git_status": true
  },
  "output": {
    "format": "markdown",
    "syntax_highlighting": true,
    "show_line_numbers": true
  },
  "performance": {
    "cache_enabled": true,
    "cache_duration": "1h",
    "parallel_requests": 3,
    "timeout": "120s"
  }
}
```

### Variables de Entorno Recomendadas

```bash
# ~/.bashrc o ~/.zshrc

# Claude Code configuración
export CLAUDE_API_KEY="tu-api-key"
export CLAUDE_MODEL="claude-3-5-sonnet-20241022"
export CLAUDE_MAX_TOKENS=4096
export CLAUDE_TEMPERATURE=0.1

# Configuración de contexto
export CLAUDE_AUTO_CONTEXT=true
export CLAUDE_CONTEXT_FILES=50
export CLAUDE_EXCLUDE_PATTERNS="node_modules,dist,build,.git"

# Configuración de rendimiento
export CLAUDE_CACHE_ENABLED=true
export CLAUDE_PARALLEL_REQUESTS=3
export CLAUDE_TIMEOUT=120

# Logging y debugging
export CLAUDE_LOG_LEVEL="info"
export CLAUDE_DEBUG=false
```

## Configuraciones por Entorno de Desarrollo

### Configuración para VS Code

#### settings.json
```json
{
  "claude.enabled": true,
  "claude.autoContext": true,
  "claude.contextFiles": [
    "CLAUDE.md",
    "package.json",
    "tsconfig.json",
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "claude.excludePatterns": [
    "node_modules/**",
    "dist/**",
    ".git/**"
  ],
  "claude.prompts": {
    "prefix": "Como desarrollador TypeScript/React, ",
    "includeFileTree": true,
    "includeGitStatus": true
  },
  "claude.keybindings": {
    "quickPrompt": "ctrl+alt+c",
    "clearContext": "ctrl+alt+x",
    "analyzeFile": "ctrl+alt+a"
  },
  "claude.ui": {
    "showInlineComments": true,
    "highlightGeneratedCode": true,
    "showContextIndicator": true
  }
}
```

#### Snippets para Claude (claude-snippets.json)
```json
{
  "Claude Quick Analyze": {
    "prefix": "cca",
    "body": [
      "claude \"Analiza este archivo y sugiere mejoras en:",
      "1. Rendimiento",
      "2. Legibilidad",
      "3. Mantenibilidad",
      "4. Mejores prácticas",
      "\\n\\nArchivo: ${TM_FILEPATH}\""
    ],
    "description": "Análisis rápido con Claude"
  },
  "Claude Create Tests": {
    "prefix": "cct",
    "body": [
      "claude \"Crea tests unitarios completos para esta función/componente:",
      "- Casos felices",
      "- Casos edge",
      "- Manejo de errores",
      "- Mocks necesarios",
      "\\n\\nUsa ${1:Jest} como framework de testing\""
    ],
    "description": "Crear tests con Claude"
  },
  "Claude Refactor": {
    "prefix": "ccr",
    "body": [
      "claude \"Refactoriza este código para:",
      "- Mejor legibilidad",
      "- Seguir patrones ${1:SOLID}",
      "- Optimizar rendimiento",
      "- Mantener funcionalidad actual",
      "\\n\\nIncluye explicación de cambios\""
    ],
    "description": "Refactoring con Claude"
  }
}
```

### Configuración para IntelliJ IDEA/WebStorm

#### claude-plugin.xml
```xml
<configuration>
  <claude>
    <general>
      <apiKey>YOUR_API_KEY</apiKey>
      <model>claude-3-5-sonnet-20241022</model>
      <autoContext>true</autoContext>
    </general>
    <context>
      <includePatterns>
        <pattern>**/*.java</pattern>
        <pattern>**/*.kt</pattern>
        <pattern>**/*.ts</pattern>
        <pattern>**/*.js</pattern>
        <pattern>pom.xml</pattern>
        <pattern>build.gradle</pattern>
        <pattern>package.json</pattern>
      </includePatterns>
      <excludePatterns>
        <pattern>**/node_modules/**</pattern>
        <pattern>**/target/**</pattern>
        <pattern>**/build/**</pattern>
      </excludePatterns>
    </context>
    <shortcuts>
      <shortcut action="analyzeCode" key="ctrl alt c"/>
      <shortcut action="generateTest" key="ctrl alt t"/>
      <shortcut action="refactor" key="ctrl alt r"/>
    </shortcuts>
  </claude>
</configuration>
```

### Configuración para Neovim

#### init.lua (extracto)
```lua
-- Claude Code integration
local claude = require('claude-nvim')

claude.setup({
  api_key = os.getenv("CLAUDE_API_KEY"),
  model = "claude-3-5-sonnet-20241022",
  auto_context = true,
  context = {
    max_files = 30,
    include_patterns = {
      "*.lua",
      "*.py",
      "*.js",
      "*.ts",
      "*.rs",
      "package.json",
      "Cargo.toml",
      "pyproject.toml"
    },
    exclude_patterns = {
      "node_modules/*",
      ".git/*",
      "target/*",
      "__pycache__/*"
    }
  },
  keymaps = {
    analyze_buffer = "<leader>ca",
    clear_context = "<leader>cx",
    generate_test = "<leader>ct",
    refactor_selection = "<leader>cr"
  }
})

-- Atajos de teclado personalizados
vim.keymap.set('n', '<leader>cp', ':Claude "Explica este código paso a paso"<CR>')
vim.keymap.set('v', '<leader>cf', ':Claude "Refactoriza la selección"<CR>')
vim.keymap.set('n', '<leader>cd', ':Claude "Encuentra y explica posibles bugs"<CR>')
```

## Configuraciones por Tipo de Proyecto

### Proyecto React/TypeScript

#### CLAUDE.md
```markdown
# CLAUDE.md

## Proyecto React + TypeScript

### Stack Tecnológico
- React 18 con TypeScript
- Vite como bundler
- Testing: Vitest + React Testing Library
- Styling: Tailwind CSS
- Estado: Zustand
- Routing: React Router v6

### Estructura
```
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   └── features/     # Componentes específicos de funcionalidad
├── pages/            # Páginas de la aplicación
├── hooks/            # Custom hooks
├── stores/           # Zustand stores
├── utils/            # Funciones utilitarias
├── types/            # Definiciones de TypeScript
└── api/              # Cliente HTTP y llamadas API
```

### Convenciones de Código
- Componentes: PascalCase
- Archivos: kebab-case
- Funciones/variables: camelCase
- Constantes: UPPER_SNAKE_CASE
- Hooks personalizados: prefijo "use"

### Patrones de Desarrollo
- Componentes funcionales con hooks
- Custom hooks para lógica reutilizable
- TypeScript estricto (strict: true)
- Props con interfaces definidas
- Error boundaries para manejo de errores

### Reglas de Testing
- Todo hook debe tener tests
- Componentes de UI críticos deben tener tests
- Utilidades deben tener 100% cobertura
- Usar MSW para mocking de APIs

### Performance
- React.memo para componentes pesados
- useMemo/useCallback solo cuando sea necesario
- Lazy loading para rutas
- Code splitting por características

### Instrucciones Específicas para Claude
1. Siempre usar TypeScript estricto
2. Validar props con interfaces
3. Incluir comentarios JSDoc para funciones complejas
4. Seguir patrones de componentes compound cuando sea apropiado
5. Usar Tailwind para estilos, evitar CSS-in-JS
6. Optimizar para accesibilidad (a11y)
```

#### vite.config.ts optimizado
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  }
})
```

### Proyecto Node.js/Express

#### CLAUDE.md
```markdown
# CLAUDE.md

## API REST con Node.js + Express

### Stack Tecnológico
- Node.js 20+ con TypeScript
- Express.js con helmet y cors
- Database: PostgreSQL con Prisma ORM
- Authentication: JWT + bcrypt
- Validation: Zod
- Testing: Jest + Supertest
- Documentation: Swagger/OpenAPI

### Arquitectura
```
src/
├── controllers/      # Controladores de rutas
├── middleware/       # Middlewares personalizados
├── models/          # Modelos de datos (Prisma)
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Utilidades y helpers
├── types/           # Tipos TypeScript
├── config/          # Configuración de la app
└── __tests__/       # Tests organizados por módulo
```

### Patrones de Desarrollo
- Repository pattern para acceso a datos
- Service layer para lógica de negocio
- Middleware pattern para funcionalidades transversales
- Error handling centralizado
- Validation schemas con Zod

### Seguridad
- Helmet para headers de seguridad
- Rate limiting
- Input validation y sanitización
- JWT con refresh tokens
- CORS configurado apropiadamente
- Logging de actividad sensible

### Performance
- Connection pooling para base de datos
- Caching con Redis para queries frecuentes
- Compression de respuestas
- Lazy loading de módulos grandes

### Instrucciones para Claude
1. Siempre validar entrada con Zod schemas
2. Usar try-catch en todos los controladores
3. Implementar logging detallado
4. Seguir convenciones REST para APIs
5. Documentar endpoints con comentarios OpenAPI
6. Usar status codes HTTP apropiados
7. Implementar paginación para listas largas
```

#### Express app optimizada
```typescript
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { errorHandler, notFoundHandler } from './middleware/errors'
import routes from './routes'

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: 'Demasiadas peticiones desde esta IP'
})
app.use(limiter)

// Basic middleware
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', routes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app
```

### Proyecto Python/FastAPI

#### CLAUDE.md
```markdown
# CLAUDE.md

## API con FastAPI + Python

### Stack Tecnológico
- Python 3.11+ con FastAPI
- Database: PostgreSQL con SQLAlchemy
- Authentication: OAuth2 + JWT
- Validation: Pydantic v2
- Testing: pytest + httpx
- Documentation: Auto-generada con FastAPI

### Estructura
```
app/
├── api/
│   └── v1/          # Versión 1 de la API
├── core/            # Configuración y seguridad
├── crud/            # Operaciones CRUD
├── db/              # Base de datos y modelos
├── models/          # Modelos SQLAlchemy
├── schemas/         # Schemas Pydantic
├── services/        # Lógica de negocio
└── tests/           # Tests organizados
```

### Convenciones
- Classes: PascalCase
- Functions/variables: snake_case
- Constants: UPPER_SNAKE_CASE
- Files/modules: snake_case
- Async/await para operaciones I/O

### Patrones Python
- Type hints obligatorios
- Pydantic para validación de datos
- Dependency Injection de FastAPI
- Context managers para recursos
- Decorators para funcionalidad transversal

### Instrucciones para Claude
1. Usar type hints en todas las funciones
2. Validar datos con Pydantic schemas
3. Implementar logging estructurado
4. Usar async/await para operaciones I/O
5. Crear docstrings detallados
6. Seguir PEP 8 para estilo de código
```

## Configuración de Rendimiento

### Configuración de Cache

```json
{
  "cache": {
    "enabled": true,
    "provider": "memory",
    "ttl": 3600,
    "max_size": "500MB",
    "compression": true,
    "strategies": {
      "context": "lru",
      "responses": "fifo",
      "files": "ttl"
    }
  }
}
```

### Optimización de Memoria

```bash
# Variables de entorno para optimización
export CLAUDE_MEMORY_LIMIT="2GB"
export CLAUDE_CACHE_SIZE="512MB"
export CLAUDE_PARALLEL_LIMIT=5
export CLAUDE_TIMEOUT=90

# Configuración de Node.js para mejor rendimiento
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Configuración de Red

```json
{
  "network": {
    "timeout": {
      "connection": 30000,
      "request": 120000,
      "response": 180000
    },
    "retry": {
      "attempts": 3,
      "delay": 1000,
      "backoff": 2.0
    },
    "concurrent_requests": 3,
    "pool_size": 10
  }
}
```

## Scripts de Automatización

### Script de Setup Inicial

```bash
#!/bin/bash
# setup-claude.sh

echo "🚀 Configurando Claude Code..."

# Instalar Claude Code si no está instalado
if ! command -v claude &> /dev/null; then
    echo "Instalando Claude Code..."
    npm install -g @anthropic-ai/claude-cli
fi

# Crear directorio de configuración
mkdir -p ~/.claude

# Copiar configuración base
cp ./configs/claude-config.json ~/.claude/config.json

# Configurar variables de entorno
echo "export CLAUDE_AUTO_CONTEXT=true" >> ~/.bashrc
echo "export CLAUDE_CACHE_ENABLED=true" >> ~/.bashrc

# Crear aliases útiles
cat >> ~/.bashrc << 'EOF'
# Claude Code aliases
alias cc='claude'
alias ccl='claude clear'
alias ccc='claude context'
alias ccr='claude "Revisa este código y sugiere mejoras"'
alias ccd='claude doctor'
alias ccp='claude "Crea un plan detallado para implementar:"'
alias cct='claude "Genera tests unitarios para:"'
EOF

echo "✅ Configuración completada. Reinicia tu terminal."
```

### Script de Optimización

```bash
#!/bin/bash
# optimize-claude.sh

echo "⚡ Optimizando configuración de Claude Code..."

# Limpiar cache antiguo
claude cache clear

# Optimizar configuración
claude config set context.max_files 30
claude config set context.max_file_size 500KB
claude config set performance.cache_enabled true
claude config set performance.parallel_requests 3

# Crear índice de archivos para mejor rendimiento
find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.md" > .claude-index

echo "✅ Optimización completada."
```

### Configuración Git Hooks

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Hook de pre-commit que usa Claude para revisar código
echo "🔍 Revisando código con Claude..."

# Obtener archivos modificados
MODIFIED_FILES=$(git diff --cached --name-only --diff-filter=AM)

if [ -n "$MODIFIED_FILES" ]; then
    # Revisar con Claude
    echo "$MODIFIED_FILES" | xargs claude "Revisa estos archivos y verifica:
1. Calidad del código
2. Posibles bugs
3. Adherencia a mejores prácticas
4. Comentarios necesarios

Archivos:"
    
    # Si hay problemas críticos, abortar commit
    if [ $? -ne 0 ]; then
        echo "❌ Commit abortado por problemas de calidad"
        exit 1
    fi
fi

echo "✅ Revisión completada"
```

## Monitorización y Logging

### Configuración de Logging

```json
{
  "logging": {
    "level": "info",
    "format": "json",
    "timestamp": true,
    "file": {
      "enabled": true,
      "path": "~/.claude/logs/claude.log",
      "max_size": "10MB",
      "max_files": 5,
      "rotate": true
    },
    "console": {
      "enabled": true,
      "colors": true,
      "pretty": true
    }
  }
}
```

### Métricas de Rendimiento

```bash
# Script para monitorear rendimiento
#!/bin/bash
# monitor-claude.sh

echo "📊 Métricas de Claude Code (últimas 24h):"

# Comandos ejecutados
echo "Comandos: $(grep -c "command:" ~/.claude/logs/claude.log | tail -1000)"

# Tiempo promedio de respuesta
echo "Tiempo promedio: $(grep "response_time" ~/.claude/logs/claude.log | \
    jq '.response_time' | awk '{sum+=$1} END {print sum/NR "ms"}')"

# Archivos en contexto promedio
echo "Archivos en contexto: $(grep "context_files" ~/.claude/logs/claude.log | \
    jq '.context_files' | awk '{sum+=$1} END {print sum/NR}')"

# Cache hit ratio
echo "Cache hit ratio: $(grep "cache_hit" ~/.claude/logs/claude.log | \
    jq '.cache_hit' | awk '{sum+=$1} END {print (sum/NR)*100 "%"}')"
```

## Solución de Problemas de Configuración

### Diagnóstico Automático

```bash
# claude-doctor-extended.sh
#!/bin/bash

echo "🏥 Diagnóstico extendido de Claude Code..."

# Verificar instalación
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code no está instalado"
    exit 1
fi

# Verificar configuración
if [ ! -f ~/.claude/config.json ]; then
    echo "⚠️  Archivo de configuración no encontrado"
    echo "Creando configuración básica..."
    mkdir -p ~/.claude
    echo '{"default_model": "claude-3-5-sonnet-20241022"}' > ~/.claude/config.json
fi

# Verificar conexión
echo "🌐 Probando conexión..."
claude "hello" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Conexión OK"
else
    echo "❌ Error de conexión"
fi

# Verificar rendimiento
echo "⚡ Probando rendimiento..."
start_time=$(date +%s.%N)
claude "¿Cuál es la capital de Francia?" > /dev/null 2>&1
end_time=$(date +%s.%N)
duration=$(echo "$end_time - $start_time" | bc)
echo "Tiempo de respuesta: ${duration}s"

echo "✅ Diagnóstico completado"
```

## Próximos Pasos

Con estas configuraciones optimizadas:

1. **Implementa la configuración básica** para tu entorno
2. **Personaliza según tu stack tecnológico**
3. **Configura scripts de automatización**
4. **Monitorea rendimiento regularmente**
5. **Ajusta configuraciones según uso**

## Recursos Adicionales

- 🔧 [Scripts de Automatización](./scripts-automatizacion)
- 📊 [Métricas y Monitorización](./metricas-rendimiento)
- 🏗️ [Plantillas de Proyecto](./plantillas-proyecto)
- 🐛 [Debugging Avanzado](../guias/debugging-avanzado)
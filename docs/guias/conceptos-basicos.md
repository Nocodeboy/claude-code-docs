---
sidebar_position: 3
title: "Conceptos Básicos de Claude Code"
description: "Entiende cómo funciona Claude Code y domina sus conceptos fundamentales"
---

# Conceptos Básicos de Claude Code

Una vez que has dado tus primeros pasos, es momento de entender profundamente cómo funciona Claude Code. Esta guía te dará las bases sólidas que necesitas para usar la herramienta de manera efectiva.

## 🧠 ¿Cómo Funciona Claude Code?

### El Motor Detrás de la Magia

Claude Code no es solo un chatbot más. Es un **asistente de desarrollo agentic** que:

- **Comprende tu codebase completo** - No necesitas copiar y pegar código
- **Ejecuta comandos reales** - Puede instalar dependencias, ejecutar tests, crear archivos
- **Mantiene contexto** - Recuerda lo que han estado trabajando juntos
- **Integra con herramientas** - Git, IDEs, APIs externas a través de MCP

### Diferencias Clave con ChatGPT

| Aspecto | Claude Code | ChatGPT |
|---------|-------------|---------|
| **Contexto** | 200k tokens (~195k palabras) | 64k tokens (GPT-4) |
| **Acceso a archivos** | ✅ Lee/escribe directamente | ❌ Solo texto copiado |
| **Ejecución de comandos** | ✅ Terminal integrado | ❌ Solo sugerencias |
| **Memoria del proyecto** | ✅ Mantiene contexto | ❌ Cada chat es nuevo |
| **Integración IDE** | ✅ VS Code, JetBrains | ❌ Extensiones limitadas |
| **Gestión Git** | ✅ Commits automáticos | ❌ Solo ayuda teórica |

## 🛠️ Herramientas Principales

### 1. **Edición de Archivos**

Claude puede leer, crear, modificar y eliminar archivos:

```bash
# Ejemplo de lo que Claude puede hacer automáticamente:
- Leer package.json para entender dependencias
- Crear nuevos componentes React
- Modificar configuraciones existentes
- Refactorizar código en múltiples archivos
```

### 2. **Ejecución de Comandos**

```bash
# Claude puede ejecutar:
npm install express
npm run test
git add . && git commit -m "Mensaje"
docker build -t myapp .
```

### 3. **Integración Git**

Claude maneja Git de forma inteligente:

- **Commits automáticos** con mensajes descriptivos
- **Resolución de merge conflicts**
- **Creación de branches**
- **Pull requests** (con integración GitHub)

### 4. **Model Context Protocol (MCP)**

MCP permite conectar Claude con herramientas externas:

- **Bases de datos** (PostgreSQL, MongoDB)
- **APIs externas** (GitHub, Slack, JIRA)
- **Servicios cloud** (AWS, Docker)
- **Herramientas de diseño** (Figma)

## 💬 Anatomía de un Prompt Efectivo

### Estructura Recomendada

```markdown
## CONTEXTO
[Descripción del proyecto y situación actual]

## OBJETIVO  
[Qué quieres lograr específicamente]

## ESPECIFICACIONES
[Detalles técnicos, restricciones, preferencias]

## FORMATO DE SALIDA
[Cómo quieres que se presente el resultado]
```

### Ejemplo Práctico

❌ **Prompt Vago:**
```
Crea un login
```

✅ **Prompt Específico:**
```markdown
## CONTEXTO
Estoy desarrollando una SPA con React + TypeScript. 
Actualmente tengo la estructura básica y uso React Router.

## OBJETIVO
Crear un sistema de autenticación completo con login y registro

## ESPECIFICACIONES
- Formularios con validación (usar React Hook Form + Yup)
- Integración con JWT tokens
- Manejo de estados con Context API
- Rutas protegidas
- Diseño con Tailwind CSS
- TypeScript estricto

## FORMATO DE SALIDA
Crea los archivos paso a paso, empezando por el contexto de auth,
luego los componentes de formularios, y finalmente las rutas protegidas.
```

## 🧭 Gestión de Contexto

### ¿Qué es el Contexto?

El contexto es toda la información que Claude mantiene en memoria:
- Archivos leídos recientemente
- Conversación previa
- Estado del proyecto
- Decisiones tomadas

### Cuándo Usar `/clear`

**Usa `/clear` cuando:**
- Cambies a una tarea completamente diferente
- El contexto se sature (Claude empiece a "olvidar" cosas)
- Quieras empezar fresh con un nuevo enfoque
- Después de completar una feature grande

**Ejemplo:**
```
/clear
Ahora trabajemos en el sistema de notificaciones. 
Es independiente del login que acabamos de hacer.
```

### Maximizar el Contexto

```bash
# En lugar de esto:
"Lee el archivo components/Header.js"

# Haz esto:
"Lee estos archivos para entender la estructura del proyecto:
- package.json  
- src/App.js
- src/components/Header.js
- src/styles/globals.css
- README.md

Luego explícame qué patrón de arquitectura están siguiendo"
```

## 🎯 Workflow de Desarrollo Óptimo

### 1. **Fase de Exploración** 🔍

```
Claude, este es un nuevo proyecto para mí. 
¿Puedes explorar los archivos y explicarme:

1. Qué tecnologías usa
2. Cómo está estructurado  
3. Cuál parece ser el propósito
4. Qué necesita ser mejorado o completado

No hagas cambios todavía, solo analiza.
```

### 2. **Fase de Planificación** 📋

```
Basándote en tu análisis, quiero implementar [FUNCIONALIDAD].

Antes de escribir código, crea un plan detallado que incluya:
- Archivos que necesitamos modificar/crear
- Dependencias nuevas requeridas  
- Posibles problemas o conflictos
- Orden de implementación recomendado
- Testing strategy

Use la palabra "think" para considerar todas las opciones.
```

### 3. **Fase de Implementación** ⚡

```
Perfecto, me gusta tu plan. Implementemos paso a paso:

PASO 1: [Descripción específica]
- Haz exactamente esto
- Con estas especificaciones
- Siguiendo estos patrones

Después de completar el paso 1, espera mi confirmación 
antes de continuar con el paso 2.
```

### 4. **Fase de Confirmación** ✅

```
Ejecuta los tests para verificar que todo funciona.
Si hay errores, corrígelos.
Cuando todo esté verde, crea un commit con mensaje descriptivo.
```

## 💡 Técnicas Avanzadas de Prompting

### 1. **Role Playing**

```
Actúa como un senior React developer que está haciendo code review.
Revisa este componente y dame feedback específico sobre:
- Performance issues
- Security vulnerabilities  
- Accessibility problems
- Best practices violations
```

### 2. **Thinking Out Loud**

```
Necesito optimizar esta query de base de datos que está siendo lenta.
Usa la palabra "think" y analiza paso a paso:
- Qué podría estar causando la lentitud
- Diferentes estrategias de optimización
- Trade-offs de cada approach
Luego implementa la mejor solución.
```

### 3. **Iterative Refinement**

```
# Iteración 1
Crea una versión básica del componente

# Iteración 2 (después de revisar)
Ahora mejora la accesibilidad y agrega transiciones

# Iteración 3 (después de revisar)  
Optimiza para performance y agrega error boundaries
```

### 4. **Constraint-Based Design**

```
Crea una API REST PERO con estas restricciones:
- Máximo 3 endpoints
- Sin dependencias externas más allá de Express
- Debe manejar 1000+ requests por segundo
- Compatible con Edge Functions
- TypeScript estricto
```

## 🏗️ Arquitectura y Patrones

### Projects en Claude Code

Los **Projects** son espacios dedicados donde Claude mantiene contexto específico:

```bash
# En la web app de Claude
1. Crea un nuevo Project llamado "Mi App de Tareas"  
2. Sube archivos relevantes o conecta GitHub
3. Usa Claude Code normalmente - el contexto se mantiene
```

**Beneficios:**
- Contexto persistente entre sesiones
- Colaboración en equipo
- Historial de decisiones
- Menos necesidad de re-explicar el proyecto

### CLAUDE.md Pattern

Crea un archivo `CLAUDE.md` en la raíz de tus proyectos:

```markdown
# Mi Proyecto

## Descripción
App de tareas con React + Node.js

## Arquitectura  
- Frontend: React + TypeScript + Tailwind
- Backend: Express + PostgreSQL  
- Autenticación: JWT
- Testing: Jest + React Testing Library

## Convenciones
- Usar camelCase para variables
- Componentes en PascalCase
- Archivos de utilidad en utils/
- Tests junto a components

## Estado Actual
- ✅ Autenticación implementada
- ✅ CRUD básico de tareas
- 🚧 Trabajando en filtros avanzados
- 📅 Próximo: Notificaciones push

## Comandos Frecuentes
npm run dev     # Servidor desarrollo
npm run test    # Ejecutar tests  
npm run build   # Build producción
```

## ⚙️ Configuraciones Importantes

### Permisos y Seguridad

Por defecto, Claude pide confirmación antes de:
- Ejecutar comandos
- Modificar archivos
- Instalar dependencias

Para desarrollo rápido (⚠️ con cuidado):
```bash
claude --dangerously-skip-permissions
```

### Modelos Disponibles

```bash
# Por defecto (más inteligente, más lento)
claude

# Para tareas simples (más rápido, menos tokens)
claude --model=haiku

# Para tareas complejas (más potente)
claude --model=opus  # Solo en planes Max
```

### Configuración de IDE

#### VS Code
- Extensión oficial disponible
- Integración nativa con terminal
- Visualización de cambios en tiempo real

#### JetBrains
- Soporte nativo
- Conflictos potenciales con keybinding ESC

## 🚫 Limitaciones y Consideraciones

### Limitaciones Técnicas

1. **Windows**: Soporte limitado, mejor con WSL
2. **Context Saturation**: Usar `/clear` regularmente
3. **Resource Intensive**: 16GB RAM recomendado para proyectos grandes
4. **Internet Dependency**: Requiere conexión constante

### Límites de Uso por Plan

- **Pro ($20/mes)**: 10-40 prompts cada 5 horas
- **Max 5x ($100/mes)**: 50-200 prompts cada 5 horas  
- **Max 20x ($200/mes)**: 200-800 prompts cada 5 horas

### Best Practices para Límites

1. **Planifica antes de codificar** - Un buen plan reduce iteraciones
2. **Usa `/clear` estratégicamente** - Libera contexto innecesario
3. **Agrupa tareas relacionadas** - Una conversación larga vs múltiples cortas
4. **Usa modelos apropiados** - Haiku para tareas simples

## 📚 Próximos Pasos

Ahora que entiendes los conceptos básicos:

1. 💡 **Domina las [Mejores Prácticas](/docs/guias/mejores-practicas)**
2. 🛠️ **Explora [Herramientas Específicas](/docs/herramientas)**  
3. 🚀 **Ve [Casos de Uso Reales](/docs/casos-uso)**
4. 📦 **Consulta [Recursos y Templates](/docs/recursos)**

:::tip Recuerda
Claude Code es una herramienta de **colaboración inteligente**. No es magia - es un asistente muy capaz que funciona mejor cuando le das contexto claro y objetivos específicos.
:::
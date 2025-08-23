---
title: "Mejores Prácticas con Claude Code"
description: "Técnicas avanzadas, tips de productividad y mejores prácticas para dominar Claude Code"
sidebar_position: 4
---

# Mejores Prácticas con Claude Code

Esta guía recopila las mejores prácticas, técnicas avanzadas y consejos de productividad para aprovechar al máximo Claude Code en tus proyectos de desarrollo.

## Prompting Efectivo

### La Fórmula del Prompt Perfecto

Un prompt efectivo sigue esta estructura:

```
[ACCIÓN] + [CONTEXTO] + [ESPECIFICACIONES] + [RESTRICCIONES] + [FORMATO DE SALIDA]
```

#### Ejemplos Comparativos

**❌ Prompt Malo:**
```bash
claude "Mejora este código"
```

**✅ Prompt Excelente:**
```bash
claude "Refactoriza la función authenticateUser en src/auth/login.js para usar async/await, agregar validación de entrada robusta, manejo de errores específicos, y mantener compatibilidad con la interfaz existente. Incluye comentarios JSDoc."
```

### Técnicas de Prompting Avanzado

#### 1. Prompting por Capas

Para tareas complejas, divide en capas específicas:

```bash
# Paso 1: Análisis
claude "Analiza la función calculateOrderTotal y identifica posibles problemas de rendimiento, seguridad y mantenibilidad"

# Paso 2: Planificación
claude "Basándote en el análisis anterior, crea un plan detallado para optimizar la función manteniendo la funcionalidad actual"

# Paso 3: Implementación
claude "Implementa el primer punto del plan: optimización de cálculos matemáticos"
```

#### 2. Prompting con Ejemplos

```bash
claude "Crea un custom hook de React para manejar formularios siguiendo este patrón:

```javascript
// Ejemplo deseado:
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validate: validateLoginForm
});
```

Incluye TypeScript, validación en tiempo real, y manejo de estados de carga."
```

#### 3. Prompting con Restricciones

```bash
claude "Implementa un sistema de cache para la API sin usar librerías externas, que:
- Tenga TTL configurable
- Soporte invalidación manual
- Use solo localStorage
- Sea compatible con TypeScript
- Tenga menos de 100 líneas de código"
```

## Gestión de Contexto Avanzada

### Estrategias de Contexto por Tipo de Proyecto

#### Proyectos Frontend (React/Vue/Angular)

```bash
# Contexto inicial
claude context add package.json
claude context add tsconfig.json
claude context add src/types/
claude context add src/components/common/

# Para características específicas
claude context add src/pages/dashboard/
claude context add src/hooks/useAuth.ts
```

#### Proyectos Backend (Node.js/Python/etc.)

```bash
# Contexto inicial
claude context add package.json
claude context add src/models/
claude context add src/middleware/
claude context add src/config/

# Para APIs específicas
claude context add src/routes/auth/
claude context add src/controllers/user/
```

#### Proyectos Full-Stack

```bash
# Contexto completo pero organizado
claude context add CLAUDE.md
claude context add package.json
claude context add frontend/src/types/
claude context add backend/src/models/
claude context add shared/utils/
```

### Técnicas de Limpieza de Contexto

#### Limpieza Preventiva

```bash
# Al cambiar de funcionalidad
claude clear
claude context add CLAUDE.md package.json

# Al comenzar debugging
claude clear "Iniciando sesión de debugging para el módulo de autenticación"
claude context add src/auth/ tests/auth/
```

#### Limpieza por Señales

Limpia el contexto cuando:
- Claude menciona archivos que ya no existen
- Las respuestas incluyen código de funcionalidades distintas
- Los tiempos de respuesta aumentan notablemente
- Las sugerencias son genéricas o irrelevantes

## Configuración CLAUDE.md Avanzada

### Plantilla Completa

```markdown
# CLAUDE.md

## Descripción del Proyecto
[Descripción clara en 2-3 líneas]

## Stack Tecnológico
### Frontend
- Framework: React 18 con TypeScript
- Styling: Tailwind CSS + Headless UI
- Estado: Zustand
- Testing: Vitest + React Testing Library

### Backend
- Runtime: Node.js 20+
- Framework: Express + tRPC
- Base de datos: PostgreSQL con Prisma
- Testing: Jest + Supertest

## Arquitectura

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, Input)
│   ├── features/     # Componentes de características
│   └── layout/       # Layout components
├── pages/            # Páginas de la aplicación
├── hooks/            # Custom hooks
├── utils/            # Utilidades puras
├── stores/           # Zustand stores
├── types/            # Definiciones TypeScript
└── api/              # Cliente API (tRPC)
```

## Patrones y Convenciones

### Nomenclatura
- Componentes: PascalCase (UserProfile)
- Archivos: kebab-case (user-profile.tsx)
- Hooks: camelCase prefijo use (useUserProfile)
- Constantes: UPPER_SNAKE_CASE (API_BASE_URL)

### Reglas de Código
- Máximo 200 líneas por archivo
- Funciones máximo 50 líneas
- Usar TypeScript estricto
- Props con interfaces, no types
- Errores con Error boundaries

### Patrones Arquitectónicos
- Repository pattern para data fetching
- Custom hooks para lógica compartida
- Compound components para UI compleja
- Render props para lógica compartida con UI variable

## Reglas Específicas

### Testing
- Todo hook debe tener tests
- Componentes de features deben tener tests
- Cobertura mínima: 80%
- Usar MSW para mock de APIs

### Performance
- Lazy loading para rutas
- React.memo para componentes pesados
- useMemo/useCallback solo cuando sea necesario
- Optimistic updates en formularios

### Seguridad
- Validar todas las entradas del usuario
- Sanitizar datos antes de mostrar
- HTTPS en producción
- Tokens JWT con expiración corta

## Comandos Útiles
```bash
npm run dev          # Desarrollo
npm run test         # Tests unitarios
npm run test:e2e     # Tests end-to-end
npm run lint         # Linting
npm run type-check   # Verificación TypeScript
```
```

### Configuraciones Especializadas

#### Para Equipos

```markdown
## Flujo de Trabajo del Equipo

### Git Flow
- main: producción estable
- develop: integración de características  
- feature/*: nuevas características
- hotfix/*: correcciones urgentes

### Code Review
- Mínimo 2 revisores para PRs a develop
- Todos los tests deben pasar
- Cobertura no debe disminuir
- Claude debe revisar código antes de PR

### Convenciones de Commits
Usar conventional commits:
- feat: nueva característica
- fix: corrección de bug
- refactor: refactorización de código
- docs: actualización de documentación
```

#### Para Proyectos Open Source

```markdown
## Contribuciones

### Antes de contribuir
1. Lee CONTRIBUTING.md
2. Crea un issue para discutir cambios grandes
3. Usa Claude Code para mantener estilo consistente

### Proceso de Contribución
1. Fork del repositorio
2. Crear branch feature/nombre-caracteristica
3. Implementar usando Claude Code
4. Tests y documentación
5. PR con descripción detallada
```

## Técnicas de Debugging con Claude

### Debugging Sistemático

#### 1. Recolección de Información

```bash
# Contexto completo del error
claude "Analiza este error y su contexto:

Error: TypeError: Cannot read property 'map' of undefined
Archivo: src/components/UserList.tsx:45
Stack trace: [incluir stack trace completo]
Estado de la aplicación: [describir estado cuando ocurre]
Pasos para reproducir: [enumerar pasos]

Identifica la causa raíz y sugiere soluciones."
```

#### 2. Análisis por Capas

```bash
# Capa 1: Síntomas
claude "Lista todos los síntomas de este problema de rendimiento"

# Capa 2: Causas posibles
claude "Basándote en los síntomas, identifica las 5 causas más probables"

# Capa 3: Validación
claude "Crea tests específicos para validar cada una de las causas identificadas"

# Capa 4: Solución
claude "Implementa la solución más efectiva basándote en los resultados de los tests"
```

### Debugging de Performance

```bash
# Análisis de rendimiento
claude "Analiza el rendimiento de este componente React y identifica:
1. Re-renders innecesarios
2. Cálculos costosos en cada render
3. Memory leaks potenciales
4. Optimizaciones de red

Incluye métricas específicas y soluciones priorizadas."
```

### Debugging de Estado

```bash
# Para aplicaciones con estado complejo
claude "Rastrea el flujo de estado en esta característica:
1. Estado inicial
2. Acciones que modifican estado
3. Side effects
4. Estado final esperado vs actual

Identifica dónde se rompe el flujo."
```

## Automatización y Workflows

### Automatización de Tareas Repetitivas

#### Generación de Boilerplate

```bash
# Crear comando personalizado para componentes
claude "Crea un script que genere la estructura completa para un nuevo componente React con:
- Archivo del componente (.tsx)
- Archivo de tests (.test.tsx)  
- Archivo de historias de Storybook (.stories.tsx)
- Archivo de estilos (.module.css)
- Export en index.ts

Debe aceptar el nombre del componente como parámetro."
```

#### Scripts de Mantenimiento

```bash
# Análisis periódico de calidad
claude "Crea un script que analice la calidad del código y genere un reporte con:
- Archivos con alta complejidad ciclomática
- Componentes que exceden límites de líneas
- Imports no utilizados
- Tests faltantes
- Documentación faltante"
```

### Integración con Git

#### Hooks de Pre-commit

```bash
claude "Configura un hook de pre-commit que:
1. Ejecute linting automático
2. Corra tests unitarios
3. Verifique que no hay console.log
4. Valide formato de commit message
5. Use Claude para revisar cambios grandes"
```

#### Automatización de PRs

```bash
claude "Analiza los cambios en esta rama y genera:
1. Descripción detallada del PR
2. Lista de archivos modificados con explicación
3. Posibles breaking changes
4. Checklist de testing
5. Documentación que necesita actualizarse"
```

## Gestión de Proyectos con Projects

### Configuración de Projects

#### Estructura Recomendada

```
project-name/
├── .claude/
│   ├── project.json         # Configuración del proyecto
│   ├── context-rules.md     # Reglas de contexto
│   └── workflows/           # Workflows personalizados
├── CLAUDE.md               # Configuración principal
└── src/                    # Código fuente
```

#### project.json Ejemplo

```json
{
  "name": "mi-app-react",
  "description": "Aplicación React con TypeScript",
  "version": "1.0.0",
  "context": {
    "always_include": [
      "CLAUDE.md",
      "package.json",
      "tsconfig.json"
    ],
    "exclude_patterns": [
      "node_modules/**",
      "dist/**", 
      "*.log"
    ]
  },
  "workflows": {
    "new_component": "workflows/new-component.md",
    "debug_session": "workflows/debug.md"
  }
}
```

### Workflows Personalizados

#### Workflow para Nuevos Componentes

```markdown
# Workflow: Nuevo Componente

## Pasos Automáticos
1. Crear estructura de archivos
2. Generar boilerplate básico
3. Crear tests iniciales
4. Agregar a Storybook
5. Actualizar exports

## Prompts Sugeridos
```bash
claude workflow new_component --name=UserCard --type=feature
```

## Validaciones
- [ ] Componente compilar sin errores
- [ ] Tests pasan
- [ ] Storybook carga correctamente
- [ ] Props documentadas
```

## Tips de Productividad

### Comandos Rápidos

#### Aliases Útiles

```bash
# Configura aliases en tu .bashrc/.zshrc
alias cc="claude"
alias ccr="claude clear"
alias ccc="claude context"
alias ccd="claude doctor"
```

#### Prompts Frecuentes

```bash
# Crear archivo de prompts frecuentes
echo "claude \"Analiza este archivo y sugiere mejoras\"" > ~/quick-prompts.sh
echo "claude \"Crea tests para esta función\"" >> ~/quick-prompts.sh
echo "claude \"Refactoriza este código para mejor legibilidad\"" >> ~/quick-prompts.sh
```

### Integración con Editores

#### VS Code

```json
// settings.json
{
  "claude.autoContext": true,
  "claude.contextFiles": [
    "CLAUDE.md",
    "package.json",
    "tsconfig.json"
  ]
}
```

#### Configuración de Tasks

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Claude Review",
      "type": "shell",
      "command": "claude",
      "args": ["\"Revisa los cambios actuales y sugiere mejoras\""],
      "group": "build"
    }
  ]
}
```

## Errores Comunes y Soluciones

### Error: Contexto Saturado

**Síntomas:**
- Respuestas lentas
- Información irrelevante
- Confusión entre archivos

**Solución:**
```bash
claude clear
claude context add [archivos-relevantes-solo]
```

### Error: Prompts Muy Genéricos

**Síntomas:**
- Respuestas genéricas
- Código boilerplate sin personalizar
- Falta de especificidad

**Solución:**
- Ser más específico en objetivos
- Incluir contexto técnico
- Definir restricciones claras

### Error: No Revisar Código Generado

**Síntomas:**
- Bugs en producción
- Código que no compila
- Inconsistencias de estilo

**Solución:**
- Siempre revisar antes de commit
- Ejecutar tests localmente
- Validar con linters

## Métricas y Mejora Continua

### Métricas de Productividad

Rastrea estas métricas para medir mejoras:

1. **Tiempo de desarrollo** por característica
2. **Calidad de código** (cobertura, complejidad)
3. **Reducción de bugs** en producción
4. **Satisfacción del desarrollador**

### Mejora Iterativa

#### Revisión Semanal

```bash
claude "Analiza mi actividad de desarrollo de esta semana:
- Commits realizados: [número]
- Características implementadas: [lista]
- Bugs solucionados: [número]
- Tiempo promedio por tarea: [tiempo]

Sugiere mejoras para la próxima semana."
```

#### Optimización de Prompts

Mantén un log de prompts exitosos:

```markdown
## Prompts Exitosos

### Refactoring
```bash
claude "Refactoriza [función] en [archivo] para [objetivo específico], manteniendo [restricciones], y siguiendo [patrones]"
```

### Testing  
```bash
claude "Crea tests unitarios para [función/componente] que cubran [casos específicos] usando [framework de testing]"
```
```

## Próximos Pasos

Para seguir mejorando:

1. Practica estos patrones en proyectos reales
2. Experimenta con [Casos de Uso Avanzados](../casos-uso/)
3. Explora [Herramientas Especializadas](../herramientas/)
4. Únete a la [Comunidad](../recursos/comunidad)

## Recursos Adicionales

- 🎯 [Plantillas de Prompts](../recursos/plantillas-prompts)
- ⚙️ [Configuraciones Avanzadas](../recursos/configuraciones-optimizadas)  
- 🔧 [Scripts de Automatización](../recursos/scripts-automatizacion)
- 🏆 [Casos de Éxito](../casos-uso/casos-exito)
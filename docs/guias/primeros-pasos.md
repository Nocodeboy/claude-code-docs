---
sidebar_position: 2
title: "Primeros Pasos con Claude Code"
description: "Tu primer proyecto con Claude Code - Tutorial paso a paso para principiantes"
---

# Primeros Pasos con Claude Code

¡Felicidades por instalar Claude Code! En esta guía te llevaré paso a paso por tu primera experiencia con esta increíble herramienta.

## 🎯 Lo que aprenderás

- Cómo configurar tu primer proyecto
- Workflow básico de Claude Code
- Comandos esenciales
- Tu primera tarea práctica
- Mejores prácticas desde el primer día

## 🚀 Tu Primer Proyecto

### Paso 1: Preparar el Entorno

Vamos a crear un proyecto simple para aprender:

```bash
# Crear directorio del proyecto
mkdir mi-primer-proyecto-claude
cd mi-primer-proyecto-claude

# Crear algunos archivos básicos
echo "# Mi Primer Proyecto con Claude Code" > README.md
echo "console.log('¡Hola Claude Code!');" > app.js
```

### Paso 2: Iniciar Claude Code

```bash
claude
```

Verás algo como esto:
```
Claude Code v1.x.x
Ready to help! What would you like to work on?
```

¡Perfecto! Ahora estás dentro de Claude Code.

### Paso 3: Tu Primera Conversación

Escribe lo siguiente (puedes copiarlo y pegarlo):

```
Hola Claude! Este es mi primer proyecto contigo. 
¿Puedes leer los archivos que hay aquí y explicarme qué ves?
```

Claude automáticamente:
- 📁 Leerá los archivos de tu proyecto
- 🧠 Entenderá la estructura
- 💬 Te explicará qué encontró

### Paso 4: Tu Primera Tarea

Ahora pidámosle a Claude que haga algo útil:

```
Crea una página web simple que muestre "¡Hola Claude Code!" 
con un botón que cambie el color del texto cuando se haga click.
Quiero que uses HTML, CSS y JavaScript en archivos separados.
```

Claude automáticamente:
- ✨ Creará `index.html`, `style.css`, y `script.js`
- 📝 Escribirá código limpio y funcional
- 💡 Explicará qué hace cada parte

### Paso 5: Ver tu Resultado

```bash
# Salir de Claude (presiona ESC)
# Luego verifica los archivos creados:
ls -la
```

¡Ahora tienes una página web funcional! Ábrela en tu navegador:

```bash
open index.html  # macOS
start index.html # Windows
```

## 🧭 Workflow Básico de Claude Code

Claude funciona mejor siguiendo este patrón:

### 1. 🔍 **Explorar** - Entender antes de actuar
```
Claude, lee estos archivos y explícame qué hace este proyecto:
- package.json
- src/components/
- README.md
```

### 2. 📋 **Planificar** - Crear una estrategia clara
```
Quiero agregar autenticación con JWT a esta API. 
Antes de escribir código, crea un plan paso a paso 
de qué archivos necesitamos modificar y qué funcionalidades agregar.
```

### 3. ⚡ **Codificar** - Implementar la solución
```
Perfecto, me gusta tu plan. Ahora implementa el paso 1: 
crear el middleware de autenticación en middleware/auth.js
```

### 4. ✅ **Confirmar** - Verificar y documentar
```
Ejecuta los tests para verificar que todo funciona correctamente.
Si pasan, crea un commit con un mensaje descriptivo.
```

## 🛠️ Comandos Esenciales

### Comandos de Sistema
```bash
/clear          # Limpia el contexto (¡MUY IMPORTANTE!)
/help           # Muestra ayuda disponible
ESC             # Salir de Claude Code (NO Ctrl+C)
```

### Comandos Útiles Durante el Desarrollo

```bash
# Verificar estado
claude doctor

# Actualizar Claude Code
claude update

# Usar modelo más rápido para tareas simples
claude --model=haiku
```

## 💡 Ejemplos Prácticos

### Ejemplo 1: Debugging

```
Tengo este error en mi código JavaScript:
"TypeError: Cannot read property 'map' of undefined"

El error aparece en la línea 25 del archivo components/UserList.js
¿Puedes ayudarme a solucionarlo?
```

### Ejemplo 2: Refactoring

```
Este componente React se está volviendo muy largo y difícil de mantener.
¿Puedes refactorizarlo en componentes más pequeños siguiendo las 
mejores prácticas? El archivo es src/components/Dashboard.jsx
```

### Ejemplo 3: Automatización

```
Quiero configurar un script que:
1. Ejecute los tests
2. Haga build del proyecto
3. Despliegue a Vercel

¿Puedes crear un script en package.json y un workflow de GitHub Actions?
```

## ⚡ Tips para ser más Productivo

### 1. **Se Específico**

❌ **Malo:**
```
Arregla mi código
```

✅ **Bueno:**
```
Este componente React tiene un memory leak. Los datos se cargan 
correctamente pero no se limpian cuando el componente se desmonta.
El archivo es src/components/DataTable.jsx
```

### 2. **Proporciona Contexto**

❌ **Malo:**
```
Crea una API
```

✅ **Bueno:**
```
Crea una API REST para gestión de tareas usando Express.js.
Necesito endpoints para:
- GET /tasks (listar tareas)
- POST /tasks (crear tarea) 
- PUT /tasks/:id (actualizar)
- DELETE /tasks/:id (eliminar)

Usa TypeScript y conecta con MongoDB.
```

### 3. **Usa el Flujo Iterativo**

```
# Paso 1
Crea la estructura básica del componente LoginForm

# Paso 2 (después de revisar)
Perfecto! Ahora agrega validación de formulario con Yup

# Paso 3 (después de revisar)
Genial! Ahora integra con la API de autenticación
```

## 🎨 Tu Segundo Proyecto: Todo App

Ahora que conoces lo básico, vamos a crear algo más interesante:

### Configuración
```bash
mkdir todo-app-claude
cd todo-app-claude
claude
```

### Tu Prompt
```
Quiero crear una aplicación de todos moderna. Específicamente:

TECNOLOGÍAS:
- React con TypeScript
- Tailwind CSS para estilos
- LocalStorage para persistencia
- Vite como bundler

FUNCIONALIDADES:
1. Agregar nuevas tareas
2. Marcar como completadas
3. Filtrar por estado (todas, pendientes, completadas)
4. Eliminar tareas
5. Contador de tareas pendientes

DISEÑO:
- Interfaz moderna y limpia
- Responsive design
- Transiciones suaves
- Dark/Light mode toggle

¿Puedes crear este proyecto paso a paso? Empecemos con la configuración inicial.
```

### Seguimiento

Después de cada paso, revisa lo que Claude creó y pide ajustes si es necesario:

```
Perfecto! El componente se ve bien. 
¿Puedes agregar animaciones con Framer Motion para cuando 
se agreguen o eliminen tareas?
```

## 🎯 Tareas de Práctica

### Tarea 1: Portfolio Personal
Crea un portfolio personal con:
- Página de inicio
- Sección de proyectos
- Blog simple
- Formulario de contacto

### Tarea 2: API de Películas
Construye una API que:
- Consuma datos de TMDB API
- Permita buscar películas
- Guarde favoritos en base de datos
- Tenga documentación con Swagger

### Tarea 3: Dashboard Analítico
Desarrolla un dashboard que:
- Muestre gráficos interactivos
- Conecte con una API de datos
- Sea responsive
- Tenga filtros dinámicos

## 🚫 Errores Comunes de Principiantes

### 1. **No usar `/clear`**

El contexto se satura. Usa `/clear` regularmente:
```
/clear
Ahora empecemos fresh con esta nueva tarea...
```

### 2. **Prompts demasiado vagos**

Se específico sobre lo que quieres lograr.

### 3. **No revisar el código generado**

Siempre revisa y entiende lo que Claude crea.

### 4. **Intentar hacer todo de una vez**

Trabaja paso a paso, especialmente en proyectos grandes.

### 5. **No usar el flujo correcto**

Recuerda: Explorar → Planificar → Codificar → Confirmar

## 📚 Próximos Pasos

Una vez que te sientas cómodo con lo básico:

1. 🧠 **Aprende [Conceptos Básicos](/docs/guias/conceptos-basicos)** más avanzados
2. 💡 **Domina las [Mejores Prácticas](/docs/guias/mejores-practicas)**
3. 🛠️ **Explora [Herramientas y Extensiones](/docs/herramientas)**
4. 🚀 **Ve casos de uso específicos en [Proyectos](/docs/proyectos)**

## 🆘 ¿Necesitas Ayuda?

Si te atascas:

1. **Usa `/clear` y vuelve a explicar** el problema desde cero
2. **Se más específico** sobre lo que no funciona
3. **Consulta los [Recursos](/docs/recursos)** disponibles
4. **Revisa casos similares** en los [Proyectos documentados](/docs/proyectos)

:::tip ¡Recuerda!
Claude Code es una herramienta de colaboración. No temas hacer preguntas, pedir explicaciones, o solicitar cambios. ¡Claude está aquí para ayudarte a aprender y ser más productivo!
:::

¡Ahora estás listo para comenzar tu viaje con Claude Code! 🚀
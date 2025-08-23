---
slug: personalizando-branding-academy-nocode
title: 'Diario de Aprendizaje: Personalizando el Branding de Academy NoCode'
authors: [german]
tags: [diario, branding, ux-ui, claude-code, academy-nocode]
---

# Diario de Aprendizaje: Personalizando el Branding de Academy NoCode 🧡

¡Qué día más intenso hemos tenido! Hoy me tocó sumergirme de lleno en algo que, siendo honesto, me daba un poco de respeto: **personalizar completamente el branding** de nuestro centro de documentación de Claude Code. Te cuento toda la aventura, con sus subidas, bajadas y esos momentos de "¡¿por qué no funciona?!" que todos conocemos.

<!-- truncate -->

## El Punto de Partida: ¿Qué Estaba Mal?

Esta mañana me levanté, abrí el sitio, y me di cuenta de algo que llevaba tiempo molestándome sin darme cuenta. **Teníamos un problema de identidad**. El sitio se veía... genérico. Colores azules por todas partes, tipografías inconsistentes, y lo peor: ¡no reflejaba para nada el branding de Academy NoCode!

Era como tener una tienda preciosa pero con el cartel de otra empresa. No podía seguir así.

## Primera Misión: Los Colores Tienen que Cambiar

Lo primero que hice fue sentarme con mi paleta de colores de Academy NoCode. Ese **#ff3d00** (naranja vibrante) tenía que ser el protagonista, no un invitado más.

### El Problema de los Azules Rebeldes

¡Madre mía, lo que me costó encontrar todos los colores azules escondidos por el código! Era como jugar al escondite con CSS. Tenía:
- `#6366f1` por aquí
- `#4f46e5` por allá  
- `#1e293b` en los fondos oscuros

**La solución**: Armé una nueva paleta completa centrada en el naranja:
```css
--ifm-color-primary: #ff3d00;
--ifm-color-primary-dark: #e63500;
--ifm-color-primary-darker: #cc2f00;
/* Y así con todas las variantes... */
```

## Segunda Misión: El Explorador Necesitaba Amor

El explorador de documentación se veía bien, pero tenía esos colores azul marino que ya no pegaban nada con nuestra identidad. Aquí fue donde empezaron los verdaderos problemas técnicos.

### El Drama del Contraste de Texto

Cuando cambié todos los fondos azul oscuro (#1e293b) por grises elegantes (#1f2937), algunos textos prácticamente **desaparecieron**. Era como escribir con tinta invisible.

**El aprendizaje**: No basta con cambiar colores, hay que **verificar el contraste** en cada elemento. Tuve que ir uno por uno ajustando:
- Headers principales: `#1f2937` → `#111827`
- Texto descriptivo: `#6b7280` → `#4b5563`  
- Cards y elementos: toda una sinfonía de grises elegantes

## Tercera Misión: El Logo Unificado

Aquí tuve una de esas ideas que parecen simples pero luego... 😅

**La idea**: "¿Por qué tenemos logos separados para claro/oscuro? ¡Hagamos uno que funcione en ambos!"

**La realidad**: Pasé una hora configurando `srcDark` y `src` diferentes hasta darme cuenta de que el nuevo logo que subiste ya funcionaba perfecto para ambos modos. A veces la solución más simple es la mejor.

```typescript
// Antes (complicado)
logo: {
  src: 'img/logo-light.png',
  srcDark: 'img/logo-dark.png',
  // ... más configuración
}

// Después (elegante)
logo: {
  src: 'img/logo.png',
  width: 32,
  height: 32,
}
```

## La Crisis de los Links Sociales

Este fue mi momento favorito del día. Cuando actualicé todos los enlaces del footer y navbar con tus redes sociales, me di cuenta de que había estado viviendo una mentira: **el sitio no tenía tu identidad personal por ningún lado**.

Añadir los enlaces a [@Nocodeboy](https://x.com/Nocodeboy), [LinkedIn](https://www.linkedin.com/in/germán-huertas-piquero-b89a80b1/), y [academynocode.com](https://academynocode.com) fue como darle alma al proyecto. Ahora sí se siente como el centro de **Germán Huertas**, no como un sitio anónimo más.

## El Momento "¡Eureka!" del UX/UI

Aquí fue donde llamé a mi amigo imaginario especialista en UX/UI (bueno, fue Claude Code quien hizo de consultor 😄). Los problemas que identificó fueron reveladores:

### Problema 1: Branding Confuso
- **Diagnóstico**: "Academy NoCode vs Claude Code - ¿Cuál es cuál?"
- **Solución**: Redefinir claramente como "Academy NoCode - Centro Claude Code"

### Problema 2: Jerarquía Visual
- **Diagnóstico**: "¡Los emojis de 4rem están gritando más que los títulos!"
- **Solución**: Reducir a 2.5rem y establecer una escala tipográfica clara

### Problema 3: Inconsistencia Mobile
- **Diagnóstico**: "Los botones son demasiado pequeños para tocar cómodamente"
- **Solución**: Touch targets mínimos de 44px

## Los Pequeños Detalles Que Casi Me Vuelven Loco

### El Misterio de los Screenshots Automáticos

¿Te acuerdas del sistema de screenshots automáticos que implementamos? Bueno, cuando cambié todos los colores, ¡tuve que regenerar TODAS las capturas! Y claro, Puppeteer decidió tomarse su tiempo...

```bash
# Este comando se convirtió en mi mejor amigo hoy
node scripts/take-screenshots.js local
```

### El Domain Plot Twist

¡Casi al final me di cuenta de que tenía `.netlify.app` por todas partes cuando en realidad estamos en `.vercel.app`! Menos mal que lo pillé antes del deploy final.

## Las Lecciones del Día

### 1. El CSS es Como un Iceberg
Solo ves el 10% de los colores que realmente hay. Siempre hay ese azul escondido en algún `::before` que te trollea.

### 2. La Consistencia es Tu Mejor Amiga
Una vez que tienes tu paleta definida, úsala **religiosamente**. Nada de "este azulito no pasa nada".

### 3. Los Screenshots No Mienten
Ver el antes y después en capturas de pantalla te muestra si realmente has mejorado o solo has movido cosas de sitio.

### 4. La Accesibilidad No es Opcional
Por cada color que cambias, tienes que preguntarte: "¿Se lee bien? ¿Cumple WCAG AA?"

## El Resultado Final

¡Y mira qué transformación! De un sitio genérico azul hemos pasado a:

- ✅ **Branding 100% Academy NoCode** con el naranja como protagonista
- ✅ **Paleta elegante de grises** que transmite profesionalismo
- ✅ **Identidad personal clara** con todos tus enlaces y información
- ✅ **UX consistente** en todos los dispositivos
- ✅ **Accesibilidad mejorada** con contrastes adecuados

## Lo Que Viene Después

Este ha sido solo el primer paso. El branding está perfecto, pero ahora toca:
- 📝 Crear más contenido de calidad
- 🎥 Añadir videos explicativos
- 📊 Implementar analytics para entender a nuestros usuarios
- 🤝 Abrir las puertas a contribuciones de la comunidad

## Reflexión Personal

Hoy he aprendido que **el branding no es solo colores bonitos**. Es cohesión, es identidad, es hacer que cada persona que visite el sitio sienta inmediatamente: "Esto es Academy NoCode, esto es Germán Huertas enseñando Claude Code".

Y siendo honesto, ha sido agotador pero gratificante. Hay algo especial en ver cómo un sitio web va tomando personalidad propia, cómo cada pequeño cambio lo acerca más a lo que querías expresar desde el principio.

## ¿Y Tú Qué Opinas?

¿Has tenido que lidiar con algún rediseño de branding? ¿Cuál ha sido tu mayor dolor de cabeza con CSS? ¡Cuéntamelo en los comentarios o en [Twitter](https://x.com/Nocodeboy)!

---

**PD**: Si quieres ver todo el código de los cambios, está disponible en el [repositorio de GitHub](https://github.com/Nocodeboy/claude-code-docs). Y si te animas a contribuir con el proyecto, ¡serás más que bienvenido!

**Germán Huertas**  
*Fundador de Academy NoCode*  
🧡 Enseñando Claude Code en español desde 2025
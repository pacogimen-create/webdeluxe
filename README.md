# Web Club Natación - Astro Project

Landing page moderna y profesional para un club de natación, construida con **Astro**.

## 🚀 Características

- **Framework Moderno**: Construido con Astro para máximo rendimiento
- **Componentes Reutilizables**: Arquitectura basada en componentes
- **Diseño Premium**: Estética limpia con tipografía 'Inter' y paleta de colores azul eléctrico
- **Animaciones GSAP**: Transiciones fluidas al hacer scroll (ScrollTrigger)
- **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y escritorio
- **SEO Optimizado**: Meta tags y estructura semántica HTML5

## 📁 Estructura del Proyecto

```
/
├── public/              # Assets estáticos
├── src/
│   ├── components/      # Componentes Astro reutilizables
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Membership.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   ├── layouts/         # Layouts base
│   │   └── BaseLayout.astro
│   ├── pages/           # Páginas (rutas)
│   │   └── index.astro
│   ├── scripts/         # JavaScript
│   │   ├── animations.js
│   │   └── menu.js
│   └── styles/          # Estilos globales
│       └── global.css
├── source_files/        # Archivos originales HTML/CSS/JS
├── astro.config.mjs     # Configuración de Astro
└── package.json         # Dependencias del proyecto
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+ y npm

### Pasos

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:4321`

3. **Construir para producción**:
   ```bash
   npm run build
   ```

4. **Previsualizar build de producción**:
   ```bash
   npm run preview
   ```

## 🎨 Personalización

### Colores
Modifica las variables CSS en `/src/styles/global.css`:
```css
:root {
    --color-primary: #0055FF;
    --color-secondary: #0A0D2C;
    /* ... más variables */
}
```

### Contenido
Edita los componentes en `/src/components/` para cambiar textos, imágenes y estructura.

### Imágenes
Las imágenes actuales son de Unsplash. Puedes:
- Reemplazar las URLs en los componentes
- Agregar imágenes locales en `/public/` y referenciarlas

## 📦 Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [GSAP](https://greensock.com/gsap/) - Librería de animaciones
- HTML5 / CSS3
- JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com/) (Inter)

## 🚀 Comandos Disponibles

| Comando                | Acción                                      |
| :--------------------- | :------------------------------------------ |
| `npm install`          | Instala las dependencias                    |
| `npm run dev`          | Inicia servidor local en `localhost:4321`   |
| `npm run build`        | Construye el sitio para producción en `./dist/` |
| `npm run preview`      | Previsualiza el build localmente            |
| `npm run astro ...`    | Ejecuta comandos CLI de Astro              |

## 📝 Notas de Migración

Este proyecto fue migrado desde HTML/CSS/JS vanilla a Astro. Los archivos originales se mantienen en `/source_files/` como referencia.

### Beneficios de la migración:
- ✅ Mejor rendimiento (SSG - Static Site Generation)
- ✅ Componentes reutilizables
- ✅ Mejor organización del código
- ✅ Hot Module Replacement (HMR) en desarrollo
- ✅ Optimización automática de assets
- ✅ TypeScript support (opcional)

## 📄 Licencia

© 2026 Web Club Natación. Todos los derechos reservados.

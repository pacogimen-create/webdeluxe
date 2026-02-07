# 🏊 UCAM Natación - Guía Rápida

## ✅ ¿Qué hemos creado?

Tu sitio web premium para el club de natación UCAM Ciudad de Murcia Fuensanta está listo con:

### 🎨 Frontend Completo
- ✅ **Hero Section** - Sección principal con animaciones GSAP y estadísticas
- ✅ **Navbar** - Navegación responsive con menú móvil
- ✅ **Noticias** - Sistema dinámico conectado a Supabase
- ✅ **Equipo** - Showcase de entrenadores con imágenes y especialidades
- ✅ **Horarios** - Calendario de entrenamientos semanales
- ✅ **Contacto** - Formulario funcional que guarda en Supabase
- ✅ **Footer** - Footer completo con enlaces y redes sociales

### 🎭 Animaciones Premium
- GSAP con ScrollTrigger
- Efectos parallax
- Animaciones de hover en tarjetas
- Contadores animados
- Transiciones suaves

### 🗄️ Base de Datos Supabase
- Tablas creadas para: noticias, entrenadores, horarios, contactos
- Row Level Security (RLS) configurado
- Datos de ejemplo incluidos

---

## 🚀 Pasos Siguientes

### 1. **Configurar Supabase** (5 minutos)

Abre `SUPABASE_SETUP.md` y sigue las instrucciones para:
1. Ejecutar el SQL en tu proyecto de Supabase
2. Crear el bucket de imágenes `club-images`
3. Crear tu usuario admin

### 2. **Ver el Sitio Web** 

El servidor de desarrollo ya está corriendo. Abre tu navegador en:

```
http://localhost:4321
```

### 3. **Próximos Pasos Opcionales**

#### Panel de Administración
Puedo crear el panel admin para gestionar noticias. Incluirá:
- Login de administrador
- Dashboard para crear/editar/eliminar noticias
- Subida de imágenes
- Editor WYSIWYG

#### Más Funcionalidades
- Galería de fotos/videos
- Sistema de inscripciones online
- Blog completo con categorías
- Página de resultados de competiciones

---

## 📁 Estructura del Proyecto

```
Web/
├── src/
│   ├── components/
│   │   ├── Navbar.astro       # Navegación
│   │   ├── Hero.astro          # Sección principal
│   │   ├── News.astro          # Noticias
│   │   ├── Team.astro          # Equipo
│   │   ├── Schedule.astro      # Horarios
│   │   ├── Contact.astro       # Contacto
│   │   └── Footer.astro        # Pie de página
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal
│   ├── pages/
│   │   └── index.astro         # Página principal
│   ├── scripts/
│   │   ├── animations.js       # Animaciones existentes
│   │   └── premium-animations.js  # Nuevas animaciones GSAP
│   ├── styles/
│   │   └── global.css          # Estilos globales
│   └── lib/
│       └── supabase.ts         # Cliente Supabase
├── SUPABASE_SETUP.md           # Guía de configuración DB
└── package.json
```

---

## 🎨 Personalización

### Colores
Edita `src/styles/global.css` para cambiar los colores del club:

```css
:root {
  --color-primary: #0066cc;      /* Azul principal */
  --color-secondary: #00b4d8;    /* Azul secundario */
  --color-accent: #ff6b35;       /* Color de acento */
}
```

### Contenido
- **Logo**: Reemplaza el SVG en `Navbar.astro` y `Footer.astro`
- **Imágenes**: Sube tus propias fotos a Supabase Storage
- **Textos**: Edita directamente en los componentes `.astro`

---

## 🛠️ Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## 📊 Gestión de Contenido

### Añadir Noticias
1. Ve a tu Supabase Dashboard
2. Tabla `news` → Insert row
3. Completa: título, slug, contenido, excerpt
4. Marca `published` como `true`

### Añadir Entrenadores
1. Tabla `coaches` → Insert row
2. Completa: nombre, rol, bio, image_url
3. Marca `active` como `true`

### Ver Contactos
1. Tabla `contact_submissions`
2. Verás todos los mensajes del formulario

---

## 🎯 Próximos Pasos Recomendados

1. **Ahora**: Configura Supabase y prueba el sitio
2. **Luego**: Añade contenido real (noticias, fotos del equipo)
3. **Después**: Crea el panel de administración
4. **Finalmente**: Despliega en producción (Vercel/Netlify)

---

## 💡 ¿Necesitas Ayuda?

Puedo ayudarte con:
- ✅ Crear el panel de administración
- ✅ Añadir más secciones (galería, blog, etc.)
- ✅ Personalizar diseño y colores
- ✅ Configurar dominio personalizado
- ✅ Optimizar para SEO
- ✅ Añadir más animaciones

¡Tu sitio web premium está listo para impresionar! 🏊‍♂️✨

# Red ADvenir — Sitio web

Rediseño del sitio de [Red ADvenir Internacional](https://redadvenir.org/) en **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, con **panel de administración propio**, **Headless UI** + **Framer Motion** (animaciones), **PWA** y un **chatbot de FAQ**.

## Requisitos
- Node.js 20+

## Desarrollo local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```
En local no requiere configuración: el contenido vive en `data/db.json` y los
archivos subidos en `public/uploads/` (ambos se crean solos).

## Panel de administración (`/admin`)
Todo el contenido se publica desde aquí: publicaciones (noticias / notas
teológicas / proféticas), programas, grilla, estudios PDF, creencias y las FAQ
del chatbot. Incluye subida de imágenes/PDFs, validación y modales animados.

- **Acceso:** `/admin` (redirige a `/admin/login`).
- **Contraseña:** variable `ADMIN_PASSWORD` (por defecto `redadvenir`).

## Almacenamiento conmutable
La capa de datos (`lib/db.ts`) y la subida de archivos eligen el backend según
las variables de entorno — **sin cambiar código**:

| | Local (sin env) | Producción (Vercel) |
|---|---|---|
| Contenido | `data/db.json` | **Upstash Redis** (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) |
| Archivos | `public/uploads/` | **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`) |

Las páginas con contenido editable son dinámicas, así los administradores ven
sus cambios al instante.

## Configuración (`.env.local`)
Copia `.env.local.example` a `.env.local`. Variables: `ADMIN_PASSWORD`,
`ADMIN_SECRET`, (prod) `KV_REST_API_URL`/`KV_REST_API_TOKEN`,
`BLOB_READ_WRITE_TOKEN`, y SMTP del formulario de contacto (opcional).

## Despliegue en Vercel
1. Sube el repo a GitHub (ver abajo) e impórtalo en [vercel.com/new](https://vercel.com/new).
2. En el proyecto de Vercel → **Storage**:
   - Crea una base **Upstash for Redis** (inyecta `KV_REST_API_*`).
   - Crea un store **Blob** (inyecta `BLOB_READ_WRITE_TOKEN`).
3. En **Settings → Environment Variables** añade `ADMIN_PASSWORD` y `ADMIN_SECRET`.
4. **Redeploy**. Listo: el sitio y el admin funcionan en la nube.

## Estructura
```
app/(public)/   Sitio público (Navbar/Footer/Chatbot/Breadcrumbs + animaciones)
app/admin/      Login + panel (dashboard y gestor por recurso)
app/api/admin/  Login/logout, CRUD genérico y subida de archivos
components/      Navbar, Footer, Chatbot, reproductores, admin/…
lib/            site, streams, signal, db, resources, content, auth, seed, types
proxy.ts        Protege /admin y /api/admin (sesión)
```

## Pendientes antes de publicar definitivamente
- Cambiar `ADMIN_PASSWORD` y `ADMIN_SECRET`.
- Verificar datos de señal (`lib/signal.ts`) y enlaces de redes (`lib/site.ts`).
- Cargar contenido y playlists reales de YouTube desde el admin.
- (Opcional) Optimizar el logo SVG (~5 MB) a un PNG/WebP liviano.

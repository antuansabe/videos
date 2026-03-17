# Video Downloader

A premium, Material Design 3 video downloader web app. Download videos from YouTube, Instagram, TikTok and more platforms.

**No ads · No tracking · Open source**

---

## Guía de Configuración Paso a Paso

### Paso 1: ¿Qué es Cobalt?

Cobalt es el servicio que procesa y descarga los videos. Tu app se conecta a una "instancia" de Cobalt (un servidor) para funcionar.

**No necesitas crear cuenta.** Solo necesitas la URL de una instancia pública.

---

### Paso 2: Obtener tu URL de Cobalt API

#### Opción A: Usar una instancia pública (Recomendado - 2 minutos)

1. Ve a **[instances.cobalt.best](https://instances.cobalt.best)**

2. Verás una lista de servidores. Busca uno que tenga:
   - ✅ **Status: Online** (punto verde)
   - ✅ **API: Yes**
   - ✅ **Auth: No** (sin autenticación)

3. Haz clic en el servidor que elijas para ver sus detalles

4. Copia la **API URL** (se ve algo así):
   ```
   https://api.cobalt.tools
   ```
   o
   ```
   https://cobalt.example.com
   ```

5. **¡Esa es tu `COBALT_API_URL`!** Guárdala.

#### Opción B: Instancias recomendadas que suelen funcionar

Si no quieres buscar, prueba estas (pueden cambiar con el tiempo):

| Instancia | URL |
|-----------|-----|
| Oficial | `https://api.cobalt.tools` |

> ⚠️ Las instancias públicas pueden tener límites de uso o estar caídas temporalmente. Si una no funciona, prueba otra.

---

### Paso 3: Verificar que la instancia funciona (Opcional)

Antes de configurar Vercel, puedes probar que la instancia responde:

1. Abre tu navegador
2. Ve a la URL que copiaste, por ejemplo: `https://api.cobalt.tools`
3. Deberías ver una respuesta JSON o una página de Cobalt
4. Si ves un error, prueba otra instancia

---

### Paso 4: Deploy en Vercel

1. **Ve a Vercel:**

   👉 [https://vercel.com/new](https://vercel.com/new)

2. **Conecta tu cuenta de GitHub** (si no lo has hecho)

3. **Importa el repositorio:**
   - Busca `antuansabe/videos`
   - Click en **Import**

4. **Configura la variable de entorno:**

   En la sección **"Environment Variables"**, agrega:

   | Name | Value |
   |------|-------|
   | `COBALT_API_URL` | `https://api.cobalt.tools` |

   (O la URL que hayas elegido en el Paso 2)

5. **Click en "Deploy"**

6. **¡Espera 1-2 minutos y listo!** 🎉

---

### Paso 5: Probar tu app

1. Vercel te dará una URL como: `https://videos-xxx.vercel.app`
2. Ábrela en tu navegador
3. Pega un link de YouTube, Instagram o TikTok
4. Click en **Download**

---

## Solución de Problemas

### "Error de conexión" o "API no configurada"

- Verifica que escribiste bien `COBALT_API_URL` (sin espacios)
- Asegúrate de que la URL no tenga `/` al final
- Prueba otra instancia de [instances.cobalt.best](https://instances.cobalt.best)

### "Error al procesar el enlace"

- Algunas instancias no soportan todas las plataformas
- Prueba con un video de YouTube (suele ser el más compatible)
- Intenta con otra instancia

### La instancia que elegí dejó de funcionar

Las instancias públicas son mantenidas por voluntarios. Si una deja de funcionar:
1. Ve a [instances.cobalt.best](https://instances.cobalt.best)
2. Elige otra instancia online
3. En Vercel: Settings → Environment Variables → Edita `COBALT_API_URL`
4. Redeploy

---

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env.local

# Editar .env.local y agregar tu COBALT_API_URL
# COBALT_API_URL=https://api.cobalt.tools

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm test           # Correr tests
```

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **MUI v6** (Material Design 3)
- **Cobalt API** (procesamiento de video)

## Plataformas Soportadas

YouTube, Instagram, TikTok, Twitter/X, Reddit, Pinterest, Facebook, SoundCloud, Twitch, Bluesky, Snapchat, y más.

---

## Licencia

MIT — Uso personal.

---

Designed by **Antonn**

# Video Downloader

A premium, Material Design 3 video downloader web app. Download videos from YouTube, Instagram, TikTok and more platforms.

**No ads · No tracking · Open source**

Uses [Cobalt](https://github.com/imputnet/cobalt) as the processing backend.

## Features

- Premium Material Design 3 UI (Google-style)
- Dark/Light mode with system preference detection
- Platform auto-detection (YouTube, Instagram, TikTok, Twitter/X, Reddit)
- Advanced download options (quality, format, audio-only)
- Responsive design
- Glassmorphism effects and smooth animations

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Cobalt API

You need a Cobalt API instance. Two options:

**Option A: Use a community instance**

Visit [instances.cobalt.best](https://instances.cobalt.best) and find one that:
- Is online
- Doesn't require authentication (`auth: false`)
- Supports the services you need (youtube, instagram, etc.)

**Option B: Self-host (recommended for frequent use)**

Follow the guide: [Run an instance](https://github.com/imputnet/cobalt/blob/main/docs/run-an-instance.md)

### 3. Configure environment variables

Edit `.env.local`:

```
COBALT_API_URL=https://your-cobalt-instance.example.com
```

> **Important:** Only use the base URL (no trailing `/`). The app POSTs directly to this URL.

### 4. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/video-downloader&env=COBALT_API_URL&envDescription=URL%20of%20your%20Cobalt%20API%20instance)

### Manual deploy

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. In **Environment Variables**, add:
   - `COBALT_API_URL` = your Cobalt instance URL
4. Deploy

The app is optimized for Vercel with security headers pre-configured.

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **MUI v6** (Material Design 3)
- **Cobalt API** (video processing)
- **Jest + React Testing Library** (testing)

## Supported Platforms

YouTube, Instagram, TikTok, Twitter/X, Reddit, Pinterest, Facebook, SoundCloud, Twitch, Bluesky, Snapchat, and more.

Full list depends on your Cobalt instance configuration.

## License

MIT — Personal use.

---

Designed by **Antonn**

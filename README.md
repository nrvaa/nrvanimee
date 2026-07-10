# 🇨🇭 NRVANIMELIST — New Realm of Visual Anime

An energetic, playful, and high-performance anime tracking and discovery application. Built with **Next.js (App Router)**, **React 19**, and **Tailwind CSS v4**, this application rejects the sterile, gray look of typical enterprise SaaS dashboards in favor of **Swiss Minimalist** design aesthetics—featuring bold borders, high-contrast layouts, pure CSS grid/diagonal/dot textures, a dynamic SVG noise overlay, and system-level dark mode.

---

## 🚀 Key Features

*   **Swiss Minimalist UI/UX:** Styled using high-contrast borders (`border-4 border-black`), tactile translation shadows (`shadow-[16px_16px_0px_0px_...]`), Swiss Red accenting (`#FF3000`), custom background patterns, and system-level Dark Mode.
*   **Lenis Smooth Scrolling:** Integrated `@studio-freight/react-lenis` wide-application smooth scroll for responsive feel.
*   **Smart API Fetching Client:** A customized Jikan API client featuring client-side and server-side request throttling, request deduplication, in-memory caching, and linear retry-backoff mechanisms.
*   **Endless Discovery:** A client-side infinite scroll section that deduplicates items dynamically fetched from the server.
*   **Multivariable Search & Sorting:** A fully-featured keyword search page with options to sort results by Relevance, Highest Score, Most Popular, and Newest.
*   **Bookmarks / Archive System:** Persistent, local client storage (`localStorage`) bookmarking capability using React Context.
*   **Rich Catalog Views:** Clean, detailed pages for Anime, Manga, and Characters—displaying statistics, voice actors, appearances, and trailers.

---

## 🏛️ Application Architecture

NRVANIMELIST uses a modern, hybrid rendering architecture:

```mermaid
graph TD
    subgraph Client
        Browser[User Browser]
        Lenis[SmoothScrollProvider]
        Archive[ArchiveProvider - LocalStorage]
        Endless[EndlessAnime Client component]
    end

    subgraph Next.js Pages & Routes
        Home[/]
        Search[/search/keyword]
        AnimeDetail[/anime/id]
        MangaDetail[/manga/id]
        CharDetail[/character/id]
        ArchivePage[/archive]
    end

    subgraph API & Caching Layer
        ApiHelper[src/lib/api.js]
        MemCache[(In-Memory Cache)]
        Throttle[Rate-Limiting Queue]
    end

    Jikan[Jikan API v4]

    Browser --> Lenis
    Lenis --> Archive
    Home --> ApiHelper
    Search --> ApiHelper
    AnimeDetail --> ApiHelper
    MangaDetail --> ApiHelper
    CharDetail --> ApiHelper
    ArchivePage --> Archive
    Endless --> ApiHelper
    ApiHelper --> MemCache
    ApiHelper --> Throttle
    Throttle --> Jikan
```

### 1. Robust API Layer ([api.js](file:///c:/Users/NRVA/coding/api/adinimelist%20-%20Copy/src/lib/api.js))
Because the [Jikan API](https://jikan.moe/) enforces rate limits (requests per second / day), the fetch wrapper implements several resilience patterns:
*   **Throttling:** Maintains a `lastRequestTime` flag. If two consecutive requests occur within less than `400ms`, the engine waits before firing the next request.
*   **Request Deduplication:** Keeps track of active promises in a `pendingRequests` map. If two identical requests run concurrently, they subscribe to the same promise rather than querying the API twice.
*   **In-Memory Caching:** Stores successful `GET` queries in an in-memory `Map` with an expiration duration (defaulting to 5 minutes) to skip network requests entirely.
*   **Auto-Retry:** Retries failed requests up to 3 times, introducing a linear wait timer (1s, 2s, 3s) on `429` (Rate Limited) or `5xx` (Server Error) status codes.

### 2. State & Providers
*   **[ArchiveProvider.js](file:///c:/Users/NRVA/coding/api/adinimelist%20-%20Copy/src/providers/ArchiveProvider.js):** Manages bookmarked anime/manga items globally. Bookmarked items are stored in the browser's `localStorage` (key: `nrva_archive`) and updated reactively.
*   **[SmoothScrollProvider.js](file:///c:/Users/NRVA/coding/api/adinimelist%20-%20Copy/src/providers/SmoothScrollProvider.js):** Wraps the layout hierarchy in Lenis context, configuring smooth inertial scroll configurations (`lerp: 0.05`, `duration: 1.5`).

---

## 📁 Directory Structure

Below is the directory tree highlighting the key source files of the application:

```text
adinimelist/
├── public/                 # Static assets (SVGs, icons)
├── src/
│   ├── app/                # Next.js App Router folders
│   │   ├── anime/
│   │   │   └── [id]/
│   │   │       └── page.js # Detailed anime page with trailer, details, and score
│   │   ├── archive/
│   │   │   └── page.js     # User's bookmarked anime/manga dashboard
│   │   ├── character/
│   │   │   └── [id]/
│   │   │       └── page.js # Detailed character view (voice actors & appearances)
│   │   ├── characters/
│   │   │   └── page.js     # List of top popular characters
│   │   ├── manga/
│   │   │   └── [id]/
│   │   │       └── page.js # Detailed manga page with Save to Archive button
│   │   ├── popular/
│   │   │   └── page.js     # Catalog listing of popular anime
│   │   ├── search/
│   │   │   └── [keyword]/
│   │   │       └── page.js # Search results with multi-criteria filters
│   │   ├── seasonal/
│   │   │   └── page.js     # Listing of currently airing seasonal anime
│   │   ├── topmanga/
│   │   │   └── page.js     # Catalog listing of top manga series
│   │   ├── favicon.ico
│   │   ├── globals.css     # Tailwind v4 import, custom Swiss texture utility rules
│   │   ├── layout.js       # Main RootLayout wrapping providers, Navbar, and Footer
│   │   ├── loading.js      # Global loading indicator with Swiss spin animation
│   │   └── page.js         # Homepage (Hero, Top Anime/Manga, Recommendations, Endless Scroll)
│   ├── components/         # Reusable React components
│   │   ├── AnimeList/
│   │   │   ├── Header.js   # Section header component with Swiss design accents
│   │   │   └── index.js    # Multi-column grid renderer for anime, manga & characters
│   │   ├── EndlessAnime/
│   │   │   └── index.js    # Client-side infinite scroller for homepage discovery
│   │   ├── Footer/
│   │   │   └── index.js    # Dynamic brand footer with site links
│   │   ├── Navbar/
│   │   │   ├── InputSearch.js # Search bar with client routing and auto-focus
│   │   │   └── index.js    # Site header containing navigation links and search box
│   │   ├── Search/
│   │   │   └── index.js    # Simple search placeholder component
│   │   └── SaveButton.js   # Interactive toggle button linked to Archive Context
│   ├── lib/
│   │   └── api.js          # jikanFetch module (throttling, caching, deduplication)
│   └── providers/
│       ├── ArchiveProvider.js # Local storage synchronization context
│       └── SmoothScrollProvider.js # Lenis scroll configuration provider
├── next.config.mjs         # Remote image optimization rules for cdn.myanimelist.net
├── package.json            # Scripts, dependencies, and Tailwind build rules
├── postcss.config.mjs      # PostCSS plugins
└── tailwind.config.js      # Tailwind configurations (via inline Tailwind CSS v4 directives)
```

---

## 🎨 Design Tokens & Style System

Styles are configured inside [globals.css](file:///c:/Users/NRVA/coding/api/adinimelist%20-%20Copy/src/app/globals.css) and built on top of Tailwind CSS v4 `@theme` tokens:

### 1. Colors
*   `--color-swiss-red`: `#FF3000` (Energetic accent color for hover states, buttons, links, and alerts).
*   `--color-black` / `--color-white`: Mapped to dynamic themes (`--theme-black` and `--theme-white`) which swap on system dark/light mode preference.

### 2. Texture & Layout Patterns
*   **`.swiss-noise`**: Custom body overlay rendering fractal SVG noise (opacity 0.04) for a premium textured finish.
*   **`.swiss-grid-pattern`**: Renders a structural 24px background grid simulating grid blueprints.
*   **`.swiss-dots`**: Radial 16px background dot alignment.
*   **`.swiss-diagonal`**: Repeating 45-degree micro-stripes.

---

## 🛠️ Getting Started & Scripts

### Environment Setup
Create a `.env` or `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.jikan.moe/v4
```

### Installation
Install the project dependencies using npm:
```bash
npm install
```

### Development Server
Run the local dev server (using the custom `mewk` command):
```bash
npm run mewk
```
This boots up the server on [http://localhost:3000](http://localhost:3000).

### Production Build
Build and compile files for deployment:
```bash
npm run build
npm start
```

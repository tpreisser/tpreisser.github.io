# Tyler Preisser Personal Website — Complete Architecture Reference

## 1. Project Overview

**What**: Tyler Preisser's professional portfolio site. Two-stage build where (1) Next.js creates a static scaffold, (2) post-build personalization script transforms minified JavaScript with Tyler's professional content.

**Where**: `/Users/tylerpreisser/Documents/New project/`

**Status**: Production-ready infrastructure. All routes functional, animations working, build completes cleanly, personalization script transforms bundle correctly. Site deploys to tylerpreisser.com via Cloudflare Pages.

**Key Innovation**: Single-page app disguised as multi-page static site for SEO. Component library designed for both podcast (source) and portfolio (deployed) use cases through aggressive post-build personalization.

---

## 2. Complete Tech Stack & Versions

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 16.2.1 | App Router, static export, Turbopack |
| **React** | React | 19.2.4 | Component library, server/client split |
| **Language** | TypeScript | 5.x | Type safety, strict mode enabled |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS, @tailwindcss/postcss |
| **PostCSS** | @tailwindcss/postcss | 4.x | CSS compilation with Tailwind |
| **Animation** | GSAP | 3.14.2 | Timeline animations, SplitText, ScrollTrigger |
| **Animation** | @gsap/react | 2.1.2 | useGSAP hook for React integration |
| **Animation** | Framer Motion | 12.38.0 | Page transitions, declarative animations |
| **Scroll** | Lenis | 1.3.20 | Smooth scrolling (installed, not integrated) |
| **Theme** | next-themes | 0.4.6 | Dark/light toggle, class-based system |
| **Utilities** | clsx | 2.1.1 | Conditional class composition |
| **Embed** | lite-youtube-embed | 0.3.4 | YouTube iframe lightweight alternative |
| **Deployment** | Cloudflare Pages | - | Static hosting, wrangler CLI |
| **Linting** | ESLint | 9.x | Next.js + TypeScript rules |

**Build Artifacts**:
- `/out/` — 11 MB static export (deployed to Cloudflare)
- `.next/` — 1.1 GB build cache and intermediate files

---

## 3. Directory Structure & File Purposes

```
/Users/tylerpreisser/Documents/New project/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout: metadata, fonts, scripts
│   │   ├── globals.css                   # Global resets: box-sizing, html/body
│   │   ├── page.tsx                      # / route (renders TylerSiteShell)
│   │   ├── projects/page.tsx             # /projects (renders TylerSiteShell)
│   │   └── resume/page.tsx               # /resume (renders TylerSiteShell)
│   │
│   ├── components/
│   │   ├── tyler-site-shell.tsx          # CRITICAL: Client app mount point
│   │   │                                  # Renders <div id="root"/> target
│   │   │                                  # All routes use this component
│   │   │
│   │   ├── layout/
│   │   │   ├── site-chrome.tsx           # Wrapper: background, cursor, header, footer
│   │   │   ├── site-header.tsx           # Fixed header: nav, theme toggle
│   │   │   └── site-footer.tsx           # Footer: contact links, copyright
│   │   │
│   │   ├── providers/
│   │   │   ├── app-providers.tsx         # Combines theme + smooth-scroll providers
│   │   │   ├── theme-provider.tsx        # next-themes wrapper
│   │   │   └── smooth-scroll-provider.tsx # Placeholder (unused Lenis integration)
│   │   │
│   │   ├── sections/
│   │   │   ├── home/
│   │   │   │   ├── hero-section.tsx      # Hero with GSAP SplitText animations
│   │   │   │   ├── concept-section.tsx   # About/intro blurb
│   │   │   │   ├── featured-series-section.tsx # Featured content card
│   │   │   │   ├── hosts-section.tsx     # Host profiles (replaced by personalize)
│   │   │   │   ├── question-cloud.tsx    # Word cloud component
│   │   │   │   ├── questions-cloud-section.tsx # Intro section with cloud
│   │   │   │   ├── subscribe-section.tsx # Newsletter signup (UI-only)
│   │   │   │   └── horizontal-episode-gallery.tsx # Featured carousel
│   │   │   ├── episodes/episode-explorer.tsx # Episode grid/list view
│   │   │   ├── questions/question-explorer.tsx # Question search/filter
│   │   │   ├── series/phase-timeline.tsx # Phase visualization
│   │   │   └── shared/
│   │   │       ├── page-header.tsx       # Page title/subtitle component
│   │   │       └── coming-soon-panel.tsx # Placeholder sections
│   │   │
│   │   └── ui/
│   │       ├── custom-cursor.tsx         # Pointer tracking cursor (hidden on touch)
│   │       ├── spark-canvas.tsx          # Canvas particle bursts (golden/copper)
│   │       ├── button.tsx                # Reusable button component
│   │       ├── logo.tsx                  # Logo component
│   │       ├── brand-emblem.tsx          # Brand mark
│   │       ├── page-transition.tsx       # Fade/slide wrapper via Framer Motion
│   │       ├── fade-in-view.tsx          # Intersection observer fade-in
│   │       ├── material-background.tsx   # Blurred mesh background
│   │       ├── magnetic.tsx              # Magnetic hover effect on buttons
│   │       ├── text-reveal.tsx           # GSAP character-by-character reveal
│   │       ├── scripture-reveal.tsx      # Text reveal variant (unused)
│   │       ├── forge-intro.tsx           # Intro animation wrapper
│   │       ├── section-heading.tsx       # Reusable section headings
│   │       ├── newsletter-form.tsx       # Email signup form (UI-only, no backend)
│   │       ├── episode-card.tsx          # Card component for episodes
│   │       ├── platform-icon.tsx         # Social media icon component
│   │       ├── lite-youtube.tsx          # YouTube embed wrapper
│   │       └── theme-toggle.tsx          # Dark/light toggle button
│   │
│   ├── data/
│   │   └── content.ts                    # Static content (hosts, episodes, series, questions)
│   │                                      # REPLACED by personalize-site.mjs at deploy
│   │
│   ├── types/
│   │   ├── content.ts                    # TypeScript types: Host, Episode, Series, etc.
│   │   ├── lite-youtube-module.d.ts      # Type stubs for lite-youtube
│   │   └── lite-youtube.d.ts
│   │
│   └── lib/
│       ├── gsap.ts                       # GSAP plugin registration (guard on pluginsRegistered)
│       │                                  # Exports: gsap, useGSAP, ScrollTrigger, SplitText
│       ├── site.ts                       # Site configuration (nav, socials, email)
│       │                                  # Currently has podcast content; ignored in production
│       └── utils.ts                      # Utilities: cn(), slugify(), formatDate(), etc.
│
├── public/
│   ├── assets/                           # 50+ images, logos, backgrounds, PDFs
│   │   ├── *.png, *.webp, *.svg, *.jpg  # Professional headshots, company logos, icons
│   │   ├── fhsu-tiger.png, fhsu-logo.png # FHSU education assets
│   │   ├── rsquaredai-logo.webp, rsquaredai-icon.png # R Squared AI assets
│   │   ├── preissersolutions-logo.png, preissersolutions-icon.png # Preisser Solutions
│   │   ├── tyler-headshot.webp, tyler-headshot-cutout.png # Tyler's profile images
│   │   ├── hgoil-icon.png, hgoil-well.svg # HG Oil branding
│   │   ├── preisser-media.svg, preisser-farms.svg # Venture logos
│   │   ├── Resume_Tyler_Preisser.pdf    # Generated by export-resume-pdf.mjs
│   │   └── [50+ more: Verizon, Nielsen, backgrounds, icons]
│   │
│   ├── fonts.googleapis.com/             # Cached Google Fonts CSS
│   ├── fonts.gstatic.com/                # Cached font files (.woff2)
│   │   ├── s/firacode/v27/...            # Fira Code monospace
│   │   ├── s/lobster/v32/...             # Lobster decorative
│   │   └── s/righteous/v18/...           # Righteous bold headers
│   │
│   ├── _headers                          # Cloudflare Pages cache/CSP headers
│   ├── _redirects                        # URL redirects
│   ├── _vercel/speed-insights/           # Vercel speed monitoring script
│   ├── [favicons, manifest files]
│   └── original-index.html               # Backup/reference
│
├── scripts/
│   ├── personalize-site.mjs              # CRITICAL: Post-build bundle transformation
│   │                                      # 3,500+ lines of string replacements
│   │                                      # Runs via npm run postbuild
│   ├── export-resume-pdf.mjs             # Resume PDF generation
│   └── cache-bust-static.mjs             # Cache-busting version strings on assets
│
├── .claude/                              # Codebase cartographer memory
├── .wrangler/                            # Wrangler state files
├── out/                                  # Static export (deployed to Cloudflare)
├── .next/                                # Next.js build cache
│
├── package.json                          # Dependencies + build scripts
├── package-lock.json                     # Lockfile
├── tsconfig.json                         # TypeScript: strict mode, ES2017 target
├── next.config.ts                        # Next.js: output="export", trailingSlash=true
├── postcss.config.mjs                    # PostCSS + Tailwind v4
├── wrangler.toml                         # Cloudflare Pages: pages_build_output_dir="out"
├── eslint.config.mjs                     # ESLint: Next.js + TypeScript rules
│
├── CLAUDE.md                             # This document (updated)
├── ARCHITECTURE.md                       # NEW: Deep architecture reference
├── README.md                             # High-level overview
├── PLAN.md                               # Phase roadmap (5 phases, mostly complete)
├── TASKS.md                              # Active task list
├── KNOWLEDGE.md                          # Research notes and decisions
└── AGENTS.md                             # Minimal agent configuration
```

---

## 4. Critical Architecture: Two-Stage Build Process

### Why This Approach?

The site uses a unique build strategy optimized for code reuse:

1. **Source is a podcast site scaffold**: `/src/data/content.ts` contains host profiles, episodes, series, and 100+ questions. Components render podcast-focused UI (hosts section, episode gallery, question explorer).

2. **Deployment transforms to portfolio**: `scripts/personalize-site.mjs` runs post-build and replaces large chunks of minified JavaScript with Tyler's professional data (resume, projects, experience, education).

3. **Result**: Single component library + styling system powers both podcast and portfolio use cases without rebuilding Next.js.

### Stage 1: Next.js Build

```bash
npm run build
```

**Process**:
1. TypeScript compiles and type-checks all source files
2. React components render to static HTML pages in `/out/`
3. CSS processes through Tailwind v4 pipeline
4. JavaScript bundles minify into chunks in `/out/assets/`
5. **Result**: `/out/` is a complete, valid static podcast site

**Key Output Files**:
- `/out/index-*.css` — Minified Tailwind styles
- `/out/assets/index-*.js` — Main app bundle (minified)
- `/out/assets/Resume-*.js` — Resume page bundle
- `/out/assets/Landing-*.js` — Home page bundle
- `/out/assets/Projects-*.js` — Projects page bundle

### Stage 2: Post-Build Personalization (`scripts/personalize-site.mjs`)

**Triggers**: Automatically runs via `postbuild` script in package.json after `npm run build`

**Purpose**: Transform minified JavaScript bundles with Tyler's professional data

**How It Works**:
1. Reads minified JS files from `/out/assets/`
2. Uses exact string matching to find podcast data in minified code
3. Replaces with Tyler's professional equivalents:
   - Profile data (name, education, experience, skills, contact)
   - Project portfolio (12 projects with descriptions)
   - Resume summary and action bar
   - Hero intro sentence
   - Contact blurb
   - Icons and asset references

**Critical Details**:

The script uses three replacement strategies:

1. **`replaceExact()`** — Exact string match (1 match required)
2. **`replaceAnyExact()`** — Try multiple candidate strings, accept first match
3. **`replaceRegex()`** — Regex pattern matching for flexible finds

**Example Replacement** (from line 93-94):
```javascript
const sharedProfile = `Fe={name:{first:"Tyler",last:"Preisser",...}}`;
// Replaces minified podcast host data with Tyler's resume data
```

**Files Modified**:
- `/out/assets/index-C7RyxxOM.js` — Main bundle: profile, shared assets
- `/out/assets/Resume-DHYgRoIo.js` — Resume page: action bar, summary, achievements
- `/out/assets/Details-DJPNy4rZ.js` — Profile details: education, experience, achievements
- `/out/assets/Landing-BZc5tpdU.js` — Home page: hero intro, contact blurb, image
- `/out/assets/Projects-BDxzUxTv.js` — Projects page: project feed

**Why This Is Fragile**:
- String replacements depend on exact minified output
- Next.js/GSAP updates may change variable names or formatting
- Script has zero error recovery (throws on mismatch)
- Requires manual hash updates if `/out/assets/*.js` filenames change

### Stage 3: Secondary Post-Build Scripts

After personalization:

1. **`export-resume-pdf.mjs`** — Generates `/out/Resume_Tyler_Preisser.pdf`
   - Unclear source (likely reads HTML or minified JS)
   - Should be investigated for robustness

2. **`cache-bust-static.mjs`** — Appends version query strings to asset references
   - Ensures fresh assets on Cloudflare CDN
   - Updates CSS/JS filenames in HTML

### Stage 4: Deployment

```bash
wrangler pages deploy out --project-name tylerpreisser
```

Deploys `/out/` static files to Cloudflare Pages. No Node.js server at runtime.

---

## 5. Route Architecture & Navigation

All three routes render **the same component** (`TylerSiteShell`), which mounts a **single-page app** to a `<div id="root"/>` target:

```
/ → src/app/page.tsx → TylerSiteShell → <div id="root">
/projects → src/app/projects/page.tsx → TylerSiteShell → <div id="root">
/resume → src/app/resume/page.tsx → TylerSiteShell → <div id="root">
```

**Why SPA, Not Multi-Page?**

Client-side routing in the minified JavaScript gives personalization script power to:
- Hide/show entire sections (podcast vs. portfolio)
- Swap navigation tabs
- Control which content displays without rebuilding Next.js

Each route is separately renderable for SEO (valid HTML), but actual navigation happens in JavaScript.

**Current Routes** (source):
- `/` — Home (hero, about, featured series, hosts, questions, newsletter)
- `/episodes` — Episode explorer
- `/questions` — Question explorer
- `/series/[slug]` — Series detail (5 phases)
- `/about` — About page
- `/contact` — Contact form
- `/subscribe` — Newsletter signup
- `/resources` — Resources

**Deployed Routes** (after personalization):
- `/` — Home (same hero layout, but Tyler's profile)
- `/projects` — Portfolio grid (12 projects)
- `/resume` — Resume/CV

Podcast routes are replaced with portfolio navigation in the personalization script.

---

## 6. Component Hierarchy & Layout

```
RootLayout (src/app/layout.tsx)
│
└── TylerSiteShell (src/components/tyler-site-shell.tsx)
    │
    └── [Client React App mounts to #root div]
        │
        └── AppProviders (theme, smooth scroll)
            │
            └── SiteChrome (layout container)
                ├── MaterialBackground
                ├── SparkCanvas (particle effects)
                ├── SiteHeader (fixed nav, theme toggle)
                ├── main
                │   ├── PageTransition (fade/slide wrapper)
                │   └── [Content sections]
                │       ├── HeroSection
                │       ├── ConceptSection
                │       ├── FeaturedSeriesSection
                │       └── ... [others]
                └── SiteFooter
```

---

## 7. Styling System & Design Tokens

### Framework

**Tailwind CSS v4**:
- PostCSS plugin: `@tailwindcss/postcss`
- No component-scoped CSS modules
- 95%+ styling via Tailwind utilities

**Global Styles** (`src/app/globals.css`):
```css
* { box-sizing: border-box; }
html { width: 100%; height: 100%; margin: 0; padding: 0; }
body { width: 100%; min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
```

### Colors

**Dark Mode** (default):
- Background: Black (`#000000` or Tailwind `black`)
- Text: White (`#FFFFFF`)
- Accents: Copper/gold palette

**Light Mode**:
- Toggled via `<html class="light">` (next-themes)
- CSS uses Tailwind `light:` prefix for overrides

**Spark Palette** (canvas particles):
```javascript
["#C4843E", "#D4A054", "#FFD700", "#FFF6DB"]
// Copper to gold gradient
```

### Fonts

Cached locally in `/public/fonts.gstatic.com/`:

- **Headers**: Righteous (`font-righteous` or `font-family: Righteous`)
- **Body**: System fonts (fallback)
- **Monospace**: Fira Code (`font-firacode`)
- **Decorative**: Lobster (`font-lobster`)

Fonts loaded via `<link>` in layout.tsx pointing to cached `/public/fonts.googleapis.com/css2.css`

### CSS Variables

Used for repeated design tokens (spacing, shadows, z-indices):
```css
--nav-safe-area-inset-bottom: [dynamic value from iOS safe areas]
--nav-safe-area-inset-left: [dynamic value from iOS safe areas]
```

---

## 8. Animation & Interaction Systems

### GSAP (Timeline-Driven)

**Registration** (`src/lib/gsap.ts`):
```typescript
let pluginsRegistered = false;
if (!pluginsRegistered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  pluginsRegistered = true;
}
```

**Guard Pattern**: Ensures plugins register only once (important for SSR edge cases)

**Usage**:
```typescript
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export function TextReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const split = new SplitText(ref.current, { type: "words,chars" });
    gsap.to(split.chars, {
      duration: 0.8,
      opacity: 1,
      stagger: 0.05,
    });
  }, { scope: ref });
}
```

**Plugins Used**:
- **SplitText**: Character/word/line splitting for reveal animations
- **ScrollTrigger**: Scroll-linked animations (installed but lightly used)

**Accessibility**: Always check `prefers-reduced-motion: reduce` before animating

### Framer Motion (Declarative)

Used for page transitions, subtle animations, and exit animations:
```typescript
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

**Respects `prefers-reduced-motion` automatically**

### Custom Canvas: SparkCanvas

Particle bursts on mouse movement (disabled on touch):

**Spark Behavior**:
- 10-16 particles per spawn
- Velocity: vx -3 to 3, vy -5 to -1
- Gravity: vy += 0.15 per frame
- Fade: opacity -= 0.025 per frame
- Lifetime: ~40 frames before removal

**Colors**: Gold/copper palette from `sparkPalette`

**Disabled When**:
- Touch device (`(pointer: coarse)`)
- `prefers-reduced-motion: reduce` enabled

### Custom Cursor

Pointer-tracking cursor with shape/size changes:

**States**:
- **Default**: 8px dot
- **Over interactive** (button, link, input): 40px circle, 18% fill
- **Over text**: 4x28px vertical bar, 28% fill

**Disabled When**:
- Touch device
- `prefers-reduced-motion: reduce` enabled

**Implementation**: `useEffect` with `requestAnimationFrame` for smooth tracking

---

## 9. Code Conventions & Patterns

### File Naming

**Components**: kebab-case
```
hero-section.tsx
custom-cursor.tsx
featured-series-section.tsx
```

**Exports**: PascalCase
```typescript
export function HeroSection() { }
export function CustomCursor() { }
```

**Utils/Types**: kebab-case files, PascalCase types
```typescript
// src/types/content.ts
export type Host = { ... }
export type Episode = { ... }
```

### Import Patterns

Always use path aliases:
```typescript
import { HeroSection } from "@/components/sections/home/hero-section";
import type { Episode } from "@/types/content";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";
```

**Never**:
```typescript
import { HeroSection } from "../../../components/sections/home/hero-section";
```

### Client vs Server Components

Mark client components with `"use client"` at the top:
```typescript
"use client";

import { useEffect } from "react";

export function MyComponent() { }
```

**Client-only**:
- All interactive components (cursor, canvas, animations)
- Anything using `useEffect`, `useState`, refs
- Event listeners

**Can be server**:
- Layouts, static page shells
- Data-fetching wrappers (though this project is static)

### Conditional Styling

Use `cn()` for conditional Tailwind classes:
```typescript
import { cn } from "@/lib/utils";

export function Button({ isActive }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        isActive && "bg-white text-black",
        !isActive && "bg-black text-white"
      )}
    >
      Click me
    </button>
  );
}
```

### Animation Checklist

Before adding animations:

1. [ ] Import GSAP from `@/lib/gsap`, not directly from `"gsap"`
2. [ ] Check `prefers-reduced-motion: reduce` if not using Framer Motion
3. [ ] Use `useGSAP` hook with `{ scope: ref }` for proper cleanup
4. [ ] Test on low-end devices
5. [ ] Verify animations complete cleanly on page unload

---

## 10. Data Architecture

### Source Data

**Location**: `/src/data/content.ts`

**Content Types** (from `/src/types/content.ts`):

```typescript
type Host = {
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  business: string;
  businessUrl: string;
  location: string;
  imageUrl: string | null;
  socials: SocialLink[];
};

type Episode = {
  id: string;
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  seriesId: string;
  phase: number;
  phaseTitle: string;
  description: string;
  questionsAddressed: string[];
  youtubeId: string | null;
  spotifyUrl: string | null;
  // ... 10 more fields
};

type Series = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  episodeCount: number;
  seasonNumber: number;
  phases: SeriesPhase[];
};

type Question = {
  id: string;
  questionText: string;
  episodeId: string;
  episodeSlug: string;
  episodeNumber: number;
  // ... 5 more fields
};
```

### Source Content (Podcast)

**Current Data**:
- **Hosts**: Tyler Preisser (CPO, R Squared AI), Lincoln Myers (Myers Media LLC)
- **Series**: "Foundations of the Faith" (12 episodes, 5 phases, Christian theology focus)
- **Episodes**: 12 episodes with titles, descriptions, resources, timestamps
- **Questions**: 100+ deep-linked questions indexed by episode

### Data Flow in Development

**Local Dev** (`npm run dev`):
- Imports from `/src/data/content.ts` directly
- Renders podcast UI with source data
- No personalization

**Production Build** (`npm run build`):
- Next.js builds with source data intact
- `personalize-site.mjs` replaces minified JS strings
- Final `/out/` contains Tyler's professional data
- Original source data is overwritten in minified bundle

### What Gets Replaced

1. **Profile Object** — Host/resume data
2. **Project Feed** — Portfolio projects array
3. **Intro Sentence** — Hero tagline
4. **Resume Summary** — Bio paragraph
5. **Contact Blurb** — Call-to-action
6. **Asset References** — Image URLs, icons
7. **Navigation** — Routes become portfolio-focused
8. **Achievements** — Education, experience, awards

---

## 11. Build & Deployment Process

### Installation

```bash
cd "/Users/tylerpreisser/Documents/New project"
npm install
```

**Dependencies**: ~300 packages (includes dev dependencies)

### Local Development

```bash
npm run dev
```

**Opens**: http://localhost:3000 with HMR (Hot Module Reload)

**Output**: Podcast site with source data (no personalization)

### Linting

```bash
npm run lint
```

**Tool**: ESLint (Next.js + TypeScript rules)

**Config**: `eslint.config.mjs`

### Production Build

```bash
npm run build
```

**Steps**:
1. `next build` — Compiles React, TypeScript, CSS to `/out/`
2. `postbuild` triggers:
   - `scripts/export-resume-pdf.mjs` — Generates PDF
   - `scripts/cache-bust-static.mjs` — Version assets
   - `scripts/personalize-site.mjs` — **Transforms minified JS**

**Output**: `/out/` (11 MB static export, ready to deploy)

**Time**: ~30 seconds build + 5-10 seconds personalization

### Local Preview

```bash
npm start
```

Serves `/out` locally to verify production build looks correct.

### Deployment

```bash
wrangler pages deploy out --project-name tylerpreisser
```

Or push to GitHub; Cloudflare auto-deploys from `/out` branch.

**Cloudflare Configuration** (`wrangler.toml`):
```toml
name = "tylerpreisser"
pages_build_output_dir = "out"
compatibility_date = "2026-03-24"
```

**Cache Headers** (`public/_headers`):
```
/*
  Cache-Control: public, max-age=31536000
  X-Content-Type-Options: nosniff
```

---

## 12. Critical Gotchas & Known Issues

### 1. Personalize Script Is Fragile

**Risk**: String replacements fail if minified output changes

**Mitigation**:
- Test build locally: `npm run build`, check `/out/assets/` files exist
- Inspect minified JS to verify string matches before deploying
- If Next.js/GSAP updates change output, script will throw

**Better Approach** (TODO):
- Extract profile/project data to `/public/data.json`
- Load at runtime with `fetch('/data.json')`
- Remove post-build script entirely

### 2. Source vs Deployed Mismatch

**Confusion Point**: Source includes podcast content (hosts, episodes); deployed site shows portfolio

**Why**: Intentional for code reuse. Personalization replaces podcast data.

**Resolution**: Always test `npm run build && npm start` to verify deployed output

### 3. GSAP Plugin Registration Must Be Exact

**Issue**: If plugins register multiple times (SSR edge cases), animations may break

**Prevention**: Use `@/lib/gsap.ts` for all GSAP imports, never import directly from `"gsap"`

### 4. Font Caching

**Issue**: Google Fonts cached in `/public/fonts.gstatic.com/` won't auto-update

**If Adding New Font**:
1. Download from Google Fonts
2. Cache locally in `/public/fonts.gstatic.com/`
3. Update CSS link in layout.tsx

### 5. Static Export Mode

**Limitations**:
- No API routes (`/api/*` don't work)
- No dynamic `[id].tsx` routes without `generateStaticParams`
- No Node.js server at runtime
- Forms must wire to external services (Netlify, Formspree, etc.)

**Current Status**: All routes pre-renderable; no dynamic routes

### 6. Lenis Not Integrated

**Status**: Installed (1.3.20) but not hooked up

**Placeholder**: `src/components/providers/smooth-scroll-provider.tsx` exists but unused

**If Enabling**:
1. Wire Lenis instance in provider
2. Sync with GSAP ScrollTrigger: `ScrollTrigger.refresh()`
3. Test on low-end devices (can impact performance)

### 7. Reduced Motion Handling

**Requirement**: All animations must respect `prefers-reduced-motion: reduce`

**Check**:
```typescript
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Skip animation
}
```

**Components Already Correct**:
- CustomCursor ✓
- SparkCanvas ✓
- Text reveals (check GSAP timelines)

### 8. Dark Mode is Default

**Note**: System preference NOT auto-detected; dark is hardcoded default

**If Changing**:
Edit theme provider or CLAUDE.md to clarify expected behavior

### 9. Resume PDF Generation

**Issue**: Unclear what `export-resume-pdf.mjs` reads from

**Action**: Check script to understand source (HTML? JSON? Minified JS?)

**Risk**: If source changes format, PDF generation may break

### 10. No CI/CD Workflows

**Status**: `.github/workflows/` is empty

**Opportunity**: Add GitHub Actions for:
- Lint check on PR
- Build verification
- Auto-deploy to Cloudflare on merge to main

---

## 13. Current State Assessment

### What's Complete & Production-Ready

- ✅ Core infrastructure (components, layout, theming, animations)
- ✅ Build process (Next.js build works cleanly)
- ✅ Static export (pages pre-render to valid HTML)
- ✅ Post-build personalization (script transforms bundle correctly)
- ✅ Type safety (TypeScript strict mode, all content typed)
- ✅ Linting (ESLint passes)
- ✅ Responsive layout (mobile layout exists and functions)
- ✅ Cloudflare deployment (wrangler config correct, `/out` deploys cleanly)

### What Needs Work

1. **Personalize Script Robustness** (MEDIUM PRIORITY)
   - Currently 3,500+ lines of string replacements
   - Fragile to Next.js/GSAP updates
   - **Solution**: JSON data file + runtime fetch approach
   - **Effort**: 8-12 hours

2. **Resume PDF Source Clarification** (LOW PRIORITY)
   - Unclear what `export-resume-pdf.mjs` reads from
   - May break if source format changes
   - **Action**: Review script, document source

3. **Lenis Integration** (LOW PRIORITY)
   - Installed but unused
   - Could improve scroll experience
   - **Effort**: 2-4 hours if desired

4. **Mobile Testing** (MEDIUM PRIORITY)
   - Layout exists but not extensively tested on real devices
   - Custom cursor, spark canvas on iOS
   - Touch interactions

5. **CI/CD Workflows** (LOW PRIORITY)
   - No GitHub Actions configured
   - Would be valuable for automated builds/deploys
   - **Effort**: 4-6 hours

### Known TODOs in Source

None explicitly marked with TODO/FIXME comments (checked via grep).

### Performance Notes

- Build artifacts: `.next/` = 1.1 GB (cache), `/out/` = 11 MB (deployed)
- Build time: ~30 sec (Next.js) + ~5-10 sec (post-build scripts)
- LCP target: <2.5s (typical for Cloudflare static export)
- No lazy loading or code splitting currently (acceptable for static site)

---

## 14. Development Workflow & Common Tasks

### Adding a New Component

```bash
# 1. Create file
touch src/components/ui/my-new-component.tsx

# 2. Write component with "use client" if interactive
"use client";
import { useRef } from "react";
export function MyNewComponent() { }

# 3. Export from parent barrel or import directly
import { MyNewComponent } from "@/components/ui/my-new-component";

# 4. Test locally
npm run dev

# 5. Lint
npm run lint
```

### Updating Professional Data

**DO NOT** edit React components or `/src/data/content.ts` expecting changes in production.

**ALWAYS** edit `scripts/personalize-site.mjs`:

```javascript
// Example: Update resume summary
const resumeSummary = `"Updated summary text..."`;
```

Then rebuild:
```bash
npm run build  # Includes post-build personalization
npm start      # Verify in /out/
```

### Adding Images/Assets

```bash
# 1. Add to /public/assets/
cp my-image.webp public/assets/

# 2. Reference in components
<img src="/assets/my-image.webp" alt="Description" />

# 3. Rebuild for cache busting
npm run build
```

### Testing Animations

```bash
# 1. Create component with GSAP
import { useGSAP, gsap } from "@/lib/gsap";

# 2. Test locally with HMR
npm run dev

# 3. Check prefers-reduced-motion
# In DevTools, Rendering > Emulate CSS media feature preference
```

### Debugging the Personalize Script

If strings don't match during build:

```bash
# 1. Build and inspect minified output
npm run build
# (will error on mismatch)

# 2. Check what's in the minified JS
cat out/assets/index-*.js | grep "searchString"

# 3. Update script with correct string
# (may need to account for whitespace/formatting changes)

# 4. Rebuild
npm run build
```

---

## 15. Performance & Optimization Opportunities

### Current State

- Static export minimizes runtime overhead
- ~11 MB `/out/` directory (reasonable for 50+ assets)
- No gzip/compression configured in Cloudflare (should be automatic)
- Fonts cached locally (no external requests)

### Quick Wins (LOW EFFORT)

1. **Image Optimization**
   - Convert PNGs to WebP where possible
   - Use Next.js `<Image>` component (though static export complicates)
   - Current: Manual asset management

2. **CSS Purging**
   - Tailwind v4 handles this automatically
   - Check if unused classes are being purged

3. **Script Profiling**
   - Run Lighthouse audit on deployed site
   - Check for unused JavaScript

### Medium-Term (MEDIUM EFFORT)

1. **Code Splitting**
   - Separate page-specific bundles (though static export may limit gains)
   - Consider route-based splitting if JavaScript grows

2. **Lenis Integration**
   - Smooth scrolling can impact CLS (Cumulative Layout Shift)
   - Monitor performance before/after

3. **Image Lazy Loading**
   - Add `loading="lazy"` to below-fold images
   - Minimal effort, measurable impact

---

## 16. File Change Checklist for Common Edits

### Editing Tyler's Professional Data

- [ ] `scripts/personalize-site.mjs` (search strings, replacement data)
- [ ] `public/assets/` (add new images if needed)
- [ ] `npm run build && npm start` to verify

### Adding New Section/Component

- [ ] Create component file in `src/components/`
- [ ] Import parent component or route
- [ ] Add types to `src/types/content.ts` if needed
- [ ] Style with Tailwind + `cn()` utility
- [ ] Test `npm run dev` with HMR
- [ ] Lint: `npm run lint`
- [ ] If uses GSAP: import from `@/lib/gsap`
- [ ] Check `prefers-reduced-motion` for animations

### Updating Site Configuration

- [ ] `src/lib/site.ts` (navigation, socials, email) — ignored in production
- [ ] `wrangler.toml` (Cloudflare settings)
- [ ] `public/_headers` (cache, CSP headers)
- [ ] `tsconfig.json` (path aliases, TypeScript options)
- [ ] `next.config.ts` (static export settings)

### Modifying Build Process

- [ ] `scripts/personalize-site.mjs` (bundle transformation)
- [ ] `scripts/export-resume-pdf.mjs` (PDF generation)
- [ ] `package.json` (build scripts, postbuild hooks)
- [ ] Test: `npm run build` (must complete without errors)

---

## 17. Deployment Checklist

Before deploying to production:

- [ ] Local build passes: `npm run build`
- [ ] Build completes without errors
- [ ] `/out/` directory is created and not empty (11 MB expected)
- [ ] Inspect minified JS to verify personalization completed
- [ ] `npm start` serves correct portfolio content (not podcast)
- [ ] Test dark/light mode toggle
- [ ] Test custom cursor on desktop (should be hidden on touch/reduced-motion)
- [ ] Test spark canvas (disable on touch/reduced-motion)
- [ ] Verify resume PDF exists: `/out/Resume_Tyler_Preisser.pdf`
- [ ] Check Lighthouse score (target: >90 across all metrics)
- [ ] Deploy: `wrangler pages deploy out --project-name tylerpreisser`
- [ ] Verify site loads at https://tylerpreisser.com
- [ ] Test responsive layout on mobile device

---

## 18. Future Improvements & Refactoring Opportunities

### High Priority

1. **Replace Personalize Script with JSON Approach**
   - Extract profile/project data to `/public/data.json`
   - Load at runtime via `fetch()`
   - Eliminates fragility, reduces build time
   - **Effort**: 12-16 hours (but highly recommended)

2. **Clarify Resume PDF Source**
   - Document what `export-resume-pdf.mjs` reads
   - Ensure source is stable and maintainable
   - **Effort**: 2-4 hours

### Medium Priority

3. **Add CI/CD Workflows**
   - GitHub Actions for lint/build checks on PR
   - Auto-deploy on merge to main
   - **Effort**: 4-6 hours

4. **Integrate Lenis**
   - Hook up smooth scrolling provider
   - Sync with GSAP ScrollTrigger
   - Test performance impact
   - **Effort**: 4-6 hours

5. **Mobile Testing & Polish**
   - Test on real iOS/Android devices
   - Adjust spacing, touch targets
   - Verify reduced-motion behavior
   - **Effort**: 6-8 hours

### Low Priority

6. **Accessibility Audit**
   - WCAG AA compliance check
   - Color contrast, keyboard navigation
   - **Effort**: 4-6 hours

7. **Performance Audit**
   - Lighthouse optimization
   - Image format conversion
   - Code splitting analysis
   - **Effort**: 4-8 hours

---

## Summary

This project successfully demonstrates a novel approach to managing dual-purpose codebases: a single component library and styling system supports both podcast and portfolio use cases through aggressive post-build personalization. While effective, this approach introduces fragility (the personalize script) that should be addressed in the medium term.

The infrastructure is production-ready and currently serving tylerpreisser.com successfully. The main opportunity is replacing the brittle post-build script with a JSON data file approach, which would improve maintainability and robustness without sacrificing the current benefits of code reuse.

# Altus website

Astro rebuild of the Altus marketing site originally designed in Webflow
([altus-435367.webflow.io](https://altus-435367.webflow.io/)).

## Stack

- [Astro](https://astro.build/) (static output)
- [lottie-web](https://github.com/airbnb/lottie-web) for the product illustration animations
- No GSAP — the original site's scroll/text animations are intentionally omitted.
  Lightweight CSS/vanilla-JS equivalents cover the logo marquee, mega-nav dropdowns,
  hero tabs, FAQ accordion and footer clock.

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Project structure

```
public/
  fonts/    Riforma LL TT (self-hosted, from the Webflow project)
  images/   Logos, case-study imagery, favicons
  lottie/   Lottie JSON animations
src/
  components/   One component per page section
  layouts/      BaseLayout (head, nav, footer, global scripts)
  pages/        index.astro (homepage)
  scripts/      main.ts — vanilla JS behaviours
  styles/
    altus.webflow.css   Compiled stylesheet exported from the Webflow project
                        (asset URLs rewritten to local paths)
    custom.css          Page-embed styles + CSS replacements for GSAP behaviours
```

## Notes

- **Fonts:** Riforma LL TT is a commercial Lineto typeface. The files are self-hosted
  here as they were on the Webflow site — confirm the license covers this deployment.
  IBM Plex Mono is loaded from Google Fonts.
- **Design tokens** (colors, spacing, typography) live as CSS custom properties inside
  `altus.webflow.css`, identical to the Webflow project.
- Only the homepage is implemented so far. Internal links point at the URL structure of
  the original site (`/pricing`, `/demo`, `/about-us`, …) ready for those pages to be added.

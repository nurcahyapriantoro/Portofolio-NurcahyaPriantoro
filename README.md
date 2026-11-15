# Portfolio — Nurcahya Priantoro

Personal portfolio website for **Nurcahya Priantoro** (Computer Science Graduate, IPB University · Data Engineer · Fullstack Developer · Blockchain Engineer).

Live site: [https://nurcahyapriantoro.github.io/Portofolio-NurcahyaPriantoro/](https://nurcahyapriantoro.github.io/Portofolio-NurcahyaPriantoro/)

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation) + TypeScript (`strictest`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with light-first corporate theme & dark mode toggle
- **Content Layer:** Typed YAML collections validated with Zod (`src/content.config.ts`)
- **Assets & Icons:** Astro built-in `sharp` image pipeline (AVIF/WebP + responsive `srcset`), self-hosted Inter Variable font (`@fontsource-variable/inter`), and inline SVG icons (`astro-icon`)
- **Quality & CI/CD:** ESLint (`typescript-eslint` + `eslint-plugin-astro` + `jsx-a11y`), Prettier, and GitHub Actions deployment to GitHub Pages

## Project Structure

```text
├── .github/workflows/deploy.yml   # GitHub Actions → GitHub Pages
├── public/
│   ├── files/                     # Downloadable CV & Portfolio PDF
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/images/             # Optimized images (logos, experience, projects, awards)
│   ├── components/
│   │   ├── layout/                # Header, Footer, ThemeToggle
│   │   ├── sections/              # Hero, Highlights, About, Experience, Projects, Skills,
│   │   │                          # Education, Certifications, Awards, Organizations, PortfolioPdf, Contact
│   │   └── ui/                    # Reusable Section, Badge, LogoMark, Carousel
│   ├── content/                   # Structured YAML data (profile, experience, projects, ...)
│   ├── layouts/BaseLayout.astro   # SEO, Open Graph, JSON-LD Person schema, theme init
│   ├── lib/                       # Date formatting & base-path helpers
│   ├── pages/                     # index.astro & 404.astro
│   ├── scripts/                   # Lightweight progressive-enhancement modules (theme, nav, carousel, filter)
│   ├── styles/global.css          # Tailwind v4 design tokens & reduced-motion support
│   └── content.config.ts          # Zod schemas for all content collections
└── astro.config.mjs
```

## Updating Content

All portfolio data is separated from presentation in `src/content/*.yaml` and validated automatically during build:

- `src/content/profile.yaml` — Hero headline, summary, status badge, highlights, contact & social links
- `src/content/experience.yaml` — Work experience, metrics, and engineering cohorts
- `src/content/projects.yaml` — Featured and additional projects
- `src/content/skills.yaml` — Categorized technical skills
- `src/content/education.yaml` — University degree, GPA, and coursework
- `src/content/certifications.yaml` — Certifications & verification links
- `src/content/awards.yaml` — Honors & awards
- `src/content/organizations.yaml` — Campus & community leadership

## Local Development

```bash
npm ci
npm run dev       # Start local dev server
npm run check     # TypeScript + Zod content schema check
npm run lint      # ESLint + Astro + Accessibility checks
npm run format    # Format with Prettier
npm run build     # Build static production site to ./dist
npm run preview   # Preview production build locally
```

## Deployment (GitHub Pages)

Pushes to `main` automatically build and deploy `./dist` via `.github/workflows/deploy.yml`.
In repository settings, ensure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.

---

<div align="center">

[![Made by CocoTech](https://img.shields.io/badge/Made%20by-CocoTech%20Studio-7C3AED?style=flat-square&logo=vercel&logoColor=white)](https://cocotech.studio)

_Built with passion · [cocotech.studio](https://cocotech.studio)_

</div>

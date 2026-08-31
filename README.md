# Softech Agency

Marketing site for Softech, implemented pixel-for-pixel from the
[Figma design](https://www.figma.com/design/adpQcPsaCV06HNM68pFGXE/Softech?node-id=1-307).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens live in `src/app/globals.css`, no `tailwind.config.js`
- **shadcn/ui** (`radix-maia`, base colour `neutral`, CSS variables)
- **next/font** — Manrope (headings + body), DM Sans (buttons/pills), Montserrat (nav)

## Structure

```
src/
  app/               layout, page, global styles
  components/
    ui/              shadcn primitives (generated — not hand-edited)
    shared/          SectionShell, SectionIntro, PillButton, … reused everywhere
    layout/          Navbar, Footer
    modules/Home/    one folder per page section
  data/              all copy, as typed constants
  types/             shared interfaces
  lib/               fonts, cn()
public/images/       assets exported from Figma
```

Sections are composed in `src/app/page.tsx`; each one owns its folder under
`src/components/modules/Home/` and reads its copy from `src/data/home/`.

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

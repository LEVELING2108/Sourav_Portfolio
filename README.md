# Portfolio — "Build Log"

A single-page portfolio built with Next.js, TypeScript, Tailwind CSS, and
Framer Motion. Styled as a versioned project log, with a signature vertical
trace line (part PCB copper trace, part git graph) that draws itself as you
scroll through the projects section.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before you deploy

1. **Content** — everything editable lives in `app/data.ts`: your name, tagline,
   email, GitHub URL, resume path, education, stats, skills, and the project
   list. Update the placeholder `href="#"` links (live URLs, LinkedIn) there
   and in `app/components/Contact.tsx`.
2. **Resume** — drop a `resume.pdf` into `/public` so the "resume" nav link
   works, or update `resumeHref` in `app/data.ts` to point elsewhere.
3. **Projects** — add/remove entries in the `projects` array in `app/data.ts`.
   Each one becomes a node on the trace line automatically.
4. **Email** — replace the placeholder in `profile.email`.

## Deploy

Push to GitHub, then import the repo on [Vercel](https://vercel.com) — zero
config needed, it's a standard Next.js app.

## Notes

- Fonts (JetBrains Mono + Inter) load via `next/font/google` in
  `app/layout.tsx`. This needs outbound access to Google Fonts at build time,
  which works normally on your machine and on Vercel.
- Reduced-motion is respected globally (see `app/globals.css`).
- Color tokens and font stacks live in `app/globals.css` under `:root` if you
  want to adjust the palette.

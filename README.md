# OMINIS

The site for **omi**: every step, judged. A small model that watches a coding agent and flags the actions that don't belong. The model lives in `darko-ops/omi` (private).

Visual design: hero "2a" (light, off-white `#fafaf8`, Helvetica Neue + JetBrains Mono, olive `#5c6634` flock, red `#d6221c` only for a flagged action), carried through every section.

Next.js 16 (App Router), Tailwind CSS 4, fully static. Deployed on Vercel (project `ominis`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build; must pass before deploying
```

## Layout

```
src/app/page.tsx              the landing page (sections, copy)
src/app/research/page.tsx     research note: approach, output contract, taxonomy, evaluation protocol
src/app/layout.tsx            metadata, fonts
src/app/globals.css           colour tokens (design 2a)
src/components/Flock.tsx      hero canvas: 2a's flock with one outlier flagged; static frame under reduced motion
src/components/TraceDemo.tsx  illustrative per-step trace in the Model section (example values, labelled as such)
src/components/ContactCard.tsx  design-partner call to action (mailto)
```

## Copy rules

Omi is in development. The page states design goals as goals ("designed for under 200 ms") and makes no claim about results until they are published in the omi repo. Keep it that way when editing.

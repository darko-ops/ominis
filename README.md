# OMINIS

The site for OMINIS, runtime safety for coding agents. The judge it describes, Omi, lives in [darko-ops/omi](https://github.com/darko-ops/omi).

Next.js 16 (App Router), Tailwind CSS 4, fully static. Deployed on Vercel (project `ominis`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build; must pass before deploying
```

## Layout

```
src/app/page.tsx              the landing page (sections, copy)
src/app/layout.tsx            metadata, fonts
src/app/globals.css           colour tokens (dark only)
src/components/TraceDemo.tsx  the illustrative agent trace in the hero (example values, labelled as such)
src/components/Radar.tsx      decorative radar
src/components/ContactCard.tsx  design-partner call to action (mailto)
```

## Copy rules

Omi is in development. The page states design goals as goals ("designed for under 200 ms") and makes no claim about results until they are published in the omi repo. Keep it that way when editing.

# Portfolio v6

The sixth version of this portfolio, rewritten as a static site. Same design,
same content, 2.8 kB of JavaScript instead of 180 kB.

Why bundle so much useless stuff if i just want to have a functional and fast portfolio? Life can be so easy sometimes...

[Version 5](https://github.com/nuIIpointerexception/www.seekvisualartist.com) was a
Next.js and React app that needed a server or a static export. This version is
HTML and CSS with behavior written as custom elements.

Live at [shou.work](https://shou.work/).

---

## Showcase

<div>
    <img src='./.github/assets/1.png' alt="Home section: logo over the hero video with the fixed glass navigation bar.">
    <br>
    <img src='./.github/assets/2.png' alt="Work section: Featured Work heading above a project card.">
    <br>
    <img src='./.github/assets/3.png' alt="Contact section: oversized CONTACT heading over the contact video.">
</div>

---

## Measurements

| | v5 | v6 |
|---|---:|---:|
| Initial JavaScript | 181,997 bytes | **2,751 bytes** |
| Largest Contentful Paint | 232 ms | **48 ms** |
| Cumulative Layout Shift | 0.514 | **0.000** |
| Runtime dependencies | 17 | **0** |

Measured locally in headless Chromium at 390x844, median of nine runs per
version. These are numbers from my machine, not web vitals.

---

## Prerequisites

- [Bun](https://bun.sh/) 1.4.2 or newer
- [Node.js](https://nodejs.org/en/) 22.12.0 or newer

---

## Building

1. Clone the repository

    ```bash
    git clone https://github.com/nuIIpointerexception/shou.work.git
    ```

2. Install dependencies

    ```bash
    bun install
    ```

3. Run the development server

    ```bash
    bun run dev
    ```

Commands:

```bash
bun run build       # Build static files into dist/
bun run preview     # Preview the production build
bun run check       # Run Oxlint
bun run typecheck   # Check TypeScript
```

---

## Deployment 📦

`bun run build` writes a complete static site to `dist/`. The site currently
runs on [Cloudflare Pages](https://pages.cloudflare.com/):

- Build command: `bun run build`
- Build output directory: `dist`
- Build environment variable: `BUN_VERSION=1.4.2`
- Deploy command: `npx wrangler pages deploy dist --project-name www-shou-work`

The project name must match the Pages project exactly, which is `www-shou-work`.
A wrong name fails the API call with `Authentication error [code: 10000]` rather
than a clear 404. It is set in `wrangler.jsonc` and passed explicitly to the
deploy command so the two cannot drift apart.

Use the static or none framework preset. Pages Functions are not required. If
server-side behavior is added later, Pages Functions run on the Workers runtime
and can be added at that point.

The deploy command must be `wrangler pages deploy`. Plain `wrangler deploy`
targets Workers, and wrangler refuses it on a Pages project. Without the
`wrangler.jsonc` in the repository root, wrangler tries to bootstrap a Vite
plugin and fails on this static build.

---

## Tech used 🛠️

- [Vite](https://vite.dev/) - Bundler
- [Lightning CSS](https://lightningcss.dev/) - CSS transformer and minifier
- [TypeScript](https://www.typescriptlang.org/) - Typing
- Native [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) - Behavior
- [Bun](https://bun.sh/) - Task runner
- [Oxlint](https://oxc.rs/) - Linter
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting

---

## License 📄

[MIT](LICENSE) — use it, change it, ship it.

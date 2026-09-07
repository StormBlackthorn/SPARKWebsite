## Setup
<<<<<<< HEAD
Because firebase hosting is used, the root of the website is `public/` instead of `/`. Make sure your IDE's web preview is configured correctly to use the correct root so links won't break.

For example, in VSCode, put this in `.vscode/settings.json`:
```js
{
  "livePreview.serverRoot": "public" //Live preview plugin
  "liveServer.settings.root": "public" // Live Server plugin
}
```

## Style Guidelines
We are not very script, but just follow general good coding practices
=======
>>>>>>> refactor

The project is built with **SvelteKit** and **Svelte 5** in static generation mode (`@sveltejs/adapter-static`), generating production files into `build/` for Firebase Hosting.

<<<<<<< HEAD
### HTML
Each page must have a `<base href="/pages/">` tag in the `<head>` section. This is due to Firebase rewrite rules messing up relative links. 

### CSS
**CSS files should be written with a nested structure,** unless it is just a quick one-liner. This is to make it easier to read and understand the structure of the page.
=======
### Quick Start

```bash
npm install
npm run dev
```

Run type checks and validation:

```bash
npm run check
npm run build
```

## Architecture & Code Guidelines

### Svelte & TypeScript

- Components are located in `src/lib/components/` and use **Svelte 5 runes** (`$state`, `$derived`, `$props`, `$effect`).
- Pages and routes are organized using SvelteKit directory-based routing under `src/routes/`.
- Data sets (such as chapter directories, statistics, testimonials) are centralized under `src/lib/data/` and typed in `src/lib/types/`.

### Scoped CSS & Styling

- Prefer scoped `<style>` blocks in Svelte components.
- Shared design tokens and global resets live in `src/lib/styles/global.css`.
- **CSS rules should utilize nested structure** whenever applicable for clarity and readability:
>>>>>>> refactor

```css
.card {
  background: var(--color-surface);

  .title {
    font-size: 1.25rem;
  }
}
```

### Static Assets

- Static assets (images, icons) belong in `static/assets/`.
- Standalone sub-apps such as the Scratch 3.0 GUI (`Xcratch`) reside in `static/Xcratch/`.

## Merging

<<<<<<< HEAD
If a new page is added, please update the `rewrite` and `redirect` section in `firebase.json` accordingly. 

**Please update `.gigignore` for any additional unneeded files(such as editor/ai configuration files).**
=======
- Ensure `npm run check` and `npm run build` pass with zero errors.
- Include a screenshot or recording demonstrating visual changes in pull requests when updating frontend interfaces.
>>>>>>> refactor

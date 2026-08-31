---
name: spark-ui-components
description: >-
  Build and wire SPARK website UI components with public/src/UI.js.
  Use when creating or editing UI.register components, UI.loadComponents
  page bootstrapping, component CSS via UI.dependencies, render helpers,
  or migrating hardcoded HTML to dynamic components in this repo.
---

# SPARK UI Components

Vanilla JS component system in `public/src/UI.js`. No framework — components are registered templates + data, loaded per page.

## File layout

```
public/src/
├── UI.js
└── components/
    └── <feature>/
        ├── <item>.js        # UI.register(...) for one component
        ├── <feature>.js     # data array + render*() helpers
        └── <feature>.css    # styles loaded via UI.dependencies
```

Navbar/Footer use `customElements` — different pattern. Use `UI.js` for page content components (chapters, testimonials, etc.).

## Core API

| API | Purpose |
|-----|---------|
| `UI.register(name, html, defaults, onReady?)` | Define a component template |
| `UI.component(name, params)` | Create an instance |
| `UI.element(tag, attrs, jsProps?)` | Build a plain DOM node |
| `UI.add(parent, child, index?)` | Insert node(s); index can be number or child path array |
| `UI.dependencies([files])` | Load CSS relative to current component folder |
| `UI.loadComponents(paths, prefix)` | Load component scripts in order |

Templates use `@param(key)` placeholders in HTML attributes and text:

```js
UI.register("quote", `
<blockquote class="rating">
    <p>@param(quote)</p>
    <cite>— @param(author)</cite>
</blockquote>
`, {
    quote: "Default text",
    author: "Anonymous",
    current: false
}, (element, params) => {
    if (params.current) element.classList.add("current");
});
```

## Component file checklist

1. **Register file** (`quote.js`, `school.js`, …)
   - Call `UI.dependencies(["feature.css"])` at top if styles are colocated
   - `UI.register(...)` with template, default params, optional `onReady`

2. **Loader file** (`testimonials.js`, `chapters.js`, …)
   - Declare data as a `const` array (not JSON files unless asked)
   - Export `render*()` functions that **return** elements — do not `querySelector` mount targets inside loader files
   - Build containers with `UI.element(...)`, populate with `UI.add(container, UI.component(...))`

3. **CSS file** (optional)
   - Keep feature-specific styles next to the component
   - Load via `UI.dependencies`, not a `<link>` in HTML

## Page wiring

In the HTML page:

```html
<script src="src/index.js"></script>
<script src="src/UI.js"></script>
<!-- other page scripts that query rendered DOM -->

<script>
document.addEventListener("DOMContentLoaded", async () => {
    await UI.loadComponents([
        "testimonial/quote.js",
        "testimonial/testimonials.js"
    ], "src/components/");

    UI.add(document.querySelector(".ratings-container"), renderTestimonials(), 1);
});
</script>
```

Rules:
- Load `UI.js` before `UI.loadComponents`
- List register files **before** loader files
- `prefix` is `"src/components/"` for this project
- Mount returned elements in the page script with `UI.add`
- If other scripts filter/search rendered content, run them **after** mount (or re-query DOM at runtime)

## Conventions

- **Render functions return elements** — mounting stays in the page
- **Data lives in loader scripts** — one source of truth per feature
- **Derive UI from data** when possible (e.g. filter checkboxes from unique locations)
- **Reset global styles** in component CSS when needed (buttons have global padding/background)
- **Table rows (`<tr>`)** — `UI.rawHTML` uses `<template>` parsing; string templates for `<tr>` are supported

## Examples in this repo

| Feature | Register | Loader | Page |
|---------|----------|--------|------|
| Chapters | `chapter/school.js`, `chapter/location-filter.js` | `chapter/chapters.js` | `pages/about/chapters.html` |
| Testimonials | `testimonial/quote.js` | `testimonial/testimonials.js` | `pages/index.html` |

### Minimal loader pattern

```js
const ITEMS = [{ title: "A" }, { title: "B" }];

function renderItems() {
    const list = UI.element("ul", { class: "items" });
    ITEMS.forEach((item) => {
        UI.add(list, UI.component("item", item));
    });
    return list;
}
```

### Chapters-style derived filters

```js
function getChapterLocations() {
    const countries = [...new Set(CHAPTERS.map((c) => c.country))];
    const regions = [...new Set(CHAPTERS.map((c) => c.region))];
    return [...countries, ...regions].map((label) => ({
        label,
        value: label.toLowerCase().replace(/\s+/g, "-")
    }));
}

function renderLocationFilters() {
    return getChapterLocations().map((loc) => UI.component("location-filter", loc));
}
```

## Common pitfalls

1. **Script order** — `search.js` or similar must not cache DOM nodes before components mount; query at runtime or dispatch events after render
2. **Global button styles** — arrow/icon buttons need `padding: 0`, explicit size, and background overrides
3. **Empty mount targets** — remove hardcoded duplicates from HTML; leave a shell or insert by index
4. **onReady vs @param** — use `@param` for visible text/attributes; use `onReady` for conditional classes, nested components, or DOM logic

## When adding a new feature

1. Create `public/src/components/<feature>/`
2. Add register file(s) + loader + optional CSS
3. Strip hardcoded markup from the page; keep semantic shell only
4. Add `UI.js` + `UI.loadComponents` boot script to the page
5. Verify styles load and post-render scripts still work

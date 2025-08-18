---
title: About Unify
---

<template data-target="title">Unify – Static Site Generator</template>
<template data-target="description">Build sites with layouts, slots, and includes—no frameworks.</template>

<template data-target="hero">
  <h1 style="view-transition-name: unify-hero">Unify</h1>
  <p>Static sites that ship. No build step hell, no framework lock‑in.</p>
</template>

## What is Unify?

Unify is a lightweight static site generator designed for developers who value simplicity and performance. It uses modern DOM templating with layouts, slots, and includes to keep your HTML DRY and maintainable—without requiring heavy frameworks or complex build processes.

### Key Features

- **Zero Configuration**: Works out of the box with sensible defaults
- **Layout Discovery**: Automatically finds the right layout for each page
- **Component System**: Reusable includes with slot-based customization
- **Modern CSS Support**: Built for `@scope`, container queries, and view transitions
- **Developer Experience**: Live reload, incremental builds, and helpful error messages

### Philosophy

Static site generators became more complex than the sites they build. Unify fixes that by returning to web fundamentals while embracing modern browser capabilities.

**Core Principles:**
- Framework-free output (pure HTML/CSS/JS)
- Component-based development without runtime overhead
- Modern web standards over proprietary solutions
- Developer happiness through simplicity

### Technical Architecture

Unify processes your source files through a unified pipeline:

1. **Layout Discovery**: Finds the best layout for each page
2. **DOM Templating**: Processes `<include>`, `<slot>`, and `<template>` elements
3. **Markdown Processing**: Converts Markdown with frontmatter support
4. **Asset Tracking**: Copies only referenced assets
5. **Optimization**: Minification and pretty URLs for production

### Who Uses Unify?

- **Frontend developers** who remember when HTML was simple
- **Content creators** who want fast, maintainable sites
- **Teams** avoiding framework complexity and lock-in
- **Performance enthusiasts** who need sub-second load times

[Get Started →](/unify/getting-started/) | [View Documentation →](/unify/docs/)
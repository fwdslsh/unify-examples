# Building Modern Multi-Site Architecture with Unify: A Framework-Free Approach

> **Tutorial Goal**: Create a sophisticated multi-section website using Unify's layout discovery, DOM templating, and modern CSS/JS features—all without frameworks.

In this comprehensive tutorial, we'll build a professional website for the fwdslsh.dev ecosystem that showcases each tool (Unify, Giv, Inform, Catalog) with dedicated subsites. We'll leverage Unify's powerful layout system, modern web standards, and maintain clean, maintainable code that ships fast.

## What You'll Learn

- **Unify's Layout Discovery System**: Hierarchical layout resolution and intelligent overrides
- **DOM Templating**: Using `<include>`, `<slot>`, and `<template>` for component architecture
- **Modern CSS**: Scoped styles with `@scope` and smooth transitions with View Transition API
- **SEO-Friendly Architecture**: Hierarchical URLs and proper content organization
- **Zero-Framework Approach**: Pure HTML/CSS/JS that loads fast and works everywhere

## Prerequisites

- **Bun runtime** (recommended) or Node.js 18+
- Basic understanding of HTML, CSS, and Markdown
- Familiarity with command-line interfaces

## 1. Project Setup and Architecture

### Install Unify

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install Unify globally
bun add -g @fwdslsh/unify

# Verify installation
unify --version
```

### Project Structure Overview

We'll create a hierarchical site structure that demonstrates Unify's layout discovery system:

```
tutorial-site/
├── src/
│   ├── _includes/           # Global shared components
│   │   ├── _layout.html     # Global fallback layout
│   │   └── _cta.html        # Reusable CTA component
│   ├── index.md             # Homepage
│   ├── unify/               # Unify tool section
│   │   ├── _layout.html     # Section-specific layout
│   │   ├── index.md         # About Unify
│   │   ├── getting-started.md
│   │   └── docs.md
│   ├── giv/                 # Similar structure for each tool
│   ├── inform/
│   └── catalog/
└── dist/                    # Generated static site
```

### Initialize Your Project

```bash
mkdir tutorial-site && cd tutorial-site
mkdir -p src/_includes src/unify src/giv src/inform src/catalog
```

## 2. Understanding Unify's Layout Discovery

Unify's layout system automatically finds the most appropriate layout for each page through a hierarchical discovery process:

### Layout Discovery Order

1. **Explicit Override**: `data-layout` attribute (HTML) or `layout` frontmatter (Markdown)
2. **Nearest Directory Layout**: Look for `_layout.html` in the page's directory
3. **Parent Directory Layouts**: Climb up the directory tree
4. **Global Fallback**: `src/_includes/layout.html`
5. **No Layout**: Render page content as-is

### Layout Naming Conventions

- **Layout files** must start with `_` (underscore) to be excluded from build output
- **Recommended naming**: `_layout.html` for clarity and intent
- **Files in `_includes`**: No underscore prefix needed (entire directory is excluded)

## 3. Creating the Global Layout System

### Global Fallback Layout (`src/_includes/layout.html`)

This layout serves as the foundation for all pages that don't have a more specific layout:

```html
<!doctype html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- PicoCSS for instant beautiful styling -->
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1/dist/pico.min.css">

  <!-- View Transitions: Enable smooth page transitions -->
  <style>
    @view-transition { navigation: auto; }
  </style>

  <!-- Site-specific styles -->
  <style>
    /* Section-scoped theme colors using @scope */
    @scope (#unify)   { :scope h1, :scope h2 { color: steelblue; } :scope a { color: steelblue; } }
    @scope (#giv)     { :scope h1, :scope h2 { color: darkorange; } :scope a { color: darkorange; } }
    @scope (#inform)  { :scope h1, :scope h2 { color: seagreen; } :scope a { color: seagreen; } }
    @scope (#catalog) { :scope h1, :scope h2 { color: rebeccapurple; } :scope a { color: rebeccapurple; } }

    /* Homepage card grid */
    .tool-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); }
    .card { padding: 1rem; border-radius: 12px; background: var(--card-bg, #f6f6f6); }
    .card a { display: inline-block; margin-top: .5rem; }

    /* Active section indicator in navigation */
    nav a[data-section] { opacity: .75; }
    body[data-section="unify"]  nav a[data-section="unify"],
    body[data-section="giv"]    nav a[data-section="giv"],
    body[data-section="inform"] nav a[data-section="inform"],
    body[data-section="catalog"]nav a[data-section="catalog"],
    body[data-section="home"]   nav a[data-section="home"] {
      opacity: 1;
      text-decoration: underline;
    }
  </style>

  <!-- Dynamic page title using slot system -->
  <title><slot name="title">Fwdslsh Dev Tools</slot></title>
  <meta name="description" content="<slot name='description'>Tools that burn complexity, not brain cells.</slot>">
</head>
<body>
  <header class="container">
    <nav>
      <ul>
        <li><a href="/" data-section="home">Home</a></li>
        <li><a href="/unify/" data-section="unify">Unify</a></li>
        <li><a href="/giv/" data-section="giv">Giv</a></li>
        <li><a href="/inform/" data-section="inform">Inform</a></li>
        <li><a href="/catalog/" data-section="catalog">Catalog</a></li>
      </ul>
    </nav>
  </header>

  <main class="container">
    <!-- Default unnamed slot receives page body content -->
    <slot>Default content</slot>
  </main>

  <footer class="container">
    <hr />
    <p>&copy; 2025 Fwdslsh • Peaceful rebellion against complexity.</p>
  </footer>
</body>
</html>
```

### Key Features Explained

**Slot System**: Named slots (`title`, `description`, `section`) allow pages to dynamically inject content into specific parts of the layout. The unnamed `<slot>` receives the main page content.

**View Transitions**: The `@view-transition { navigation: auto; }` CSS enables smooth crossfade animations between pages in supporting browsers—a modern enhancement that requires zero JavaScript.

**Scoped CSS**: Using `@scope` to isolate styles per section ensures that each tool's pages can have distinct theming without style conflicts.

**PicoCSS Integration**: We use PicoCSS for instant professional styling with automatic dark mode support—no custom CSS classes required for basic elements.

## 4. Section-Specific Layouts

### Unify Section Layout (`src/unify/_layout.html`)

This layout inherits the same slot API but adds section-specific features:

```html
<!doctype html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1/dist/pico.min.css">
  <style>
    @view-transition { navigation: auto; }
    @scope (#unify) {
      :scope h1, :scope h2 { color: steelblue; }
      :scope a { color: steelblue; }
      :scope .hero { padding: 2rem 1.25rem; border-radius: 12px; background: #eef5ff; }
    }
  </style>
  <title><slot name="title">Unify – Static Site Generator</slot></title>
  <meta name="description" content="<slot name='description'>Build sites that ship—no frameworks.</slot>">
</head>
<body data-section="unify">
  <header class="container">
    <nav>
      <ul>
        <li><a href="/" data-section="home">Home</a></li>
        <li><a href="/unify/" data-section="unify">Unify</a></li>
        <li><a href="/giv/" data-section="giv">Giv</a></li>
        <li><a href="/inform/" data-section="inform">Inform</a></li>
        <li><a href="/catalog/" data-section="catalog">Catalog</a></li>
      </ul>
    </nav>
  </header>

  <main class="container" id="unify">
    <!-- Named slot for hero section with fallback content -->
    <section class="hero">
      <slot name="hero">
        <h1 style="view-transition-name: unify-hero">Unify</h1>
        <p>Static sites for people who remember HTML.</p>
      </slot>
    </section>

    <!-- Default slot for page content -->
    <slot></slot>
  </main>

  <footer class="container">
    <hr />
    <p>Part of the Fwdslsh toolchain.</p>
  </footer>
</body>
</html>
```

**Important**: Create similar layouts for `giv/_layout.html`, `inform/_layout.html`, and `catalog/_layout.html`, changing the section ID, colors, and default content appropriately.

## 5. Reusable Components with Includes

### Call-to-Action Component (`src/_includes/cta.html`)

Create reusable components that can be customized via slots:

```html
<section class="cta">
  <h2><slot name="heading">Get Started</slot></h2>
  <p><slot name="copy">Install with one command.</slot></p>
  <p><a href="/unify/getting-started/" role="button">Install Unify</a></p>
</section>
```

## 6. Creating Content Pages with DOM Templating

### Homepage (`src/index.md`)

The homepage demonstrates slot projection and component includes:

```markdown
---
title: Fwdslsh Developer Tools
---

<!-- Slot projections using template elements -->
<template slot="title">Fwdslsh Developer Tools</template>
<template slot="description">Small, focused tools that ship fast.</template>
<template slot="section">home</template>

# Welcome to Fwdslsh.dev

We build small, focused developer tools that **do one thing well**.

<div class="tool-grid">
  <article class="card" style="view-transition-name: unify-hero">
    <h3>Unify</h3>
    <p>Static sites for people who remember HTML.</p>
    <a href="/unify/">Get Started →</a>
  </article>
  <article class="card" style="view-transition-name: giv-hero">
    <h3>Giv</h3>
    <p>AI-assisted Git history and release notes.</p>
    <a href="/giv/">Learn More →</a>
  </article>
  <article class="card" style="view-transition-name: inform-hero">
    <h3>Inform</h3>
    <p>Convert websites to clean Markdown.</p>
    <a href="/inform/">Learn More →</a>
  </article>
  <article class="card" style="view-transition-name: catalog-hero">
    <h3>Catalog</h3>
    <p>Generate content catalogs for AI agents.</p>
    <a href="/catalog/">Learn More →</a>
  </article>
</div>

<!-- Include reusable CTA component with custom content -->
<include src="/_includes/cta.html">
  <template slot="heading">Ship Today</template>
  <template slot="copy">Use Unify to deploy in minutes.</template>
</include>
```

### Understanding Template Projection

**`<template slot="...">`**: Content is hidden in raw view and projected into matching slots during build
**`view-transition-name`**: Enables element morphing between pages for smooth animations
**`<include>`**: Pulls in reusable components with customizable slot content

### Tool Section Pages

Each tool section follows a consistent pattern. Here's the Unify About page (`src/unify/index.md`):

```markdown
---
title: About Unify
# Layout automatically discovered at src/unify/_layout.html
---

<template slot="title">Unify – Static Site Generator</template>
<template slot="description">Build sites with layouts, slots, and includes—no frameworks.</template>

<!-- Custom hero content replaces default -->
<template slot="hero">
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

[Get Started →](/unify/getting-started/) | [View Documentation →](/unify/docs/)
```

### Getting Started Page (`src/unify/getting-started.md`)

```markdown
---
title: Unify – Getting Started
---

<template slot="title">Unify – Getting Started</template>

## Installation

Install Unify globally using Bun (recommended) or npm:

```bash
# Using Bun (recommended)
bun add -g @fwdslsh/unify

# Using npm
npm install -g @fwdslsh/unify

# Verify installation
unify --version
```

## Quick Start

Create a new project structure:

```bash
mkdir my-site && cd my-site
mkdir -p src/_includes

# Create a basic layout
echo '<!doctype html><html><head><title><slot name="title">My Site</slot></title></head><body><slot></slot></body></html>' > src/_includes/layout.html

# Create a homepage
echo '# Hello World' > src/index.md
```

Build and serve:

```bash
# Build once
unify build

# Development server with live reload
unify serve

# Watch for changes
unify watch
```

## Project Structure

Unify follows simple conventions:

- **`src/`**: Source files (configurable with `--source`)
- **`_includes/`**: Shared components and layouts (non-emitting)
- **`_layout.html`**: Layout files (underscore prefix excludes from output)
- **`dist/`**: Generated static site (configurable with `--output`)

## Common Commands

```bash
# Pretty URLs (about.html → about/index.html)
unify build --pretty-urls

# Production build
unify build --minify --clean

# Custom directories
unify build --source site --output public

# Development with custom port
unify serve --port 8080
```

Ready to dive deeper? Check out the [full documentation →](/unify/docs/)
```

## 7. Modern CSS Features

### Scoped Styles with @scope

The `@scope` rule provides native CSS encapsulation:

```css
/* Styles only apply within #unify elements */
@scope (#unify) {
  :scope h1, :scope h2 { color: steelblue; }
  :scope .hero { background: #eef5ff; }
}

/* Component-level scoping */
@scope (.tool-grid) {
  :scope .card { 
    border-radius: 12px; 
    padding: 1rem; 
  }
}
```

### View Transitions for Smooth Navigation

Enable page transitions with a single CSS rule:

```css
@view-transition { navigation: auto; }
```

For element morphing between pages, use matching `view-transition-name` values:

```html
<!-- Homepage card -->
<div style="view-transition-name: unify-hero">...</div>

<!-- Unify page hero -->
<h1 style="view-transition-name: unify-hero">...</h1>
```

## 8. Layout Overrides and Debugging

### Explicit Layout Overrides

**HTML Pages**: Use `data-layout` on the root element
```html
<body>
  <template slot="title">Special Page</template>
  <h1>This uses the global layout instead of section layout</h1>
</body>
```

**Markdown Pages**: Use frontmatter
```markdown
---
layout: "/_includes/_layout.html"
---
<template slot="title">Override Example</template>

# This page uses the global layout
```

### Debugging Tips

**Layout Resolution**: Open layout files directly in browser to see fallback content from `<slot>` elements

**Template Behavior**: In raw page view, `<template slot="...">` content is hidden (inert), while regular slotted content is visible

**Build Output**: Generated HTML flattens the slot/template structure—templates are removed and content appears in slot positions

## 9. Development Workflow

### Local Development

```bash
# Start development server with live reload
unify serve --pretty-urls

# Open browser to http://localhost:3000
# Edit files and see changes instantly
```

### Production Build

```bash
# Clean, optimized build
unify build --pretty-urls --minify --clean --base-url https://yoursite.com

# Upload dist/ folder to any static host
```

### Testing Your Site

**Validate Structure**: Check that navigation works and pages have correct titles
**Performance**: Verify fast loading (no framework overhead)
**Progressive Enhancement**: Test view transitions in supporting browsers
**Accessibility**: Ensure semantic HTML and proper navigation landmarks

## 10. Advanced Patterns

### Dynamic Navigation State

Use body attributes and CSS selectors for active states:

```css
body[data-section="unify"] nav a[data-section="unify"] {
  opacity: 1;
  text-decoration: underline;
}
```

### Responsive Components

Combine CSS container queries with scoped styles:

```css
@scope (.tool-grid) {
  :scope .card {
    container-type: inline-size;
  }
  
  :scope .card h3 {
    font-size: 1.2rem;
  }
  
  @container (min-width: 300px) {
    :scope .card h3 {
      font-size: 1.5rem;
    }
  }
}
```

### Component Libraries

Create a library of reusable components in `_includes/`:

```
src/_includes/
├── layout.html        # Global layout
├── cta.html          # Call-to-action
├── feature-card.html # Feature showcase
├── code-block.html   # Syntax highlighted code
└── newsletter.html   # Email signup
```

## 11. SEO and Performance Optimization

### URL Structure

Use `--pretty-urls` for clean, hierarchical URLs:
- `/unify/` instead of `/unify.html`
- `/unify/getting-started/` instead of `/unify/getting-started.html`

### Meta Tags and Sitemap

```bash
# Generate sitemap.xml automatically
unify build --base-url https://yoursite.com

# Custom meta descriptions per page
<template slot="description">Page-specific description</template>
```

### Performance Benefits

- **Zero Runtime Dependencies**: No JavaScript frameworks
- **Optimized CSS**: Only PicoCSS baseline + minimal custom styles
- **Fast Builds**: Unify processes only what changed
- **CDN-Friendly**: Static files work with any hosting solution

## 12. Complete Example Structure

After following this tutorial, your project structure should look like:

```
tutorial-site/
├── src/
│   ├── _includes/
│   │   ├── layout.html     # Global fallback layout
│   │   └── cta.html        # Reusable CTA component
│   ├── index.md             # Homepage with tool cards
│   ├── unify/
│   │   ├── _layout.html     # Unify section layout
│   │   ├── index.md         # About Unify
│   │   ├── getting-started.md
│   │   └── docs.md
│   ├── giv/                 # Similar structure
│   ├── inform/              # Similar structure
│   └── catalog/             # Similar structure
└── dist/                    # Generated static site
```

## What You've Achieved

**Modern Architecture**: Component-based design without framework complexity
**SEO Excellence**: Hierarchical structure with clean URLs and meta optimization
**Performance**: Fast loading with zero runtime dependencies
**Maintainability**: DRY layouts and reusable components
**Future-Proof**: Modern CSS features with graceful fallbacks
**Developer Experience**: Live reload, helpful errors, and intuitive conventions

## Next Steps

- **Deployment**: Upload `dist/` to GitHub Pages, Netlify, or any static host
- **Custom Components**: Create more reusable includes for your use case
- **Styling**: Explore more @scope patterns and view transition effects
- **Content**: Add more pages and sections as your site grows
- **Integration**: Connect with other fwdslsh tools (giv for changelogs, inform for documentation)

## Resources

- **Unify Documentation**: Complete reference for all features
- **PicoCSS**: Minimal CSS framework for quick styling
- **View Transitions**: MDN documentation on the View Transition API
- **CSS @scope**: Browser support and advanced patterns
- **Fwdslsh Ecosystem**: Explore other tools that work with Unify

---

*This tutorial demonstrates how modern web standards can replace complex frameworks while delivering superior performance and developer experience. The techniques shown scale from simple sites to large, sophisticated web applications.*
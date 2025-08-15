---
title: Unify – Documentation
---

<template slot="title">Unify – Documentation</template>
<template slot="description">Complete reference for Unify's features and capabilities.</template>

## Documentation Overview

This comprehensive guide covers all aspects of Unify, from basic concepts to advanced patterns.

## Core Concepts

### Layout Discovery System

Unify uses a hierarchical system to find the best layout for each page:

```
1. Explicit Override (Highest Priority)
   ├── HTML: data-layout="path/to/layout.html"
   └── Markdown: layout: "path/to/layout.html" (frontmatter)

2. Automatic Discovery
   ├── Same directory: _layout.html
   ├── Parent directories: ../_layout.html
   └── Global fallback: _includes/_layout.html

3. No Layout (Lowest Priority)
   └── Render page content as-is
```

**Layout Resolution Examples:**

```
src/
├── _includes/
│   └── _layout.html        # Global fallback
├── _layout.html            # Root layout
├── blog/
│   ├── _layout.html        # Blog section layout
│   ├── post1.md            # Uses blog/_layout.html
│   └── archive/
│       ├── _layout.html    # Archive-specific layout
│       └── 2024.md         # Uses blog/archive/_layout.html
└── about.md                # Uses src/_layout.html
```

### DOM Templating System

Unify's templating uses standard web platform elements:

**Slots** (`<slot>`): Define insertion points in layouts
```html
<!-- Layout -->
<title><slot name="title">Default Title</slot></title>
<main><slot></slot></main>
```

**Templates** (`<template slot="name">`): Provide content for named slots
```html
<!-- Page -->
<template slot="title">Custom Page Title</template>
<h1>Page content goes in default slot</h1>
```

**Includes** (`<include>`): Pull in reusable components
```html
<include src="/_includes/_header.html">
  <template slot="title">Page-specific title</template>
</include>
```

### File Processing Rules

**Underscore Exclusion:**
- Files/directories starting with `_` are excluded from build output
- `_layout.html`, `_component.html` → layouts and components
- `_includes/`, `_components/` → shared directories

**Asset Handling:**
- `src/assets/` → automatically copied to `dist/assets/`
- Referenced assets → smart copying based on usage
- `--copy` flag → additional files with glob patterns

## CLI Reference

### Commands

**`unify build`** (default): Build static site
```bash
unify build [options]
unify [options]              # Same as build
```

**`unify serve`**: Development server with live reload
```bash
unify serve [options]
```

**`unify watch`**: Watch and rebuild without serving
```bash
unify watch [options]
```

### Options

**Directory Options:**
```bash
--source, -s <dir>          # Source directory (default: src)
--output, -o <dir>          # Output directory (default: dist)
--copy <pattern>            # Copy additional files (glob pattern)
```

**Build Options:**
```bash
--pretty-urls               # Generate clean URLs (about.html → about/index.html)
--base-url <url>            # Base URL for sitemap.xml
--clean                     # Clean output directory before build
--fail-on <level>           # Fail on warnings/errors (warning|error)
--no-sitemap                # Disable sitemap.xml generation
--minify                    # Minify HTML output
```

**Server Options:**
```bash
--port, -p <number>         # Server port (default: 3000)
--host <hostname>           # Server host (default: localhost)
```

**Global Options:**
```bash
--help, -h                  # Show help
--version, -v               # Show version
--verbose                   # Enable debug logging
```

## Advanced Features

### Component System

Create reusable components with slots:

**Button Component** (`_includes/_button.html`):
```html
<a href="<slot name='href'>#</slot>" 
   class="<slot name='class'>button</slot>"
   <slot name='attr'></slot>>
  <slot name="text">Button</slot>
</a>
```

**Usage:**
```html
<include src="/_includes/_button.html">
  <template slot="href">/signup/</template>
  <template slot="text">Join Now</template>
  <template slot="class">button contrast</template>
  <template slot="attr">data-umami="signup-click"</template>
</include>
```

### Modern CSS Integration

**Scoped Styles:**
```css
@scope (#blog) {
  :scope h1 { color: navy; }
  :scope .post { border-left: 3px solid navy; }
}
```

**View Transitions:**
```css
@view-transition { navigation: auto; }

/* Element morphing between pages */
.hero { view-transition-name: hero; }
```

**Container Queries:**
```css
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card h3 { font-size: 1.5rem; }
}
```

### Layout Overrides

**HTML Pages:**
```html
<html data-layout="/_includes/_special.html">
  <template slot="title">Special Page</template>
  <h1>Content</h1>
</html>
```

**Markdown Pages:**
```markdown
---
title: Blog Post
layout: "/blog/_post-layout.html"
---

<template slot="title">{{ title }}</template>

# Blog Content
```

### Frontmatter Support

**Standard Fields:**
```yaml
---
title: Page Title
description: Page description
date: 2025-01-15
author: Your Name
tags: [web, unify, static]
layout: /custom/layout.html
---
```

**Custom Fields:**
```yaml
---
hero_image: /assets/hero.jpg
featured: true
category: tutorial
---
```

## Best Practices

### Project Organization

```
src/
├── _includes/           # Site-wide components
│   ├── _layout.html     # Global layout
│   ├── _head.html       # Common head elements
│   ├── _nav.html        # Navigation component
│   └── _footer.html     # Footer component
├── _components/         # Reusable components
│   ├── _card.html       # Content cards
│   ├── _button.html     # Buttons with variants
│   └── _form.html       # Form components
├── assets/              # Static assets
│   ├── images/
│   ├── styles/
│   └── scripts/
├── blog/                # Blog section
│   ├── _layout.html     # Blog-specific layout
│   └── posts/           # Blog posts
├── docs/                # Documentation section
│   ├── _layout.html     # Docs-specific layout
│   └── guides/          # Documentation guides
└── index.md             # Homepage
```

### Performance Optimization

**Asset Strategy:**
```bash
# Only copy referenced assets
unify build

# Add specific files if needed
unify build --copy "public/**/*" --copy "manifest.json"
```

**Production Build:**
```bash
unify build \
  --pretty-urls \
  --minify \
  --clean \
  --base-url https://yoursite.com
```

### SEO Optimization

**Meta Tags:**
```html
<!-- Layout head section -->
<title><slot name="title">Site Name</slot></title>
<meta name="description" content="<slot name='description'>Default description</slot>">
<meta property="og:title" content="<slot name='og-title'><slot name='title'>Site Name</slot></slot>">
<meta property="og:description" content="<slot name='og-description'><slot name='description'>Default description</slot></slot>">
```

**Page Usage:**
```markdown
<template slot="title">Specific Page Title</template>
<template slot="description">Specific page description for SEO</template>
<template slot="og-title">Social Media Title</template>
```

### Component Design Patterns

**Flexible Components:**
```html
<!-- _includes/_card.html -->
<article class="card <slot name='class'></slot>">
  <header>
    <h3><slot name="title">Card Title</slot></h3>
  </header>
  <div class="content">
    <slot></slot>
  </div>
  <footer>
    <slot name="footer">
      <a href="<slot name='link'>#</slot>">Learn More</a>
    </slot>
  </footer>
</article>
```

**Conditional Content:**
```html
<!-- _includes/_banner.html -->
<div class="banner <slot name='type'>info</slot>">
  <slot name="icon">ℹ️</slot>
  <div class="content">
    <slot></slot>
  </div>
  <slot name="action"></slot>
</div>
```

## Troubleshooting

### Common Issues

**Layout Not Found:**
- Check file naming (`_layout.html` with underscore)
- Verify file path in override attributes
- Ensure layout is in the correct directory

**Slots Not Working:**
- Verify slot names match exactly
- Check for typos in template slot attributes
- Ensure templates are inside included components

**Assets Not Copying:**
- Referenced assets are copied automatically
- Use `--copy` for additional files
- Check that asset paths are correct in HTML/CSS

**Build Errors:**
- Enable verbose logging with `--verbose`
- Check for circular includes
- Verify all referenced files exist

### Debugging Tips

**View Raw Templates:**
- Open layout files directly in browser to see slot fallbacks
- Open page files to see which content is in templates (hidden) vs visible

**Build Analysis:**
```bash
# Verbose output shows processing details
unify build --verbose

# Clean build to see all processing
unify build --clean --verbose
```

**Development Workflow:**
```bash
# Live reload for instant feedback
unify serve --verbose

# Watch-only for build debugging
unify watch --verbose
```

## Migration Guides

### From Other Static Site Generators

**From Jekyll:**
- Replace `{% include %}` with `<include src="">`
- Convert `{{ site.title }}` to slot-based templates
- Move `_layouts/` to use Unify's layout discovery

**From Hugo:**
- Replace partials with includes and slots
- Convert shortcodes to reusable components
- Adapt frontmatter (mostly compatible)

**From 11ty:**
- Replace Nunjucks templates with HTML + slots
- Convert filters to pure CSS/JS where possible
- Adapt directory structure to Unify conventions

## API Reference

### Include Resolution

**Absolute paths** (start with `/`): Resolved from `src/` root
```html
<include src="/_includes/_header.html">
```

**Relative paths**: Resolved relative to current file
```html
<include src="_sidebar.html">
<include src="../_shared/_button.html">
```

### Slot Composition

**Named slots**: Content assigned by name
```html
<slot name="title">Default title</slot>
<template slot="title">Custom title</template>
```

**Default slot**: Receives content without slot attribute
```html
<slot>Default content</slot>
<h1>This goes to default slot</h1>
```

**Multiple assignments**: Multiple elements can target same slot
```html
<template slot="scripts">
  <script src="analytics.js"></script>
</template>
<template slot="scripts">
  <script src="app.js"></script>
</template>
```

### Build Processing

**File Types:**
- `.html` → Processed for includes, slots, and DOM templating
- `.md` → Markdown to HTML, then processed for includes/slots
- Assets → Copied based on references or explicit patterns

**Processing Order:**
1. Layout discovery and assignment
2. Markdown processing (if applicable)
3. Include resolution and slot composition
4. Asset reference tracking
5. Output generation and asset copying

Ready to build something amazing? Start with our [Getting Started guide →](/unify/getting-started/)
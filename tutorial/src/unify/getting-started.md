---
title: Unify – Getting Started
---

<template data-target="title">Unify – Getting Started</template>
<template data-target="description">Quick start guide for building your first Unify site.</template>

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
cat > src/_includes/_layout.html << 'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><slot name="title">My Site</slot></title>
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about/">About</a>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
</body>
</html>
EOF

# Create a homepage
cat > src/index.md << 'EOF'
---
title: Welcome
---

<template data-target="title">Welcome to My Site</template>

# Hello World

This is my first Unify site!
EOF
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

```
my-site/
├── src/                 # Source files (configurable with --source)
│   ├── _includes/       # Shared components and layouts (non-emitting)
│   │   └── _layout.html # Global fallback layout
│   ├── index.md         # Homepage
│   ├── about.md         # About page
│   └── blog/
│       ├── _layout.html # Blog-specific layout
│       └── post.md      # Blog post
└── dist/                # Generated static site (configurable with --output)
```

### File Naming Conventions

- **Underscore prefix** (`_`): Excludes files/folders from build output
- **Layout files**: Named `_layout.html` for automatic discovery
- **Includes directory**: `_includes/` for site-wide shared components

## Essential Commands

### Build Commands

```bash
# Basic build
unify build

# Pretty URLs (about.html → about/index.html)
unify build --pretty-urls

# Production build with optimizations
unify build --minify --clean --pretty-urls

# Custom source and output directories
unify build --source site --output public

# Include sitemap generation
unify build --base-url https://mysite.com
```

### Development Commands

```bash
# Start development server
unify serve

# Custom port
unify serve --port 8080

# External access
unify serve --host 0.0.0.0

# Watch files without serving
unify watch
```

### Advanced Options

```bash
# Copy additional files (beyond automatic asset detection)
unify build --copy "docs/**/*" --copy "config/*.json"

# Fail build on warnings
unify build --fail-on warning

# Disable sitemap generation
unify build --no-sitemap

# Enable verbose logging
unify build --verbose
```

## Your First Layout

Create `src/_includes/_layout.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><slot name="title">My Site</slot></title>
  <meta name="description" content="<slot name='description'>My awesome site</slot>">
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1/dist/pico.min.css">
</head>
<body>
  <header class="container">
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="container">
    <slot></slot>
  </main>
  
  <footer class="container">
    <hr>
    <p>&copy; 2025 My Site</p>
  </footer>
</body>
</html>
```

## Your First Page

Create `src/about.md`:

```markdown
---
title: About Us
---

<template data-target="title">About Us – My Site</template>
<template data-target="description">Learn more about our mission and team.</template>

# About Us

We're building amazing things with Unify!

## Our Mission

To create fast, maintainable websites without framework complexity.
```

## Adding Components

Create reusable components in `_includes/`:

**Button Component** (`src/_includes/_button.html`):
```html
<a href="<slot name='href'>#</slot>" 
   class="<slot name='class'>button</slot>" 
   role="button">
  <slot name="text">Click me</slot>
</a>
```

**Use in pages**:
```html
<div data-import="/_includes/_button.html">
  <template data-target="href">/contact/</template>
  <template data-target="text">Get in Touch</template>
  <template data-target="class">button contrast</template>
</include>
```

## Layout Discovery

Unify automatically finds layouts using this priority:

1. **Explicit override**: `data-layout` (HTML) or `layout:` (Markdown frontmatter)
2. **Directory layout**: `_layout.html` in same directory as page
3. **Parent layouts**: Climb directory tree looking for `_layout.html`
4. **Global fallback**: `src/_includes/_layout.html`

Example directory with local layout:

```
src/
├── _includes/
│   └── _layout.html     # Global fallback
├── blog/
│   ├── _layout.html     # Blog-specific layout
│   ├── post1.md         # Uses blog/_layout.html
│   └── post2.md         # Uses blog/_layout.html
└── about.md             # Uses _includes/_layout.html
```

## Next Steps

- **Styling**: Add custom CSS or use a framework like PicoCSS
- **Components**: Create reusable includes for headers, footers, cards
- **Advanced Features**: Explore slots, view transitions, and scoped CSS
- **Deployment**: Upload your `dist/` folder to any static host

Ready for advanced concepts? Check out the [full documentation →](/unify/docs/)
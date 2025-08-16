# Markdown Example

This example demonstrates unify's markdown processing capabilities with layouts, frontmatter, and components.

## Features Demonstrated

- ✅ **Markdown to HTML conversion** - `.md` files become HTML pages
- ✅ **Frontmatter processing** - YAML metadata in markdown files  
- ✅ **Layout system** - Templates in `.layouts/` directory
- ✅ **Token replacement** - `{{ variable }}` substitution
- ✅ **Pretty URLs** - `index.md` becomes `index.html`
- ✅ **Components** - Reusable HTML snippets in `_includes/`

## Project Structure

```
markdown/
├── src/
│   ├── _includes/
│   │   ├── layout.html         # Page layout template
│   │   └── footer.html         # Footer component
│   ├── index.md                # Homepage (markdown)
│   └── with-includes.md        # Page with component includes
└── dist/                       # Generated static site (empty until built)
```

## How to Build

### Using unify CLI

```bash
# Build with pretty URLs (recommended)
unify build -s markdown/src -o markdown/dist --pretty-urls

# Development server with live reload
unify serve -s markdown/src -o markdown/dist --pretty-urls
```

### Using npm scripts

```bash
# From the examples root directory  
npm run build-all      # Builds all examples including this one
./build-all.sh         # Shell script alternative
```

## How It Works

### 1. Markdown Files with Frontmatter

```markdown
---
title: "My Page Title"
description: "Page description for SEO"  
author: "Your Name"
---

# Page Content

Your **markdown** content here with formatting.
```

### 2. Layout Templates

The layout in `.layouts/default.html` receives:
- `{{ title }}` - From frontmatter
- `{{ description }}` - From frontmatter  
- `{{ content }}` - Processed markdown content
- Any custom frontmatter fields

### 3. Build Process

1. **Parse** - Extract frontmatter from `.md` files
2. **Convert** - Transform markdown to HTML
3. **Apply Layout** - Insert content into layout template
4. **Replace Tokens** - Substitute `{{ variables }}` with values
5. **Generate** - Create final HTML files and sitemap

## Key Files

**`src/index.md`** - Homepage with frontmatter and markdown content  
**`src/_includes/layout.html`** - Layout template with slot placeholders  
**`src/_includes/footer.html`** - Reusable footer component  
**`src/with-includes.md`** - Demonstrates component includes in markdown

## Preview

After building, you can preview the site:

```bash
cd markdown
npx serve dist
# Visit http://localhost:3000
```

## Expected Output

The build should generate:
- `dist/index.html` - Homepage with markdown converted to HTML
- `dist/with-includes/index.html` - Second page (with pretty URLs)
- `dist/sitemap.xml` - Generated sitemap

## Validation

This example is tested by the E2E test suite:

```bash
# From examples root directory
npm test  # Validates this example builds correctly
```

## Use Cases

This approach is ideal for:
- **Blogs and content sites** - Rich markdown support
- **Documentation** - Technical writing with formatting
- **Mixed content** - Combine markdown ease with HTML power
- **SEO-friendly sites** - Frontmatter provides metadata

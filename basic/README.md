# Basic HTML Example

This example demonstrates unify's traditional Apache SSI include syntax for building static sites with HTML components.

## Features Demonstrated

- ✅ **Apache SSI includes** - `<!--#include virtual="/path" -->`
- ✅ **Traditional HTML structure** - No complex templating
- ✅ **Asset copying** - CSS, images, and other static files
- ✅ **Sitemap generation** - Automatic sitemap.xml creation

## Project Structure

```
basic/
├── src/
│   ├── index.html              # Homepage  
│   ├── about.html              # About page
│   ├── getting-started.html    # Getting started guide
│   ├── css/
│   │   └── style.css          # Site styles
│   └── includes/              # Reusable components
│       ├── home-header.html   # Header for homepage
│       ├── nav.html           # Navigation component
│       └── footer.html        # Footer component
└── dist/                      # Generated static site
```

## How to Build

### Using unify CLI

```bash
# Basic build
unify build -s basic/src -o basic/dist

# With development server and live reload
unify serve -s basic/src -o basic/dist
```

### Using npm scripts

```bash
# From the examples root directory
npm run build-all      # Builds all examples including this one
./build-all.sh         # Shell script alternative
```

## How It Works

### 1. Include Syntax

Traditional Apache SSI syntax for maximum compatibility:

```html
<!--#include virtual="/includes/nav.html" -->
<!--#include file="includes/footer.html" -->  
```

### 2. Build Process

1. **Scan** - unify finds all HTML files in `src/`
2. **Process** - Replace include comments with actual file content  
3. **Copy** - Copy CSS, images, and other assets to `dist/`
4. **Generate** - Create sitemap.xml with all pages

### 3. Development Workflow

```bash
# Start development server
unify serve -s basic/src -o basic/dist

# Edit files in src/
# Browser automatically reloads on changes
# View at http://localhost:3000
```

## Key Files

**`src/index.html`** - Homepage with header include  
**`src/includes/home-header.html`** - Reusable header component  
**`src/includes/nav.html`** - Navigation shared across pages  
**`src/css/style.css`** - Site styling (copied to dist/)

## Preview

After building, you can preview the site:

```bash
cd basic
npx serve dist
# Visit http://localhost:3000
```

## Expected Output

The build should generate:
- `dist/index.html` - Homepage with includes processed
- `dist/about.html` - About page with includes processed  
- `dist/getting-started.html` - Guide with includes processed
- `dist/css/style.css` - Copied stylesheet
- `dist/sitemap.xml` - Generated sitemap

## Validation

This example is tested by the E2E test suite:

```bash
# From examples root directory
npm test  # Validates this example builds correctly
```

## Use Cases

This approach is ideal for:
- **Migrating from Apache SSI** - Drop-in replacement
- **Simple static sites** - No complex templating needed
- **Legacy projects** - Maintains familiar HTML structure
- **Design-time compatibility** - Works with SSI-enabled servers
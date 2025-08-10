# Advanced DOM Mode Example

This example demonstrates unify's advanced DOM Mode templating system using pure HTML with layouts, slots, and components.

## Features Demonstrated

- ✅ **DOM Mode layouts** - `data-layout` attribute  
- ✅ **Slot system** - `<template target="name">` content insertion
- ✅ **Component includes** - `<include src="path">` with data attributes
- ✅ **Token replacement** - `data-token` attribute processing  
- ✅ **CSS bundling** - Component styles are automatically included
- ✅ **Asset copying** - Static files copied to output

## Quick Start

```bash
# Build the advanced example
unify build -s advanced/src -o advanced/dist

# Or serve with live reload  
unify serve -s advanced/src -o advanced/dist
```

## Project Structure

```
advanced/
├── src/
│   ├── layouts/
│   │   ├── blog.html           # Blog layout template
│   │   └── default.html        # Default layout template  
│   ├── components/
│   │   ├── alert.html          # Alert component with styling
│   │   ├── card.html           # Card component with styling
│   │   └── navigation.html     # Navigation component
│   ├── styles/
│   │   └── site.css           # Global site styles
│   ├── index.html             # Homepage using blog layout
│   └── about.html             # About page using default layout
└── dist/                      # Generated static site
```

## How It Works

### 1. Layout System

Pages specify their layout using the `data-layout` attribute:

```html
<body data-layout="/layouts/blog.html">
  <!-- Page content goes here -->
</body>
```

### 2. Slot System  

Content is inserted into layouts using named slots:

**In the page:**
```html
<template target="title">Welcome to DOM Mode</template>
<template target="header">
  <h1>🧱 Unify DOM Mode</h1>
  <p>Modern templating with pure HTML</p>
</template>
```

**In the layout:**
```html
<title><slot name="title">Default Title</slot></title>
<header><slot name="header"></slot></header>
<main><slot></slot></main> <!-- unnamed slot for main content -->
```

### 3. Component Includes

Include reusable components with data:

```html
<include src="/components/card.html"
         data-title="🎯 Features"
         data-content="DOM Mode supports layouts and components." />
```

**Component template (`components/card.html`):**
```html
<div class="card">
  <h3 data-token="title">Default Title</h3>
  <div class="card-content">
    <p data-token="content">Default content</p>
  </div>
</div>
<style>
  .card { /* Component styles */ }
</style>
```

### 4. Build Process

1. **Scan** - Find all HTML files and their layouts
2. **Process** - Apply layouts and fill slots with content
3. **Include** - Replace `<include>` tags with component content  
4. **Replace** - Substitute data tokens with provided data
5. **Bundle** - Combine CSS from components and layouts
6. **Generate** - Create final HTML files and sitemap

## Key Features in Detail

### Layout Inheritance

```html
<!-- Page specifies layout -->
<body data-layout="/layouts/blog.html">
  <!-- This content becomes the unnamed slot -->
  <h2>My Blog Post</h2>
  <p>Post content here...</p>
</body>
```

### Named Slots

```html
<!-- Page defines slot content -->  
<template target="sidebar">
  <h3>Recent Posts</h3>
  <ul>...</ul>
</template>

<!-- Layout uses the slot -->
<aside><slot name="sidebar"></slot></aside>
```

### Component Data Binding

```html
<!-- Pass data to component -->
<include src="/components/alert.html"
         data-type="warning"
         data-message="This is important!" />

<!-- Component receives data -->
<div class="alert alert-{{ type }}">
  <p data-token="message">Default message</p>
</div>
```

## Expected Output

After building, the generated files include:

- `dist/index.html` - Homepage with blog layout applied
- `dist/about.html` - About page with default layout  
- `dist/styles/site.css` - Copied global styles
- `dist/sitemap.xml` - Generated sitemap
- Embedded component CSS in HTML `<style>` tags

## Current Implementation Status

✅ **Working Features:**
- Layout system with `data-layout`
- Slot content insertion with `<template target>`
- Component includes with `<include src>`
- CSS bundling from components
- Asset copying and sitemap generation

⚠️ **Advanced Features:**  
- Token replacement with data attributes (some components supported)
- Complex component data binding (partial implementation)

## Preview

After building:

```bash
cd advanced  
npx serve dist
# Visit http://localhost:3000
```

## Validation

This example is tested by the E2E test suite:

```bash
# From examples root directory
npm test  # Validates this example builds correctly
```

## Use Cases

DOM Mode is ideal for:

- **Component-based sites** - Reusable UI elements
- **Complex layouts** - Multiple layout templates  
- **Design systems** - Consistent styling and structure
- **Modern workflows** - HTML-first but with templating power

## Comparison with Other Examples

| Feature | Basic | Markdown | Advanced |
|---------|--------|----------|----------|
| Include syntax | SSI comments | Limited | DOM elements |
| Layouts | ❌ | ✅ Simple | ✅ Advanced |
| Components | ❌ | ✅ Basic | ✅ With data |
| Slots | ❌ | ❌ | ✅ Named slots |
| Token replacement | ❌ | ✅ Frontmatter | ✅ Data attrs |

Choose Advanced DOM Mode when you need the full power of modern templating while staying close to standard HTML.
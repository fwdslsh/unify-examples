# Advanced DOM Mode Example

This example demonstrates unify's advanced DOM Mode templating system using pure HTML with layouts, slots, and components.

## Features Demonstrated

- ✅ **DOM Mode layouts** - `data-layout` attribute  
- ✅ **Slot system** - `<template data-slot="name">` content insertion
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
<template data-slot="title">Welcome to DOM Mode</template>
<template data-slot="header">
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
<template data-slot="sidebar">
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
- Slot content insertion with `<template data-slot>`
- Component includes with `<include src>`
- CSS bundling from components
- Asset copying and sitemap generation

⚠️ **Partial Features:**  
- Token replacement (components included but data attributes not fully processed)
- Some layout edge cases may not work perfectly

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
| Token replacement | ❌ | ✅ Frontmatter | ❌ |

Choose Advanced DOM Mode when you need the full power of modern templating while staying close to standard HTML.
│   ├── alert.html           # Alert component
│   ├── card.html            # Card component  
│   └── navigation.html      # Navigation component
├── layouts/
│   ├── default.html         # Default page layout
│   └── blog.html            # Blog-specific layout
├── styles/
│   └── site.css             # Global styles
└── dist/                    # Generated output
```

## 🧩 Key Features Demonstrated

### 1. Layout System

Pages specify layouts using `data-layout`:

```html
<body data-layout="/layouts/blog.html">
  <!-- Page content -->
</body>
```

### 2. Slot System

Named slots in layouts:
```html
<!-- In layout -->
<title><slot name="title">Default Title</slot></title>
<main><slot></slot></main> <!-- unnamed slot -->
```

Content for slots:
```html
<!-- In page -->
<template data-slot="title">My Page Title</template>
<!-- Content outside templates goes to unnamed slot -->
<h1>Main Content</h1>
```

### 3. Component Inclusion

Include components with data binding:
```html
<include src="/components/alert.html"
         data-title="Warning"
         data-message="This is important!" />
```



## 🔧 Building This Example

```bash
# Build the DOM mode example
unify build --source examples/dom-mode/pages --output examples/dom-mode/dist

# The build process will:
# 1. Detect DOM mode elements in pages
# 2. Apply layouts with slot system
# 3. Process component includes
# 4. Move component styles to <head> (deduplicated)
# 5. Move component scripts to end of <body> (deduplicated)
```

## ✨ Expected Output

The `index.html` file will be processed into a complete HTML document:

- Layout `layouts/blog.html` provides the structure
- Named slots (`title`, `header`, `footer`) filled from `<template data-slot="...">`
- Default content goes into the unnamed `<slot></slot>`
- `<include>` elements replaced with component content

- Component styles moved to `<head>` and deduplicated
- Component scripts moved to end of `<body>` and deduplicated

## 🆚 Comparison with Traditional SSI

| Feature | Traditional SSI | DOM Mode |
|---------|----------------|----------|
| **Includes** | `<!--#include virtual="/path" -->` | `<include src="/path" />` |
| **Data Passing** | ❌ Not supported | ✅ `data-title="value"` |
| **Layouts** | ❌ Manual | ✅ `data-layout` + slots |
| **Components** | ❌ Static only | ✅ With data |
| **Scoped Styles** | ❌ Global only | ✅ Component styles moved to head |

## 🎨 Component Architecture

Components are self-contained HTML files that can include:

- **Styles**: `<style>` tags moved to document head
- **Scripts**: `<script>` tags moved to end of body  


## 🚀 Benefits

- **🧩 Modular**: Build sites from reusable components
- **🎨 Flexible**: Mix layouts, components, and traditional includes
- **⚡ Fast**: All processing at build time, pure HTML output
- **🔧 Maintainable**: Component-based architecture scales well
- **📱 Modern**: Web standards-inspired syntax
- **🎯 Focused**: Only one new element to learn (`<include>`)

---

*This example showcases the full power of Unify's DOM Mode - a modern approach to static site generation with pure HTML.*
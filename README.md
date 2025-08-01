# 🌱 unify Example Projects

This repository contains working examples demonstrating different features and use cases of the unify static site generator.

## Prerequisites

Before running these examples, you need:

- **Node.js 18+** installed
- **unify CLI** installed: `npm install -g @fwdslsh/unify`

## Quick Start

### Option 1: Build All Examples
```bash
git clone https://github.com/unify/examples && cd examples
npm install
./build-all.sh
```

### Option 2: Run Individual Examples  
See the sections below for specific instructions for each example.

## Examples Overview

### 📄 Basic HTML Site (`/basic`)

**Features**: Apache SSI includes, traditional HTML structure  
**Best for**: Simple sites migrating from Apache SSI

```bash
# Build
unify build -s basic/src -o basic/dist

# Or serve with live reload
unify serve -s basic/src -o basic/dist
```

**[→ View Basic Example Details](basic/README.md)**

### 📝 Markdown Blog (`/markdown`)

**Features**: Markdown processing, layouts, frontmatter  
**Best for**: Blogs, documentation sites, content-heavy sites

```bash  
# Build with pretty URLs
unify build -s markdown/src -o markdown/dist --pretty-urls

# Or serve with live reload
unify serve -s markdown/src -o markdown/dist --pretty-urls
```

**[→ View Markdown Example Details](markdown/README.md)**

### 🧱 Advanced Templating (`/advanced`)

**Features**: DOM mode, layouts, slots, components, token replacement  
**Best for**: Complex sites with reusable components

```bash
# Build  
unify build -s advanced/src -o advanced/dist

# Or serve with live reload
unify serve -s advanced/src -o advanced/dist
```

**[→ View Advanced Example Details](advanced/README.md)**

## Testing & Validation

### Run E2E Tests
```bash
npm install
npm test              # Run all validation tests
npm run test:verbose  # Run with detailed output
```

### Manual Testing
```bash
./validate-examples.sh           # Run automated tests
./build-all.sh                   # Build all examples
./clean-all.sh                   # Clean all dist directories
```

## Preview Built Sites

After building, you can preview the generated static sites:

```bash
# Install a simple HTTP server
npm install -g serve

# Preview any example
cd basic && serve dist       # Basic example
cd markdown && serve dist    # Markdown example  
cd advanced && serve dist    # Advanced example
```

Visit `http://localhost:3000` to view the built site.

## Troubleshooting

### Common Issues

**Build fails with "command not found"**
```bash
# Install unify CLI globally
npm install -g @fwdslsh/unify

# Or use npx
npx @fwdslsh/unify build -s src -o dist
```

**Permission denied on scripts**
```bash
# Make scripts executable
chmod +x build-all.sh clean-all.sh validate-examples.sh
```

**Examples don't build correctly**
```bash
# Run validation tests to identify issues
npm test
```

### Getting Help

- 📖 [Main unify Documentation](https://github.com/fwdslsh/unify/docs)
- 🐛 [Report Issues](https://github.com/fwdslsh/unify/issues)

## Contributing

To add a new example:

1. Create a new directory with `src/` and `dist/` folders
2. Add your source files to `src/`
3. Update `test-config.json` with validation rules
4. Update this README with the new example
5. Test with `npm test`

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed guidelines.
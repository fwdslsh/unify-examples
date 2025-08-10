# 🌱 unify Example Projects

This repository contains working examples demonstrating different features and use cases of the unify static site generator.

## Prerequisites

Before running these examples, you need:

- **Node.js 18+** installed
- **Bun runtime** installed: `curl -fsSL https://bun.sh/install | bash`
- **unify CLI** installed: `npm install -g @fwdslsh/unify`

## Quick Start

### Option 1: Build All Examples
```bash
git clone https://github.com/fwdslsh/unify-examples && cd unify-examples
./.github/testing/build-all.sh
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

For advanced users who want to validate the examples, testing infrastructure is available in `.github/testing/`.

### Run E2E Tests
```bash
cd .github/testing
npm install
npm test              # Run all validation tests
npm run test:verbose  # Run with detailed output
```

### Manual Testing
```bash
./.github/testing/validate-examples.sh  # Run automated tests
./.github/testing/build-all.sh          # Build all examples
./.github/testing/clean-all.sh          # Clean all dist directories
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
# Install Bun runtime first
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install unify CLI globally
npm install -g @fwdslsh/unify

# Or use npx
npx @fwdslsh/unify build -s src -o dist
```

**Permission denied on scripts**
```bash
# Make scripts executable
chmod +x .github/testing/build-all.sh .github/testing/clean-all.sh
```

### Getting Help

- 📖 [Main unify Documentation](https://github.com/fwdslsh/unify/blob/main/docs)
- 🐛 [Report Issues](https://github.com/fwdslsh/unify/issues)

## Contributing

To add a new example:

1. Create a new directory with `src/` and `dist/` folders
2. Add your source files to `src/`
3. Update the example's README with usage instructions
4. Test the example builds correctly with unify

For advanced users and contributors who need to run validation tests, see **[.github/testing/README.md](.github/testing/README.md)**.

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed guidelines.
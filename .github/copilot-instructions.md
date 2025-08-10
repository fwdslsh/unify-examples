# GitHub Copilot Instructions for unify-examples

Always reference these instructions first and fallback to search or additional context gathering only when you encounter unexpected information that does not match the info provided here.

## Repository Overview

This repository contains working examples demonstrating different features and use cases of the unify static site generator. There are three main example projects:

- **`/basic`** - Apache SSI includes with traditional HTML structure
- **`/markdown`** - Markdown processing with layouts, frontmatter, and components
- **`/advanced`** - DOM mode with layouts, slots, components, and token replacement

## Quick Setup and Bootstrap

Always run these commands in sequence to set up the repository:

```bash
# 1. Install npm dependencies (takes ~2 seconds)
npm install

# 2. Install Bun runtime (takes ~2 seconds)
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
export PATH="$HOME/.bun/bin:$PATH"

# 3. Install unify CLI globally (takes ~13 seconds)
npm install -g @fwdslsh/unify

# 4. Verify installations
node --version    # Should be 18+
bun --version     # Should show version
unify --version   # Should show unify CLI version
```

**CRITICAL**: Always export the Bun PATH before running any unify commands:
```bash
export PATH="$HOME/.bun/bin:$PATH"
```

## Building Examples

### Build All Examples (Recommended)
```bash
# Build all three examples (takes ~300ms total)
./build-all.sh
```

### Build Individual Examples
```bash
# Basic example (takes ~90ms)
unify build -s basic/src -o basic/dist

# Markdown example (takes ~95ms) 
unify build -s markdown/src -o markdown/dist --pretty-urls

# Advanced example (takes ~90ms)
unify build -s advanced/src -o advanced/dist
```

**NOTE**: All builds complete in under 100ms each. No special timeouts needed.

## Testing and Validation

### Run Complete Test Suite
```bash
# Run all E2E tests (takes ~520ms total)
npm test

# Run with verbose output (same timing)
npm run test:verbose

# Alternative via script (same timing)
./validate-examples.sh
```

**Expected Test Results**: All 3 examples should pass with 36 total validations (10 + 9 + 17).

### Validation Scenarios
Always run these validation steps after making changes:

1. **Build validation**: All examples must build without errors
2. **File validation**: Expected output files must exist (index.html, sitemap.xml, etc.)
3. **Content validation**: Generated HTML must contain expected processed content
4. **Include validation**: Template syntax must be processed (no raw includes/tokens)

## Development Workflow

### Live Development Server
```bash
# Start development server for any example (requires PATH export)
export PATH="$HOME/.bun/bin:$PATH"
unify serve -s basic/src -o basic/dist        # Basic example
unify serve -s markdown/src -o markdown/dist --pretty-urls  # Markdown example
unify serve -s advanced/src -o advanced/dist  # Advanced example

# Server runs on http://localhost:3000 with live reload
# Use Ctrl+C to stop the server
```

### Preview Built Sites
```bash
# Install serve globally (takes ~23 seconds - only needed once)
npm install -g serve

# Preview any built example
cd basic && serve dist      # Visit http://localhost:3000
cd markdown && serve dist   # Visit http://localhost:3000  
cd advanced && serve dist   # Visit http://localhost:3000
```

## Cleaning Build Output

```bash
# Clean all dist directories (takes ~6ms)
./clean-all.sh
```

## Key Project Directories

### Repository Root Structure
```
.
├── README.md                 # Main documentation
├── CONTRIBUTING.md           # Contribution guidelines
├── package.json              # Test dependencies and scripts
├── test-config.json          # E2E test configuration
├── test-runner.js            # E2E test runner
├── build-all.sh              # Build all examples script
├── clean-all.sh              # Clean all outputs script
├── validate-examples.sh      # Test runner script
├── basic/                    # Basic SSI example
├── markdown/                 # Markdown example
├── advanced/                 # Advanced DOM mode example
└── .github/                  # GitHub configuration
```

### Example Project Structure
```
basic/markdown/advanced/
├── README.md          # Example-specific documentation
├── src/               # Source files
│   ├── index.html     # Entry point
│   ├── includes/      # Components (basic only)
│   ├── .layouts/      # Layout templates (markdown only)
│   ├── layouts/       # Layout templates (advanced only)
│   ├── .components/   # Components (markdown only)
│   ├── components/    # Components (advanced only)
│   └── styles/        # CSS files
└── dist/              # Generated output (created during build)
```

## Common Development Tasks

### Adding a New Example
1. Create new directory with `src/` subdirectory
2. Add source files following unify conventions
3. Update `test-config.json` with build command and validations
4. Update `build-all.sh` and `clean-all.sh` scripts
5. Update main `README.md` with new example section
6. Test with `npm test` to ensure validation passes

### Debugging Build Issues
1. Run individual build command to isolate the problem
2. Check for missing Bun PATH export
3. Verify source file syntax (includes, layouts, frontmatter)
4. Use `unify serve` for live debugging with reload
5. Check test validations in `test-config.json` for expected content

### Making Changes to Examples
1. Always clean first: `./clean-all.sh`
2. Make your changes to source files in `src/` directories
3. Test build: `./build-all.sh` 
4. Validate: `npm test`
5. Preview: `serve dist` in the specific example directory

## Important Files and Their Purpose

### Configuration Files
- **`package.json`**: Test dependencies (fs-extra, chalk) and npm scripts
- **`test-config.json`**: E2E test configuration with build commands and validations
- **`.gitignore`**: Excludes `dist/`, `node_modules/`, `.plans/`, `.unify-cache/`

### Scripts
- **`test-runner.js`**: Comprehensive E2E test suite with build validation
- **`build-all.sh`**: Builds all three examples sequentially
- **`clean-all.sh`**: Removes all `dist/` directories
- **`validate-examples.sh`**: Wrapper for running npm test

### Documentation
- **`README.md`**: Complete usage guide with prerequisites and examples
- **`CONTRIBUTING.md`**: Guidelines for adding new examples
- **`basic/README.md`**: Basic example documentation
- **`markdown/README.md`**: Markdown example documentation  
- **`advanced/README.md`**: Advanced example documentation

## Timing Expectations

**NEVER CANCEL** any of these commands - they complete quickly:

- `npm install`: ~2 seconds
- `curl -fsSL https://bun.sh/install | bash`: ~2 seconds
- `npm install -g @fwdslsh/unify`: ~13 seconds
- Individual builds: ~90-100ms each
- `./build-all.sh`: ~300ms total
- `npm test`: ~520ms total
- `./clean-all.sh`: ~6ms
- `npm install -g serve`: ~23 seconds (one-time)

## Dependencies and Prerequisites

### Required Tools
- **Node.js 18+**: Pre-installed (v20.19.4)
- **npm**: Pre-installed (v10.8.2) 
- **Bun runtime**: Install with `curl -fsSL https://bun.sh/install | bash`
- **unify CLI**: Install with `npm install -g @fwdslsh/unify`
- **serve** (for preview): Install with `npm install -g serve`

### Runtime Dependencies
- **fs-extra**: File system utilities for tests
- **chalk**: Console colors for test output

## Validation Requirements

All examples must pass these checks:

1. **Build successfully** with specified unify command
2. **Generate expected files** (index.html, sitemap.xml, etc.)
3. **Process includes correctly** (no raw SSI/template syntax in output)
4. **Apply layouts properly** (content appears in layout templates)
5. **Complete within timeout** (all commands finish in under 1 second)

## Working with Example Types

### Basic Example (`/basic`)
- Uses Apache SSI include syntax: `<!--#include virtual="/path" -->`
- Traditional HTML structure with shared components
- Best for: Simple sites migrating from Apache SSI

### Markdown Example (`/markdown`)  
- Markdown files with YAML frontmatter
- Layout system in `.layouts/` directory
- Token replacement with `{{ variable }}` syntax
- Best for: Blogs, documentation, content-heavy sites

### Advanced Example (`/advanced`)
- DOM mode with `data-layout` attributes
- Slot system with `<template target="name">` content insertion
- Component includes with `<include src="path">` 
- Token replacement with `data-token` attributes
- Best for: Complex sites with reusable components

## Troubleshooting

### Build Failures
- **"command not found" errors**: Check Bun PATH export
- **Include not processed**: Verify file paths are correct relative to source directory
- **Test failures**: Check `test-config.json` for expected content patterns

### Performance Issues
- All operations complete quickly (under 1 second)
- If builds seem slow, check for file system issues
- Test suite should complete in under 1 second total

### Common Mistakes
- Forgetting to export Bun PATH before running unify commands
- Not cleaning before rebuilding when testing changes
- Modifying generated `dist/` files instead of `src/` files
- Running individual tests instead of full validation suite

## No CI/CD Integration

This repository does not have GitHub Actions workflows or automated CI/CD. All testing is done locally using the npm test suite.

## No Linting or Code Quality Tools

This repository does not use ESLint, Prettier, or other code quality tools. Focus on functional testing via the E2E test suite.
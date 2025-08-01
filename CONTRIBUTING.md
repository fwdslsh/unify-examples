# Contributing to unify Examples

Thank you for your interest in contributing to the unify examples repository! This guide will help you add new examples or improve existing ones.

## Prerequisites

- Node.js 18+
- unify CLI: `npm install -g @unify/cli`
- Basic understanding of HTML, CSS, and unify concepts

## Adding a New Example

### 1. Create the Directory Structure

```bash
mkdir my-new-example
cd my-new-example

# Create the basic structure
mkdir -p src dist
```

### 2. Create Your Source Files

Add your example files to the `src/` directory following unify conventions:

- **Basic examples**: Use `<!--#include virtual="/path" -->` syntax
- **Markdown examples**: Use `.layouts/` and `.components/` directories  
- **Advanced examples**: Use `layouts/`, `components/`, and DOM mode features

### 3. Add a README

Create a detailed `README.md` for your example:

```markdown
# My Example Name

Brief description of what this example demonstrates.

## Features Demonstrated
- Feature 1
- Feature 2

## How to Build
\`\`\`bash
unify build -s my-new-example/src -o my-new-example/dist
\`\`\`

## How It Works
Explain the key concepts...
```

### 4. Update Test Configuration

Add your example to `test-config.json`:

```json
"my-new-example": {
  "name": "My Example Name",
  "description": "Brief description",
  "source": "my-new-example/src",
  "output": "my-new-example/dist", 
  "command": "unify build -s my-new-example/src -o my-new-example/dist",
  "timeout": 30000,
  "expectedFiles": [
    "index.html",
    "sitemap.xml"
  ],
  "validations": [
    {
      "type": "file-exists",
      "files": ["index.html", "sitemap.xml"]
    },
    {
      "type": "content-includes",
      "file": "index.html",
      "mustContain": ["Expected content"],
      "mustNotContain": ["Unprocessed template syntax"]
    }
  ]
}
```

### 5. Update Build Scripts

Add your example to the build scripts:

**`build-all.sh`**:
```bash
# My new example
echo "📦 Building my-new-example..."
node "$CLI_PATH" build -s my-new-example/src -o my-new-example/dist
```

**`clean-all.sh`**:
```bash
if [ -d "my-new-example/dist" ]; then
    rm -rf my-new-example/dist
    echo "  ✅ Cleaned my-new-example/dist"
fi
```

### 6. Update Main README

Add your example to the main `README.md` with a section like:

```markdown
### 🔧 My Example Name (`/my-new-example`)

**Features**: List key features  
**Best for**: Description of use cases

\`\`\`bash
unify build -s my-new-example/src -o my-new-example/dist
\`\`\`

**[→ View My Example Details](my-new-example/README.md)**
```

## Testing Your Example

### 1. Manual Testing

```bash
# Build your example
./build-all.sh

# Clean outputs  
./clean-all.sh

# Test individual build
unify build -s my-new-example/src -o my-new-example/dist
```

### 2. Automated Testing

```bash
# Run the full test suite
npm test

# Run with verbose output
npm run test:verbose
```

Your example should:
- ✅ Build without errors
- ✅ Generate expected output files  
- ✅ Pass all content validations
- ✅ Complete within timeout limits

## Guidelines

### Content Guidelines

- **Clear purpose**: Each example should demonstrate specific unify features
- **Real-world relevance**: Examples should solve actual use cases
- **Progressive complexity**: New examples should build on concepts from simpler ones
- **Well-documented**: Include detailed README and code comments

### Technical Guidelines

- **Follow conventions**: Use standard unify directory structures
- **Test thoroughly**: Ensure examples work correctly
- **Include validation**: Add comprehensive test validations
- **Handle errors**: Examples should build cleanly without warnings

### File Organization

```
my-example/
├── README.md              # Detailed documentation
├── src/                   # Source files
│   ├── index.html        # Entry point
│   ├── .layouts/         # Layout templates (if needed)
│   ├── .components/      # Reusable components (if needed)
│   └── assets/           # CSS, images, etc.
└── dist/                 # Build output (auto-generated)
```

## Example Types

### Basic Examples
- Focus on single unify features
- Minimal configuration
- Clear, simple code
- Good for beginners

### Advanced Examples  
- Multiple features combined
- Real-world complexity
- Best practices demonstrated
- Production-ready patterns

### Integration Examples
- Third-party tools/libraries
- CI/CD workflows  
- Deployment strategies
- Advanced configurations

## Validation Requirements

All examples must:

1. **Build successfully** with the specified unify command
2. **Generate expected files** as defined in test configuration
3. **Process correctly** (includes resolved, templates applied, etc.)
4. **Complete quickly** within reasonable time limits
5. **Pass content checks** for expected vs. unprocessed content

## Common Issues

### Build Failures
- Check file paths are correct relative to source directory
- Ensure all referenced includes/components exist
- Verify unify command syntax

### Validation Failures  
- Update `test-config.json` with realistic expectations
- Check that expected content is actually generated
- Remove overly specific content checks that might break

### Performance Issues
- Keep examples reasonably sized
- Avoid complex processing that might timeout
- Test on typical development machines

## Submitting Your Example

1. **Test thoroughly** - Run full test suite locally
2. **Document completely** - README, code comments, test config
3. **Follow patterns** - Match existing example structure and style
4. **Create pull request** - Include description of what your example demonstrates

## Getting Help

- 📖 [Main unify Documentation](https://github.com/unify/cli/docs)
- 🐛 [Report Issues](https://github.com/unify/examples/issues)
- 💬 [Ask Questions](https://github.com/unify/cli/discussions)

Thank you for contributing to make unify examples better for everyone! 🙌

---
title: Inform – Getting Started
---

<template slot="title">Inform – Getting Started</template>
<template slot="description">Start crawling websites and converting to Markdown in minutes.</template>

## Installation

Install Inform using Bun (recommended) or npm:

```bash
# Using Bun (recommended)
bun add -g @fwdslsh/inform

# Using npm
npm install -g @fwdslsh/inform

# Verify installation
inform --version
```

**System Requirements:**
- Bun 1.0+ or Node.js 18+
- Internet connection for crawling
- Sufficient disk space for output files

## Quick Start

### Basic Website Crawl

Start with a simple single-page crawl:

```bash
# Crawl a single page
inform https://example.com

# Crawl with custom output directory
inform https://docs.example.com --output ./docs

# Crawl with depth limit
inform https://blog.example.com --depth 2
```

### Full Site Crawl

Crawl an entire website with smart defaults:

```bash
# Full site crawl with automatic discovery
inform https://docs.example.com --recursive

# Limit to specific sections
inform https://docs.example.com/api --recursive --depth 3

# Save to specific directory with clean structure
inform https://help.example.com --output ./help-docs --clean-urls
```

### Configuration File

For complex crawls, create a configuration file:

```bash
# Create config file
cat > inform-config.json << 'EOF'
{
  "baseUrl": "https://docs.example.com",
  "output": "./output",
  "recursive": true,
  "depth": 5,
  "delay": 1000,
  "include": ["*/docs/*", "*/api/*"],
  "exclude": ["*/archive/*", "*/old/*"],
  "respectRobots": true,
  "userAgent": "Inform Crawler 1.0"
}
EOF

# Run with config
inform --config inform-config.json
```

## Essential Commands

### Basic Crawling

**Single page:**
```bash
inform https://example.com/page.html
```

**Recursive crawling:**
```bash
inform https://docs.example.com --recursive
inform https://docs.example.com -r           # Short form
```

**Depth control:**
```bash
inform https://site.com --depth 3            # Maximum link depth
inform https://site.com --max-pages 100      # Maximum pages to crawl
```

### Output Control

**Directory and naming:**
```bash
inform https://site.com --output ./docs      # Custom output directory
inform https://site.com --clean-urls         # Clean URL-based file names
inform https://site.com --preserve-structure # Maintain URL directory structure
```

**Content format:**
```bash
inform https://site.com --format markdown    # Markdown output (default)
inform https://site.com --format html        # Preserve HTML
inform https://site.com --format text        # Plain text only
```

### Filtering and Selection

**URL patterns:**
```bash
# Include only specific paths
inform https://docs.site.com --include "*/guides/*" "*/api/*"

# Exclude specific paths
inform https://site.com --exclude "*/archive/*" "*/temp/*"

# Combine include and exclude
inform https://site.com -r --include "*/docs/*" --exclude "*/old/*"
```

**Content filtering:**
```bash
# Skip specific content types
inform https://site.com --skip-images --skip-videos

# Include only main content (remove nav, ads, etc.)
inform https://site.com --content-only

# Custom content selectors
inform https://site.com --content-selector "main, .content, .post"
```

### Crawling Behavior

**Rate limiting:**
```bash
inform https://site.com --delay 2000         # 2 second delay between requests
inform https://site.com --concurrent 3       # Max 3 concurrent requests
inform https://site.com --timeout 30000      # 30 second request timeout
```

**Politeness:**
```bash
inform https://site.com --respect-robots     # Honor robots.txt (default)
inform https://site.com --user-agent "MyBot 1.0"
inform https://site.com --no-robots          # Ignore robots.txt (use carefully)
```

## Advanced Usage

### Content Extraction

**Smart content detection:**
```bash
# Automatically detect main content area
inform https://blog.site.com --auto-content

# Use specific CSS selectors for content
inform https://docs.site.com --content-selector ".documentation-content"

# Remove specific elements
inform https://site.com --remove-selector "nav, .sidebar, .ads"
```

**Metadata extraction:**
```bash
# Include page metadata in frontmatter
inform https://site.com --include-metadata

# Extract specific meta tags
inform https://site.com --meta-tags "description,keywords,author"

# Include page title and date
inform https://site.com --include-title --include-date
```

### File Organization

**Directory structure:**
```bash
# Preserve original URL structure
inform https://docs.site.com --preserve-structure

# Flatten directory structure
inform https://docs.site.com --flat

# Custom directory naming
inform https://docs.site.com --dir-pattern "{category}/{title}"
```

**File naming:**
```bash
# Clean file names from page titles
inform https://site.com --filename-from-title

# Custom naming pattern
inform https://site.com --filename-pattern "{slug}.md"

# Handle duplicates
inform https://site.com --handle-duplicates suffix  # file-1.md, file-2.md
```

### Performance Optimization

**Concurrent processing:**
```bash
# Increase concurrent requests (be respectful)
inform https://site.com --concurrent 5

# Batch processing for large sites
inform https://site.com --batch-size 50

# Memory optimization for huge sites
inform https://site.com --streaming --low-memory
```

**Caching and resume:**
```bash
# Cache responses for repeated runs
inform https://site.com --cache

# Resume interrupted crawls
inform https://site.com --resume

# Skip already processed URLs
inform https://site.com --skip-existing
```

## Configuration Options

### Basic Settings

```json
{
  "baseUrl": "https://docs.example.com",
  "output": "./output",
  "recursive": true,
  "depth": 3,
  "maxPages": 1000
}
```

### Crawling Behavior

```json
{
  "delay": 1000,
  "concurrent": 3,
  "timeout": 30000,
  "respectRobots": true,
  "userAgent": "Inform Crawler 1.0",
  "retries": 3,
  "retryDelay": 2000
}
```

### Content Processing

```json
{
  "format": "markdown",
  "contentOnly": true,
  "contentSelector": "main, .content, .post-content",
  "removeSelector": "nav, .sidebar, .ads, .comments",
  "includeMetadata": true,
  "metaTags": ["description", "keywords", "author"]
}
```

### URL Filtering

```json
{
  "include": [
    "*/docs/*",
    "*/guides/*",
    "*/api/*"
  ],
  "exclude": [
    "*/archive/*",
    "*/old/*",
    "*/temp/*",
    "*/_*"
  ],
  "skipExtensions": [".pdf", ".zip", ".exe"]
}
```

### Output Formatting

```json
{
  "cleanUrls": true,
  "preserveStructure": true,
  "filenameFromTitle": true,
  "filenamePattern": "{category}-{slug}.md",
  "dirPattern": "{category}/{subcategory}",
  "handleDuplicates": "suffix"
}
```

## Use Case Examples

### Documentation Sites

**API Documentation:**
```bash
# Crawl API docs with clean structure
inform https://api.example.com/docs \
  --recursive \
  --include "*/docs/*" "*/reference/*" \
  --exclude "*/examples/*" \
  --content-selector ".api-content" \
  --clean-urls \
  --include-metadata
```

**User Guides:**
```bash
# Extract user guides and tutorials
inform https://help.example.com \
  --recursive \
  --depth 4 \
  --include "*/guides/*" "*/tutorials/*" \
  --filename-from-title \
  --preserve-structure \
  --delay 1500
```

### Blog Content

**Technical Blog Archive:**
```bash
# Archive technical blog posts
inform https://blog.example.com \
  --recursive \
  --include "*/posts/*" "*/articles/*" \
  --content-selector ".post-content" \
  --remove-selector ".social-share, .comments" \
  --include-metadata \
  --meta-tags "author,date,tags"
```

### Knowledge Base Creation

**Multi-site aggregation:**
```bash
# Create knowledge base from multiple sources
inform https://docs.library1.com --output ./kb/lib1 --recursive --depth 2
inform https://help.library2.com --output ./kb/lib2 --recursive --depth 2
inform https://wiki.library3.com --output ./kb/lib3 --recursive --depth 2

# Combine and organize
inform-merge ./kb/lib* --output ./knowledge-base
```

## Integration Examples

### Content Pipeline

**Preprocessing for static site generators:**
```bash
# Extract content for Jekyll/Hugo
inform https://source-site.com \
  --output ./content \
  --format markdown \
  --include-metadata \
  --clean-urls \
  --filename-pattern "{date}-{slug}.md"
```

**AI Training Data Preparation:**
```bash
# Clean content for AI processing
inform https://docs.site.com \
  --recursive \
  --content-only \
  --remove-selector "nav, .sidebar, .footer" \
  --format markdown \
  --batch-size 100 \
  --streaming
```

### Automation Scripts

**Scheduled documentation updates:**
```bash
#!/bin/bash
# update-docs.sh

# Crawl latest documentation
inform https://docs.product.com \
  --config ./inform-config.json \
  --output ./temp-docs \
  --resume

# Process and organize
inform-process ./temp-docs --output ./final-docs

# Deploy to static site
unify build --source ./final-docs --output ./site
```

**CI/CD Integration:**
```yaml
# .github/workflows/docs-sync.yml
name: Sync Documentation
on:
  schedule:
    - cron: '0 0 * * *'  # Daily

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install Inform
        run: bun add -g @fwdslsh/inform
        
      - name: Crawl Documentation
        run: |
          inform https://docs.example.com \
            --output ./docs \
            --config ./inform-config.json
            
      - name: Commit Updates
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git commit -m "docs: update documentation from source" || exit 0
          git push
```

## Troubleshooting

### Common Issues

**Rate limiting:**
```bash
# Increase delays if getting blocked
inform https://site.com --delay 3000 --concurrent 1

# Use respectful crawling settings
inform https://site.com --respect-robots --user-agent "Inform/1.0"
```

**Content extraction problems:**
```bash
# Debug content selectors
inform https://site.com --debug --content-selector ".main-content"

# Try different selectors
inform https://site.com --content-selector "article, .post, main"
```

**Large site performance:**
```bash
# Use streaming for memory efficiency
inform https://largsite.com --streaming --low-memory

# Limit concurrent requests
inform https://site.com --concurrent 2 --delay 2000
```

### Best Practices

**Respectful Crawling:**
- Always check robots.txt first
- Use reasonable delays between requests
- Identify your crawler with a proper user-agent
- Monitor server response codes and back off if needed

**Content Quality:**
- Test content selectors on sample pages first
- Review extracted content for quality
- Use exclude patterns to skip irrelevant sections
- Validate markdown output for formatting issues

**Performance:**
- Start with small test crawls
- Use caching for development and testing
- Monitor memory usage on large crawls
- Consider breaking large sites into smaller chunks

Ready to start extracting web content? Check out the [full documentation →](/inform/docs/)
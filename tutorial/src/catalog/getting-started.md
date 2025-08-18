---
title: Catalog – Getting Started
---

<template data-target="title">Catalog – Getting Started</template>
<template data-target="description">Generate AI-friendly content catalogs from documentation directories.</template>

## Installation

Install Catalog using Bun (recommended) or npm:

```bash
# Using Bun (recommended)
bun add -g @fwdslsh/catalog

# Using npm
npm install -g @fwdslsh/catalog

# Verify installation
catalog --version
```

**System Requirements:**
- Bun 1.0+ or Node.js 18+
- Directory with Markdown or HTML files
- Write permissions for output files

## Quick Start

### Basic Index Generation

Generate a simple content catalog from your documentation:

```bash
# Generate catalog from current directory
catalog

# Generate from specific directory
catalog ./docs

# Generate with custom output location
catalog ./docs --output ./catalog-output
```

### Standard AI-Friendly Formats

Generate the standard `llms.txt` and `llms-full.txt` files:

```bash
# Generate both index and full content files
catalog ./docs --format llms

# Generate only the index file
catalog ./docs --format llms-index

# Generate only the full content file
catalog ./docs --format llms-full
```

### Custom Configuration

For advanced use cases, create a configuration file:

```bash
# Create config file
cat > catalog-config.json << 'EOF'
{
  "input": "./documentation",
  "output": "./catalog",
  "formats": ["llms", "json", "yaml"],
  "include": ["*.md", "*.html"],
  "exclude": ["**/node_modules/**", "**/archive/**"],
  "extractMetadata": true,
  "generateSummaries": true,
  "maxDepth": 5
}
EOF

# Run with config
catalog --config catalog-config.json
```

## Essential Commands

### Basic Usage

**Directory processing:**
```bash
catalog ./docs                    # Process docs directory
catalog ./content --recursive     # Recursive processing (default)
catalog ./files --no-recursive    # Single level only
```

**Output control:**
```bash
catalog ./docs --output ./catalog      # Custom output directory
catalog ./docs --output-file index.txt # Custom output filename
catalog ./docs --overwrite            # Overwrite existing files
```

### Format Options

**Standard formats:**
```bash
catalog ./docs --format llms          # Generate llms.txt and llms-full.txt
catalog ./docs --format json          # Generate catalog.json
catalog ./docs --format yaml          # Generate catalog.yaml
catalog ./docs --format text          # Generate plain text index
```

**Multiple formats:**
```bash
catalog ./docs --format llms,json,yaml    # Generate multiple formats
catalog ./docs --all-formats              # Generate all available formats
```

### Content Processing

**File filtering:**
```bash
# Include specific file patterns
catalog ./docs --include "*.md" "*.html"

# Exclude specific patterns
catalog ./docs --exclude "**/archive/**" "**/temp/**"

# Combine include and exclude
catalog ./docs --include "*.md" --exclude "**/draft/**"
```

**Content options:**
```bash
catalog ./docs --extract-metadata        # Include frontmatter metadata
catalog ./docs --generate-summaries      # Create content summaries
catalog ./docs --max-content-length 500  # Limit content excerpts
catalog ./docs --include-headings        # Include heading structure
```

### Organization

**Directory structure:**
```bash
catalog ./docs --preserve-structure      # Maintain directory hierarchy
catalog ./docs --flatten                 # Flatten directory structure
catalog ./docs --group-by category       # Group by metadata field
catalog ./docs --sort-by title           # Sort by specific field
```

**Categorization:**
```bash
catalog ./docs --auto-categorize         # Automatic categorization
catalog ./docs --category-field section  # Use specific metadata field
catalog ./docs --default-category misc   # Default category for uncategorized
```

## Content Processing

### Metadata Extraction

Catalog automatically extracts metadata from frontmatter:

```markdown
---
title: Getting Started Guide
description: Quick start guide for new users
category: tutorials
tags: [beginners, setup, installation]
author: Documentation Team
date: 2025-01-15
priority: high
---

# Getting Started

Content here...
```

**Extracted metadata:**
- Title (from frontmatter or first heading)
- Description (from frontmatter or excerpt)
- Category and tags for organization
- Author and date information
- Custom fields for specialized use

### Content Summarization

**Automatic summaries:**
```bash
# Generate summaries from content
catalog ./docs --generate-summaries

# Control summary length
catalog ./docs --summary-length 200

# Use first paragraph as summary
catalog ./docs --summary-strategy first-paragraph
```

**Custom excerpt extraction:**
```bash
# Use specific content sections
catalog ./docs --excerpt-selector "p:first-of-type"

# Extract from specific metadata
catalog ./docs --excerpt-field description
```

### Heading Analysis

**Structure extraction:**
```bash
# Include heading hierarchy
catalog ./docs --include-headings

# Limit heading depth
catalog ./docs --heading-depth 3

# Generate table of contents
catalog ./docs --generate-toc
```

## Output Formats

### LLMs Format

**Standard `llms.txt`** - Structured index:
```
# Documentation Catalog

## API Reference
- /api/authentication.md - User authentication and authorization
- /api/endpoints.md - Complete API endpoint reference
- /api/rate-limiting.md - Rate limiting and quotas

## User Guides
- /guides/getting-started.md - Quick start for new users
- /guides/advanced-config.md - Advanced configuration options
- /guides/troubleshooting.md - Common issues and solutions

## Tutorials
- /tutorials/first-api-call.md - Making your first API call
- /tutorials/webhooks.md - Setting up webhooks
```

**Full content `llms-full.txt`**:
```
# Complete Documentation Catalog

## /api/authentication.md
User authentication and authorization

Authentication is required for all API endpoints. This guide covers the available authentication methods and how to implement them in your applications.

### API Keys
Generate API keys from your dashboard...

[Complete content included]

---

## /api/endpoints.md
Complete API endpoint reference

This reference documents all available API endpoints, including request/response formats and examples.

### User Management
- GET /users - List users
- POST /users - Create user
- GET /users/{id} - Get user details

[Complete content included]
```

### JSON Format

**Structured data output:**
```json
{
  "catalog": {
    "title": "Documentation Catalog",
    "generated": "2025-01-15T10:30:00Z",
    "totalFiles": 25,
    "totalCategories": 4
  },
  "categories": {
    "api": {
      "title": "API Reference",
      "files": [
        {
          "path": "/api/authentication.md",
          "title": "User authentication and authorization",
          "description": "Authentication guide for API access",
          "metadata": {
            "author": "API Team",
            "date": "2025-01-10",
            "tags": ["auth", "security", "api"]
          },
          "summary": "Authentication is required for all API endpoints...",
          "headings": ["API Keys", "OAuth2", "JWT Tokens"],
          "wordCount": 1250
        }
      ]
    }
  }
}
```

### YAML Format

**Human-readable structured output:**
```yaml
catalog:
  title: Documentation Catalog
  generated: 2025-01-15T10:30:00Z
  totalFiles: 25
  totalCategories: 4

categories:
  api:
    title: API Reference
    files:
      - path: /api/authentication.md
        title: User authentication and authorization
        description: Authentication guide for API access
        metadata:
          author: API Team
          date: 2025-01-10
          tags: [auth, security, api]
        summary: Authentication is required for all API endpoints...
        headings: [API Keys, OAuth2, JWT Tokens]
        wordCount: 1250
```

## Advanced Configuration

### Configuration File

**Complete configuration example:**
```json
{
  "input": "./documentation",
  "output": "./catalog",
  "formats": ["llms", "json"],
  
  "processing": {
    "recursive": true,
    "maxDepth": 10,
    "followSymlinks": false,
    "extractMetadata": true,
    "generateSummaries": true,
    "summaryLength": 300,
    "summaryStrategy": "smart"
  },
  
  "filtering": {
    "include": ["*.md", "*.html", "*.mdx"],
    "exclude": [
      "**/node_modules/**",
      "**/archive/**",
      "**/draft/**",
      "**/.git/**"
    ],
    "ignoreHidden": true,
    "ignoreEmpty": true
  },
  
  "organization": {
    "preserveStructure": true,
    "groupBy": "category",
    "sortBy": "title",
    "categoryField": "category",
    "defaultCategory": "miscellaneous",
    "autoCategorize": true
  },
  
  "content": {
    "includeHeadings": true,
    "headingDepth": 3,
    "maxContentLength": 1000,
    "excerptSelector": "p:first-of-type",
    "stripHtml": true,
    "normalizeWhitespace": true
  },
  
  "output": {
    "overwrite": true,
    "createDirectories": true,
    "includeMetadata": true,
    "includeStats": true,
    "prettyPrint": true
  }
}
```

### Template Customization

**Custom output templates:**
```bash
# Use custom template
catalog ./docs --template custom-template.txt

# Template with placeholders
catalog ./docs --template-file ./templates/catalog.tmpl
```

**Template format:**
```
# {{title}}

Generated: {{date}}
Total Files: {{fileCount}}

{{#categories}}
## {{name}}
{{#files}}
- {{path}} - {{title}}
  {{description}}
  Tags: {{tags}}
{{/files}}

{{/categories}}
```

### Custom Metadata

**Extract custom fields:**
```json
{
  "metadata": {
    "fields": [
      "title",
      "description", 
      "category",
      "tags",
      "author",
      "date",
      "version",
      "status",
      "difficulty",
      "requirements"
    ],
    "customFields": {
      "difficulty": {
        "type": "string",
        "values": ["beginner", "intermediate", "advanced"]
      },
      "status": {
        "type": "string", 
        "values": ["draft", "review", "published"]
      }
    }
  }
}
```

## Integration Examples

### With Other Fwdslsh Tools

**Complete documentation workflow:**
```bash
# 1. Crawl external documentation
inform https://api.example.com/docs --output ./raw-docs

# 2. Generate content catalog
catalog ./raw-docs --output ./catalog --format llms,json

# 3. Build static site with organized content
unify build --source ./docs --output ./website

# 4. Track changes with AI-generated commits
giv commit -m "Update documentation catalog"
```

### CI/CD Integration

**Automated catalog generation:**
```yaml
# .github/workflows/update-catalog.yml
name: Update Documentation Catalog

on:
  push:
    paths: ['docs/**']
  
jobs:
  catalog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install Catalog
        run: bun add -g @fwdslsh/catalog
        
      - name: Generate Catalog
        run: |
          catalog ./docs \
            --output ./catalog \
            --format llms,json \
            --overwrite
            
      - name: Commit Updates
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add catalog/
          git commit -m "docs: update content catalog" || exit 0
          git push
```

### AI System Integration

**Embeddings preparation:**
```bash
# Generate structured content for vector databases
catalog ./knowledge-base \
  --format json \
  --generate-summaries \
  --extract-metadata \
  --include-headings \
  --output ./embeddings-ready
```

**RAG system preparation:**
```bash
# Create chunked content for retrieval systems
catalog ./docs \
  --format llms-full \
  --max-content-length 2000 \
  --chunk-overlap 200 \
  --include-context
```

## Use Cases

### Documentation Management

**Large documentation sites:**
```bash
# Process enterprise documentation
catalog ./enterprise-docs \
  --recursive \
  --format llms,json,yaml \
  --group-by department \
  --generate-summaries \
  --include-metadata
```

**API documentation:**
```bash
# Organize API reference materials
catalog ./api-docs \
  --include "*.md" \
  --exclude "**/examples/**" \
  --group-by version \
  --sort-by endpoint
```

### Knowledge Base Creation

**Support documentation:**
```bash
# Create searchable knowledge base
catalog ./support-docs \
  --auto-categorize \
  --generate-summaries \
  --extract-metadata \
  --format json \
  --include-headings
```

**Training materials:**
```bash
# Organize training content
catalog ./training \
  --group-by difficulty \
  --sort-by sequence \
  --include-metadata \
  --generate-summaries
```

### Content Inventory

**Content audit:**
```bash
# Generate content inventory report
catalog ./website-content \
  --format json \
  --include-metadata \
  --include-stats \
  --extract-metadata \
  --output ./content-audit.json
```

## Best Practices

### File Organization

**Consistent structure:**
- Use clear, descriptive file names
- Maintain consistent directory hierarchy
- Include descriptive frontmatter in all files
- Use consistent category and tag naming

**Metadata standards:**
- Always include title and description
- Use consistent date formats
- Apply meaningful categories and tags
- Include author information where applicable

### Content Quality

**Frontmatter best practices:**
```markdown
---
title: Clear, Descriptive Title
description: Concise summary of content purpose and scope
category: logical-category-name
tags: [specific, relevant, searchable]
author: Author Name
date: 2025-01-15
version: 1.2.0
status: published
difficulty: intermediate
---
```

**Content structure:**
- Start with clear headings
- Use consistent heading hierarchy
- Include descriptive first paragraphs
- Maintain logical content flow

### Performance Optimization

**Large collections:**
```bash
# Process large documentation sets efficiently
catalog ./huge-docs \
  --batch-size 100 \
  --max-depth 5 \
  --exclude "**/archive/**" \
  --summary-length 200
```

**Incremental updates:**
```bash
# Update only changed files
catalog ./docs \
  --incremental \
  --since "2025-01-01" \
  --cache-dir ./catalog-cache
```

Ready to organize your content? Check out the [full documentation →](/catalog/docs/)
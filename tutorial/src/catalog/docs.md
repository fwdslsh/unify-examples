---
title: Catalog – Documentation
---

<template data-target="title">Catalog – Documentation</template>
<template data-target="description">Complete reference for content cataloging and organization.</template>

## Documentation Overview

Comprehensive guide to using Catalog for generating structured content indexes and AI-friendly documentation catalogs.

## Command Reference

### `catalog <directory> [options]`

Generate structured content catalogs from directories of Markdown and HTML files.

**Basic Usage:**
```bash
catalog ./docs                           # Process docs directory
catalog ./content --format llms          # Generate AI-friendly formats
catalog --config catalog-config.json     # Use configuration file
```

### Core Options

**Input and Processing:**
```bash
--recursive                    # Process directories recursively (default: true)
--no-recursive                 # Process only top-level files
--max-depth <number>           # Maximum directory depth (default: 10)
--follow-symlinks              # Follow symbolic links (default: false)
```

**Output Control:**
```bash
--output, -o <directory>       # Output directory (default: current directory)
--output-file <filename>       # Custom output filename
--format <formats>             # Output formats: llms|json|yaml|text
--all-formats                  # Generate all available formats
--overwrite                    # Overwrite existing files
```

**Content Processing:**
```bash
--extract-metadata             # Extract frontmatter metadata
--generate-summaries           # Create content summaries
--summary-length <number>      # Maximum summary length (default: 300)
--max-content-length <number>  # Maximum content excerpt length
--include-headings             # Include heading structure
--heading-depth <number>       # Maximum heading depth (default: 3)
```

**File Filtering:**
```bash
--include <patterns>           # Include file patterns (glob)
--exclude <patterns>           # Exclude file patterns (glob)
--ignore-hidden                # Ignore hidden files (default: true)
--ignore-empty                 # Ignore empty files (default: true)
```

**Organization:**
```bash
--preserve-structure           # Maintain directory hierarchy
--flatten                      # Flatten directory structure
--group-by <field>             # Group by metadata field
--sort-by <field>              # Sort by specific field
--auto-categorize              # Automatic categorization
--category-field <field>       # Metadata field for categories
--default-category <name>      # Default category name
```

## Configuration Files

### JSON Configuration

**Basic Configuration:**
```json
{
  "input": "./documentation",
  "output": "./catalog",
  "formats": ["llms", "json"],
  "recursive": true,
  "extractMetadata": true,
  "generateSummaries": true
}
```

**Complete Configuration:**
```json
{
  "input": "./docs",
  "output": "./catalog",
  "formats": ["llms", "json", "yaml"],
  
  "processing": {
    "recursive": true,
    "maxDepth": 5,
    "followSymlinks": false,
    "extractMetadata": true,
    "generateSummaries": true,
    "summaryLength": 250,
    "summaryStrategy": "smart",
    "includeHeadings": true,
    "headingDepth": 3,
    "maxContentLength": 1000
  },
  
  "filtering": {
    "include": ["*.md", "*.html", "*.mdx"],
    "exclude": [
      "**/node_modules/**",
      "**/archive/**",
      "**/draft/**",
      "**/.git/**",
      "**/temp/**"
    ],
    "ignoreHidden": true,
    "ignoreEmpty": true,
    "skipBinary": true
  },
  
  "organization": {
    "preserveStructure": true,
    "groupBy": "category",
    "sortBy": "title",
    "categoryField": "category",
    "defaultCategory": "uncategorized",
    "autoCategorize": true,
    "categoryMappings": {
      "api": "API Reference",
      "guide": "User Guides",
      "tutorial": "Tutorials",
      "reference": "Reference"
    }
  },
  
  "content": {
    "excerptSelector": "p:first-of-type",
    "stripHtml": true,
    "normalizeWhitespace": true,
    "includeWordCount": true,
    "includeReadingTime": true,
    "estimateReadingSpeed": 200
  },
  
  "metadata": {
    "fields": [
      "title",
      "description",
      "category",
      "tags",
      "author",
      "date",
      "version",
      "status"
    ],
    "customFields": {
      "difficulty": ["beginner", "intermediate", "advanced"],
      "type": ["tutorial", "reference", "guide", "example"],
      "status": ["draft", "review", "published"]
    },
    "requireFields": ["title"],
    "defaultValues": {
      "status": "published",
      "category": "general"
    }
  },
  
  "output": {
    "overwrite": true,
    "createDirectories": true,
    "includeMetadata": true,
    "includeStats": true,
    "prettyPrint": true,
    "timestampFormat": "iso",
    "encoding": "utf8"
  },
  
  "templates": {
    "llmsIndex": "./templates/llms-index.tmpl",
    "llmsFull": "./templates/llms-full.tmpl",
    "json": "./templates/catalog.json.tmpl"
  }
}
```

### YAML Configuration

```yaml
# catalog-config.yaml
input: ./documentation
output: ./catalog
formats: [llms, json]

processing:
  recursive: true
  maxDepth: 5
  extractMetadata: true
  generateSummaries: true
  summaryLength: 300

filtering:
  include: ["*.md", "*.html"]
  exclude: ["**/archive/**", "**/temp/**"]
  ignoreHidden: true

organization:
  groupBy: category
  sortBy: title
  autoCategorize: true
  categoryField: category
  defaultCategory: miscellaneous

metadata:
  fields: [title, description, category, tags, author, date]
  requireFields: [title]
```

## Output Formats

### LLMs Format

**`llms.txt` - Structured Index:**
```
# Documentation Catalog

Generated: 2025-01-15T10:30:00Z
Total Files: 42 | Total Categories: 6

## API Reference (8 files)
- /api/authentication.md - Authentication and authorization guide
- /api/endpoints.md - Complete API endpoint reference  
- /api/rate-limiting.md - Rate limiting and quota management
- /api/webhooks.md - Webhook configuration and handling
- /api/errors.md - Error codes and troubleshooting
- /api/sdks.md - Official SDKs and libraries
- /api/examples.md - Code examples and use cases
- /api/changelog.md - API version history and changes

## User Guides (12 files)
- /guides/getting-started.md - Quick start guide for new users
- /guides/installation.md - Installation and setup instructions
- /guides/configuration.md - Configuration options and settings
- /guides/authentication-setup.md - Setting up authentication
- /guides/best-practices.md - Best practices and recommendations
- /guides/troubleshooting.md - Common issues and solutions
- /guides/migration.md - Migration guide from v1 to v2
- /guides/security.md - Security considerations and guidelines
- /guides/performance.md - Performance optimization tips
- /guides/integrations.md - Third-party integrations
- /guides/advanced.md - Advanced configuration options
- /guides/faq.md - Frequently asked questions

## Tutorials (15 files)
- /tutorials/first-api-call.md - Making your first API call
- /tutorials/authentication-flow.md - Implementing authentication
- /tutorials/webhook-setup.md - Setting up webhooks
- /tutorials/rate-limiting.md - Handling rate limits
- /tutorials/error-handling.md - Proper error handling
- /tutorials/pagination.md - Working with paginated results
- /tutorials/filtering.md - Using filters and search
- /tutorials/bulk-operations.md - Bulk data operations
- /tutorials/real-time.md - Real-time data with WebSockets
- /tutorials/caching.md - Implementing caching strategies
- /tutorials/testing.md - Testing your integration
- /tutorials/monitoring.md - Monitoring and logging
- /tutorials/deployment.md - Deployment considerations
- /tutorials/scaling.md - Scaling your application
- /tutorials/migration-v2.md - Migrating to API v2

## Reference (7 files)
- /reference/data-types.md - Data types and formats
- /reference/field-reference.md - Complete field reference
- /reference/status-codes.md - HTTP status codes
- /reference/mime-types.md - Supported MIME types
- /reference/timezones.md - Timezone handling
- /reference/limits.md - System limits and constraints
- /reference/glossary.md - Terminology and definitions
```

**`llms-full.txt` - Complete Content:**
```
# Complete Documentation Catalog

Generated: 2025-01-15T10:30:00Z

## /api/authentication.md
Authentication and authorization guide

This guide covers the authentication methods available in our API and how to implement them securely in your applications.

### Overview
Authentication is required for all API endpoints except public read-only operations. We support multiple authentication methods to accommodate different use cases and security requirements.

### API Keys
API keys provide a simple authentication method suitable for server-to-server communication...

[Complete file content]

---

## /api/endpoints.md  
Complete API endpoint reference

This reference documents all available API endpoints, including request/response formats, parameters, and examples.

### User Management Endpoints

#### GET /users
Lists all users in your organization.

**Parameters:**
- `limit` (integer, optional) - Number of users to return (default: 50, max: 200)
- `offset` (integer, optional) - Number of users to skip
- `filter` (string, optional) - Filter users by name or email

**Response:**
```json
{
  "users": [...],
  "pagination": {...}
}
```

[Complete file content]

---

[Continues for all files...]
```

### JSON Format

**Structured Data Output:**
```json
{
  "catalog": {
    "title": "Documentation Catalog",
    "description": "Complete catalog of project documentation",
    "generated": "2025-01-15T10:30:00Z",
    "generator": "Catalog v1.0.0",
    "source": "./documentation",
    "totalFiles": 42,
    "totalCategories": 6,
    "totalWords": 125000,
    "estimatedReadingTime": "10 hours 25 minutes"
  },
  
  "categories": {
    "api": {
      "title": "API Reference", 
      "description": "Complete API documentation and reference materials",
      "fileCount": 8,
      "files": [
        {
          "path": "/api/authentication.md",
          "title": "Authentication and authorization guide",
          "description": "Comprehensive guide to API authentication methods",
          "url": "https://docs.example.com/api/authentication",
          "lastModified": "2025-01-10T14:20:00Z",
          "wordCount": 2500,
          "readingTime": "10 minutes",
          "metadata": {
            "author": "API Team",
            "version": "2.1.0",
            "status": "published",
            "tags": ["authentication", "security", "api"],
            "difficulty": "intermediate",
            "category": "api"
          },
          "summary": "This guide covers authentication methods available in our API including API keys, OAuth2, and JWT tokens. Learn how to implement secure authentication for your applications.",
          "headings": [
            "Overview",
            "API Keys", 
            "OAuth2 Flow",
            "JWT Tokens",
            "Best Practices",
            "Troubleshooting"
          ],
          "excerpt": "Authentication is required for all API endpoints except public read-only operations. We support multiple authentication methods to accommodate different use cases...",
          "content": "[Full content when includeContent: true]"
        }
      ]
    }
  },
  
  "files": [
    {
      "path": "/api/authentication.md",
      "category": "api",
      "title": "Authentication and authorization guide",
      "lastModified": "2025-01-10T14:20:00Z",
      "size": 12500,
      "checksum": "sha256:abc123..."
    }
  ],
  
  "stats": {
    "processing": {
      "startTime": "2025-01-15T10:30:00Z",
      "endTime": "2025-01-15T10:30:15Z",
      "duration": "15.2 seconds",
      "filesProcessed": 42,
      "filesSkipped": 3,
      "errors": 0
    },
    "content": {
      "totalWords": 125000,
      "averageWordsPerFile": 2976,
      "totalCharacters": 750000,
      "estimatedReadingTime": "10 hours 25 minutes"
    },
    "categories": {
      "api": 8,
      "guides": 12, 
      "tutorials": 15,
      "reference": 7
    }
  }
}
```

### YAML Format

**Human-Readable Output:**
```yaml
catalog:
  title: Documentation Catalog
  generated: 2025-01-15T10:30:00Z
  totalFiles: 42
  totalCategories: 6

categories:
  api:
    title: API Reference
    fileCount: 8
    files:
      - path: /api/authentication.md
        title: Authentication and authorization guide
        description: Comprehensive guide to API authentication methods
        metadata:
          author: API Team
          tags: [authentication, security, api]
          difficulty: intermediate
        summary: This guide covers authentication methods available in our API...
        wordCount: 2500
        readingTime: 10 minutes
        headings:
          - Overview
          - API Keys
          - OAuth2 Flow
          - JWT Tokens
```

## Content Processing

### Metadata Extraction

**Frontmatter Processing:**
```markdown
---
title: Getting Started Guide
description: Quick start guide for new users
category: tutorials
tags: [beginners, setup, installation]
author: Documentation Team
date: 2025-01-15
version: 1.2.0
status: published
difficulty: beginner
type: tutorial
priority: high
featured: true
---
```

**Extracted Fields:**
- **Standard fields**: title, description, category, tags, author, date
- **Custom fields**: version, status, difficulty, type, priority, featured
- **Computed fields**: wordCount, readingTime, lastModified, size
- **Derived fields**: slug, url, checksum, relativePath

### Content Summarization

**Smart Summary Generation:**
```bash
# Automatic summary strategies
--summary-strategy smart           # AI-like intelligent summarization
--summary-strategy first-paragraph # Use first paragraph
--summary-strategy excerpt        # Use excerpt from metadata
--summary-strategy headings       # Summary from heading structure
```

**Summary Options:**
```json
{
  "summarization": {
    "strategy": "smart",
    "length": 300,
    "includeKeywords": true,
    "preserveFormatting": false,
    "fallback": "first-paragraph"
  }
}
```

### Heading Analysis

**Structure Extraction:**
```json
{
  "headings": [
    {
      "level": 1,
      "text": "Getting Started",
      "id": "getting-started",
      "children": [
        {
          "level": 2,
          "text": "Installation",
          "id": "installation",
          "children": [
            {
              "level": 3,
              "text": "Prerequisites",
              "id": "prerequisites"
            }
          ]
        }
      ]
    }
  ],
  "tableOfContents": [
    "Getting Started",
    "  Installation", 
    "    Prerequisites",
    "    Quick Setup",
    "  Configuration",
    "    Basic Settings",
    "    Advanced Options"
  ]
}
```

## Advanced Features

### Template Customization

**Custom Output Templates:**

**LLMs Index Template** (`llms-index.tmpl`):
```
# {{catalog.title}}

Generated: {{catalog.generated}}
{{#if catalog.description}}{{catalog.description}}{{/if}}

{{#each categories}}
## {{title}} ({{fileCount}} files)
{{#each files}}
- {{path}} - {{title}}
  {{#if description}}{{description}}{{/if}}
  {{#if metadata.tags}}Tags: {{join metadata.tags ", "}}{{/if}}
{{/each}}

{{/each}}

---
Total: {{catalog.totalFiles}} files across {{catalog.totalCategories}} categories
```

**JSON Template** (`catalog.json.tmpl`):
```json
{
  "catalog": {
    "title": "{{catalog.title}}",
    "generated": "{{catalog.generated}}",
    "totalFiles": {{catalog.totalFiles}}
  },
  "categories": {
    {{#each categories}}
    "{{@key}}": {
      "title": "{{title}}",
      "files": [
        {{#each files}}
        {
          "path": "{{path}}",
          "title": "{{title}}",
          "metadata": {{{json metadata}}}
        }{{#unless @last}},{{/unless}}
        {{/each}}
      ]
    }{{#unless @last}},{{/unless}}
    {{/each}}
  }
}
```

### Incremental Processing

**Change Detection:**
```bash
# Process only changed files
catalog ./docs --incremental

# Use specific timestamp
catalog ./docs --since "2025-01-01T00:00:00Z"

# Cache-based incremental updates
catalog ./docs --cache --cache-dir ./catalog-cache
```

**Cache Configuration:**
```json
{
  "cache": {
    "enabled": true,
    "directory": "./catalog-cache",
    "strategy": "mtime",
    "ttl": 3600,
    "invalidateOnConfigChange": true
  }
}
```

### Plugin System

**Custom Processors:**
```json
{
  "plugins": {
    "content": [
      "./plugins/custom-summarizer.js",
      "./plugins/code-extractor.js"
    ],
    "output": [
      "./plugins/custom-formatter.js"
    ],
    "metadata": [
      "./plugins/git-info.js",
      "./plugins/file-stats.js"
    ]
  }
}
```

**Plugin Example:**
```javascript
// plugins/git-info.js
module.exports = {
  name: 'git-info',
  type: 'metadata',
  
  async process(file, context) {
    const gitInfo = await getGitInfo(file.path);
    
    return {
      ...file.metadata,
      git: {
        lastCommit: gitInfo.lastCommit,
        author: gitInfo.lastAuthor,
        hash: gitInfo.hash,
        branch: gitInfo.branch
      }
    };
  }
};
```

## Performance Optimization

### Large Collections

**Batch Processing:**
```bash
# Process in batches for memory efficiency
catalog ./huge-docs --batch-size 100

# Limit memory usage
catalog ./docs --max-memory 512MB

# Streaming processing
catalog ./docs --streaming
```

**Parallel Processing:**
```json
{
  "performance": {
    "maxConcurrency": 4,
    "batchSize": 50,
    "memoryLimit": "1GB",
    "streaming": true,
    "lazyLoading": true
  }
}
```

### Caching Strategy

**Multi-level Caching:**
```json
{
  "cache": {
    "levels": {
      "file": {
        "strategy": "mtime",
        "ttl": 3600
      },
      "content": {
        "strategy": "hash",
        "ttl": 86400
      },
      "metadata": {
        "strategy": "persistent",
        "ttl": 604800
      }
    }
  }
}
```

## Integration Patterns

### CI/CD Workflows

**GitHub Actions:**
```yaml
name: Update Documentation Catalog

on:
  push:
    paths: ['docs/**']
  schedule:
    - cron: '0 2 * * *'

jobs:
  catalog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install Catalog
        run: bun add -g @fwdslsh/catalog
        
      - name: Generate Catalog
        run: |
          catalog ./docs \
            --config ./catalog-config.json \
            --output ./catalog \
            --overwrite
            
      - name: Upload to S3
        run: aws s3 sync ./catalog s3://docs-bucket/catalog/
        
      - name: Invalidate CDN
        run: aws cloudfront create-invalidation --distribution-id $CDN_ID --paths "/catalog/*"
```

### Documentation Workflow

**Complete Pipeline:**
```bash
#!/bin/bash
# docs-pipeline.sh

# 1. Crawl external sources
inform https://api.example.com/docs \
  --output ./external-docs \
  --recursive \
  --format markdown

# 2. Generate comprehensive catalog
catalog ./docs ./external-docs \
  --output ./catalog \
  --format llms,json,yaml \
  --config ./catalog-config.json

# 3. Build static documentation site
unify build \
  --source ./docs \
  --output ./website \
  --pretty-urls

# 4. Generate embeddings for search
catalog ./docs \
  --format json \
  --include-content \
  --max-content-length 1000 | \
  python ./scripts/generate-embeddings.py

# 5. Deploy everything
aws s3 sync ./website s3://docs-site/
aws s3 sync ./catalog s3://docs-site/catalog/
```

### AI/ML Integration

**Vector Database Preparation:**
```bash
# Generate embedding-ready content
catalog ./knowledge-base \
  --format json \
  --include-content \
  --chunk-size 1000 \
  --chunk-overlap 200 \
  --generate-summaries \
  --extract-keywords | \
  python ./scripts/create-embeddings.py
```

**RAG System Integration:**
```python
# scripts/rag-integration.py
import json
from catalog_output import CatalogProcessor

def prepare_rag_corpus(catalog_file):
    with open(catalog_file) as f:
        catalog = json.load(f)
    
    documents = []
    for category in catalog['categories'].values():
        for file in category['files']:
            doc = {
                'id': file['path'],
                'title': file['title'],
                'content': file['content'],
                'metadata': file['metadata'],
                'summary': file['summary'],
                'category': category['title']
            }
            documents.append(doc)
    
    return documents
```

## Troubleshooting

### Common Issues

**Large File Processing:**
```bash
# Memory issues with large files
catalog ./docs --streaming --max-memory 512MB

# Skip problematic files
catalog ./docs --skip-errors --error-log ./errors.log
```

**Encoding Problems:**
```bash
# Specify encoding
catalog ./docs --encoding utf8

# Handle mixed encodings
catalog ./docs --encoding auto-detect
```

**Performance Issues:**
```bash
# Reduce processing overhead
catalog ./docs \
  --no-summaries \
  --no-headings \
  --exclude "**/*.large.md"

# Use incremental processing
catalog ./docs --incremental --cache
```

### Debug Mode

**Verbose Logging:**
```bash
# Enable debug output
catalog ./docs --debug --verbose

# Log to file
catalog ./docs --log-file ./catalog.log --log-level debug

# Trace processing steps
catalog ./docs --trace --debug-dir ./debug-output
```

**Validation:**
```bash
# Validate configuration
catalog --validate-config ./catalog-config.json

# Test run without output
catalog ./docs --dry-run --verbose

# Validate output format
catalog ./docs --validate-output
```

Ready to organize your content? Start with our [Getting Started guide →](/catalog/getting-started/)
---
title: About Catalog
---

<template data-target="title">Catalog – Content Index Generator</template>
<template data-target="description">Generate structured content catalogs for AI workflows and documentation systems.</template>

<template data-target="hero">
  <h1 style="view-transition-name: catalog-hero">Catalog</h1>
  <p>Organize docs for AI agents. Transform directories into searchable catalogs.</p>
</template>

## What is Catalog?

Catalog is a specialized tool that generates structured indexes from directories of Markdown and HTML files, creating AI-friendly content catalogs in standardized formats. Perfect for documentation systems, knowledge bases, and AI training data preparation.

### Key Features

- **AI-Optimized Output**: Generates `llms.txt` and `llms-full.txt` files following emerging standards
- **Smart Content Analysis**: Automatically extracts titles, descriptions, and metadata
- **Flexible Organization**: Supports custom categorization and tagging systems
- **Multiple Formats**: Outputs structured indexes in text, JSON, and YAML formats
- **Fast Processing**: Efficiently handles large documentation collections

### How It Works

1. **Directory Scanning**: Recursively scans directories for Markdown and HTML files
2. **Content Analysis**: Extracts titles, headings, metadata, and content summaries
3. **Index Generation**: Creates structured catalogs with hierarchical organization
4. **Format Output**: Generates files optimized for AI consumption and human navigation

### Output Formats

**`llms.txt`** - Structured index with titles and descriptions:
```
# Documentation Catalog

## API Reference
- /api/authentication.md - Authentication and authorization guide
- /api/endpoints.md - Complete API endpoint reference
- /api/examples.md - Code examples and use cases

## User Guides
- /guides/getting-started.md - Quick start guide for new users
- /guides/advanced.md - Advanced configuration and customization
```

**`llms-full.txt`** - Complete content catalog:
```
# Complete Documentation

## /api/authentication.md
Authentication and authorization guide

### Overview
This guide covers authentication methods...

[Full content included]

---

## /api/endpoints.md
Complete API endpoint reference

### Endpoints
The following endpoints are available...

[Full content included]
```

### Perfect For

**Documentation Teams:**
- Create searchable indexes of documentation
- Generate AI-friendly content catalogs
- Organize scattered documentation files
- Prepare content for AI-assisted search

**AI/ML Engineers:**
- Prepare training data from documentation
- Create structured knowledge bases
- Generate embeddings-ready content
- Organize content for RAG systems

**Content Managers:**
- Inventory and organize content collections
- Generate navigation structures
- Create content discovery systems
- Maintain content metadata

### Technical Architecture

**Content Processing:**
- Frontmatter extraction and parsing
- Heading hierarchy analysis
- Content summarization and excerpt generation
- Metadata normalization and enhancement

**Organization System:**
- Directory-based categorization
- Tag and metadata-based grouping
- Custom taxonomy support
- Hierarchical content organization

**Output Generation:**
- Multiple format support (text, JSON, YAML)
- Customizable templates and structures
- Optimized for both human and AI consumption
- Fast incremental updates

### Integration Benefits

**With Inform:** Use Inform to crawl websites, then Catalog to organize the extracted content
**With Unify:** Generate documentation sites with Catalog-created navigation structures
**With Giv:** Track documentation changes and generate content catalogs for releases
**With AI Systems:** Direct integration with embeddings, search, and RAG architectures

[Get Started →](/catalog/getting-started/) | [View Documentation →](/catalog/docs/)
---
title: About Inform
---

<template slot="title">Inform – Web Content Crawler</template>
<template slot="description">High-performance web crawler that converts sites to clean Markdown.</template>

<template slot="hero">
  <h1 style="view-transition-name: inform-hero">Inform</h1>
  <p>Convert websites to Markdown in minutes. Fast crawl → clean docs.</p>
</template>

## What is Inform?

Inform is a blazing-fast web crawler built specifically for extracting content from websites and converting it to clean, structured Markdown. Perfect for creating documentation archives, knowledge bases, or preparing web content for AI processing.

### Key Features

- **High-Performance Crawling**: Concurrent processing with intelligent rate limiting
- **Clean Markdown Output**: Converts HTML to well-formatted Markdown with preserved structure
- **Smart Content Extraction**: Automatically identifies and extracts main content, ignoring navigation and ads
- **Respectful Crawling**: Honors robots.txt, implements backoff strategies, and respects server limits
- **Flexible Filtering**: Include/exclude patterns for URLs, file types, and content sections

### How It Works

1. **URL Discovery**: Starts from seed URLs and discovers linked pages
2. **Content Extraction**: Uses intelligent parsing to identify main content
3. **HTML Processing**: Removes navigation, ads, and UI elements
4. **Markdown Conversion**: Converts clean HTML to structured Markdown
5. **File Organization**: Saves content with logical directory structure

### Perfect For

**Documentation Teams:**
- Archive existing documentation sites
- Convert legacy docs to Markdown format
- Create offline documentation copies
- Migrate content between platforms

**Content Creators:**
- Research and content aggregation
- Creating knowledge bases from multiple sources
- Preparing web content for AI processing
- Building documentation from scattered sources

**Developers:**
- API documentation extraction
- Code example collection
- Technical content aggregation
- Legacy system documentation

### Technical Architecture

**High-Performance Design:**
- Concurrent crawling with configurable worker pools
- Memory-efficient streaming for large sites
- Intelligent duplicate detection and URL normalization
- Robust error handling and retry mechanisms

**Content Processing:**
- DOM parsing with jsdom for accurate content extraction
- Turndown library for HTML-to-Markdown conversion
- Smart content area detection (removes nav, ads, footers)
- Preserves code blocks, links, and formatting structure

**Respectful Crawling:**
- Robots.txt compliance and sitemap discovery
- Configurable delays and rate limiting
- User-agent identification and server politeness
- Exponential backoff for rate-limited requests

### Output Quality

**Clean Markdown:**
- Properly formatted headings and structure
- Preserved code blocks with syntax highlighting hints
- Clean link formatting with reference-style links
- Maintained table structure and list formatting

**Organized Structure:**
- Logical directory hierarchy based on URL structure
- Consistent file naming conventions
- Metadata preservation in frontmatter
- Asset linking and optional download

[Get Started →](/inform/getting-started/) | [View Documentation →](/inform/docs/)
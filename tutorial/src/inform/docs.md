---
title: Inform – Documentation
---

<template data-target="title">Inform – Documentation</template>
<template data-target="description">Complete reference for web crawling and content extraction.</template>

## Documentation Overview

Comprehensive guide to using Inform for high-performance web crawling and content extraction.

## Command Reference

### `inform <url> [options]`

Primary command for crawling websites and extracting content.

**Basic Usage:**
```bash
inform https://example.com                    # Single page
inform https://docs.example.com --recursive   # Full site crawl
inform --config crawl-config.json            # Use configuration file
```

### Core Options

**URL and Scope:**
```bash
--recursive, -r                # Follow links recursively
--depth <number>               # Maximum link depth (default: 3)
--max-pages <number>           # Maximum pages to crawl
--base-url <url>               # Override base URL for relative links
```

**Output Control:**
```bash
--output, -o <directory>       # Output directory (default: ./output)
--format <type>                # Output format: markdown|html|text
--clean-urls                   # Generate clean file names from URLs
--preserve-structure           # Maintain URL directory structure
--flat                         # Flatten directory structure
```

**Content Processing:**
```bash
--content-only                 # Extract main content only
--content-selector <css>       # CSS selector for content area
--remove-selector <css>        # CSS selector for elements to remove
--include-metadata             # Include page metadata in frontmatter
--meta-tags <list>             # Specific meta tags to extract
```

**Filtering:**
```bash
--include <pattern>            # Include URL patterns (glob)
--exclude <pattern>            # Exclude URL patterns (glob)
--skip-extensions <list>       # Skip file extensions (.pdf,.zip)
--skip-images                  # Skip image files
--skip-videos                  # Skip video files
```

**Crawling Behavior:**
```bash
--delay <ms>                   # Delay between requests (default: 1000)
--concurrent <number>          # Concurrent requests (default: 3)
--timeout <ms>                 # Request timeout (default: 30000)
--retries <number>             # Retry attempts (default: 3)
--retry-delay <ms>             # Delay between retries (default: 2000)
```

**Politeness:**
```bash
--respect-robots               # Honor robots.txt (default: true)
--no-robots                    # Ignore robots.txt
--user-agent <string>          # Custom User-Agent header
--follow-redirects             # Follow HTTP redirects (default: true)
```

## Configuration Files

### JSON Configuration

**Basic Configuration:**
```json
{
  "baseUrl": "https://docs.example.com",
  "output": "./documentation",
  "recursive": true,
  "depth": 5,
  "maxPages": 1000,
  "format": "markdown"
}
```

**Advanced Configuration:**
```json
{
  "baseUrl": "https://help.example.com",
  "output": "./help-docs",
  "recursive": true,
  "depth": 4,
  "maxPages": 500,
  
  "crawling": {
    "delay": 1500,
    "concurrent": 2,
    "timeout": 45000,
    "retries": 3,
    "respectRobots": true,
    "userAgent": "Inform Documentation Crawler 1.0"
  },
  
  "filtering": {
    "include": [
      "*/docs/*",
      "*/guides/*",
      "*/tutorials/*"
    ],
    "exclude": [
      "*/archive/*",
      "*/old/*",
      "*/temp/*"
    ],
    "skipExtensions": [".pdf", ".zip", ".exe", ".dmg"]
  },
  
  "content": {
    "contentOnly": true,
    "contentSelector": "main, .content, .documentation",
    "removeSelector": "nav, .sidebar, .ads, .footer",
    "includeMetadata": true,
    "metaTags": ["description", "keywords", "author", "date"]
  },
  
  "output": {
    "cleanUrls": true,
    "preserveStructure": true,
    "filenameFromTitle": true,
    "filenamePattern": "{category}-{slug}.md",
    "handleDuplicates": "suffix"
  }
}
```

### YAML Configuration

```yaml
# inform-config.yaml
baseUrl: https://api.example.com/docs
output: ./api-docs
recursive: true
depth: 3
maxPages: 200

crawling:
  delay: 1000
  concurrent: 3
  respectRobots: true
  userAgent: "API Docs Crawler"

filtering:
  include:
    - "*/reference/*"
    - "*/guides/*"
  exclude:
    - "*/examples/*"
    - "*/playground/*"

content:
  contentSelector: ".api-documentation"
  includeMetadata: true
  metaTags: ["description", "version"]

output:
  format: markdown
  cleanUrls: true
  filenameFromTitle: true
```

## Content Extraction

### CSS Selectors

**Content Area Selection:**
```bash
# Common content selectors
--content-selector "main"
--content-selector ".content, .post-content, .documentation"
--content-selector "article, .article-body"
--content-selector "[role='main'], .main-content"
```

**Element Removal:**
```bash
# Remove navigation and UI elements
--remove-selector "nav, .navigation, .sidebar"
--remove-selector ".ads, .advertisement, .social-share"
--remove-selector ".comments, .comment-section"
--remove-selector "header, footer, .header, .footer"
```

**Advanced Selectors:**
```bash
# Combine multiple selectors
--content-selector "main .content, .post-body, .documentation-content"

# Use attribute selectors
--content-selector "[data-content='true'], .content[role='main']"

# Exclude specific elements within content
--remove-selector ".content .sidebar, .content .ads"
```

### Metadata Extraction

**Frontmatter Generation:**
```markdown
---
title: Page Title from <title> or <h1>
description: Meta description content
url: https://example.com/page
date: 2025-01-15
author: Author Name
tags: [tag1, tag2, tag3]
category: Documentation
---

# Page Content

Extracted and converted content...
```

**Custom Meta Tags:**
```bash
# Extract specific meta tags
--meta-tags "description,keywords,author,date,category"

# Include OpenGraph tags
--meta-tags "og:title,og:description,og:image,og:type"

# Include Twitter Card tags
--meta-tags "twitter:title,twitter:description,twitter:image"
```

### Content Processing

**HTML to Markdown Conversion:**
- Preserves heading hierarchy (H1-H6 → #-######)
- Converts links with reference-style formatting
- Maintains code blocks with language hints
- Preserves table structure
- Handles nested lists and formatting

**Code Block Processing:**
```html
<!-- Input HTML -->
<pre><code class="language-javascript">
function hello() {
  console.log("Hello, world!");
}
</code></pre>
```

```markdown
<!-- Output Markdown -->
```javascript
function hello() {
  console.log("Hello, world!");
}
```
```

## URL Filtering

### Include Patterns

**Glob Patterns:**
```bash
# Include specific directories
--include "*/docs/*" "*/api/*" "*/guides/*"

# Include file patterns
--include "*.html" "*/reference/*.html"

# Include subdomain patterns
--include "docs.*.com/*" "help.*.org/*"
```

**Regular Expressions:**
```bash
# Advanced pattern matching
--include-regex "^https://docs\.example\.com/(api|guides|tutorials)/"
--include-regex ".*\/docs\/v[0-9]+\/"
```

### Exclude Patterns

**Common Exclusions:**
```bash
# Skip archives and old content
--exclude "*/archive/*" "*/old/*" "*/deprecated/*"

# Skip user-generated content
--exclude "*/comments/*" "*/forums/*" "*/discussions/*"

# Skip media and downloads
--exclude "*/downloads/*" "*/media/*" "*/assets/*"
```

**File Type Exclusions:**
```bash
# Skip binary files
--skip-extensions ".pdf,.zip,.exe,.dmg,.pkg"

# Skip media files
--skip-extensions ".mp4,.mp3,.avi,.mov,.wav"

# Skip development files
--skip-extensions ".js,.css,.json,.xml,.yaml"
```

## Performance Optimization

### Concurrent Processing

**Worker Configuration:**
```bash
# Conservative settings for small sites
--concurrent 2 --delay 2000

# Balanced settings for medium sites
--concurrent 3 --delay 1000

# Aggressive settings for large sites (use carefully)
--concurrent 5 --delay 500
```

**Memory Management:**
```bash
# Low memory mode for huge sites
--streaming --low-memory

# Batch processing
--batch-size 50

# Cache responses for development
--cache --cache-dir ./crawl-cache
```

### Rate Limiting

**Adaptive Delays:**
```json
{
  "crawling": {
    "delay": 1000,
    "adaptiveDelay": true,
    "maxDelay": 5000,
    "backoffMultiplier": 2
  }
}
```

**Server Politeness:**
```bash
# Respectful crawling
--delay 2000 --concurrent 1 --respect-robots

# Monitor server responses
--monitor-responses --auto-throttle
```

## Advanced Features

### Resume and Caching

**Resume Interrupted Crawls:**
```bash
# Enable resume capability
inform https://largsite.com --resume --cache

# Resume from specific state file
inform --resume-from ./crawl-state.json
```

**Caching Strategy:**
```bash
# Cache all responses
inform https://site.com --cache --cache-dir ./cache

# Cache only successful responses
inform https://site.com --cache-success-only

# Set cache expiration
inform https://site.com --cache --cache-ttl 3600  # 1 hour
```

### Custom Processing

**Content Post-Processing:**
```bash
# Custom content filters
inform https://site.com --post-process "./custom-filter.js"

# Markdown processing
inform https://site.com --markdown-options '{"breaks": true, "linkify": true}'
```

**File Organization:**
```bash
# Custom file naming
--filename-pattern "{category}/{date}-{slug}.md"
--filename-pattern "{section}/{title}-{index}.md"

# Directory structure
--dir-pattern "{year}/{month}/{category}"
--dir-pattern "{section}/{subsection}"
```

### Integration Hooks

**Pre/Post Processing:**
```json
{
  "hooks": {
    "beforeRequest": "./hooks/before-request.js",
    "afterResponse": "./hooks/after-response.js",
    "beforeWrite": "./hooks/before-write.js",
    "afterCrawl": "./hooks/after-crawl.js"
  }
}
```

**Custom Output Formats:**
```json
{
  "output": {
    "format": "custom",
    "customFormatter": "./formatters/my-format.js",
    "formatOptions": {
      "includeSourceUrl": true,
      "addTimestamp": true
    }
  }
}
```

## Error Handling

### Common Errors

**Network Issues:**
```bash
# Increase timeouts and retries
--timeout 60000 --retries 5 --retry-delay 3000

# Handle specific error codes
--ignore-errors "404,403" --continue-on-error
```

**Content Extraction Problems:**
```bash
# Debug content selectors
--debug --verbose

# Fallback selectors
--content-selector "main, .content, article, .post"
--content-fallback "body"
```

**Memory Issues:**
```bash
# Use streaming mode
--streaming --low-memory

# Reduce concurrent requests
--concurrent 1 --batch-size 10
```

### Debugging

**Verbose Output:**
```bash
# Enable debug logging
inform https://site.com --debug --verbose

# Log to file
inform https://site.com --log-file ./crawl.log --log-level debug
```

**Request Monitoring:**
```bash
# Monitor all requests
inform https://site.com --monitor-requests

# Save response headers
inform https://site.com --save-headers --debug-dir ./debug
```

## Best Practices

### Ethical Crawling

**Respect Robots.txt:**
- Always check robots.txt before crawling
- Honor crawl delays specified in robots.txt
- Respect disallowed paths and patterns
- Use appropriate User-Agent identification

**Server Politeness:**
- Use reasonable delays between requests
- Limit concurrent connections
- Monitor server response codes
- Back off when receiving rate limit errors

**Legal Considerations:**
- Respect website terms of service
- Consider copyright and fair use
- Don't crawl private or password-protected content
- Be transparent about your crawling purpose

### Content Quality

**Selector Testing:**
- Test CSS selectors on sample pages first
- Use browser developer tools to identify content areas
- Validate selectors across different page types
- Have fallback selectors for edge cases

**Output Validation:**
- Review extracted content for quality
- Check markdown formatting
- Verify link preservation
- Test with small samples before large crawls

### Performance Guidelines

**Site Analysis:**
- Analyze site structure before crawling
- Identify the most important content areas
- Estimate crawl time and resource requirements
- Plan for incremental updates

**Resource Management:**
- Monitor memory usage during large crawls
- Use appropriate concurrency settings
- Consider breaking large sites into chunks
- Implement resume capability for long crawls

## Troubleshooting Guide

### Common Issues

**Access Denied (403/401):**
```bash
# Try different user agent
--user-agent "Mozilla/5.0 (compatible; DocumentationBot/1.0)"

# Reduce request rate
--delay 3000 --concurrent 1

# Check robots.txt
curl https://site.com/robots.txt
```

**Empty or Poor Content:**
```bash
# Debug content extraction
--debug --content-selector "main" --verbose

# Try different selectors
--content-selector "article, .content, .post-body"

# Remove interfering elements
--remove-selector "nav, .sidebar, .ads"
```

**Memory Issues:**
```bash
# Enable streaming mode
--streaming --low-memory

# Reduce batch size
--batch-size 10 --concurrent 1

# Use file-based caching
--cache --cache-dir ./cache
```

**Slow Performance:**
```bash
# Increase concurrency (carefully)
--concurrent 5 --delay 500

# Use faster content extraction
--content-only --skip-images

# Enable caching
--cache --resume
```

Ready to start crawling? Begin with our [Getting Started guide →](/inform/getting-started/)
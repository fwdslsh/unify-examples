---
title: About Giv
---

<template slot="title">Giv – AI Git Assistant</template>
<template slot="description">AI-powered commit messages, changelogs, and release notes.</template>

<template slot="hero">
  <h1 style="view-transition-name: giv-hero">Giv</h1>
  <p>Git workflows on autopilot. Never write commit messages again.</p>
</template>

## What is Giv?

Giv is an AI-powered CLI tool that automates your Git workflow by generating intelligent commit messages, comprehensive changelogs, and professional release notes. It analyzes your code changes and Git history to create meaningful documentation automatically.

### Key Features

- **Smart Commit Messages**: AI analyzes your staged changes and generates conventional commit messages
- **Intelligent Changelogs**: Automatically categorizes changes and generates formatted changelogs
- **Release Notes**: Professional release documentation with breaking changes and migration guides
- **Multiple AI Providers**: Supports Anthropic Claude, OpenAI GPT, and local models
- **Conventional Commits**: Follows industry standards for commit message formatting

### How It Works

1. **Stage Your Changes**: Use `git add` as usual
2. **Generate Commit**: Run `giv commit` to create an AI-powered commit message
3. **Review and Edit**: Approve, edit, or regenerate the message
4. **Automatic Changelogs**: Run `giv changelog` to generate release documentation

### Workflow Integration

Giv integrates seamlessly into existing Git workflows:

```bash
# Traditional workflow
git add .
git commit -m "fix: resolve user authentication issue"
git push

# With Giv
git add .
giv commit                    # AI generates the commit message
git push
giv changelog --since v1.0.0  # Generate changelog for release
```

### AI-Powered Analysis

**Commit Message Generation:**
- Analyzes file changes, additions, and deletions
- Understands code context and intent
- Follows conventional commit format automatically
- Suggests appropriate scope and type

**Changelog Creation:**
- Categorizes commits by type (features, fixes, breaking changes)
- Groups related changes together
- Identifies breaking changes and suggests migration steps
- Formats output in standard changelog format

### Professional Documentation

**Release Notes Include:**
- Summary of major changes
- New features with examples
- Bug fixes and improvements
- Breaking changes with migration guides
- Performance improvements
- Security updates

### Multi-Provider Support

Choose your preferred AI provider:
- **Anthropic Claude**: Excellent code understanding and technical writing
- **OpenAI GPT**: Strong general language capabilities
- **Local Models**: Privacy-focused with offline operation
- **Custom Endpoints**: Integration with enterprise AI solutions

[Get Started →](/giv/getting-started/) | [View Documentation →](/giv/docs/)
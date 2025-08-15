---
title: Giv – Documentation
---

<template slot="title">Giv – Documentation</template>
<template slot="description">Complete reference for AI-powered Git workflows.</template>

## Documentation Overview

Comprehensive guide to using Giv for automated Git commit messages, changelogs, and release notes.

## Core Commands

### `giv commit`

Generate AI-powered commit messages from staged changes.

**Basic Usage:**
```bash
giv commit                    # Interactive commit with AI-generated message
giv commit --auto             # Auto-approve and commit immediately
giv commit --dry-run          # Preview message without committing
```

**Advanced Options:**
```bash
giv commit --type feat        # Force specific commit type
giv commit --scope api        # Specify commit scope
giv commit --prompt "Custom context for AI"
giv commit --template custom  # Use custom commit template
giv commit --no-verify        # Skip Git hooks
```

### `giv changelog`

Generate formatted changelogs from Git history.

**Basic Usage:**
```bash
giv changelog                 # Since last tag to HEAD
giv changelog --full          # Complete project history
giv changelog --unreleased    # Include unreleased changes
```

**Version Ranges:**
```bash
giv changelog --since v1.0.0             # From specific version
giv changelog --until v2.0.0             # Up to specific version
giv changelog --since v1.0.0 --until v2.0.0  # Between versions
```

**Filtering:**
```bash
giv changelog --include-types feat,fix   # Only specific types
giv changelog --exclude-types chore      # Exclude specific types
giv changelog --include-scopes api,ui    # Only specific scopes
```

**Output Options:**
```bash
giv changelog --output CHANGELOG.md      # Write to file
giv changelog --format json              # JSON output for tooling
giv changelog --template custom.md       # Custom template
```

### `giv release`

Generate comprehensive release notes.

**Basic Usage:**
```bash
giv release                   # For latest tag
giv release --version v2.1.0 # For specific version
giv release --auto            # Auto-detect version from tags
```

**Content Options:**
```bash
giv release --include-stats   # Add commit and contributor statistics
giv release --include-diff    # Include file change summary
giv release --breaking-only   # Focus on breaking changes
```

### `giv config`

Manage Giv configuration settings.

**View Configuration:**
```bash
giv config list              # Show all settings
giv config get provider       # Get specific setting
giv config show              # Show config file location
```

**Update Settings:**
```bash
giv config set provider anthropic
giv config set model claude-3-haiku-20240307
giv config set temperature 0.3
giv config unset api-key     # Remove setting
```

## Configuration Reference

### Core Settings

**AI Provider Configuration:**
```bash
# Provider selection
giv config set provider anthropic|openai|ollama|custom

# Model selection
giv config set model claude-3-haiku-20240307
giv config set model gpt-4o-mini
giv config set model llama2

# API configuration
giv config set api-key your-api-key
giv config set base-url http://localhost:11434
giv config set timeout 30
```

**AI Behavior:**
```bash
# Response parameters
giv config set temperature 0.3      # 0.0-1.0, lower = more consistent
giv config set max-tokens 200       # Maximum response length
giv config set top-p 0.9            # Nucleus sampling (0.0-1.0)

# Retry behavior
giv config set max-retries 3        # Number of retry attempts
giv config set retry-delay 1        # Delay between retries (seconds)
```

### Output Formatting

**Commit Messages:**
```bash
# Commit format preferences
giv config set commit-format conventional  # conventional|simple|custom
giv config set include-body true          # Include detailed body
giv config set include-footer true        # Include footer with references
giv config set max-subject-length 50      # Subject line length limit
```

**Changelog Format:**
```bash
# Changelog preferences
giv config set changelog-format markdown   # markdown|json|yaml
giv config set group-by-type true         # Group changes by type
giv config set include-authors true       # Include commit authors
giv config set date-format "2006-01-02"   # Date format string
```

### Templates

**Commit Template:**
```bash
# Set custom commit template
giv config set commit-template ~/.giv/commit.tmpl

# Template variables: {type}, {scope}, {description}, {body}, {footer}
```

**Changelog Template:**
```bash
# Set custom changelog template
giv config set changelog-template ~/.giv/changelog.tmpl

# Template variables: {version}, {date}, {changes}, {stats}
```

## AI Provider Configuration

### Anthropic Claude

**Setup:**
```bash
export ANTHROPIC_API_KEY="your-api-key"
giv config set provider anthropic
giv config set model claude-3-haiku-20240307
```

**Available Models:**
- `claude-3-haiku-20240307` (Fast, cost-effective)
- `claude-3-sonnet-20240229` (Balanced performance)
- `claude-3-opus-20240229` (Most capable)

### OpenAI GPT

**Setup:**
```bash
export OPENAI_API_KEY="your-api-key"
giv config set provider openai
giv config set model gpt-4o-mini
```

**Available Models:**
- `gpt-4o-mini` (Fast, affordable)
- `gpt-4o` (Most capable)
- `gpt-3.5-turbo` (Legacy, fast)

### Local Models (Ollama)

**Setup:**
```bash
# Install and start Ollama
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve

# Pull a model
ollama pull llama2

# Configure Giv
giv config set provider ollama
giv config set model llama2
giv config set base-url http://localhost:11434
```

**Popular Models:**
- `llama2` (General purpose)
- `codellama` (Code-focused)
- `mistral` (Lightweight, fast)

### Custom Providers

**Setup:**
```bash
giv config set provider custom
giv config set base-url https://your-api-endpoint.com
giv config set api-key your-custom-key
giv config set model your-model-name
```

## Advanced Features

### Custom Prompts

**Commit Prompt Customization:**
```bash
# Set custom system prompt for commits
giv config set commit-prompt "You are a Git expert. Generate clear, professional commit messages following conventional commits format. Focus on user impact and technical accuracy."

# Use prompt files
giv config set commit-prompt-file ~/.giv/commit-prompt.txt
```

**Changelog Prompt Customization:**
```bash
# Custom changelog prompt
giv config set changelog-prompt "Generate a user-friendly changelog that emphasizes features and benefits. Group related changes and provide clear descriptions."
```

### Integration Patterns

**Pre-commit Hooks:**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: giv-commit-msg
        name: Generate commit message with Giv
        entry: giv
        args: ["commit", "--dry-run", "--validate"]
        language: system
        stages: [commit-msg]
```

**Git Aliases:**
```bash
# Add convenient aliases
git config --global alias.ai '!giv commit'
git config --global alias.changelog '!giv changelog'
git config --global alias.release '!giv release'

# Usage
git ai                        # Same as 'giv commit'
git changelog --since v1.0.0  # Generate changelog
git release --auto            # Generate release notes
```

**CI/CD Integration:**
```yaml
# GitHub Actions example
- name: Generate Release Notes
  run: |
    pip install giv
    giv release --version ${{ github.ref_name }} --output release-notes.md
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Custom Templates

**Commit Template** (`~/.giv/commit.tmpl`):
```
{{.Type}}{{if .Scope}}({{.Scope}}){{end}}: {{.Description}}

{{if .Body}}{{.Body}}

{{end}}{{if .Footer}}{{.Footer}}{{end}}
```

**Changelog Template** (`~/.giv/changelog.tmpl`):
```markdown
# Changelog

## [{{.Version}}] - {{.Date}}

{{if .Breaking}}
### ⚠️ Breaking Changes
{{range .Breaking}}
- {{.Description}}
{{end}}
{{end}}

{{if .Features}}
### ✨ Features
{{range .Features}}
- {{.Description}}{{if .Scope}} ({{.Scope}}){{end}}
{{end}}
{{end}}

{{if .Fixes}}
### 🐛 Bug Fixes
{{range .Fixes}}
- {{.Description}}{{if .Scope}} ({{.Scope}}){{end}}
{{end}}
{{end}}

{{if .Stats}}
### 📊 Statistics
- **Commits**: {{.Stats.Commits}}
- **Contributors**: {{.Stats.Contributors}}
- **Files Changed**: {{.Stats.FilesChanged}}
{{end}}
```

## Workflow Examples

### Feature Development

```bash
# Start feature branch
git checkout -b feature/user-auth

# Implement authentication
# ... make changes ...
git add .

# AI-generated commit
giv commit
# Result: "feat(auth): implement OAuth2 login with Google and GitHub"

# Continue development
# ... more changes ...
git add .
giv commit --type fix
# Result: "fix(auth): resolve token refresh race condition"

# Merge to main
git checkout main
git merge feature/user-auth
```

### Release Process

```bash
# Generate changelog for release
giv changelog --since v1.5.0 --output CHANGELOG.md

# Review and edit changelog
editor CHANGELOG.md

# Create release notes
giv release --version v2.0.0 --include-stats --output RELEASE_NOTES.md

# Tag and release
git tag v2.0.0
git push origin v2.0.0

# GitHub release with generated notes
gh release create v2.0.0 --notes-file RELEASE_NOTES.md
```

### Team Standardization

**Project Configuration** (`.giv/config.yaml`):
```yaml
provider: anthropic
model: claude-3-haiku-20240307
commit_format: conventional
include_body: true
max_subject_length: 50
commit_types:
  - feat
  - fix
  - docs
  - style
  - refactor
  - perf
  - test
  - chore
scopes:
  - api
  - ui
  - auth
  - db
  - docs
```

## Troubleshooting

### Common Issues

**API Rate Limits:**
```bash
# Increase retry delay
giv config set retry-delay 2
giv config set max-retries 5

# Use more efficient models
giv config set model claude-3-haiku-20240307  # Faster/cheaper
```

**Poor Commit Message Quality:**
```bash
# Adjust AI parameters
giv config set temperature 0.2      # More consistent
giv config set max-tokens 150       # Longer messages

# Provide better context
giv commit --prompt "This change improves performance by caching database queries"
```

**Configuration Issues:**
```bash
# Reset to defaults
giv config reset

# Check current settings
giv config list

# Debug mode
giv --debug commit
```

### Best Practices

**Code Organization:**
- Make focused, single-purpose commits
- Use meaningful file and function names
- Add code comments for complex logic
- Stage related changes together

**AI Prompt Engineering:**
- Include context in commit prompts
- Use descriptive branch names
- Add TODO comments for incomplete features
- Write clear pull request descriptions

**Team Collaboration:**
- Standardize configuration across team
- Use consistent commit types and scopes
- Review AI-generated content before approving
- Establish changelog and release note conventions

## API Reference

### Exit Codes

- `0`: Success
- `1`: General error
- `2`: Configuration error
- `3`: Git repository error
- `4`: AI provider error
- `5`: Template error

### Environment Variables

```bash
# AI Provider Keys
ANTHROPIC_API_KEY=your-key
OPENAI_API_KEY=your-key
OLLAMA_HOST=http://localhost:11434

# Giv Configuration
GIV_PROVIDER=anthropic
GIV_MODEL=claude-3-haiku-20240307
GIV_AUTO_APPROVE=false
GIV_CONFIG_DIR=~/.giv
GIV_TEMPLATE_DIR=~/.giv/templates

# Debug and Logging
GIV_DEBUG=true
GIV_LOG_LEVEL=info
GIV_LOG_FILE=~/.giv/giv.log
```

### JSON Output Format

**Commit Command:**
```json
{
  "type": "feat",
  "scope": "auth",
  "description": "implement OAuth2 login",
  "body": "Add Google and GitHub OAuth2 providers...",
  "footer": "Closes #123",
  "conventional": "feat(auth): implement OAuth2 login"
}
```

**Changelog Command:**
```json
{
  "version": "v2.0.0",
  "date": "2025-01-15",
  "changes": [
    {
      "type": "feat",
      "scope": "auth",
      "description": "implement OAuth2 login",
      "hash": "abc123",
      "author": "Developer Name"
    }
  ],
  "stats": {
    "commits": 15,
    "contributors": 3,
    "files_changed": 8
  }
}
```

Ready to revolutionize your Git workflow? Start with our [Getting Started guide →](/giv/getting-started/)
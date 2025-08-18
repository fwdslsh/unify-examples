---
title: Giv – Getting Started
---

<template data-target="title">Giv – Getting Started</template>
<template data-target="description">Start using AI for your Git workflow in minutes.</template>

## Installation

Install Giv using pip (Python package manager):

```bash
# Install from PyPI
pip install giv

# Or using pipx for isolated installation
pipx install giv

# Verify installation
giv --version
```

**System Requirements:**
- Python 3.9 or higher
- Git (any recent version)
- API key for your chosen AI provider

## Quick Setup

### 1. Configure AI Provider

Choose your preferred AI provider and set up authentication:

**Anthropic Claude (Recommended):**
```bash
# Set your API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Configure Giv to use Claude
giv config set provider anthropic
giv config set model claude-3-haiku-20240307
```

**OpenAI GPT:**
```bash
# Set your API key
export OPENAI_API_KEY="your-api-key-here"

# Configure Giv
giv config set provider openai
giv config set model gpt-4o-mini
```

**Local Models:**
```bash
# Configure for local Ollama installation
giv config set provider ollama
giv config set model llama2
giv config set base-url http://localhost:11434
```

### 2. First Commit

Navigate to any Git repository and try your first AI-generated commit:

```bash
# Make some changes
echo "# My Project" > README.md
git add README.md

# Generate AI commit message
giv commit

# Review the suggested message and approve/edit/regenerate
```

### 3. Generate a Changelog

Create a changelog from your Git history:

```bash
# Generate changelog since last tag
giv changelog

# Generate changelog between specific versions
giv changelog --since v1.0.0 --until v2.0.0

# Output to file
giv changelog --output CHANGELOG.md
```

## Essential Commands

### Commit Generation

**Basic commit:**
```bash
giv commit                    # Interactive commit with AI message
giv commit --auto             # Auto-approve and commit
giv commit --dry-run          # Show message without committing
```

**Custom prompts:**
```bash
giv commit --prompt "Focus on performance improvements"
giv commit --type feat        # Force commit type
giv commit --scope api        # Specify scope
```

### Changelog Generation

**Standard changelog:**
```bash
giv changelog                 # Since last tag
giv changelog --unreleased    # Include unreleased changes
giv changelog --full          # Complete project history
```

**Filtering and formatting:**
```bash
giv changelog --since v1.0.0 --until HEAD
giv changelog --include-types feat,fix,perf
giv changelog --format markdown
giv changelog --template custom-template.md
```

### Release Notes

**Generate release notes:**
```bash
giv release --version v2.1.0
giv release --auto            # Auto-detect version from tags
giv release --include-stats   # Include commit and contributor stats
```

### Configuration

**View current config:**
```bash
giv config list              # Show all settings
giv config get provider       # Get specific setting
```

**Update settings:**
```bash
giv config set provider anthropic
giv config set model claude-3-haiku-20240307
giv config set temperature 0.3
giv config set max-tokens 150
```

## Conventional Commits

Giv automatically follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Supported Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Example Generated Commits:**
```bash
feat(auth): add OAuth2 integration with Google and GitHub

- Implement OAuth2 flow for external authentication
- Add user profile sync from provider APIs
- Include logout functionality with token revocation

Closes #123
```

## Workflow Integration

### Daily Development

```bash
# 1. Work on features
git checkout -b feature/user-dashboard
# ... make changes ...

# 2. Stage and commit with AI
git add .
giv commit
# AI suggests: "feat(dashboard): implement user metrics visualization"

# 3. Continue development
# ... more changes ...
git add .
giv commit --type fix
# AI suggests: "fix(dashboard): resolve chart rendering on mobile devices"
```

### Release Preparation

```bash
# 1. Generate comprehensive changelog
giv changelog --since v1.5.0 --output CHANGELOG.md

# 2. Create release notes
giv release --version v2.0.0 --output RELEASE_NOTES.md

# 3. Review and edit generated content
# 4. Create release
git tag v2.0.0
git push --tags
```

### Team Workflows

**Standardize commit messages:**
```bash
# Add to .gitmessage template
giv config set template-file .gitmessage
```

**Pre-commit hooks:**
```bash
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: giv-commit-check
        name: Check commit message format
        entry: giv validate-commit
        language: system
        stages: [commit-msg]
```

## Advanced Configuration

### Custom Templates

Create custom templates for consistent formatting:

**Commit template** (`.giv/commit-template.txt`):
```
{type}({scope}): {description}

{body}

{footer}
```

**Changelog template** (`.giv/changelog-template.md`):
```markdown
# Changelog

## [{version}] - {date}

### Added
{added_changes}

### Changed
{changed_changes}

### Fixed
{fixed_changes}

### Breaking Changes
{breaking_changes}
```

### API Configuration

**Fine-tune AI behavior:**
```bash
giv config set temperature 0.2      # Lower = more consistent
giv config set max-tokens 200       # Longer commit messages
giv config set top-p 0.9            # Nucleus sampling parameter
```

**Custom prompts:**
```bash
giv config set commit-prompt "Generate a clear, professional commit message focusing on user impact"
giv config set changelog-prompt "Create a user-friendly changelog emphasizing benefits"
```

### Environment Variables

Set environment variables for CI/CD integration:

```bash
export GIV_PROVIDER=anthropic
export GIV_MODEL=claude-3-haiku-20240307
export GIV_AUTO_APPROVE=true
export GIV_OUTPUT_FORMAT=json
```

## Integration Examples

### CI/CD Pipeline

```yaml
# .github/workflows/release.yml
name: Generate Release
on:
  push:
    tags: ['v*']

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Install Giv
        run: pip install giv
        
      - name: Generate Changelog
        run: |
          giv changelog --since ${{ github.event.before }} > CHANGELOG.md
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: CHANGELOG.md
```

### Git Aliases

Add convenient Git aliases:

```bash
git config --global alias.ai-commit '!giv commit'
git config --global alias.ai-log '!giv changelog --since HEAD~10'
git config --global alias.ai-release '!giv release --auto'
```

## Troubleshooting

### Common Issues

**API Key Not Found:**
```bash
# Check environment variables
echo $ANTHROPIC_API_KEY
echo $OPENAI_API_KEY

# Or set in config
giv config set api-key your-key-here
```

**Model Not Available:**
```bash
# List available models
giv models list

# Update model config
giv config set model claude-3-haiku-20240307
```

**No Changes Detected:**
```bash
# Check Git status
git status

# Ensure changes are staged
git add .
giv commit
```

### Best Practices

**Commit Frequency:**
- Make smaller, focused commits for better AI analysis
- Stage related changes together
- Use descriptive file names and code comments

**AI Prompt Engineering:**
- Add context in comments when making complex changes
- Use meaningful variable and function names
- Include TODO comments for incomplete features

**Review Generated Content:**
- Always review AI-generated messages before approving
- Edit messages to add project-specific context
- Regenerate if the first attempt isn't suitable

Ready to streamline your Git workflow? Check out the [full documentation →](/giv/docs/)
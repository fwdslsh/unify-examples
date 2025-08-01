#!/bin/bash

# Build all unify examples
# Usage: ./build-all.sh

set -e

echo "🚀 Building all unify examples..."

# Path to the unify CLI
CLI_PATH="../cli/bin/cli.js"

# Basic example
echo "📦 Building basic example..."
node "$CLI_PATH" build -s basic/src -o basic/dist

# Markdown example  
echo "📦 Building markdown example..."
node "$CLI_PATH" build -s markdown/src -o markdown/dist --pretty-urls

# Advanced example
echo "📦 Building advanced example..."
node "$CLI_PATH" build -s advanced/src -o advanced/dist

echo "✅ All examples built successfully!"
echo ""
echo "Preview examples with:"
echo "  Basic:    cd basic && npx @fwdslsh/unify serve dist"
echo "  Markdown: cd markdown && npx @fwdslsh/unify serve dist"
echo "  Advanced: cd advanced && npx @fwdslsh/unify serve dist"

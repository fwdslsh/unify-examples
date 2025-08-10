#!/bin/bash

# Build all unify examples
# Usage: ./build-all.sh

set -e

echo "🚀 Building all unify examples..."

# Basic example
echo "📦 Building basic example..."
unify build -s basic/src -o basic/dist

# Markdown example  
echo "📦 Building markdown example..."
unify build -s markdown/src -o markdown/dist --pretty-urls

# Advanced example
echo "📦 Building advanced example..."
unify build -s advanced/src -o advanced/dist

echo "✅ All examples built successfully!"
echo ""
echo "Preview examples with:"
echo "  Basic:    cd basic && npx serve dist"
echo "  Markdown: cd markdown && npx serve dist"
echo "  Advanced: cd advanced && npx serve dist"

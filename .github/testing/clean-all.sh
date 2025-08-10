#!/bin/bash

# Clean all unify example dist directories
# Usage: ./.github/testing/clean-all.sh

echo "🧹 Cleaning all example dist directories..."

# Get the directory of this script and navigate to repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
cd "$REPO_ROOT"

# Remove dist directories
if [ -d "basic/dist" ]; then
    rm -rf basic/dist
    echo "  ✅ Cleaned basic/dist"
fi

if [ -d "markdown/dist" ]; then
    rm -rf markdown/dist
    echo "  ✅ Cleaned markdown/dist"
fi

if [ -d "advanced/dist" ]; then 
    rm -rf advanced/dist
    echo "  ✅ Cleaned advanced/dist"
fi

# Clean any test artifacts
if [ -d "tmp-e2e-tests" ]; then
    rm -rf tmp-e2e-tests
    echo "  ✅ Cleaned test artifacts"
fi

echo "✨ All directories cleaned!"

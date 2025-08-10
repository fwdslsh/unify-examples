#!/bin/bash

# Run E2E validation tests for all examples
# Usage: ./.github/testing/validate-examples.sh [--verbose]

set -e

echo "🧪 Running unify examples E2E validation..."

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

cd "$REPO_ROOT"

# Pass any arguments (like --verbose) to the test runner
if [ "$1" = "--verbose" ]; then
    node .github/testing/test-runner.js --verbose
else
    node .github/testing/test-runner.js
fi

echo ""
echo "💡 To run individual tests:"
echo "  node .github/testing/test-runner.js          - Run all tests"
echo "  node .github/testing/test-runner.js --verbose - Run with detailed output"
echo ""
echo "💡 To build examples manually:"
echo "  ./build-all.sh    - Build all examples"
echo "  ./clean-all.sh    - Clean all dist directories"

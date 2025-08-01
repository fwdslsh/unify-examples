#!/bin/bash

# Run E2E validation tests for all examples
# Usage: ./validate-examples.sh [--verbose]

set -e

echo "🧪 Running unify examples E2E validation..."

# Pass any arguments (like --verbose) to the test runner
if [ "$1" = "--verbose" ]; then
    npm run test:verbose
else
    npm test
fi

echo ""
echo "💡 To run individual tests:"
echo "  npm test          - Run all tests"
echo "  npm run test:verbose - Run with detailed output"
echo ""
echo "💡 To build examples manually:"
echo "  ./build-all.sh    - Build all examples"
echo "  ./clean-all.sh    - Clean all dist directories"

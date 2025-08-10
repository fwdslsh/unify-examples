# Testing Infrastructure

This directory contains the testing infrastructure for the unify examples. These tests are primarily intended for:

- **Contributors** working on the examples
- **Advanced users** who want to validate the examples
- **Release validation** to ensure examples work with latest unify versions

## Running Tests Manually

If you need to run the tests manually (for development or contribution purposes):

### Prerequisites

1. Install Node.js 18+
2. Install Bun runtime: `curl -fsSL https://bun.sh/install | bash`
3. Install unify CLI: `npm install -g @fwdslsh/unify`
4. Install test dependencies: `npm install` (from repository root)

### Run Tests

```bash
# From repository root
export PATH="$HOME/.bun/bin:$PATH"

# Run all tests
node .github/testing/test-runner.js

# Run with verbose output
node .github/testing/test-runner.js --verbose

# Or use the validation script
bash .github/testing/validate-examples.sh
```

## Test Configuration

- `test-config.json` - Test configuration and validation rules
- `test-runner.js` - Main test runner script
- `validate-examples.sh` - Wrapper script for running tests

## Automated Testing

Tests are automatically run during GitHub releases to validate that all examples work correctly with the latest published version of unify.

## For Regular Users

If you're just here to explore the examples, you don't need to worry about this testing infrastructure. Focus on the example directories (`/basic`, `/markdown`, `/advanced`) and their documentation.
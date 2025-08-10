#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * E2E Test Runner for unify examples
 * 
 * This script:
 * 1. Sets up a temporary test environment
 * 2. Runs builds for each example 
 * 3. Validates outputs against expected results
 * 4. Reports detailed pass/fail results
 */

class TestRunner {
  constructor() {
    this.config = JSON.parse(fs.readFileSync('test-config.json', 'utf8'));
    this.verbose = process.argv.includes('--verbose');
    this.testResults = {};
    this.startTime = Date.now();
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = chalk.gray(`[${timestamp}]`);
    
    switch (level) {
      case 'success':
        console.log(`${prefix} ${chalk.green('✅')} ${message}`);
        break;
      case 'error':
        console.log(`${prefix} ${chalk.red('❌')} ${message}`);
        break;
      case 'warning':
        console.log(`${prefix} ${chalk.yellow('⚠️')} ${message}`);
        break;
      case 'info':
        if (this.verbose) {
          console.log(`${prefix} ${chalk.blue('ℹ️')} ${message}`);
        }
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }

  async runCommand(command, cwd, timeout = 30000) {
    return new Promise((resolve, reject) => {
      this.log(`Running: ${command} in ${cwd}`, 'info');
      
      const child = spawn('sh', ['-c', command], { 
        cwd,
        stdio: this.verbose ? 'inherit' : 'pipe'
      });

      let stdout = '';
      let stderr = '';

      if (!this.verbose) {
        child.stdout?.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr?.on('data', (data) => {
          stderr += data.toString();
        });
      }

      const timer = setTimeout(() => {
        child.kill();
        reject(new Error(`Command timed out after ${timeout}ms`));
      }, timeout);

      child.on('close', (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve({ stdout, stderr, code });
        } else {
          reject(new Error(`Command failed with code ${code}\\nstderr: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });
    });
  }

  async validateFile(filePath, validations) {
    const results = [];

    for (const validation of validations) {
      try {
        switch (validation.type) {
          case 'file-exists':
            for (const file of validation.files) {
              const fullPath = path.join(filePath, file);
              const exists = await fs.pathExists(fullPath);
              results.push({
                type: 'file-exists',
                file,
                passed: exists,
                message: exists ? `File ${file} exists` : `File ${file} missing`
              });
            }
            break;

          case 'content-includes':
            const content = await fs.readFile(path.join(filePath, validation.file), 'utf8');
            
            // Check required content
            for (const required of validation.mustContain || []) {
              const contains = content.includes(required);
              results.push({
                type: 'content-includes',
                file: validation.file,
                check: `must contain "${required}"`,
                passed: contains,
                message: contains ? 
                  `Content contains "${required}"` : 
                  `Content missing "${required}"`
              });
            }

            // Check forbidden content
            for (const forbidden of validation.mustNotContain || []) {
              const contains = content.includes(forbidden);
              results.push({
                type: 'content-excludes',
                file: validation.file,
                check: `must not contain "${forbidden}"`,
                passed: !contains,
                message: !contains ? 
                  `Content correctly excludes "${forbidden}"` : 
                  `Content incorrectly contains "${forbidden}"`
              });
            }
            break;

          default:
            results.push({
              type: validation.type,
              passed: false,
              message: `Unknown validation type: ${validation.type}`
            });
        }
      } catch (error) {
        results.push({
          type: validation.type,
          passed: false,
          message: `Validation error: ${error.message}`
        });
      }
    }

    return results;
  }

  async testExample(exampleName, exampleConfig) {
    this.log(`\\n🧪 Testing: ${chalk.cyan(exampleConfig.name)}`, 'info');
    this.log(`Description: ${exampleConfig.description}`, 'info');

    const testResult = {
      name: exampleName,
      config: exampleConfig,
      buildPassed: false,
      validationsPassed: 0,
      validationsTotal: 0,
      validationResults: [],
      error: null,
      buildTime: 0
    };

    try {
      // Build the example
      const buildStart = Date.now();
      const cliPath = this.config.global.cliPath;
      
      // If cliPath is just "unify", use the command as-is, otherwise replace with node
      const command = cliPath === 'unify' 
        ? exampleConfig.command 
        : exampleConfig.command.replace('unify', `node ${path.resolve(__dirname, cliPath)}`);
      
      await this.runCommand(command, __dirname, exampleConfig.timeout);
      testResult.buildPassed = true;
      testResult.buildTime = Date.now() - buildStart;
      
      this.log(`Build completed in ${testResult.buildTime}ms`, 'success');

      // Validate outputs
      const outputPath = path.join(__dirname, exampleConfig.output);
      const validationResults = await this.validateFile(outputPath, exampleConfig.validations);
      
      testResult.validationResults = validationResults;
      testResult.validationsTotal = validationResults.length;
      testResult.validationsPassed = validationResults.filter(r => r.passed).length;

      // Log validation results
      for (const result of validationResults) {
        if (result.passed) {
          this.log(`  ${result.message}`, 'success');
        } else {
          this.log(`  ${result.message}`, 'error');
        }
      }

    } catch (error) {
      testResult.error = error.message;
      this.log(`Build failed: ${error.message}`, 'error');
    }

    return testResult;
  }

  async run() {
    this.log('🚀 Starting unify examples E2E test suite\\n');
    
    // Clean up any previous test artifacts
    for (const exampleName of Object.keys(this.config.examples)) {
      const example = this.config.examples[exampleName];
      const outputPath = path.join(__dirname, example.output);
      if (await fs.pathExists(outputPath)) {
        await fs.remove(outputPath);
        this.log(`Cleaned previous output: ${example.output}`, 'info');
      }
    }

    // Run tests for each example
    const results = [];
    for (const [exampleName, exampleConfig] of Object.entries(this.config.examples)) {
      const result = await this.testExample(exampleName, exampleConfig);
      results.push(result);
      this.testResults[exampleName] = result;
    }

    // Generate summary report
    this.generateReport(results);
  }

  generateReport(results) {
    const totalTime = Date.now() - this.startTime;
    const passed = results.filter(r => r.buildPassed && r.validationsPassed === r.validationsTotal);
    const failed = results.filter(r => !r.buildPassed || r.validationsPassed < r.validationsTotal);

    console.log('\\n' + '='.repeat(60));
    console.log(chalk.bold('📊 TEST SUMMARY REPORT'));
    console.log('='.repeat(60));

    console.log(`\\n⏱️  Total execution time: ${totalTime}ms`);
    console.log(`📝 Examples tested: ${results.length}`);
    console.log(`${chalk.green('✅ Passed:')} ${passed.length}`);
    console.log(`${chalk.red('❌ Failed:')} ${failed.length}`);

    if (failed.length > 0) {
      console.log('\\n' + chalk.red.bold('❌ FAILED TESTS:'));
      for (const result of failed) {
        console.log(`\\n  ${chalk.red('•')} ${result.config.name}`);
        if (!result.buildPassed) {
          console.log(`    ${chalk.red('Build failed:')} ${result.error}`);
        }
        if (result.validationsPassed < result.validationsTotal) {
          console.log(`    ${chalk.red('Validations:')} ${result.validationsPassed}/${result.validationsTotal} passed`);
          
          const failedValidations = result.validationResults.filter(v => !v.passed);
          for (const validation of failedValidations.slice(0, 3)) { // Show first 3 failures
            console.log(`      - ${validation.message}`);
          }
          if (failedValidations.length > 3) {
            console.log(`      ... and ${failedValidations.length - 3} more`);
          }
        }
      }
    }

    if (passed.length > 0) {
      console.log('\\n' + chalk.green.bold('✅ PASSED TESTS:'));
      for (const result of passed) {
        console.log(`  ${chalk.green('•')} ${result.config.name} (${result.buildTime}ms)`);
        console.log(`    Validations: ${result.validationsPassed}/${result.validationsTotal} passed`);
      }
    }

    console.log('\\n' + '='.repeat(60));
    
    if (failed.length === 0) {
      console.log(chalk.green.bold('🎉 ALL TESTS PASSED!'));
      process.exit(0);
    } else {
      console.log(chalk.red.bold(`💥 ${failed.length} TEST(S) FAILED`));
      process.exit(1);
    }
  }
}

// Run the test suite
const runner = new TestRunner();
runner.run().catch((error) => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});

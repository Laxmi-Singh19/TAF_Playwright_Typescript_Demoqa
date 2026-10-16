import type { Reporter, FullConfig, Suite, TestCase, TestResult, TestStep, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

// Logs every test, every step (actions, API calls and checks) and the final status of ALL tests
// to logs/execution.log. It needs no change in any test or page file.
class LogReporter implements Reporter {
  private file = path.join(process.cwd(), 'logs', 'execution.log');

  private write(level: 'INFO' | 'ERROR', message: string) {
    fs.appendFileSync(this.file, `${new Date().toISOString()} [${level}] ${message}\n`);
  }

  private firstLine(text?: string): string {
    return (text ?? '').split('\n')[0];
  }

  onBegin(_config: FullConfig, suite: Suite) {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    fs.writeFileSync(this.file, '');   // a fresh log file for every run
    this.write('INFO', `RUN START | total tests: ${suite.allTests().length}`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    this.write('INFO', `[${test.title}] TEST START | retry: ${result.retry}`);
  }

  onStepEnd(test: TestCase, _result: TestResult, step: TestStep) {
    if (!['pw:api', 'expect', 'test.step'].includes(step.category)) return;   // skip internal hooks and fixtures
    if (step.error) {
      this.write('ERROR', `[${test.title}] STEP FAILED | ${step.title} | ${this.firstLine(step.error.message)}`);
    } else {
      this.write('INFO', `[${test.title}] STEP | ${step.title} | ${step.duration}ms`);
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const level = result.status === 'passed' ? 'INFO' : 'ERROR';
    const reason = result.error ? ` | ${this.firstLine(result.error.message)}` : '';
    this.write(level, `[${test.title}] TEST END | status: ${result.status} | ${result.duration}ms${reason}`);
  }

  onEnd(result: FullResult) {
    this.write('INFO', `RUN END | status: ${result.status}`);
  }
}

export default LogReporter;
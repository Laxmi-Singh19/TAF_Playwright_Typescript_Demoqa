import * as fs from 'fs';
import * as path from 'path';
type Level = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const order: Record<Level, number> = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

export class Logger {
  private static logFile = path.join(process.cwd(), 'logs', 'test-run.log');
  private static minLevel: Level = (process.env.LOG_LEVEL as Level) || 'INFO';
  private static testName = '';

  static setTest(name: string) {
    this.testName = name;
  }

  private static write(level: Level, message: string) {
    if (order[level] < order[this.minLevel]) return;   // hide messages below the chosen level

    const worker = process.env.TEST_WORKER_INDEX ?? '0';
    const test = this.testName ? ` [${this.testName}]` : '';
    const line = `${new Date().toISOString()} [${level}] [W${worker}]${test} ${message}`;

    if (level === 'ERROR') console.error(line);
    else console.log(line);

    fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    fs.appendFileSync(this.logFile, line + '\n');
  }

  static debug(message: string) { this.write('DEBUG', message); }
  static info(message: string) { this.write('INFO', message); }
  static warn(message: string) { this.write('WARN', message); }
  static error(message: string) { this.write('ERROR', message); }
}
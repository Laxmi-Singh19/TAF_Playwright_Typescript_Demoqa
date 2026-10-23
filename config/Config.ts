import * as fs from 'fs';
import * as path from 'path';

export interface AppConfig {
  baseUrl: string;
  headless: boolean;
  retries: number;
  workers: number;
  testTimeout: number;
  expectTimeout: number;
  actionTimeout: number;
  navigationTimeout: number;
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  logFile: string;
}

// Configuration module: settings come from config/<ENV>.json (default: qa).
// A few values can also be overridden from outside: ENV, BASE_URL, HEADLESS, LOG_LEVEL.
function loadConfig(): AppConfig {
  const env = process.env.ENV || 'qa';
  const file = path.join(__dirname, `${env}.json`);

  if (!fs.existsSync(file)) {
    throw new Error(`Config file not found for ENV="${env}": ${file}`);
  }

  const base: AppConfig = JSON.parse(fs.readFileSync(file, 'utf-8'));

  return {
    ...base,
    baseUrl: process.env.BASE_URL ?? base.baseUrl,
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : base.headless,
    logLevel: (process.env.LOG_LEVEL as AppConfig['logLevel']) ?? base.logLevel,
  };
}

export const config: AppConfig = loadConfig();
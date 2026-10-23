import { defineConfig, devices } from '@playwright/test';
import { config } from './config/Config';

export default defineConfig({
  testDir: './tests',

  // Time limits, retries and workers come from config/<ENV>.json
  timeout: config.testTimeout,
  expect: { timeout: config.expectTimeout },
  retries: config.retries,
  workers: config.workers,
  forbidOnly: !!process.env.CI,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
    ['./core/LogReporter.ts'],
    ['./core/customHtmlReporter.ts']
  ],

  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    actionTimeout: config.actionTimeout,
    navigationTimeout: config.navigationTimeout,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
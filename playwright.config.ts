import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Time limits
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: 1,
  workers: 2,
  forbidOnly: !!process.env.CI,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
    ['./core/LogReporter.ts'],      // writes logs/execution.log for ALL tests
  ],

  use: {
    baseURL: 'https://demoqa.com',
    headless: true,
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
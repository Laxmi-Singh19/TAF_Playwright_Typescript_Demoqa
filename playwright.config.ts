import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,                       // re-run a failed test once

  reporter: [
    ['list'],                                // live result in the terminal
    ['html', { open: 'never' }],             // playwright-report folder
    ['allure-playwright'],                   // allure-results folder
  ],

  use: {
    baseURL: 'https://demoqa.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

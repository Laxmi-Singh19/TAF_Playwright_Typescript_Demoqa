import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Time limits
  timeout: 60000,                    // one test may take up to 60 s (was 30 s)
  expect: { timeout: 10000 },        // each expect() waits up to 10 s
  retries: 1,                        // re-run a failed test once
  workers: 2,                        // run 2 tests at the same time, so the site is not overloaded
  forbidOnly: !!process.env.CI,      // in CI, fail if someone left test.only in the code

  reporter: [
    ['list'],                                // live result in the terminal
    ['html', { open: 'never' }],             // playwright-report folder
    ['allure-playwright'],                   // allure-results folder
  ],

  use: {
    baseURL: 'https://demoqa.com',           // also used by the API requests in TC07 and TC08
    headless: true,
    actionTimeout: 15000,                    // each click, fill, etc. waits up to 15 s
    navigationTimeout: 30000,                // each page load waits up to 30 s
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',              // keep a video only when a test fails
    trace: 'retain-on-failure',              // keep a trace even when retries are 0
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
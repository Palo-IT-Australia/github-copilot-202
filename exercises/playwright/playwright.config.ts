import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './tests/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  timeout: 15_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Starts the Skyline Air demo app automatically; reuses it if already running.
  webServer: {
    command: 'node app/server.js',
    url: `${BASE_URL}/api/health`,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});

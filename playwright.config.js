import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,   // Falla si hay test.only en CI
  retries: process.env.CI ? 1 : 0,
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'http://localhost:4173',  // Puerto de vite preview
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Levanta el servidor antes de correr los tests
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});

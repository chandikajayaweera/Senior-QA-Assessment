import { defineConfig } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { BASE_URL } from './src/shared.js';

const runId = process.env.QA_RUN_ID ||
  ('tests-' + new Date().toISOString().replace(/[:.]/g, '-') + '-' + process.pid);
process.env.QA_RUN_ID = runId;
const runDir = resolve('artifacts', runId);
mkdirSync(runDir, { recursive: true });

export default defineConfig({
  testDir: './tests',
  outputDir: resolve(runDir, 'results'),
  timeout: 240_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['line'],
    ['html', { outputFolder: resolve(runDir, 'playwright-report'), open: 'never' }],
    ['json', { outputFile: resolve(runDir, 'results.json') }],
  ],
  use: {
    baseURL: BASE_URL,
    browserName: 'chromium',
    locale: 'en-GB',
    timezoneId: 'Asia/Colombo',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'api', testMatch: /api\.spec\.ts/ },
    { name: 'desktop', testMatch: /(journey|boundaries|checkout|demo)\.spec\.ts/,
      use: { viewport: { width: 1366, height: 768 } } },
    { name: 'mobile', testMatch: /(journey|boundaries|checkout|demo)\.spec\.ts/,
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
        deviceScaleFactor: 1,
        userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36' } },
  ],
});




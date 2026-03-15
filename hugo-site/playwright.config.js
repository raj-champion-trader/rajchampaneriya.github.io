/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:50944',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
};

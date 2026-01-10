// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 80 * 1000,
  expect:{
    timeout:  80 * 1000
  },
  reporter: [ ['html', { open: 'never' }],['list'] ],
  use: {
    browserName: 'chromium',
    headless: false ,
    //screenshot: 'on', // this will take screenshot for each and every test case
    trace: 'retain-on-failure', // this will take trace for failed test cases
  },
});

module.exports = config;

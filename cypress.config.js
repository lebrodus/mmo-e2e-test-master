const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL of the application under test. Override locally with
    // CYPRESS_BASE_URL or by editing this value.
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 8000,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  env: {
    // MailSlurp inbox id used to read OTP / verification emails.
    // Provide the API key at runtime via CYPRESS_MAILSLURP_API_KEY.
    mailslurpInboxId: process.env.CYPRESS_MAILSLURP_INBOX_ID || '',
  },
});

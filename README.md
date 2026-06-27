# MMO E2E Test Suite - Cypress

End-to-end test automation for the authentication flows of a modern Angular (Angular Material) web application. The suite exercises real user journeys - login, account creation, and password reset - including **live email + OTP verification** via MailSlurp.

![Cypress](https://img.shields.io/badge/tested%20with-Cypress%2012-04C38E?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2015-F7DF1E?logo=javascript&logoColor=black)
![Page Object Model](https://img.shields.io/badge/pattern-Page%20Object%20Model-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Why this project

This repository demonstrates a maintainable, production-style E2E framework rather than a collection of throwaway scripts. It shows:

- **Page Object Model** - selectors and interactions are centralised in `cypress/e2e/page_objects/`, keeping specs readable and resilient to UI change.
- **Real email/OTP testing** - one-time passcodes are read from a live inbox using MailSlurp, so the tests validate the *actual* end-to-end flow instead of stubbing it out.
- **Data-driven tests** - test data is loaded from fixtures, not hardcoded into specs.
- **Custom Cypress commands** - reusable commands (`getLatestEmailId`, `getOTPFromEmail`) encapsulate the email-verification plumbing.
- **Secrets kept out of source** - API keys and inbox ids are injected at runtime via environment variables / `cypress.env.json`, never committed.

## What it tests

| Area | Example coverage |
|------|------------------|
| Login | Valid login with/without "Remember Me", password masking via the eye icon, OTP verification |
| Account creation | "Create one now" navigation, signup field validation, terms page, duplicate-email handling |
| Password reset | Forgot-password flow, valid/invalid/non-existent email handling, incorrect-OTP handling |
| Password rules | Min length, requires number, uppercase, lowercase, and symbol |

Test cases are tagged (`TC001`, `TC002`, ...) for traceability back to a test plan.

## Tech stack

- [Cypress 12](https://www.cypress.io/) - browser automation & assertions
- [MailSlurp](https://www.mailslurp.com/) (`cypress-mailslurp`) - disposable inboxes for email/OTP verification
- JavaScript (ES2015 modules), Node.js / npm

## Getting started

### Prerequisites
- Node.js and npm installed
- A running instance of the application under test
- A MailSlurp account (free tier) with an inbox, for the email/OTP tests

### Install
```bash
npm install
```

### Configure
1. Set the application URL (defaults to `http://localhost:4200`):
   ```bash
   export CYPRESS_BASE_URL="https://your-app-url"
   ```
2. Copy the example env file and add your MailSlurp credentials:
   ```bash
   cp cypress.env.example.json cypress.env.json
   # then edit cypress.env.json (it is gitignored)
   ```
3. Update `cypress/fixtures/userdata.json` with valid test account data (the committed file contains placeholders only).

### Run
```bash
npm run cy:open       # interactive Cypress runner
npm run cy:headless   # all specs, headless
npm run cy:chrome     # headless in Chrome
npm run cy:headed     # headed run
```

## Project structure

```
.
├── cypress/
│   ├── e2e/
│   │   ├── e2e_tests/          # specs: login, account-creation, password-reset
│   │   └── page_objects/       # Page Object Model classes
│   ├── fixtures/               # test data (userdata.json - placeholders)
│   └── support/
│       ├── commands.js         # custom commands (MailSlurp email/OTP helpers)
│       └── e2e.js              # global support file
├── cypress.config.js           # Cypress configuration (baseUrl, env)
├── cypress.env.example.json    # template for local secrets (copy to cypress.env.json)
└── package.json
```

## Notes on secrets

No real credentials or API keys are committed to this repository. The MailSlurp API key is read from `CYPRESS_MAILSLURP_API_KEY` (or `cypress.env.json`, which is gitignored). Fixture data ships with placeholders that must be replaced locally.

## Author

**Lewis Babe Yaka** - QA Tech Lead & SDET  
[LinkedIn](https://www.linkedin.com/in/lewis-babe-yaka)

## License

Released under the [MIT License](LICENSE).


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// MailSlurp is used to read real verification / OTP emails during the flows.
// The API key is provided at runtime via the CYPRESS_MAILSLURP_API_KEY env var
// (the cypress-mailslurp plugin reads it automatically) - never hardcode it.
import 'cypress-mailslurp';

// Wait for the latest email in the inbox under test and return its id.
// The inbox id is supplied via Cypress env (see cypress.env.example.json).
Cypress.Commands.add('getLatestEmailId', () => {
  const inboxId = Cypress.env('mailslurpInboxId');
  return cy.mailslurp().then((mailslurp) => {
    return mailslurp.waitForLatestEmail(inboxId).then((email) => {
      return email.id;
    });
  });
});





Cypress.Commands.add('getOTPFromEmail', (emailId) => {

    return cy.mailslurp().then((mailslurp) => {
  
      return mailslurp.getEmail(emailId).then((email) => {
        // const otpMatch = email.body.match(otpRegex);
        const emailBody = email.body
        const parser = new DOMParser()
        const doc = parser.parseFromString(emailBody, 'text/html')
        const otp = doc.querySelector('td span span').textContent
        return otp;
      });
    })  ;
  });

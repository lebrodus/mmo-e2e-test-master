
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
// import { MailSlurp } from 'mailslurp-client';

// const mailslurp = new MailSlurp({ apiKey: "***REMOVED***" });
import 'cypress-mailslurp';

// wait for latest email  with it's id
// Cypress.Commands.add('getLatestEmailId', () => {
//   return cy.mailslurp().then((mailslurp) => {
//     return mailslurp.waitForLatestEmail().then((email) => {
//       console.log(email.id)
//       return email.id;
//     });
//   });
// });


Cypress.Commands.add('getLatestEmailId', () => {
  return cy.mailslurp().then((mailslurp) => {
    return mailslurp.waitForLatestEmail('***REMOVED***').then((email) => {
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

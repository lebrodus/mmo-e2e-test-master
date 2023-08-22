
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

// const mailslurp = new MailSlurp({ apiKey: "f5005cb341263bc0dd88cd47e1e86f19bab3947fc9679cbffa8860ce9c6badf9" });
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
    return mailslurp.waitForLatestEmail('4badd86f-0873-41aa-b36f-6073a801cac1').then((email) => {
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

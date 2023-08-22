/// <reference types="Cypress" />
import Login from "../page_objects/login"
const login = new Login()


describe("Account Creation",()=>{
    
    let testData;

    // Run defore each test case
    beforeEach(()=>{
        cy.visit('/');
    })

    // Loads test data before test executions
    before(()=>{
        cy.fixture('userdata').then(function(Data){
            testData = Data;
        })

    });

   
    it('TC020 : Clicking on "Create One Now" from Login Page',()=>{
        
        // Test steps
        login.elements.createOneNowLink().click()

        // Assertions
        cy.url().should('include','/auth/signup')

    });

    it('TC021 : Validating Fields on Account Creation Page',()=>{
        
        // Test steps
        login.elements.createOneNowLink().click()

        // Assertions
        cy.url().should('include','/auth/signup')
        login.elements.firstName().should('exist')
        login.elements.lastName().should('exist')
        login.elements.passwordField().should('exist')
        login.elements.termsLink().should('exist')
        login.elements.signupCheckbox().should('exist')
        login.elements.termsLink().click()
        cy.visit('/terms', { target: '_self' });
        login.elements.titleTermsPage().should('include.text',testData.termsPageTitle)



    });

    it('TC031 : Existing Email Address for Account Creation',()=>{
        
        // Test steps
        login.elements.createOneNowLink().click()
        login.elements.firstName().type(testData.firsName[0])
        login.elements.lastName().type(testData.lastName[0])
        login.elements.emailField().type(testData.email.validEmail1)
        login.elements.passwordField().type(testData.password)
        login.elements.signupCheckbox().click()
        login.elements.signInBtn().click()

        //Asertion
        login.assertAlertMsg(testData.alertText[3])



    });


   

})



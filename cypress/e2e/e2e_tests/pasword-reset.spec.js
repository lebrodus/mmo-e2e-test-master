/// <reference types="Cypress" />
import Login from "../page_objects/login"
const login = new Login()


describe("Password Reset",()=>{
    
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

   
    it('TC010 : Clicking on "Forgot Password" Link',()=>{
        
        // Test steps
        login.elements.forgetPassword().click()

        // Assertions
        cy.url().should('include','/forgot-password')
        


    });

    it('TC011 : Entering Valid Email Address for Password Reset',()=>{
        
        // Test steps
        login.elements.forgetPassword().click()
        login.elements.emailField().type(testData.email.validEmail2)
        login.elements.signInBtn().click()

        // Assertions
        cy.url().should('include','/code-verification')
        login.assertAlertMsg(testData.alertText[1]);

        // assert that the email is sent
           // cy.getOTPFromEmail('26b1b41f-efd1-43a8-b737-9260709c6a58@mailslurp.biz')

        


    });

    it('TC015 : Entering Invalid Email Address for Password Reset',()=>{
        
        // Test steps
        login.elements.forgetPassword().click()
        login.elements.emailField().type(testData.email.invalidEmail)
        login.elements.signInBtn().then(($signInBtn)=>{
            if(!$signInBtn.is(':disabled')){
                wrap($signInBtn).click();
            }
            else{
                // Assertions
                cy.url().should('include','/forgot-password')

            }

        }

        )

        
        
        


    });

    it('TC016 : Entering Non-Existent Email Address for Password Reset',()=>{
        
        // Test stepsAn email has been sent to 26b1b41f-efd1-43a8-b737-9260709c6a58@mailslurp.biz
        login.elements.forgetPassword().click()
        login.elements.emailField().type(testData.email.nonExistentEmail)
        login.elements.signInBtn().click()

        // Assertions
        cy.url().should('include','/forgot-password')
        login.assertAlertMsg(testData.alertText[2])

        


    });

    it('TC017 : Entering Incorrect OTP Code',()=>{
        
        // Test steps
        login.elements.forgetPassword().click()
        login.elements.emailField().type(testData.email.validEmail2)
        login.elements.signInBtn().click()

        // Assert that your on the forgot-password page
        cy.url().should('include','/forgot-password')
       // Assert that your on the code-verification page
        cy.url().should('include','/code-verification')

        // Enter wrong OTP code
        const otpCode = "676545";
        login.enterOtpCode(otpCode);
        login.elements.signInBtn().click();
        let alertText = testData.alertText[0];

        //assert alert message
        login.assertAlertMsg(alertText);
        cy.url().should('include','/code-verification')
       
        


    });
    

})



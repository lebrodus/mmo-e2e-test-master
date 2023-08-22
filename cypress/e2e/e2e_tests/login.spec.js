/// <reference types="Cypress" />
import Login from "../page_objects/login"
const login = new Login()


describe("Login functionality",()=>{
    
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

    })

    it('TC001 : Valid Login with "Remember Me" Enabled',()=>{
        login.elements.emailField().type(testData.email.validEmail2);
        login.elements.passwordField().type(testData.password);
        login.elements.rememberMe().then(($checkbox)=>{
            if(!$checkbox.prop('checked')){
                cy.wrap($checkbox).click()
            }
            
        });

         

         login.elements.signInBtn().click()

         //  assertions
         cy.url().should('include','/auth-verification')
         login.assertAlertMsg(testData.alertText[4])
         
          //*** * Get and  pass the latest emailid ******
          cy.getLatestEmailId().then(($emailID)=>{
          cy.getOTPFromEmail($emailID).then(($otp)=>{
            cy.wait(30000)
            login.enterOtpCode($otp)

            });
            
        });
        
        //click on the continue btn
        login.elements.signInBtn().click()
        cy.url().should('include','/dashboard');


    });
    
   
    it('TC002 : Valid Login with "Remember Me" Disabled',()=>{
        
        // Test steps
        login.elements.emailField().type(testData.email.validEmail1);
        login.elements.rememberMeCheckbox().click();
        login.elements.passwordField().type(testData.password);
        login.elements.signInBtn().click()

        // Test assertions





    });
    
    it('TC003 : View Password using "Eye" Icon',()=>{
        
    // Test steps
        
        login.elements.passwordField().type(testData.password);

        //assert that password is masked
        login.elements.maskPassword().should('exist');

        login.elements.eyeBtn().click()

        //assert that password is unmasked
        login.elements.unmaskPassword().should('exist');

        //assert that password is masked
        login.elements.maskPassword().should('exist');

        login.elements.eyeBtn().click()
    });

   

})
 
//Test suites
describe("Account Validation",()=>{
    
    let testData;
    let errMsg = [
        'Password should have mininum 8 characters',
        '1 number',
        'at least 1 uppercase letter',
        '1 lowercase letter',
        'and 1 symbol'
    ]

    // Run defore each test case
    beforeEach(()=>{
        cy.visit('/auth/signup');
    })

    // Loads test data before test executions
    before(()=>{
        cy.fixture('userdata').then(function(Data){
            testData = Data;
        })

    });

    it('TC004 : Valid Password',()=>{
        login.elements.passwordField().type(testData.password);
        login.elements.passwordField().should('have.value', testData.password);


    });

    it('TC005 : Password Length Less Than 8 Characters',()=>{
        login.elements.passwordField().type(testData.invalidPass[0]);
        login.elements.signupPassErrorMsg().should('include.text', errMsg[0]);


    });

    it('TC006 : Password Missing a Number',()=>{
        login.elements.passwordField().type(testData.invalidPass[1]);
        login.elements.signupPassErrorMsg().should('include.text', errMsg[1]);


    });

    it('TC007 : Password Missing an Uppercase Character',()=>{
        login.elements.passwordField().type(testData.invalidPass[2]);
        login.elements.signupPassErrorMsg().should('include.text', errMsg[2]);


    }); 

    it('TC008 : Password Missing a Lowercase Character',()=>{
        login.elements.passwordField().type(testData.invalidPass[3]);
        login.elements.signupPassErrorMsg().should('include.text', errMsg[3]);


    });

    it('TC009 : Password Missing a Required Symbol',()=>{
        login.elements.passwordField().type(testData.invalidPass[4]);
        login.elements.signupPassErrorMsg().should('include.text', errMsg[4]);


    });





})


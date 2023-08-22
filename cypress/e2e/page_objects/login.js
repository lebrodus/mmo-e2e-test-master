class Login {

    elements = {
        emailField:() => cy.get('input[placeholder="Email address"]'),
        passwordField:() => cy.get('input[placeholder="Password"]'),
        signInBtn:() => cy.get('.mat-flat-button'),
        rememberMeCheckbox:() => cy.get('.mat-checkbox-layout'),
        eyeBtn:() => cy.get('.mat-icon'),
        maskPassword:() => cy.contains('mat-icon', 'visibility'),
        unmaskPassword:() => cy.contains('mat-icon', 'visibility_off'),
        signupPassErrorMsg:() => cy.get('#error-message'),
        forgetPassword:() => cy.get('[routerlink="/auth/forgot-password"]'),
        otpFields:() =>  cy.get('input[type="tel"]'),
        alertField:() => cy.get('.mat-simple-snackbar'),
        createOneNowLink:() => cy.get('span[routerlink="/auth/signup"]'),
        firstName:() => cy.get('input[data-placeholder="First name"]'),
        lastName:() => cy.get('input[data-placeholder="Last name"]'),
        titleTermsPage:() => cy.get('#data-protection--privacy-policy'),
        signupCheckbox:() => cy.get('.mat-checkbox-inner-container'),
        rememberMe:() => cy.get('input[type="checkbox"]'),

    }

    enterOtpCode(code){
        this.elements.otpFields().each(($el, index, $list)=>{
            const digit = code[index];
            cy.wrap($el).type(digit)

        });

    }

    assertAlertMsg(msg){
        this.elements.alertField().should('include.text',msg)
    }
    

    

}
export default Login
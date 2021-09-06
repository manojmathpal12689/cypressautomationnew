/// <reference types="cypress" />

describe("validate the checkbox", function(){


it("validate all data", function(){

cy.visit('https://www.qaclickacademy.com/practice.php')

// checkbox handle
cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
cy.get('#checkBoxOption2').uncheck().should('not.be.checked')
cy.get('input[type="checkbox"]').check(["option2","option3"])

//normal dropdown
cy.get('select').select('option2').should('have.value','option2')

//dynamic dropdown

cy.get('#autocomplete').type('ind')
cy.get('.ui-menu-item div').each(($e1) =>

{
    if($e1.text()==='India')
    {
       $e1.click()
    }

})
cy.get('#autocomplete').should('have.value','India')

//deal with visible and invisible element

cy.get('#displayed-text').should('be.visible')
cy.get('#hide-textbox').click()
cy.get('#displayed-text').should('not.be.visible')
cy.get('#show-textbox').click()
cy.get('#displayed-text').should('be.visible')

//radio button

cy.get('input[type="radio"]').check(["radio1"]).should('be.checked').and('have.value','radio1')
cy.get('[value="radio2"]').check().should('be.checked')


//alert popup automatically accept 

cy.get('#alertbtn').click()
cy.get('[value="Confirm"]').click()
//window alert for text verification
cy.on('window:alert',(str)=>
{
expect(str).to.equal('Hello , share this practice page and share your knowledge')

})

cy.on('window:confirm',(str)=>
{
    expect(str).to.equal("Hello , Are you sure you want to confirm?")
})


//tab handle cypress no concept of child window so for that remove target attribute so that it will open window in same page.


cy.get('#opentab').invoke('removeAttr','target').click()
cy.wait(5000)
cy.url().should('include','rahulshettyacademy')
cy.go('back')









})










})
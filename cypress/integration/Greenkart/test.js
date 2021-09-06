/// <reference types="cypress" />

describe("validate first test script",function(){
it("navigate url",function(){

cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
cy.get('.search-keyword').type('ca');
cy.wait(2000);
//cy.get('.product:visible').should('have.length',4)
cy.get('.products').as('productlocator')
cy.get('@productlocator').find('.product').should('have.length',4)
cy.get('@productlocator').find('.product').eq('2').contains('ADD TO CART').click().then(function()
{
  console.log('data')

})
cy.get('@productlocator').find('.product').each(($e1) =>
{

    const vegtext=$e1.find('h4.product-name').text()
    if(vegtext.includes('Cashews'))
    {
        $e1.find('button').click();
    }   
})
cy.get('.cart-icon > img').click()
cy.contains('PROCEED TO CHECKOUT').click()
cy.contains('Place Order').click()

cy.get('.brand').should('have.text','GREENKART')
cy.get('.brand').then(function(logo){
   cy.log(logo.text())

})



})



})
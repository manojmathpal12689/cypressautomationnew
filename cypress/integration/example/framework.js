/// <reference types="cypress" />

import HomePage from '../pageobject/HomePage'


describe("validate the protractor site", function(){

    before(function()
    {
        cy.fixture('example').then(function(data){

           this.data = data
        })
    })

    beforeEach(function(){
        
        cy.visit(Cypress.env('url'))

    })

    it("validate user deatils", function(){
       const homePage = new HomePage()
       
       homePage.getname().type(this.data.name).should('have.value',this.data.name)
       homePage.getname().should('have.attr','minlength','2')
       homePage.getemail().type(this.data.email)
        homePage.getpassword().type(this.data.password)
        homePage.getcheckbox()
        cy.get('select').select(this.data.gender).should('have.value','Male')
        cy.get('#inlineRadio2').check(["option2"]).should('be.checked')
        cy.get('#inlineRadio3').should('be.disabled')
        cy.get('input[type="submit"]').click()
        //cy.get('.alert').should('have.text','Success! The Form has been submitted successfully!.')
            
        cy.get(':nth-child(2) > .nav-link').click()
        //cy.pause()
        this.data.productname.forEach(function(element){
         cy.selectproduct(element)
        })
        cy.get('a.nav-link.btn.btn-primary').click()

        var sum = 0;
        cy.get('tr td:nth-child(4) strong').each(($e1,index, $list)=>
        {
             
            const price = $e1.text()
            var res = price.split(" ")
            
            res = res[1].trim()
            sum= Number(sum)+Number(res)
            
        }).then(function(){

            //cy.log(sum)
            cy.get('tr td:nth-child(5) strong').then(function(sumtext){

               const sumdata = sumtext.text()
               var newsum = sumdata.split(" ")
               newsum = newsum[1].trim()
               var newsumdata = Number(newsum)
               //cy.log(newsumdata)
               expect(sum).to.equal(newsumdata)
            })
        })
        
        cy.contains('Checkout').click()
        
        cy.get('#country').type('India')
        cy.get('.suggestions > :nth-child(1) > li > a').click()
        cy.get('#checkbox2').check({force:true}).should('be.checked')
        cy.contains('Purchase').click()
        //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        cy.get('.alert').then(function(textdata){

          const testverifydata = textdata.text()
          
              expect(testverifydata.includes("Success")).to.be.true
          


        })



    })
})

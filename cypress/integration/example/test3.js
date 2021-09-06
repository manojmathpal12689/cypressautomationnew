/// <reference types="cypress" />

/// <reference types="cypress-iframe" />

import 'cypress-iframe'

describe("validate the webtable", function(){


    it("validate table data", function(){
    
    cy.visit('https://www.qaclickacademy.com/practice.php')

    cy.get('tr td:nth-child(2)').each(($e1, index, $list)=>
    {

        const data = $e1.text()
        if(data.includes("Appium"))
        {
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){


               const pricedata =  price.text()
               expect(pricedata).to.equal('30')

            })

        }


    })

    //mouse hove event using jquery in cypress should be immidate child

    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include','top')


    //without mouse hover click on top button or how handle element which is not visible mode.
    cy.contains('Top').click({force:true})
    cy.url().should('include','top')


//child window handle. cypress doest not support cross domain architecture.
//1. mthod:remove target attribute
//2. method:href attrbute
//cy.visit(href)


cy.get('#opentab').then(function(e1){

  const childwindowurl = e1.prop('href')
  cy.visit(childwindowurl)
  cy.go('back')

})


//handle frames

cy.frameLoaded('#courses-iframe')
cy.iframe().find('a[href*="mentorship"]').eq(0).click()



cy.iframe().find('h1[class*="pricing-title"]').should('have.length','2')
    })

})
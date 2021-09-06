class HomePage
{
getname()
{

    return cy.get('input[name="name"]:nth-child(2)')
}
getemail()
{
    return cy.get('input[name="email"]')
}
getpassword()
{
    return cy.get('#exampleInputPassword1')
}

getcheckbox()
{

    return cy.get('#exampleCheck1').check().should('be.checked')
}

}
export default HomePage;


describe('1st. test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains(`Welcome to`)
  })
  it('Navigate to the Angular Playground #1', () => {
    //cy.get('a[href="/#/angular-page/angular-page-content1"]').click();
    //cy.get('[class="angular-page-group"]').click()
    //cy.get('[id^=angular-page-content1]')
    //cy.get('a[href*="aboutme-page"]').click()
    //cy.get('label[data-cy="lk-cv"].sidebar').click()
    //cy.get('#title').should('have.text', 'Basic Template-Driven form and validation')
  })  
})

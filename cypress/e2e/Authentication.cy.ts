describe('Authentication', () => {
  it('should successfully log in and redirect to homepage', () => {

    //1. Visit the login page
    cy.visit('http://localhost:3000/api-login');

    //2. Enter credentials
    cy.get('input[name="email"]').type('a@a.com');
    cy.get('input[name="password"]').type('password');

    //3. Click submit
    cy.get('button[type="submit"]').click();

    //4. Verify the user is redirected to the homepage
    cy.url().should('include', '/map')

    //5. Verify the user is authenticated
    cy.get('[data-cy="filter-button"]').should('be.visible');
  })

  it('should show error message "Forkert e-mail eller adgangskode" when user is not found', () => {
    //1. Visit the login page
    cy.visit('http://localhost:3000/api-login');

    //2. Enter credentials
    cy.get('input[name="email"]').type('f@f.com');
    cy.get('input[name="password"]').type('password');

    //3. Click submit
    cy.get('button[type="submit"]').click();

    //4. show errormessage
    cy.get('.text-error-red').should('be.visible');
  })

  // it('should successfully sign up and redirect to homepage', () => {

  // })
})
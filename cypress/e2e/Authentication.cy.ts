describe('Authentication', () => {
  it('should successfully log in and redirect to homepage', () => {

    //1. Visit the login page
    cy.visit('http://localhost:3000/login');

    //2. Enter credentials
    cy.get('input[name="email"]').type('b@b.com');
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
    cy.visit('http://localhost:3000/login');

    //2. Enter credentials
    cy.get('input[name="email"]').type('f@f.com');
    cy.get('input[name="password"]').type('password');

    //3. Click submit
    cy.get('button[type="submit"]').click();

    //4. show errormessage
    cy.get('.text-error-red').should('be.visible');
  })

  it('should complete the full signup flow', () => {

    //Visit the signup page
    cy.visit('http://localhost:3000/signup');

    //Step 1: Membership
    cy.contains("Guld").click();
    cy.contains("Næste").click();

    //Step 2: Email
    cy.get("#email").type("test@test.com");
    cy.get("#confirm_email").type("test@test.com");
    cy.contains("Næste").click();

    //Step 3: Password
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.contains("Næste").click();

    //Step 4: Phonenumber
    cy.get("#phone").type("12345678");
    cy.contains("Næste").click();

    //Step 5: License plate
    cy.get("#license_plate").type("AB12345");
    cy.contains("Næste").click();

    //Step 6: Primary location
    cy.get("#primary_location").select("Søborg");
    cy.contains("Næste").click();

    //Step 7: Terms
    cy.get("#terms_accepted").check();
    cy.contains("Næste").click();

    //Step 8: Paymentmethod
    cy.get('label[for="Mobilepay"]').click();

    cy.intercept("POST", "http://127.0.0.1/api-sign-up", {statusCode: 200}).as("signupRequest");
    cy.contains("Start nu").click();
    cy.wait("@signupRequest");

    //Step 9: Confirmation
    cy.contains("Vi har sendt en bekræftelsesmail").should("be.visible");
    cy.contains("test@test.com").should("be.visible");
  });

  it('shows error for invalid email',() => {

    //Visit signup page
    cy.visit('http://localhost:3000/signup');

    //Step 1: Membership
    cy.contains("Guld").click();
    cy.contains("Næste").click();

    //Step 2: Invalid email
    cy.get("#email").type("ugyldig-email");
    cy.get("#email").blur();
    cy.contains("Ugyldig e-mail").should("be.visible");
    cy.contains("Næste").should("be.disabled");
  })

  it("should handle duplikat email from backend", () => {

    //Visit signup page
    cy.visit('http://localhost:3000/signup');

    //Step 1: Membership
    cy.contains("Guld").click();
    cy.contains("Næste").click();

    //Step 2: Email that already exists
    cy.get("#email").type("b@b.com");
    cy.get("#confirm_email").type("b@b.com");
    cy.contains("Næste").click();
    
    //Step 3: Password
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.contains("Næste").click();

    //Step 4: Phonenumber
    cy.get("#phone").type("12345678");
    cy.contains("Næste").click();

    //Step 5: License plate
    cy.get("#license_plate").type("AB12345");
    cy.contains("Næste").click();

    //Step 6: Primary location
    cy.get("#primary_location").select("Søborg");
    cy.contains("Næste").click();

    //Step 7: Terms
    cy.get("#terms_accepted").check();
    cy.contains("Næste").click();

    //Step 8: Paymentmethod
    cy.get('label[for="Mobilepay"]').click();

    //Send request to "backend"
    cy.intercept("POST", "http://127.0.0.1/api-sign-up", {
      statusCode: 409,
      body: { error: "E-mail already exist" },
    }).as("signupRequest");

    cy.contains("Start nu").click();
    cy.wait("@signupRequest");

    //Navigate back to step 2 to show error
    cy.contains("E-mail er allerede i brug").should("be.visible");
  });
})
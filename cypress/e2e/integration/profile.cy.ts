
describe('Profile Settings ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/profile');
  });

  it('should fill in the name input', () => {
    const testName = 'John Doe';
    cy.get('[data-testid=name-input]').type(testName);

    cy.get('[data-testid=name-input]').should('have.value', testName);

  });
});

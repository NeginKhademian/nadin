describe('Weather Card Component', () => {
  it('Should fetch weather data for a selected city', () => {
    cy.visit('http://localhost:8080/weather');

    cy.get('.ant-input').type('Tehran');

    cy.get('.ant-select-item-option').should('have.length.gt', 0);

    cy.get('.ant-select-item-option').first().click();

    cy.get('.ant-spin-spinning').should('not.exist');

    cy.get('h2').should('exist');
    cy.get('p:contains("Temperature:")').should('exist');
    cy.get('p:contains("Weather:")').should('exist');
  });

  it('Should handle input changes and clear weather data', () => {
    cy.visit('http://localhost:8080/weather');

    cy.get('.ant-input').type('Mashhad');

    cy.get('.ant-select-item-option').should('have.length.gt', 0);

    cy.get('.ant-select-item-option').first().click();

    cy.get('.ant-spin-spinning').should('not.exist');

    cy.get('h2').should('exist');
    cy.get('p:contains("Temperature:")').should('exist');
    cy.get('p:contains("Weather:")').should('exist');

    cy.get('.ant-input').clear();

    cy.get('.ant-spin-spinning').should('not.exist');
    cy.get('h2').should('not.exist');
    cy.get('p:contains("Temperature:")').should('not.exist');
    cy.get('p:contains("Weather:")').should('not.exist');
  });
});

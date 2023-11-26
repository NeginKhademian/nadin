describe('Todo List App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/todo');
  });

  it('should add, edit, and delete a todo', () => {
    cy.get('input').type('New Todo');
    cy.get('[data-testid=addOrEdit]').click();

    cy.get('.ant-list-item').should('have.length', 1);

    cy.get('[data-testid=edit]').click();
    cy.get('input').should('have.value', 'New Todo');
    cy.get('input').clear().type('Updated Todo');
    cy.get('[data-testid=addOrEdit]').click();

    cy.get('.ant-list-item').contains('Updated Todo').should('exist');

    cy.get('[data-testid=delete]').click();

    cy.get('.ant-list-item').should('have.length', 0);
  });
});

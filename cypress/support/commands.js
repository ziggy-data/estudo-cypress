// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
    cy.get("#firstName").type(faker.name.firstName(),{delay: 0});
    cy.get("#lastName").type(faker.name.lastName(), {delay: 0});
    cy.get("#email").type(faker.internet.email(), {delay: 0});
    cy.get("#open-text-area").type(faker.lorem.paragraphs(1), {delay: 0});
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
    cy.get('.success').should('contain', 'Mensagem enviada com sucesso.');
});
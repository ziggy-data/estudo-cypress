import { faker } from '@faker-js/faker';

describe("Central de Atendimento Ao Cliente TAT", () => {

  beforeEach(function() { 
    cy.visit("./src/index.html");
  })

  it("verifica titulo da aplicacao", function () {
    cy.visit("./src/index.html");
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  //it.only("preenche os campos obrigatorios e envia o formulario", function(){
  it("preenche os campos obrigatorios e envia o formulario", function(){
    
    cy.get("#firstName").type(faker.name.firstName(),{delay: 0});
    cy.get("#lastName").type(faker.name.lastName(), {delay: 0});
    cy.get("#email").type(faker.internet.email(), {delay: 0});
    cy.get("#open-text-area").type(faker.lorem.paragraphs(1), {delay: 0});
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
    cy.get('.success').should('contain', 'Mensagem enviada com sucesso.');
  });

});

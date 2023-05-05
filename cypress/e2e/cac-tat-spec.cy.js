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

  it("Campo Telefone continua vazio quando preenchido com valor não-numérico", function(){
    cy.get("#phone").type('abcdefghij', {delay: 0}).should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido', function(){
    cy.get("#firstName").type(faker.name.firstName(),{delay: 0});
    cy.get("#lastName").type(faker.name.lastName(), {delay: 0});
    cy.get('#phone-checkbox').click();
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!');
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){  //estudando como funciona o .clear()
    cy.get("#firstName").type('a',{delay: 0}).should('have.value','a').clear().should('have.value','');
    cy.get("#lastName").type(faker.name.lastName(), {delay: 0}).clear().should('have.value','');
    cy.get("#email").type(faker.internet.email(), {delay: 0}).clear().should('have.value','');
    cy.get("#phone").type(faker.phone.number(), {delay: 0}).clear().should('have.value','');
  });

  it("submeter o formulario sem preencher os campos obrigatorios", function(){
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!');
  });

  it("envia um formulario com sucesso usando um comando customizado", function(){
    cy.fillMandatoryFieldsAndSubmit();
  }); 

});

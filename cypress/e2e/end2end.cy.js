/// <reference types="cypress" />
var faker = require('faker');
const Faker = require('faker/lib');
import EnderecoPage from '../support/page_objects/enderecoebac.page'
const dadosEndereco = require('../fixtures/endereco.json')
const dadosEnderecoEntreg = require('../fixtures/enderecoentrega.json')


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });
    
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        /*registro/detalhesdaconta*/
        let emailfaker2 = faker.internet.email()
        cy.cadastro(emailfaker2, 'avistaouaprazo210l', 'André', 'Mariano')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        /*cadastroenderecofaturamento*/
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
            )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        /*cadastroenderecoentrega*/
        EnderecoPage.editarEnderecoEntrega(
            dadosEnderecoEntreg[0].nome,
            dadosEnderecoEntreg[0].sobrenome,
            dadosEnderecoEntreg[0].empresa,
            dadosEnderecoEntreg[0].pais,
            dadosEnderecoEntreg[0].endereco,
            dadosEnderecoEntreg[0].numero,
            dadosEnderecoEntreg[0].cidade,
            dadosEnderecoEntreg[0].estado,
            dadosEnderecoEntreg[0].cep
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        /*produtos*/
        //1
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Abominable Hoodie', 'XL', 'Green', 1)
        //2
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'XL', 'Blue', 2)
        //3
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Arcadio Gym Short', '33', 'Red', 1)
        /*carrinho*/
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        /*conclusaocompra*/
        cy.get('#order_comments').type('Próximo a curva são benedito, só esterei em horários diurnos')
        cy.get('#payment_method_bacs').click()
        cy.get('.woocommerce-terms-and-conditions-link').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    }); 
})
/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

beforeEach(() => {
    cy.visit('minha-conta')
});

afterEach(() => {
    cy.screenshot()
});

context('Funcionalidade Login', () => {
    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
        cy.get('#username').type (perfil.usuario)
        cy.get('#password').type (perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain' , 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(perfil.usuario, perfil.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')
    })

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')
        })
    })

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')
    })
})
/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/enderecoebac.page'
const dadosEndereco = require('../fixtures/endereco.json')
const dadosEnderecoEntreg = require('../fixtures/enderecoentrega.json')

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados =>{
            cy.login(dados.usuario, dados.senha)
        })
    });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
        EnderecoPage.editarEnderecoFaturamento('Mateus', 'Moreira', 'AB MODA', 'Brasil', 'Av. Bagdá', '999', 'Belo Horizonte', 'Minas Gerais', '66542-896', '3198855-9632', 'abdulhanasha@kabul.com.br')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de faturamento com sucesso - Usando arquivos de dados', () => {
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
    });

    it('Deve fazer cadastro de endereço de entrega com sucesso', () => {
        EnderecoPage.editarEnderecoEntrega('Jordan', 'Cracatua', 'INTANHANEM10', 'Brasil', 'Av. do Fim do Mundo', '30000', 'Florianopólis', 'Santa Catarina', '48620-630')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de endereço de entrega com sucesso - Usando arquivos de dados', () => {
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
    });
});
/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import objects from "../support/page_objects/objects";
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    
    var nome = faker.person.firstName()
    var sobrenome = faker.person.lastName()
    var empresa = faker.company.name()
    var endereco = faker.location.streetAddress()
    var cidade = faker.location.city()
    var cep = 98005025
    var phone = 5540028922
    var email = faker.internet.email()


    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta, (sem cadastro))', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações    

        objects.listaProd('Stellar Solar Jacket') // Primeiro produto visto pelo usuario e clickado
        objects.addProd('S', 'Red', 1) // Configurou o produto e adicionou ao carrinho
        objects.buscarProd('Circe Hooded Ice Fleece', 'S', 'Purple', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Abominable Hoodie', 'M', 'Red', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Aero Daily Fitness Tee', 'L', 'Black', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        cy.get('.woocommerce-message > .button').click() // Clicou para verificar seu carrinho
        cy.get('.checkout-button').click() // E finalizou a compra
        objects.checkout(nome, sobrenome, empresa, endereco, cidade, cep, phone, email) // Colocou todos seus dados, preenchidos corretamente
        cy.wait(4000) // Aguardando o tempo da página processar o pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.') // Pedido concluído
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta, (com cadastro))', () => {
        
        objects.login('teste1924@teste.com', 'teste1924')
        objects.buscarProd('Stellar Solar Jacket', 'S', 'Red', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Circe Hooded Ice Fleece', 'S', 'Purple', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Abominable Hoodie', 'M', 'Red', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Aero Daily Fitness Tee', 'L', 'Black', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.finally() // Verificando carrinho e finalizando pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.') // Pedido concluído
     });

     it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta, (com login, mas sem dados de endereço)', () => {

        objects.login('newtest@test.com', 'test1234@.com')
        objects.buscarProd('Stellar Solar Jacket', 'S', 'Red', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Circe Hooded Ice Fleece', 'S', 'Purple', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Abominable Hoodie', 'M', 'Red', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.buscarProd('Aero Daily Fitness Tee', 'L', 'Black', 1) // Pesquisou outro produto e já, configurou e adicionou ao carrinho
        objects.finally2()
        objects.checkout2(nome, sobrenome, empresa, endereco, cidade, cep, phone) // Colocou todos seus dados, preenchidos corretamente
        cy.wait(4000) // Aguardando o tempo da página processar o pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.') // Pedido concluído


     })
})

class objects {
    buscarProd(nomeProduto, tamanho, cor, quantidade){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
        cy.wait(150)
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

    listaProd(nomeProduto){
        cy.get('.widget-inner')
        .contains(nomeProduto)
        .click()
    }

       addProd(tamanho, cor, quantidade){
        cy.wait(150)
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

    checkout(nome, sobrenome, empresa, endereco, cidade, cep, phone, email){
        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type(empresa)
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type('Brasil{enter}')
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_city').type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type('São Paulo{enter}')
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(phone)
        cy.get('#billing_email').type(email)
        cy.get('#terms').click()
        cy.get('#place_order').click()       
    }
        login(username, pass){
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type(username)
        cy.get('#password').type(pass)
        cy.get('.woocommerce-form > .button').click()
    }
        finally(){
            cy.get('.woocommerce-message > .button').click() // Clicou para verificar seu carrinho
            cy.get('.checkout-button').click() // E finalizou a compra
            cy.get('#terms').click()
            cy.get('#place_order').click()
            cy.wait(2000) // Aguardando o tempo da página processar o pedido
            
    }
        finally2(){
        cy.get('.woocommerce-message > .button').click() // Clicou para verificar seu carrinho
        cy.get('.checkout-button').click() // E finalizou a compra        
    }
        checkout2(nome, sobrenome, empresa, endereco, cidade, cep, phone){
        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#billing_company').clear().type(empresa)
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').clear().type('Brasil{enter}')
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type('São Paulo{enter}')
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(phone)
        cy.get('#terms').click()
        cy.get('#place_order').click()       
    }
    
}
export default new objects()
describe('Cenário de teste para o site da Swag Labs', () => {

    it('Caso de teste: visitar o site', () => {
        cy.visit('https://www.saucedemo.com')
    })

    it('Caso de teste: verificar se faz login com dados aleatórios (caso negativo)', () => {
        login()
    })

    it('Caso de teste: fazer login com sucesso', () => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain.text', 'Products')
    })

    it('Caso de teste: login com usuário que está bloqueado (caso negativo)', () => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

})

function login() {
    let hours = new Date().getHours().toString()
    let minutes = new Date().getMinutes().toString()
    let seconds = new Date().getSeconds().toString()

    let user = hours + minutes + seconds + 'id'

    let password = hours + minutes + seconds + 'password'

    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type(user)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')

}
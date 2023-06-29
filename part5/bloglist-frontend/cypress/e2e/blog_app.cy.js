describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'tester',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('logged in as tester')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('fails')
      cy.get('#login-button').click()

      cy.contains('bad credentials')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'tester', password: 'secret'})
      })

      it('a blog can be created', function() {
        cy.contains('new blog').click()
        
        cy.get('#title-input').type('Test Blog')
        cy.get('#author-input').type('cypress')
        cy.get('#url-input').type('cypress.com')
        cy.contains('add').click()

        cy.contains('Test Blog cypress')
      })
    })
  })
})
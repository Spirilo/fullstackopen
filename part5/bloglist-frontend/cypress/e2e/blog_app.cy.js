describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'tester',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const otherUser = {
      name: 'Other test user',
      username: 'cypress',
      password: 'tester'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
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
        cy.createBlog({ title: 'Test blog', author: 'cypress', url: 'cypress.com', likes: 10})
      })

      it('a blog can be created', function() {
        cy.contains('new blog').click()

        cy.get('#title-input').type('Test Blog')
        cy.get('#author-input').type('cypress')
        cy.get('#url-input').type('cypress.com')
        cy.contains('add').click()

        cy.contains('Test Blog cypress')
      })

      it('you can like the blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('user who added the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('only blog creator can see remove button', function() {
        cy.contains('logout').click()
        cy.login({ username: 'cypress', password: 'tester'})
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('blogs are sorted from most likes to least', function () {
        cy.createBlog({ title: 'Other blog', author: 'Tester', url: 'react.com', likes: 8 })
        cy.createBlog({ title: 'Some blog', author: 'cypress', url: 'java.com', likes: 7 })
        cy.createBlog({ title: 'Last blog', author: 'Tester', url: 'js.com', likes: 22 })

        cy.get('.blog').eq(0).should('contain', 'Last blog')
        cy.get('.blog').eq(1).should('contain', 'Test blog')
        cy.get('.blog').eq(2).should('contain', 'Other blog')
        cy.get('.blog').eq(3).should('contain', 'Some blog')

        cy.contains('Some blog').contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'Last blog')
        cy.get('.blog').eq(1).should('contain', 'Test blog')
        cy.get('.blog').eq(2).should('contain', 'Some blog')
        cy.get('.blog').eq(3).should('contain', 'Other blog')
      })
    })
  })
})
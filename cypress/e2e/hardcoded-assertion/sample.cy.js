const { hits } = require('../../fixtures/stories.json')

describe('Hardcoded assertion bad practice', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    )

    cy.visit('https://hackernews-seven.vercel.app')
  })

  it('searches', () => {
    cy.search('cypress.io')

    cy.get('.table-row')
      .as('tableRows')
      .should('have.length', hits.length)
    hits.forEach((hit, index) => {
      cy.get('@tableRows')
        .eq(index)
        .should('contain', hit.title)
    })
  })
})

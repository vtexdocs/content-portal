/// <reference types="cypress" />
import { writeLog } from '../support/functions'
import navigation from '../../../../public/navigation.json'
import messages from '../../../messages/en.json'

describe('Home page', () => {
  before(() => {
    cy.writeFile('cypress.log', `#Home page#\n`, {
      flag: 'a+',
    })
  })

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      writeLog(this.currentTest.title)
    }
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('loads with the expected title', () => {
    cy.title().should('eq', 'VTEX Content Style Guide')
  })

  it('shows the localization assistants callout and links to the agent page', () => {
    cy.contains(messages['agents_callout.message']).should('be.visible').click()
    cy.location('pathname').should('eq', '/docs/ai/vtex-localization-agent')
  })

  it('lists one card per top-level documentation section from public/navigation.json', () => {
    cy.get('[data-cy="documentation-section-card-list"]')
      .should('be.visible')
      .children()
      .should('have.length', navigation.navbar.length)
  })

  it("links the first card to the AI section's overview page", () => {
    // The AI section card is pinned as the first card on the homepage on
    // purpose, even though it's the last entry in public/navigation.json
    // (which controls the sidebar order instead).
    cy.get('[data-cy="documentation-section-card-list"]')
      .children()
      .first()
      .as('firstCard')

    cy.get('@firstCard').click()
    cy.location('pathname').should('eq', '/docs/ai')
  })
})

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

  it('shows the localization assistants callout', () => {
    // Clicking the callout opens the same header dropdown covered by
    // header.cy.js (it dispatches a custom event the header listens to).
    // That indirect, event-based interaction is flaky in isolation, so here
    // we only assert the callout itself renders with the expected copy.
    cy.contains(messages['agents_callout.message']).should('be.visible')
  })

  it('lists one card per top-level documentation section from public/navigation.json', () => {
    cy.get('[data-cy="documentation-section-card-list"]')
      .should('be.visible')
      .children()
      .should('have.length', navigation.navbar.length)
  })

  it("links the first card to the first section's overview page", () => {
    const firstSection = navigation.navbar[0]

    cy.get('[data-cy="documentation-section-card-list"]')
      .children()
      .first()
      .as('firstCard')

    cy.get('@firstCard').click()
    cy.location('pathname').should('eq', `/${firstSection.slugPrefix}`)
  })
})

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

  it('opens the localization assistants dropdown when the callout is clicked', () => {
    cy.contains(messages['agents_callout.message']).click()
    cy.contains(messages['agents_dropdown_description.text']).should(
      'be.visible'
    )
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

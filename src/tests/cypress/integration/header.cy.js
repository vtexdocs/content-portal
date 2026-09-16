/// <reference types="cypress" />
import { writeLog } from '../support/functions'
import navigation from '../../../../public/navigation.json'
import messages from '../../../messages/en.json'

describe('Header', () => {
  before(() => {
    cy.writeFile('cypress.log', `#Header#\n`, {
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

  it('opens the localization assistants dropdown on hover', () => {
    // The onMouseOver handler that opens the dropdown lives two levels up
    // from the labeled text (label -> button Flex -> container Flex).
    cy.get('[data-cy="agents-dropdown"]').parents().eq(1).trigger('mouseover')
    cy.contains(messages['agents_dropdown_description.text'], {
      timeout: 10000,
    }).should('be.visible')
  })

  it('opens the docs dropdown on hover with a link to every top-level documentation section', () => {
    // Same DOM shape as the agents dropdown above: the onMouseOver handler
    // lives two levels up from the labeled text.
    cy.get('[data-cy="docs-dropdown"]').parents().eq(1).trigger('mouseover')

    cy.get('[data-cy="dropdown-menu"]').should('be.visible')

    navigation.navbar.forEach(({ slugPrefix }) => {
      cy.get('[data-cy="dropdown-menu-first-section"]')
        .find(`a[href="/${slugPrefix}"]`)
        .should('exist')
    })
  })
})

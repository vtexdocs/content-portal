/// <reference types="cypress" />
import { writeLog } from '../support/functions'
import navigation from '../../../../public/navigation.json'

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

  it('navigates to the VTEX Localization Agent page when the agents link is clicked', () => {
    cy.get('[data-cy="agents-link"]').click()
    cy.location('pathname').should('eq', '/docs/ai/vtex-localization-agent')
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

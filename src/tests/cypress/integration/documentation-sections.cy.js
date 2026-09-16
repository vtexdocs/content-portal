/// <reference types="cypress" />
import { writeLog } from '../support/functions'
import navigation from '../../../../public/navigation.json'
import messages from '../../../messages/en.json'

// Maps each top-level section in public/navigation.json (matched by its
// "documentation" key) to the i18n message id used as the <title> and
// PageHeader title of that section's overview page. This mirrors
// `sectionsData`/`menuSectionData` in `src/utils/constants.ts` - if a
// section's title message id changes there, update it here too.
const SECTION_TITLE_MESSAGE_ID = {
  Guides: 'guides_card_title',
  Grammar: 'grammar_card_title',
  Formatting: 'formatting_card_title',
  'Interface copy': 'user_interfaces_card_title',
  Documentation: 'documentation_card_title',
  Glossary: 'glossary_card_title',
}

// Recursively walks a navigation.json section's categories/children and
// returns the first "markdown" leaf found, i.e. a real, currently existing
// article. This keeps the test in sync with the actual content instead of
// hardcoding a slug that could later be renamed or removed.
function findFirstMarkdownLeaf(nodes) {
  for (const node of nodes || []) {
    if (node.type === 'markdown') return node
    const found = findFirstMarkdownLeaf(node.children)
    if (found) return found
  }
  return null
}

describe('Documentation sections', () => {
  before(() => {
    cy.writeFile('cypress.log', `#Documentation sections#\n`, {
      flag: 'a+',
    })
  })

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      writeLog(this.currentTest.title)
    }
  })

  navigation.navbar.forEach(({ documentation, slugPrefix, categories }) => {
    const titleMessageId = SECTION_TITLE_MESSAGE_ID[documentation]
    const overviewPath = `/${slugPrefix}`

    it(`loads the "${documentation}" section overview page (${overviewPath})`, () => {
      cy.visit(overviewPath)

      if (titleMessageId && messages[titleMessageId]) {
        cy.title().should('eq', messages[titleMessageId])
      }
    })

    const firstArticle = findFirstMarkdownLeaf(categories)

    if (firstArticle) {
      const articlePath = `${overviewPath}/${firstArticle.slug.en}`

      it(`loads a real article from the "${documentation}" section (${articlePath})`, () => {
        cy.visit(articlePath)

        cy.get('.title')
          .should('be.visible')
          .invoke('text')
          .should('not.be.empty')
      })
    }
  })
})

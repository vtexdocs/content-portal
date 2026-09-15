export function writeLog(title) {
  const errorLog = `${title}\n`
  cy.writeFile('cypress.log', errorLog, { flag: 'a+' })
}

// Some third-party analytics/tracking script loaded on every page throws an
// uncaught error in Cypress's headless Electron browser ("Browser doesn't
// support required api, or doNotTrack is active."). It's unrelated to the
// application behavior our tests exercise, so we ignore only this specific
// error instead of letting it fail otherwise-passing specs.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('doNotTrack')) {
    return false
  }

  return true
})

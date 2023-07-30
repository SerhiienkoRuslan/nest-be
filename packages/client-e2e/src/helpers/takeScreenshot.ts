import { Context } from 'mocha'

function takeScreenshot(this: Context, step: string, el?: Cypress.Chainable): void {
  if (Cypress.config('isInteractive') || !this?.test?.parent || this?.nested) {
    return
  }

  const timestamp = new Date().valueOf()
  // remove illegal characters from directory/file names
  const scenario = this.test.title.replace(/[/\\?%*:|"<>]/g, '')
  const name = step.replace(/[/\\?%*:|"<>]/g, '')
  const tags = this.tags || ''
  const nameWithTags = tags ? `${tags} ${name}` : name
  const path = `${scenario}/[${timestamp}] ${nameWithTags}`

  if (el) {
    el.screenshot(path, { padding: 10 })
  } else {
    cy.screenshot(path)
  }
}

export const getNestedContext = (context: Context): Context =>
  ({
    ...context,
    nested: true,
  } as unknown as Context)

export default takeScreenshot

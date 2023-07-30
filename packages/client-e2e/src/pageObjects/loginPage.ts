type FieldName = 'email' | 'password';

type ButtonText = 'Login';

class LoginPage {
  readonly route = '/auth/login';

  private readonly page = (): Cypress.Chainable => cy.get('body[id="app"]');

  private readonly field = (name: FieldName): Cypress.Chainable => cy.get(`input[name="${name}"]`);

  private readonly button = (text: ButtonText): Cypress.Chainable => cy.contains('button', text);

  visitPage(): LoginPage {
    cy.visit(this.route);

    return this;
  }

  pageShouldBeVisible(): LoginPage {
    cy.location('pathname').should('equal', this.route);
    this.page().should('be.visible');

    return this;
  }

  typeField(name: FieldName, value: string): LoginPage {
    this.field(name).clear().type(value);

    return this;
  }

  fieldShouldHaveValue(name: FieldName, value: string): LoginPage {
    this.field(name).should('have.value', value);

    return this;
  }

  clickButton(text: ButtonText): LoginPage {
    this.button(text).click();

    return this;
  }
}

export default new LoginPage();

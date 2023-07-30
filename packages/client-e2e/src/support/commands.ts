import '@testing-library/cypress/add-commands';

// eslint-disable-next-line @typescript-eslint/no-namespace
import { CredentialType } from '../types/CypressCommandsTypes';
import loginPage from '../pageObjects/loginPage';

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(credential: CredentialType): void;
  }
}

Cypress.Commands.add('login', (credential) => {
  loginPage.visitPage();

  loginPage
    .pageShouldBeVisible()
    .typeField('email', credential.email)
    .typeField('password', credential.password)
    .clickButton('Login');
});

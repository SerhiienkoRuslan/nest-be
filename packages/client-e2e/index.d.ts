/// <reference types="cypress" />

import '@cypress/code-coverage/support';

import { CredentialType } from './src/types/CypressCommandsTypes';

declare global {
  namespace Cypress {
    interface Chainable {
      task(event: 'getFromProcessEnv', arg: { name: string }): Chainable<string>;
      task(
        event: 'saveToProcessEnv',
        arg: {
          name: string;
          value: unknown;
        },
      ): Chainable<null>;
      login(credential: CredentialType): void;
    }
  }
}

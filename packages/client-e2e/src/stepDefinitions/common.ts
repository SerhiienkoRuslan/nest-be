import { defineStep } from '@badeball/cypress-cucumber-preprocessor';

import { takeScreenshot } from '../helpers';
import loginPage from '../pageObjects/loginPage';

/** I click button {string} */
((step) =>
  defineStep(step, function (text: string) {
    cy.contains('button', text).click();

    takeScreenshot.call(this, step.replace('{string}', text));
  }))('I click button {string}');

/** The button {string} should be disabled */
((step) =>
  defineStep(step, function (text: string) {
    cy.contains('button', text).should('be.disabled');

    takeScreenshot.call(this, step.replace('{string}', text));
  }))('The button {string} should be disabled');

/** I reload the page */
((step) =>
  defineStep(step, function () {
    cy.location('pathname').then((pathname) => {
      cy.reload().then(() => {
        if (pathname === loginPage.route) {
          loginPage.pageShouldBeVisible();

          takeScreenshot.call(this, step);
        }
      });
    });
  }))('I reload the page');

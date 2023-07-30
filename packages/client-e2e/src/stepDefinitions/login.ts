import { defineStep, DataTable } from '@badeball/cypress-cucumber-preprocessor';

import loginPage from '../pageObjects/loginPage';
import { credentials, UserRole } from '../fixtures/users';
import { takeScreenshot } from '../helpers';

/** I visit the login page */
((step) =>
  defineStep(step, function () {
    loginPage.visitPage().pageShouldBeVisible();

    takeScreenshot.call(this, step);
  }))('I visit the login page');

/** The login form should have values */
((step) =>
  defineStep(step, function (table: DataTable) {
    const { Email: email, Password: password } = Object.fromEntries(table.rows());

    loginPage.fieldShouldHaveValue('email', email).fieldShouldHaveValue('password', password);

    takeScreenshot.call(this, step);
  }))('The login form should have values');

/** I am logged in as {string} */
((step) =>
  defineStep(step, function (user: UserRole) {
    const email = credentials[user as UserRole]?.email;
    const password = credentials[user as UserRole]?.password;

    cy.login({ email, password });
  }))('I am logged in as {string}');

Feature: Login
  Scenario: The Login page has correct default state
    When I visit the login page
    Then The login form should have values
      | Field    | Value |
      | Email    |       |
      | Password |       |

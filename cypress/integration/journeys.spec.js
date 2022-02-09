// journeys.spec.js created with Cypress

beforeEach(() => {
  cy.visit("http://localhost:3000");
});

describe("Route 1", () => {
  it("can go through Route 1", () => {
    cy.contains("Choose a category").click();
    cy.url().should("include", "/categories");
    cy.contains("Education").should("be.visible");
    cy.contains("Health").should("be.visible");
    cy.contains("Housing").should("be.visible");
    cy.contains("Identity").should("be.visible");
    cy.contains("Population").should("be.visible");
    cy.contains("Work").should("be.visible");
    cy.contains("Housing").click();
    cy.contains("Show Heating options").click();
    cy.contains("Gas").click();
    cy.url().should("include", "/housing/heating/gas");
  });
});

beforeEach(() => {
  cy.visit("http://localhost:3000");
});

describe("User Testing Scenarios", () => {
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
    cy.get(".mapboxgl-canvas").should("be.visible");
  });
  it("can go through Route 2", () => {
    cy.get("#search-field").type("lon").type("{downarrow}").type("{enter}");
    cy.contains("Choose").click();
    cy.url().should("include", "/categories");
    cy.contains("Work").click();
    cy.contains("Show Working hours options").click();
    cy.contains("Part-time (less than 30 hours per week)").click();
    cy.url().should("include", "/work/working-hours/part-time-less-than-30-hours-per-week");
    cy.get(".mapboxgl-canvas").should("be.visible");
  });
});

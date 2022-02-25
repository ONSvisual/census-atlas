beforeEach(() => {
  cy.visit("/");
  cy.wait(500);
});

describe("User Testing Scenarios", () => {
  it("can go through Route 1", () => {
    cy.contains("Choose a category").click();
    cy.wait(500);
    cy.url().should("include", "/categories");
    cy.contains("Education").should("exist");
    cy.contains("Health").should("exist");
    cy.contains("Housing").should("exist");
    cy.contains("Identity").should("exist");
    cy.contains("Population").should("exist");
    cy.contains("Work").should("exist");
    cy.contains("Housing").click();
    cy.contains("Show Heating options").click();
    cy.contains("Gas").click();
    cy.wait(500);
    cy.url().should("include", "/housing/heating/gas");
    cy.get(".mapboxgl-canvas").should("be.visible");
  });
  it("can go through Route 2", () => {
    cy.get("#search-field").type("lon").type("{downarrow}").type("{enter}");
    cy.contains("Choose").click();
    cy.wait(500);
    cy.url().should("include", "/categories");
    cy.contains("Work").click();
    cy.contains("Show Working hours options").click();
    cy.contains("Part-time (less than 30 hours per week)").click();
    cy.wait(500);
    cy.url().should("include", "/work/working-hours/part-time-less-than-30-hours-per-week");
    cy.get(".mapboxgl-canvas").should("be.visible");
  });
});

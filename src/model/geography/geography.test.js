import MockGeographyService from "./geography/mockGeographyService";
import { initialiseGeography, loadingGeography, reset } from "./geography";

describe("initialise geography", () => {
  it("it calls functions from the geography service", async () => {
    // given
    // a mock for the geography service
    const mockGeographyService = new MockGeographyService({ features: [] }, []);

    // when
    // we call initialise geography
    await initialiseGeography(mockGeographyService);

    // then
    // it calls functions on the geography service
    expect(mockGeographyService.getLadBoundariesCalled).toBe(1);
    expect(mockGeographyService.getLsoaDataCalled).toBe(1);
  });

  it("switches geographyLoading to true and back again", async () => {
    // given
    // we reset
    reset();
    const mockGeographyService = new MockGeographyService({ features: [] }, []);

    // and record a change history for loadingGeography
    var changeHistory = [];
    loadingGeography.subscribe((value) => {
      changeHistory.push(value);
    });

    // when
    // we call initialise geography
    await initialiseGeography(mockGeographyService);

    // then
    // it will have switched loading from false to true and back again
    expect(changeHistory).toStrictEqual([false, true, false]);
  });
});

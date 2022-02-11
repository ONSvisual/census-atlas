import GeodataApiDataService from "../services/geodataApiDataService";
import config from "../../../config";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("GeodataApiDataService", () => {
  const dataService = new GeodataApiDataService();
  const categories = ["catCode1", "catCode2"];
  it("fetchSelectedDataForGeographyType for LAD", () => {
    const geoType = "lad";
    fetch.mockResponseOnce({
      text: async () => {
        return Promise.resolve(`geography_code,catCode1,catCode2\ngeoCode1,92028,30117`);
      },
    });

    dataService.fetchSelectedDataForGeographyType(geoType, categories);

    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataEndpoint}?cols=geography_code,catCode1,catCode2&geotype=LAD&rows=all`,
    );
  });
  it("fetchSelectedDataForGeographyType for LSOA", () => {
    const geoType = "lsoa";

    dataService.fetchSelectedDataForGeographyType(geoType, categories);

    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataEndpoint}?cols=geography_code,catCode1,catCode2&geotype=LSOA&rows=all`,
    );
  });
});

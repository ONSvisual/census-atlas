import GeodataApiDataService from "../services/geodataApiDataService";
import config from "../../../config";
import { enableFetchMocks } from "jest-fetch-mock";
import { totalCatCodeLookup, reverseTotalCatCodeLookup } from "../../metadata/metadata";

enableFetchMocks();

describe("GeodataApiDataService", () => {
  const dataService = new GeodataApiDataService();
  const categories = ["catCode", "totalCode"];
  totalCatCodeLookup.set({ catCode: "totalCode" });
  reverseTotalCatCodeLookup.set({ totalCode: "catCode" });
  it("fetchSelectedDataForGeographyType for LAD", async () => {
    //given LAD geotype and a mocked fetch response
    const geoType = "lad";
    fetch.mockResponseOnce(`geography_code,catCode,totalCode\ngeoCode1,100,200`);

    //when we call function
    const response = await dataService.fetchSelectedDataForGeographyType(geoType, categories);

    //then
    //fetch is called with correct url
    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataEndpoint}?cols=geography_code,catCode,totalCode&geotype=LAD&rows=all`,
    );
    //and
    //the function returns a Map with the correct structure
    expect(response).toEqual(new Map([["geoCode1", new Map([["catCode", { value: 100, total: 200, perc: 50 }]])]]));
  });
  it("fetchSelectedDataForGeographyType for LSOA", () => {
    //given LSOA geotype
    const geoType = "lsoa";

    //when we call the function
    dataService.fetchSelectedDataForGeographyType(geoType, categories);

    //then
    //fetch is called with the correct url
    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataEndpoint}?cols=geography_code,catCode,totalCode&geotype=LSOA&rows=all`,
    );
  });
});

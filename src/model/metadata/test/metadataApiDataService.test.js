import { enableFetchMocks } from "jest-fetch-mock";
import { describe } from "jest-circus";
import MetadataApiDataService from "../services/metadataApiDataService";
import config from "../../../config";

enableFetchMocks();

describe("Metadata api data service", () => {
  const dataService = new MetadataApiDataService();
  const geoType = "TESTGEOTYPE";
  const catCode = "testCatCode";
  const totalCode = "testTotalCode";
  const k = 5;
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  it("fetchCensusMetadata function", async () => {
    fetch.mockResponseOnce(JSON.stringify([{ test: "test" }]));
    const json = await dataService.fetchCensusMetadata();
    expect(fetch).toHaveBeenCalledWith(`${config.api.baseUrl}${config.api.censusMetadataEndpoint}?filtertotals=true`);
    expect(json).toEqual([{ test: "test" }]);
  });

  it("fetchCensusDataBreaks method returns succesful", async () => {
    fetch.mockResponseOnce(JSON.stringify([1, 2, 3, 4, 5]));
    const response = await dataService.fetchCensusDataBreaks(geoType, catCode, totalCode, k);
    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataBreaksEndpoint}?cat1=testCatCode&cat2=testTotalCode&geotype=TESTGEOTYPE&k=5`,
    );
    expect(response).toEqual([1, 2, 3, 4, 5]);
  });
  it("fetchCensusDataBreaks method throws an error", async () => {
    fetch.mockRejectOnce(new Error('{"error":"no data found"}'));
    const geoType = "testgeotype";
    const response = await dataService.fetchCensusDataBreaks(geoType, catCode, totalCode, k);
    expect(fetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}${config.api.censusDataBreaksEndpoint}?cat1=testCatCode&cat2=testTotalCode&geotype=${geoType}&k=5`,
    );
    expect(response).toEqual(null);
    expect(fetch).toThrow(Error);
    expect(console.error).toHaveBeenCalled();
    expect(error).toBeCalledWith("Error:no data found");
  });
});

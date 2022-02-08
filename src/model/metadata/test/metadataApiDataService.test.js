import { enableFetchMocks } from "jest-fetch-mock";
import { describe } from "jest-circus";
import MetadataApiDataService from "../services/metadataApiDataService";
import config from "../../../config";

enableFetchMocks();

describe("Metadata api data service", () => {
  it("fetchCensusMetadata function", async () => {
    fetch.mockResponseOnce(JSON.stringify([{ test: "test" }]));

    const dataService = new MetadataApiDataService();
    const json = await dataService.fetchCensusMetadata();
    expect(fetch).toHaveBeenCalledWith(`${config.api.baseUrl}${config.api.censusMetadataEndpoint}?filtertotals=true`);
    expect(json).toEqual([{ test: "test" }]);
  });
});

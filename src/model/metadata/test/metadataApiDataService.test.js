import { describe, test } from "jest-circus";
import { jest } from "@jest/globals";
import MetadataApiDataService from "../services/metadataApiDataService";

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([{ test: "test" }]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

// const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({json: () => Promise.resolve([{test: "test"}])}))

describe("Metadata api data service", () => {
  it("fetchCensusMetadata function", async () => {
    const dataService = new MetadataApiDataService();
    const json = await dataService.fetchCensusMetadata();
    // expect(fetchMock).toHaveBeenCalledWith("http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/metadata")
    expect(Array.isArray(json)).toEqual(true);
    expect(json).toEqual([{ test: "test" }]);
  });
});

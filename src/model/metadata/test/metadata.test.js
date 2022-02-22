import MockMetadataService from "../services/mockMetadataService";
import mockMetadata from "../../../data/test/mockMetadata";
import metadata from "../../../data/apiMetadata";
import {
  initialiseCensusMetadata,
  censusMetadata,
  totalCatCodeLookup,
  reverseTotalCatCodeLookup,
  fetchCensusDataBreaks,
  dataBreaks,
  newDataBreaks,
} from "../metadata";
import { get } from "svelte/store";

describe("initialiseCensusMetadata", () => {
  it("calls functions from the metadata service", async () => {
    //given
    //a mock for the metadata service
    const mockMetadataService = new MockMetadataService(mockMetadata);

    //when
    //we call fetchCensusMetadata
    await initialiseCensusMetadata(mockMetadataService);

    //then
    //it calls functions on the metadata service
    expect(mockMetadataService.fetchCensusMetadataCalled).toBe(1);

    //and
    //it stores the response in the censusMetadata store
    expect(get(censusMetadata)).toEqual(mockMetadata);
  });
});

describe("initialiseCensusMetadata with the real metadata", () => {
  it("provides a total category code for each category within the totalCatCodeLookup", async () => {
    //given
    //a mock for the metadata service, called with real metadata
    const mockMetadataService = new MockMetadataService(metadata);

    //when
    //we call initialiseCensusMetadata
    await initialiseCensusMetadata(mockMetadataService);

    //then
    //totalCatCodeLookup contains a total code for each category
    metadata.forEach((topic) => {
      topic.tables.forEach((table) => {
        table.categories.forEach((category) => {
          expect(get(totalCatCodeLookup)).toHaveProperty(category.code);
          expect(get(totalCatCodeLookup)[category.code]).not.toEqual(undefined);
        });
      });
    });

    //and
    //reverseTotalCatCodeLookup contains category codes for each total code
    metadata.forEach((topic) => {
      topic.tables.forEach((table) => {
        expect(get(reverseTotalCatCodeLookup)).toHaveProperty(table.total.code);
        expect(get(reverseTotalCatCodeLookup)[table.total.code]).not.toEqual(undefined);
      });
    });
  });
});

describe("fetchCensusDataBreaks", () => {
  let mockMetadataService = new MockMetadataService([0.1, 0.2, 0.3, 0.4, 0.5]);
  it("successfully writes breaks to the dataBreaks store as percentages", async () => {
    await fetchCensusDataBreaks(mockMetadataService, "catCode", "totalCode", 5, "lad");
    expect(get(dataBreaks)).toEqual(new Map([["catCode", { lad: [10, 20, 30, 40, 50] }]]));
    expect(get(newDataBreaks)).toEqual(true);
  });

  it("adds LSOA to existing LAD breaks within object for a given catCode", async () => {
    await fetchCensusDataBreaks(mockMetadataService, "catCode", "totalCode", 5, "lsoa");
    expect(get(dataBreaks)).toEqual(new Map([["catCode", { lad: [10, 20, 30, 40, 50], lsoa: [10, 20, 30, 40, 50] }]]));
    expect(get(newDataBreaks)).toEqual(true);
  });

  it("does not write to dataBreaks store if data service response is null", async () => {
    mockMetadataService = new MockMetadataService(null);
    await fetchCensusDataBreaks(mockMetadataService, "catCode2", "totalCode2", 5, "lad");
    expect(get(dataBreaks)).toEqual(new Map([["catCode", { lad: [10, 20, 30, 40, 50], lsoa: [10, 20, 30, 40, 50] }]]));
    expect(get(newDataBreaks)).toEqual(false);
  });
});

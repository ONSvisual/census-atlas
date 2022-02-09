import MockMetadataService from "../services/mockMetadataService";
import mockMetadata from "../../../data/mockMetadata";
import metadata from "../../../data/apiMetadata";
import { initialiseCensusMetadata, censusMetadata, totalCatCodeLookup, reverseTotalCatCodeLookup } from "../metadata";
import { get } from "svelte/store";

describe("fetchCensusMetadata", () => {
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

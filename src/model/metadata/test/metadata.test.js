import MockMetadataService from "../services/mockMetadataService";
import { fetchCensusMetadata, censusMetadata } from "../metadata";
import {get} from "svelte/store"

describe("fetchCensusMetadata", () => {
  it("calls functions from the metadata service", async () => {
    //given
    //a mock for the metadata service
    const mockMetadataService = new MockMetadataService(["metadata"]);

    //when
    //we call fetchCensusMetadata
    await fetchCensusMetadata(mockMetadataService);

    //then
    //it calls functions on the metadata service
    expect(mockMetadataService.fetchCensusMetadataCalled).toBe(1);

    //and
    //it stores the response in the censusMetadata store
    expect(get(censusMetadata)).toEqual(["metadata"])
  });
});

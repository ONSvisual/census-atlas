import { writable } from "svelte/store";

export const selectedCategoryBreaks = writable({});
export const censusMetadata = writable([]);

let dataService = null;

export async function fetchCensusDataBreaks(metadataDataService, cat, k) {
  dataService = metadataDataService;
  let breaks = {};
  breaks.lad = await dataService.fetchCensusDataBreaks("LAD", cat, k);
  breaks.lsoa = await dataService.fetchCensusDataBreaks("LSOA", cat, k);
  selectedCategoryBreaks.set(breaks);
}

export async function fetchCensusMetadata(metadataService) {
  const data = await metadataService.fetchCensusMetadata();
  censusMetadata.set(data);
}

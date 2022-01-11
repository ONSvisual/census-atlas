import { writable } from "svelte/store";

let dataService = null;
export const censusDataBreaks = writable([]);

export async function fetchCensusDataBreaks(metadataDataService, geoType, cat, k) {
  dataService = metadataDataService;
  const data = await dataService.fetchCensusDataBreaks(geoType, cat, k);
  censusDataBreaks.set(data);
}

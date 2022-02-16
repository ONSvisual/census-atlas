import { writable, get } from "svelte/store";

export const selectedCategoryBreaks = writable({});
export const censusMetadata = writable([]);
export const totalCatCodeLookup = writable({});
export const reverseTotalCatCodeLookup = writable({});

export async function fetchCensusDataBreaks(metadataDataService, catCode, totalCode, k, geoType) {
  let breaks = { lad: [], lsoa: [] };
  if (!geoType || geoType.toLowerCase() != "lsoa") {
    const breaksResp = await metadataDataService.fetchCensusDataBreaks("LAD", catCode, totalCode, k);
    breaks.lad = breaksResp.map((dataBreak) => dataBreak * 100);
  }
  if (!geoType || geoType.toLowerCase() != "lad") {
    const breaksResp = await metadataDataService.fetchCensusDataBreaks("LSOA", catCode, totalCode, k);
    breaks.lsoa = breaksResp.map((dataBreak) => dataBreak * 100);
  }
  selectedCategoryBreaks.set(breaks);
}

export async function initialiseCensusMetadata(metadataService) {
  const data = await metadataService.fetchCensusMetadata();
  totalCatCodeLookup.set(buildTotalCatCodeLookup(data));
  reverseTotalCatCodeLookup.set(buildReverseTotalCatCodeLookup(data));
  censusMetadata.set(data);
}

export async function initialiseCensusMetadataFromFlatFile(flatfileMetadataService) {
  const data = await flatfileMetadataService.fetchCensusTableStructure();
  totalCatCodeLookup.set(buildTotalCatCodeLookup(data));
  reverseTotalCatCodeLookup.set(buildReverseTotalCatCodeLookup(data));
  censusMetadata.set(data);
}

function buildTotalCatCodeLookup(metadata) {
  let lookup = {};
  metadata.forEach((topic) => {
    topic.tables.forEach((table) => {
      if (table.categories != null) {
        table.categories.forEach((category) => {
          lookup[category.code] = table.total.code;
        });
      }
    });
  });
  return lookup;
}

function buildReverseTotalCatCodeLookup(metadata) {
  let reverseLookup = {};
  metadata.forEach((topic) => {
    topic.tables.forEach((table) => {
      if (table.categories != null) {
        reverseLookup[table.total.code] = table.categories;
      }
    });
  });
  return reverseLookup;
}

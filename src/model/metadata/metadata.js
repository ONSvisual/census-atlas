import { writable, get } from "svelte/store";
import { toggleable } from "../censusdata/stores";

export const dataBreaks = writable(new Map());
export const newDataBreaks = toggleable(false);
export const censusMetadata = writable([]);
export const totalCatCodeLookup = writable({});
export const reverseTotalCatCodeLookup = writable({});

export async function fetchCensusDataBreaks(metadataDataService, catCode, totalCode, k, geoType) {
  const breaksResp = await metadataDataService.fetchCensusDataBreaks(geoType.toUpperCase(), catCode, totalCode, k);
  if (breaksResp) {
    const breaks = breaksResp.map((dataBreak) => dataBreak * 100);
    newDataBreaks.setFalse();
    if (get(dataBreaks).has(catCode)) {
      get(dataBreaks).set(catCode, { ...get(dataBreaks).get(catCode), [geoType.toLowerCase()]: breaks });
    } else {
      get(dataBreaks).set(catCode, { [geoType.toLowerCase()]: breaks });
    }
    newDataBreaks.setTrue();
  }
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

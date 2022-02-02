import { writable, get } from "svelte/store";

export const selectedCategoryBreaks = writable({});
export const censusMetadata = writable([]);
export const totalCatCodeLookup = writable({});
export const totalCatCodes = writable(new Set());
export const reverseTotalCatCodeLookup = writable({});

export async function fetchCensusDataBreaks(metadataDataService, catCode, totalCode, k) {
  let breaks = {};
  breaks.lad = await metadataDataService.fetchCensusDataBreaks("LAD", catCode, totalCode, k);
  breaks.lsoa = await metadataDataService.fetchCensusDataBreaks("LSOA", catCode, totalCode, k);
  breaks.lad = breaks.lad.map((dataBreak) => dataBreak * 100);
  breaks.lsoa = breaks.lsoa.map((dataBreak) => dataBreak * 100);
  selectedCategoryBreaks.set(breaks);
}

export async function initialiseCensusMetadata(metadataService) {
  const data = await metadataService.fetchCensusMetadata();
  totalCatCodeLookup.set(buildTotalCatCodeStores(data));
  reverseTotalCatCodeLookup.set(buildReverseTotalCatCodeLookup(data));
  censusMetadata.set(data);
}

export async function initialiseCensusMetadataFromFlatFile(flatfileMetadataService) {
  const data = await flatfileMetadataService.fetchCensusTableStructure();
  totalCatCodeLookup.set(buildTotalCatCodeStores(data));
  reverseTotalCatCodeLookup.set(buildReverseTotalCatCodeLookup(data));
  censusMetadata.set(data);
}

function buildTotalCatCodeStores(metadata) {
  let lookup = {};
  metadata.forEach((topic) => {
    topic.tables.forEach((table) => {
      if (table.categories != null) {
        addToTotalCatCodesSet(table.total.code);
        table.categories.forEach((category) => {
          lookup[category.code] = table.total.code;
        });
      }
    });
  });
  return lookup;
}

function addToTotalCatCodesSet(totalCatCode) {
  get(totalCatCodes).add(totalCatCode);
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

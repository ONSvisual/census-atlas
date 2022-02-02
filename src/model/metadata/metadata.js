import { writable, get } from "svelte/store";

export const selectedCategoryBreaks = writable({});
export const censusMetadata = writable([]);
export const totalCatCodeLookup = writable({});
export const totalCatCodes = writable(new Set());

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

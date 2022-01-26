import { writable, get } from "svelte/store";
import { mapBBoxCodes, toggleable } from "./stores";
import { addNewGeoDataToCache } from "../utils";
import config from "../../config";

export let selectedGeographyData = writable(new Map());
export let dataByGeography = writable(new Map());
export let englandAndWalesData = writable(new Map());
export let newDataByGeography = toggleable(false);

export let censusTableStructureIsLoaded = writable(false);
export let categoryDataIsLoaded = writable(false);
export let tableIsLoaded = writable(false);
export let selectedData = writable({});

export let categoryData = {};
export let tableData = {};
export let breaks = [];

export let topics = {};
export let tables = {};
export let categories = {};

let categoryCodeLookup = {};

export function reset() {
  censusTableStructureIsLoaded.set(false);
  categoryDataIsLoaded.set(false);
  tableIsLoaded.set(false);

  categoryData = {};
  tableData = {};
  breaks = [];

  topics = {};
  tables = {};
  categories = {};

  categoryCodeLookup = {};
}

export async function fetchAllDataForGeography(censusDataService, geographyCode, overwriteCache) {
  const data = await censusDataService.fetchAllDataForGeography(geographyCode);
  //if E&W data (call on app initialise)
  if (geographyCode == config.eAndWGeoCode) {
    englandAndWalesData.set(data);
  } else if (overwriteCache) {
    //overwrite dataByGeography store
    dataByGeography.set(data);
  } else {
    //add to existing data in dataByGeography store
    addNewGeoDataToCache(data);
  }
}

export async function fetchSelectedDataForGeoType(censusDataService, geoType, categories, overwriteCache) {
  const data = await censusDataService.fetchSelectedDataForGeographyType(geoType, categories);
  if (overwriteCache) {
    dataByGeography.set(data);
  } else {
    addNewGeoDataToCache(data);
  }
}

export async function fetchSelectedDataForGeographies(censusDataService, geoCodes, catCodes, overwriteCache) {
  const data = await censusDataService.fetchSelectedDataForGeographies(geoCodes, catCodes);
  if (overwriteCache) {
    dataByGeography.set(data);
  } else {
    addNewGeoDataToCache(data);
  }
}

function filterOutMapBBoxCodesWithCachedData(dataByGeography, mapBBoxCodes) {
  if (dataByGeography.length == 0) {
    return mapBBoxCodes;
  }
  return mapBBoxCodes.filter((item) => !dataByGeography.has(item));
}

export async function fetchSelectedDataForNewBoundingBoxGeographies(censusDataService, catCodes, overwriteCache) {
  const geoCodes = filterOutMapBBoxCodesWithCachedData(get(dataByGeography), get(mapBBoxCodes));
  const data = await censusDataService.fetchSelectedDataForGeographies(geoCodes, catCodes);
  if (overwriteCache) {
    dataByGeography.set(data);
  } else {
    addNewGeoDataToCache(data);
  }
}

export async function fetchSelectedDataForWholeBoundingBox(
  censusDataService,
  geoTypes,
  catCodes,
  bBox,
  overwriteCache,
) {
  const data = await censusDataService.fetchSelectedDataForBoundingBox(geoTypes, catCodes, bBox);
  if (overwriteCache) {
    dataByGeography.set(data);
  } else {
    addNewGeoDataToCache(data);
  }
}

export async function initialiseCensusData(censusDataService) {
  await fetchTableStructure(censusDataService);
}

export async function fetchTableStructure(censusDataService) {
  let structure = await censusDataService.fetchCensusTableStructure();

  structure.forEach((topic) => {
    topics[topic.code] = {
      code: topic.code,
      name: topic.name,
      slug: topic.slug,
      tables: topic.tables.map((table) => table.code),
    };

    topic.tables.forEach((table) => {
      tables[table.code] = {
        topic: topic.code,
        code: table.code,
        name: table.name,
        slug: table.slug,
        categories: table.categories.map((category) => category.code),
        categoriesArray: table.categories,
      };
      categoryCodeLookup[table.slug] = {};
      table.categories.forEach((category) => {
        categories[category.code] = {
          code: category.code,
          name: category.name,
          slug: category.slug,
          table: table.code,
          topic: topic.code,
        };
        categoryCodeLookup[table.slug][category.slug] = category.code;
      });
    });
  });

  censusTableStructureIsLoaded.set(true);
}

export function getCategoryBySlug(tableSlug, categorySlug) {
  let table = categoryCodeLookup[tableSlug];
  if (table) {
    let code = table[categorySlug];
    if (code) {
      return categories[code];
    }
  }
  return null;
}

export function getSlugByCategoryId(categoryId) {
  let category = categories[categoryId];
  let table = tables[category.table];
  let topic = topics[table.topic];

  return `${topic.slug}/${table.slug}/${category.slug}`;
}

export async function fetchCensusData(censusDataService, categoryCode, geographyCode) {
  categoryDataIsLoaded.set(false);

  // Do a simple data load
  let lsoaData = await censusDataService.fetchLsoaCategoryData(categoryCode);
  let higherData = await censusDataService.fetchHigherGeographyCategoryData(categoryCode);

  categoryData = { ...lsoaData, ...higherData };
  breaks = await censusDataService.fetchLegendBreakpoints(categoryCode);
  categoryDataIsLoaded.set(true);
}

export function populatesSelectedData(tableName, tableCategories, selectedCategory, tableTotal) {
  selectedData.set({});
  selectedData.set({
    tableName: tableName,
    tableCategories: tableCategories,
    categorySelected: selectedCategory,
    total: tableTotal,
  });
}

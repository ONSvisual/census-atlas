import { writable, get } from "svelte/store";
import { mapBBoxCodes } from "./stores";

export let selectedGeographyData = writable(Map);
export let dataByGeography = writable(Map);
export let newDataByGeography = writable(false)

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

let dataService = null;

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

export async function fetchAllDataForGeography(censusDataService, geographyCode) {
  selectedGeographyData.clear();
  dataService = censusDataService;
  const data = await dataService.fetchAllDataForGeography(geographyCode);
  selectedGeographyData.set(data);
}

export async function fetchSelectedDataForGeoType(censusDataService, geoType, categories) {
  dataService = censusDataService;
  const data = await dataService.fetchSelectedDataForGeographyType(geoType, categories);
  dataByGeography.set(data);
}

export async function fetchSelectedDataForGeographies(censusDataService, geoCodes, catCodes) {
  dataService = censusDataService;
  const data = await dataService.fetchSelectedDataForGeographies(geoCodes, catCodes);
  dataByGeography.set(data);
}

function filtermapBBoxCodes(dataByGeography, mapBBoxCodes) {
  return mapBBoxCodes.filter((item) => !dataByGeography.has(item));
}

export async function fetchSelectedDataForNewBoundingBoxGeographies(censusDataService, catCodes) {
  dataService = censusDataService;
  let geoCodes = filtermapBBoxCodes(get(dataByGeography), get(mapBBoxCodes));
  const data = await dataService.fetchSelectedDataForGeographies(geoCodes, catCodes);
  data.forEach((data, key) => {
    const catCode = Object.keys(data)
    get(dataByGeography).set(key, {[catCode]: data[catCode]})
  })
  newDataByGeography.set(true)
}

export async function initialiseCensusData(censusDataService) {
  dataService = censusDataService;
  await fetchTableStructure();
}

export async function fetchTableStructure() {
  let structure = await dataService.fetchCensusTableStructure();

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

export async function fetchCensusData(categoryCode, geographyCode) {
  categoryDataIsLoaded.set(false);

  // Do a simple data load
  let lsoaData = await dataService.fetchLsoaCategoryData(categoryCode);
  let higherData = await dataService.fetchHigherGeographyCategoryData(categoryCode);

  categoryData = { ...lsoaData, ...higherData };
  breaks = await dataService.fetchLegendBreakpoints(categoryCode);
  categoryDataIsLoaded.set(true);
}

export function populatesSelectedData(tableName, tableCategories, selectedCategory) {
  selectedData.set({});
  selectedData.set({ tableName: tableName, tableCategories: tableCategories, categorySelected: selectedCategory });
}

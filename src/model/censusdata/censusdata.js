import { writable } from "svelte/store";

export let censusTableStructureIsLoaded = writable(false);
export let categoryDataIsLoaded = writable(false);
export let tableIsLoaded = writable(false);

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

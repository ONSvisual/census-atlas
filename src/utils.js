import { feature } from "topojson-client";
import { csvParse, autoType } from "d3-dsv";
import { get } from "svelte/store";
import { ckmeans } from "simple-statistics";

export async function getLsoaData(url) {
  let response = await fetch(url);
  let string = await response.text();
  let data = await csvParse(string, autoType);
  return data;
}

export async function getNomis(url, dataService, geographicCodesStore, selectedCategoryTotals, indicatorCode) {
  console.log(indicatorCode);
  let geoCodesStore = get(geographicCodesStore);
  if (geoCodesStore.length == 0) {
    let geoCodes = await dataService.getGeographicCodes(url);
    geographicCodesStore.set(geoCodes);
  }
  return await dataService.getNomisData(url, geographicCodesStore, selectedCategoryTotals, indicatorCode);
}

export function processAggregateData(dataset, lookup) {
  let lsoa = {
    index: {},
  };
  let lad = {
    data: [],
    index: {},
  };
  let englandAndWales = {
    data: {
      value: 0,
      count: 0,
    },
  };
  let ladTemp = {};
  dataset.forEach((d) => calculateAggregateData(d, lsoa, lookup, lad, ladTemp, englandAndWales));
  sortLadsByPercentage(lad, ladTemp);
  englandAndWales.data.perc = (englandAndWales.data.value / englandAndWales.data.count) * 100;
  return {
    lsoa: lsoa,
    lad: lad,
    englandAndWales: englandAndWales,
  };
}

function calculateAggregateData(lsoaData, lsoa, lookup, lad, ladTemp, englandAndWales) {
  lsoa.index[lsoaData.code] = lsoaData;
  let parent = lookup[lsoaData.code].parent;

  if (!lad.index[parent]) {
    lad.index[parent] = {
      code: parent,
      value: lsoaData.value,
      count: lsoaData.count,
    };
    ladTemp[parent] = [lsoaData];
  } else {
    lad.index[parent].value += lsoaData.value;
    lad.index[parent].count += lsoaData.count;
    ladTemp[parent].push(lsoaData);
  }
  englandAndWales.data.value += lsoaData.value;
  englandAndWales.data.count += lsoaData.count;
}

function sortLadsByPercentage(lad, ladTemp) {
  let ladCodes = Object.keys(lad.index);
  ladCodes.forEach((ladCode) => calculateLadPercentages(ladCode, lad, ladTemp));
  lad.data.sort((a, b) => a.perc - b.perc);
}

function calculateLadPercentages(ladCode, lad, ladTemp) {
  lad.index[ladCode].perc = (lad.index[ladCode].value / lad.index[ladCode].count) * 100;
  lad.index[ladCode].median = ladTemp[ladCode][Math.floor(ladTemp[ladCode].length / 2)];
  lad.data.push(lad.index[ladCode]);
}

export function getBreaks(chunks) {
  let breaks = [];

  chunks.forEach((chunk) => {
    breaks.push(chunk[0]);
  });

  breaks.push(chunks[chunks.length - 1][chunks[chunks.length - 1].length - 1]);
  return breaks;
}

export function getThresholds(domain, exp, count = 32) {
  const offset = exp == 1 ? domain[0] : 0;
  const scale = domain[1] - offset;
  const breaks = [offset];
  const brek = 1 / count;
  for (let i = 1; i <= count; i++) {
    let node = Math.pow(i * brek, 1 / exp) * scale + offset;
    if (node > domain[0]) {
      breaks.push(node);
    }
  }
  return breaks;
}

export async function storeNewCategoryAndTotals(
  selectedCategory,
  selectedCategoryTotals,
  selectMeta,
  localDataService,
  url,
) {
  selectedCategory.set(selectMeta.code);
  let categoryTotals = await localDataService.getCategoryTotals(url);
  selectedCategoryTotals.set(categoryTotals);
}

export function sortNomisDataByPercentage(nomisData) {
  nomisData.sort((a, b) => a.perc - b.perc);
}

export function populateColors(nomisData, colors) {
  sortNomisDataByPercentage(nomisData);
  let dataset = {
    lsoa: {},
    lad: {},
    englandAndWales: {},
  };
  dataset.lsoa.data = nomisData;
  let vals = nomisData.map((d) => d.perc);
  let chunks = ckmeans(vals, 5);
  let breaks = getBreaks(chunks);
  dataset.lsoa.breaks = breaks;
  dataset.lsoa.data.forEach((d) => assignMapColors(d, colors, breaks));
  return dataset;
}

function assignMapColors(d, colors, breaks) {
  var n = 4;
  if (d.perc <= breaks[1]) {
    n = 0;
  } else if (d.perc <= breaks[2]) {
    n = 1;
  } else if (d.perc <= breaks[3]) {
    n = 2;
  } else if (d.perc <= breaks[4]) {
    n = 3;
  }
  d.color = colors.base[n];
  d.muted = colors.muted[n];
  d.fill = colors.base[n];
}

export function addLadDataToDataset(dataset, lsoalookup, nomisData) {
  let proc = processAggregateData(nomisData, lsoalookup);
  dataset.lsoa.index = proc.lsoa.index;
  dataset.lad.data = proc.lad.data;
  dataset.lad.index = proc.lad.index;
  let ladVals = proc.lad.data.map((d) => d.perc);
  let ladChunks = ckmeans(ladVals, 5);
  dataset.lad.breaks = getBreaks(ladChunks);
  dataset.englandAndWales.data = proc.englandAndWales.data;
}

export function setColors(data, active, lsoalookup, ladbounds, selectData, selectItem, ladtopo, map, lad_dta) {
  let newdata = JSON.parse(JSON.stringify(data[selectItem.code]));
  if (active.lad.selected) {
    // re-color dataset
    newdata.lsoa.data.forEach((d) => {
      if (lsoalookup[d.code].parent == active.lad.selected) {
        d.fill = d.color;
        d.selected = true;
      } else {
        d.fill = d.muted;
        d.selected = false;
      }
    });
    // zoom to district on map
    // let geometry = ladbounds.features.find(
    //   (f) => f.properties[ladtopo.code] == active.lad.selected
    // ).geometry;
    let b = lad_dta.get(active.lad.selected);
    let bounds = [b.minx, b.miny, b.maxx, b.maxy];

    if (!active.lsoa.selected) {
      map.fitBounds(bounds, { padding: 20 });
    }
  }
  selectData = newdata;
}

export function updateURL(location, selectCode, active, mapLocation, history) {
  let hash = location.hash;
  let newhash = `#/${selectCode}/${active.lad.selected ? active.lad.selected : ""}/${
    active.lsoa.selected ? active.lsoa.selected : ""
  }/${mapLocation.zoom},${mapLocation.lon},${mapLocation.lat}`;
  if (hash != newhash) {
    history.pushState(undefined, undefined, newhash);
  }
}

export function isEmpty(obj) {
  return (
    obj && // null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

export function isNotEmpty(obj) {
  return !isEmpty(obj);
}

function decomposeCategoryId(categoryId) {
  const digitsSuffix = categoryId.match(/\d+$/)[0];
  return {
    digitsSuffix: digitsSuffix,
    prefix: categoryId.substring(categoryId.lastIndexOf(digitsSuffix), 0),
  };
}

// adjust for 1-based (nomis bulk, in the db) vs 0-based (nomis api) categories: QS101EW001 -> QS101EW0002
export function categoryIDToDBColumn(categoryId) {
  const categoryIdParts = decomposeCategoryId(categoryId);
  const adjustedSuffix = (parseInt(categoryIdParts.digitsSuffix) + 1).toString().padStart(4, "0");
  return categoryIdParts.prefix + adjustedSuffix;
}

// get totals column (1-based, in the db) from category ID: QS101EW010 -> QS101EW0001
export function categoryIDToDBTotalsColumn(categoryId) {
  const categoryIdParts = decomposeCategoryId(categoryId);
  return categoryIdParts.prefix + "0001";
}

export function dbColumnToCategoryId(dbColumn) {
  const dbColumnParts = decomposeCategoryId(dbColumn);
  const adjustedSuffix = (parseInt(dbColumnParts.digitsSuffix) - 1).toString().padStart(3, "0");
  return dbColumnParts.prefix + adjustedSuffix;
}

export function processData(data, populateCensusTable, totalCatCode) {
  const total = data.get(totalCatCode);
  populateCensusTable.categories.forEach((category) => {
    if (data.has(category.code)) {
      category["value"] = data.get(category.code);
      category["percentage"] = (Math.round((category.value / total) * 100 * 10) / 10).toFixed(1);
      category["value"] = category["value"].toLocaleString();
    }
  });
  return populateCensusTable;
}

export function addTotalLevelToMetadata(metadata) {
  return metadata.map((topic) => {
    const tables = topic.tables.map((table) => {
      let total;
      if (table.categories != null) {
        table.categories.forEach((category, i) => {
          if (category.code.endsWith("0001")) {
            total = category.code;
            table.categories.splice(i, 1);
          }
        });
        table["totalCode"] = total;
      }
      return table;
    });
    return { ...topic, tables };
  });
}

export function filterSelectedTable(metadata, category) {
  let selectedTable;
  metadata.forEach((topic) => {
    topic.tables.forEach((table) => {
      if (table.code == category.table) {
        selectedTable = table;
      }
    });
  });
  return selectedTable;
}

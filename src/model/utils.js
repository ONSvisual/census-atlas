import { csvParse } from "d3-dsv";
import { dataByGeography, newDataByGeography } from "./censusdata/censusdata";
import { get } from "svelte/store";

export function getLegendSection(value, breakpoints) {
  for (let i = 0; i < breakpoints.length; i++) {
    if (value <= breakpoints[i]) {
      return i;
    }
  }
  return breakpoints.length;
}

export function writeCsvDataToMapObj(responseStr) {
  let data = new Map();
  csvParse(responseStr, (row, i, cols) => {
    let geoDataMap = new Map();
    cols.forEach((col, i) => {
      if (i > 0) {
        geoDataMap.set(col, +row[col]);
      }
    });
    data.set(row.geography_code, geoDataMap);
  });
  return data;
}

export function addNewGeoDataToCache(data) {
  data.forEach((value, key) => {
    //if cache already contains category data for given geography...
    if (get(dataByGeography).has(key)) {
      //add new category data to existing data for given geography
      const cachedGeoData = get(dataByGeography).get(key);
      get(dataByGeography).set(key, new Map([...cachedGeoData, ...value]));
    } else {
      //otherwise add new geography & data to store
      get(dataByGeography).set(key, new Map(value));
    }
  });
  newDataByGeography.notify();
}

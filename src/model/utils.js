import { csvParse } from "d3-dsv";
import { dataByGeography, newDataByGeography } from "./censusdata/censusdata";
import { get } from "svelte/store";

export function getLegendSection(value, breakpoints) {
  for (let i = 1; i < breakpoints.length; i++) {
    if (value <= breakpoints[i]) {
      return i;
    }
  }
  return breakpoints.length;
}

export function writeDataToMapObj(responseStr) {
  let data = new Map();
  csvParse(responseStr, (row, i, cols) => {
    let geoDataObject = {};
    cols.forEach((col, i) => {
      if (i > 0) {
        geoDataObject[col] = +row[col];
      }
    });
    data.set(row.geography_code, geoDataObject);
  });
  return data;
}

export function addNewGeoDataToCache(data){
  data.forEach((data, key) => {
    let catDataObj = {}
    const catCodes = Object.keys(data);
    catCodes.forEach((catCode) => {
      catDataObj[catCode] = data[catCode]
    })
    //if cache already contains category data for given geography...
    if (get(dataByGeography).has(key)){
      //add new category data to existing data for given geography
      const cachedGeoData = get(dataByGeography).get(key)
      get(dataByGeography).set(key, {...cachedGeoData, ...catDataObj})
    } else {
      //otherwise add new geography & data to store
      get(dataByGeography).set(key, catDataObj);
    }
  });
  newDataByGeography.notify()
}
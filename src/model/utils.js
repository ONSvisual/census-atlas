import { csvParse } from "d3-dsv";
import { dataByGeography, newDataByGeography } from "./censusdata/censusdata";
import { totalCatCodeLookup, totalCatCodes } from "./metadata/metadata";
import { get } from "svelte/store";

export function getLegendSection(value, breakpoints) {
  for (let i = 0; i < breakpoints.length; i++) {
    if (value <= breakpoints[i]) {
      return i;
    }
  }
  return breakpoints.length;
}

export function writeCsvDataToMapObj(responseStr, geographyCode) {
  let data = new Map();
  csvParse(responseStr, (row, i, cols) => {
    let geoDataMap = new Map();
    cols.forEach((catCode) => {
      const totalCatCode = get(totalCatCodeLookup)[catCode];
      //if code is a total, ignore
      console.log(get(totalCatCodes));
      if (!get(totalCatCodes).has(totalCatCode)) {
        //if there is data for the total category in the CSV
        if (row[totalCatCode]) {
          const catVal = +row[catCode];
          const totalVal = row[get(totalCatCodeLookup)[catCode]];
          const percentage = (Math.round((catVal / totalVal) * 100 * 10) / 10).toFixed(1);
          //sets category Map
          geoDataMap.set(catCode, { value: catVal, total: totalVal, perc: percentage });
        } else {
          console.log(totalCatCode);
          console.log(row[totalCatCode]);
          console.error("Total category data not found in API response.");
        }
      }
    });
    //sets geography Map
    data.set(geographyCode ? geographyCode : row.geography_code, geoDataMap);
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

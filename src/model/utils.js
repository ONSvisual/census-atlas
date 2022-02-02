import { csvParse } from "d3-dsv";
import { dataByGeography, newDataByGeography } from "./censusdata/censusdata";
import { totalCatCodeLookup, totalCatCodes, reverseTotalCatCodeLookup } from "./metadata/metadata";
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
    let missingCatCodes = [];
    cols.forEach((catCode) => {
      const totalCatCode = get(totalCatCodeLookup)[catCode];
      //if code is a total, ignore
      if (get(totalCatCodes).has(totalCatCode)) {
        //if there is data for the total category in the CSV
        if (row[totalCatCode]) {
          const catVal = +row[catCode];
          const totalVal = row[get(totalCatCodeLookup)[catCode]];
          const percentage = (Math.round((catVal / totalVal) * 100 * 10) / 10).toFixed(1);
          //sets category Map
          geoDataMap.set(catCode, { value: catVal, total: totalVal, perc: percentage });
        } else {
          console.error("Total category data not found in API response.");
        }
      } else {
        if (!get(reverseTotalCatCodeLookup)[catCode] || !catCode == "geography_code") {
          missingCatCodes.push(catCode);
        }
      }
    });
    console.error(
      `The following category codes were received from the API but are not available in the current metadata - ${missingCatCodes}.`,
    );
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

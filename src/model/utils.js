import { csvParse } from "d3-dsv";
import { dataByGeography, newDataByGeography } from "./censusdata/censusdata";
import { totalCatCodeLookup, reverseTotalCatCodeLookup } from "./metadata/metadata";
import { get } from "svelte/store";

export function getLegendSection(value, breakpoints) {
  if (value != null && breakpoints.length>0) {
    for (let i = 0; i < breakpoints.length; i++) {
      if (value <= breakpoints[i]) {
        return i;
      }
    }
    return breakpoints.length - 1;
  }
}

export function writeCsvDataToMapObj(responseStr, geographyCode) {
  let data = new Map();
  let missingCatCodes = [];
  csvParse(responseStr, (row, i, cols) => {
    let geoDataMap = new Map();
    cols.forEach((catCode) => {
      if (catCode.trim() != "geography_code") {
        const totalCatCode = get(totalCatCodeLookup)[catCode];
        //if code is a total, ignore
        if (Object.prototype.hasOwnProperty.call(get(reverseTotalCatCodeLookup), totalCatCode)) {
          //if there is data for the total category in the CSV
          if (row[totalCatCode]) {
            const catVal = +row[catCode];
            const totalVal = +row[get(totalCatCodeLookup)[catCode]];
            const percentage = (catVal / totalVal) * 100;
            //sets category Map
            geoDataMap.set(catCode, { value: catVal, total: totalVal, perc: percentage });
          } else {
            console.error("Total category data not found in API response.");
          }
        } else if (!get(reverseTotalCatCodeLookup)[catCode]) {
          missingCatCodes.push(catCode);
        }
      }
    });
    //sets geography Map
    data.set(geographyCode ? geographyCode : row.geography_code, geoDataMap);
  });
  if (missingCatCodes.length > 0) {
    console.error(
      `The following category codes were received from the API but are not available in the current metadata - ${missingCatCodes}.`,
    );
  }
  return data;
}

export function addNewGeoDataToCache(data) {
  newDataByGeography.setFalse();
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
  newDataByGeography.setTrue();
}

export function areCatAndTotalCodesRequested(requestedCategories) {
  let catCodesNoTotalRequested = [];
  let totalsNoCatCodeRequested = [];
  requestedCategories.forEach((catCode) => {
    //if code is a total, ignore
    if (get(reverseTotalCatCodeLookup)[catCode]) {
      //check if category codes corresponding to total are also being requested
      let catsRequestedWithTotal = 0;
      get(reverseTotalCatCodeLookup)[catCode].forEach((category) => {
        if (requestedCategories.includes(category.code)) {
          catsRequestedWithTotal++;
        }
      });
      if (catsRequestedWithTotal == 0) {
        totalsNoCatCodeRequested.push(catCode);
      }
      return;
    } // else if we have a total code for the category and the total code is in the request, ignore
    else if (get(totalCatCodeLookup)[catCode] && requestedCategories.includes(get(totalCatCodeLookup)[catCode])) {
      return;
    } else {
      catCodesNoTotalRequested.push(catCode);
    }
  });
  if (catCodesNoTotalRequested.length > 0 || totalsNoCatCodeRequested.length > 0) {
    if (catCodesNoTotalRequested.length > 0) {
      console.error(
        `The following category codes were requested without requesting a corresponding total code: ${catCodesNoTotalRequested}`,
      );
    }
    if (totalsNoCatCodeRequested.length > 0) {
      console.error(
        `The following total codes were requested without requesting a corresponding category code: ${totalsNoCatCodeRequested}`,
      );
    }
    return false;
  } else {
    return true;
  }
}

export function dataBreaksAreFetched(dataBreaks, catCode) {
  if (dataBreaks.has(catCode)) {
    return true;
  } else {
    return false;
  }
}

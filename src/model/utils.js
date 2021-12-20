import { csvParse } from "d3-dsv";

export function getLegendSection(value, breakpoints) {
  for (let i = 1; i < breakpoints.length; i++) {
    if (value <= breakpoints[i]) {
      return i;
    }
  }
  return breakpoints.length;
}

export function writeDataToMapObj(responseStr){
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
  return data
}
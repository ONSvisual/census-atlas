import { csvParse } from "d3-dsv";
import { writeCsvDataToMapObj } from "../../utils";

const baseURL = "https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/census";

export default class GeodataApiDataService {
  async fetchAllDataForGeography(geographyCode) {
    const url = `${baseURL}?rows=${geographyCode}`;
    const response = await fetch(url);
    const string = await response.text();
    let data = new Map();
    csvParse(string, (row, i, cols) => {
      cols.forEach((col, i) => {
        if (i == 0) {
          data.set("geographyCode", row[cols[0]]);
        } else {
          data.set(col, +row[col]);
        }
      });
    });
    return data;
  }

  async fetchSelectedDataForGeographyType(geoType, categories) {
    const categoriesString = categories.toString();
    let url = "";
    if (geoType.toLowerCase().trim() == "lad") {
      url = `${baseURL}?cols=geography_code,${categoriesString}&geotype=LAD`;
    } else if (geoType.toLowerCase().trim() == "lsoa") {
      url = `${baseURL}?cols=geography_code,${categoriesString}&geotype=LSOA`;
    }
    const response = await fetch(url);
    const string = await response.text();
    return writeCsvDataToMapObj(string);
  }

  async fetchSelectedDataForGeographies(geoCodes, catCodes) {
    const geoCodesString = geoCodes.toString();
    const catCodesString = catCodes.toString();
    const url = `${baseURL}?cols=geography_code,${catCodesString}&rows=${geoCodesString}`;
    const response = await fetch(url);
    const string = await response.text();
    return writeCsvDataToMapObj(string);
  }

  async fetchSelectedDataForBoundingBox(geoType, catCodes, bBox) {
    const geoTypesString = geoType.toString();
    const catCodesString = catCodes.toString();
    const url = `${baseURL}?bbox=${bBox.neCorner.lng},${bBox.neCorner.lat},${bBox.swCorner.lng},${bBox.swCorner.lat}&cols=geography_code,${catCodesString}&geotype=${geoTypesString}`;
    const response = await fetch(url);
    const string = await response.text();
    return writeCsvDataToMapObj(string);
  }
}

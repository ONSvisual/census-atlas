import { csvParse } from "d3-dsv";

const baseURL = "https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/skinny";

export default class GeodataApiDataService {
  constructor() {
    this.reset();
  }

  reset() {
    this.dataset = {
      lsoa: {
        data: [],
        index: {},
        breaks: [],
      },
      higher: {
        data: [],
        index: {},
      },
      lad: {
        data: [],
        index: {},
      },
      englandAndWales: {
        count: 0,
        value: 0,
      },
    };
  }

  async fetchAllDataForGeography(geographyId) {
    const url = `${baseURL}?rows=${geographyId}`;
    const response = await fetch(url);
    const string = await response.text();
    let data = new Map();
    csvParse(string, (row, i, cols) => {
      cols.forEach((col, i) => {
        if (i == 0) {
          data.set("geographyId", row[cols[0]]);
        } else {
          data.set(col, +row[col]);
        }
      });
    });
    return data;
  }

  // selectedGeographyData store
  // {
  //   geographyCode: {
  //     catCode: 50
  //   }
  // }

  // mapGeographyData store:
  // {
  //   geoCode: {
  //     catCode: {
  //       number: 99
  //       total: 100
  //     }
  //   }
  // }

  async fetchSelectedDataForGeographyType(geoType, categories) {
    const categoriesString = categories.toString()
    let url = ""
    if (geoType.toLowerCase().trim() == "lad") {
      url = `${baseURL}?cols=geography_code,${categoriesString}&geotype=LAD`
    } else if (geoType.toLowerCase().trim() == "lsoa") {
      url = `${baseURL}?cols=geography_code,${categoriesString}&geotype=LSOA`
    }
    const response = await fetch(url);
    const string = await response.text();
    let data = new Map();
    csvParse(string, (row, i, cols) => {
      let geoDataObject = {}
      cols.forEach((col, i) => {
        if (i > 0) {
          geoDataObject[col] = +row[col]
        }
      })
      data.set(row.geography_code, geoDataObject)
      })
    return data
  }

  async fetchSelectedDataForGeographies() {
    //if single selected geography, separate selectedGeography store?
  }

  async fetchSelectedDataForBoundingBox() {
    //presumably this will only be called given a certain zoom level
  }

  async fetchCensusTableStructure() {
    return simpleTopicTableCategoryData;
  }
}

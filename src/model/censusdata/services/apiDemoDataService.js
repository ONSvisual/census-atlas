import { csvParse } from "d3-dsv";
import { ckmeans } from "simple-statistics";
import { lsoaLookup } from "./../../geography/geography";
import config from "./../../../config";
import simpleTopicTableCategoryData from "../../../data/simpleTopicTableCategoryData";

import { mapZoomBBox } from "../../../stores.js"

// load all data for K04000001 (England & Wales) on init, store seperately and set on new data load?

export default class APIDemoDataService {
  constructor() {
    this.reset();
    this.currentCategoryID = ""; // probably need a real default here
    mapZoomBBox.subscribe(value => {
      this.mapZoomBBox = value;
      this.fetchLsoaCategoryData(this.currentCategoryID);
    })
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

  async fetchCensusTableStructure() {
    return simpleTopicTableCategoryData
  }

  // need to either interrogate map here for coords or have them passed in as args
  async fetchLsoaCategoryData(categoryId) {
    this.currentCategoryID = categoryId;

    // assemble url with K04000001 and bbox
    let bboxQuery = [
      this.mapZoomBBox.swCorner.lon,
      this.mapZoomBBox.swCorner.lat,
      this.mapZoomBBox.neCorner.lon,
      this.mapZoomBBox.neCorner.lat
    ].join((","));
    let rowQuery = "K04000001";
    let colsQuery = categoryId; // need to add some stuff here - totals column, geocode column
    let geoTypeQuery = this.mapZoomBBox.zoom >= 9 ? "lad,lsoa" : "lad";
     
    // ask for LAD & LSOA if zoom level > 9, otherwise LAD only
    let baseURL = "https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/skinny";
    let url = `${baseURL}?bbox=${bboxQuery}&rows=${rowQuery}&cols=${colsQuery}&geo_type=${geoTypeQuery}`;
    let response = await fetch(url);
    let string = await response.text();
    let category = this._getCategory(categoryId);

    this.reset();
    this.dataset.lsoa.data = csvParse(string, (d, index) => {
      return {
        code: d["GEOGRAPHY_CODE"],
        value: +d[category.cell],
        count: +d[0],
        perc: (+d[category.cell] / +d[0]) * 100,
      };
    });

    this._processLegacyDataset();

    return this.dataset.lsoa.index;
  }


  async fetchLegendBreakpoints(categoryId) {
    return this.dataset.lsoa.breaks;
  }

  async fetchHigherGeographyCategoryData(categoryId) {
    // is derived in legacy version from
    return this.dataset.higher.index;
  }

  async fetchCategoryAggregateData(categoryId) {
    return {
      breaks: this.dataset.lsoa.breaks,
    };
  }

  async fetchTableForGeography(tableId, geographyId) {
    return {
      tableId: tableId,
      geographyId: geographyId,
      rows: [
        // { category: 'Female', value: 4801, perc: 0.49 }
      ],
    };
  }

  // ---------------------------------

  _processLegacyDataset() {
    this.dataset.lsoa.data.sort((a, b) => a.perc - b.perc);

    let vals = this.dataset.lsoa.data.map((d) => d.perc);
    let chunks = ckmeans(vals, config.ux.legend_sections);
    this.dataset.lsoa.breaks = this._getBreaks(chunks);

    for (const lsoa of this.dataset.lsoa.data) {
      this.dataset.lsoa.index[lsoa.code] = lsoa;
    }

    // aggregate lad data
    for (const lsoa of this.dataset.lsoa.data) {
      let ladCode = lsoaLookup[lsoa.code].parent;
      if (!this.dataset.lad.index[ladCode]) {
        this.dataset.lad.index[ladCode] = {
          code: ladCode,
          value: 0,
          count: 0,
        };
      }
      this.dataset.lad.index[ladCode].value += lsoa.value;
      this.dataset.lad.index[ladCode].count += lsoa.count;
    }

    for (const ladCode of Object.keys(this.dataset.lad.index)) {
      this.dataset.lad.index[ladCode].perc =
        (this.dataset.lad.index[ladCode].value / this.dataset.lad.index[ladCode].count) * 100;
      this.dataset.lad.data.push(this.dataset.lad.index[ladCode]);
    }

    this.dataset.lad.data.sort((a, b) => a.perc - b.perc);

    // aggregate national data
    for (const lsoa of this.dataset.lsoa.data) {
      this.dataset.englandAndWales.value += lsoa.value;
      this.dataset.englandAndWales.count += lsoa.count;
    }
    this.dataset.englandAndWales.perc = (this.dataset.englandAndWales.value / this.dataset.englandAndWales.count) * 100;

    //
    this.dataset.higher = this.dataset.lad;
    this.dataset.higher.index["ENGLAND_AND_WALES"] = this.dataset.englandAndWales;
    this.dataset.higher.data.push(this.dataset.englandAndWales);

    this.dataset.englandAndWales = {
      count: 0,
      value: 0,
    };
    this.dataset.lad = {
      data: [],
      index: {},
    };
  }

  _getBreaks(chunks) {
    let breaks = [];

    chunks.forEach((chunk) => {
      breaks.push(chunk[0]);
    });

    breaks.push(chunks[chunks.length - 1][chunks[chunks.length - 1].length - 1]);
    return breaks;
  }

  _getCategory(categoryCode) {
    return {
      code: categoryCode,
      cell: +categoryCode.slice(7, 10),
    };
  }
}

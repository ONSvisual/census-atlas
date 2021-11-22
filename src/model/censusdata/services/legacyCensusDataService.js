import {csvParse} from "d3-dsv";
import {ckmeans} from "simple-statistics";
import {lsoaLookup} from '../../geography/geography'
import config from "../../../config"

export default class LegacyCensusDataService {

  constructor() {
    this.reset()
  }

  reset() {
    this.dataset = {
      lsoa: {
        data: [],
        index: {},
        breaks: []
      },
      higher: {
        data: [],
        index: {}
      },
      lad: {
        data: [],
        index: {}
      },
      englandAndWales: {
        count: 0,
        value: 0
      },
    }
  }

  async fetchLsoaCategoryData(categoryId) {
    let url = `https://bothness.github.io/census-atlas/data/lsoa/${categoryId}.csv`
    let response = await fetch(url);
    let string = await response.text();
    let category = this._getCategory(categoryId)

    this.reset()
    this.dataset.lsoa.data = csvParse(string, (d, index) => {
      return {
        code: d['GEOGRAPHY_CODE'],
        value: +d[category.cell],
        count: +d[0],
        perc: (+d[category.cell] / +d[0]) * 100,
      };
    });

    this._processLegacyDataset()

    return this.dataset.lsoa.index
  };


  async fetchLegendBreakpoints(categoryId) {
    return this.dataset.lsoa.breaks
  }
  
  async fetchHigherGeographyCategoryData(categoryId) {
    // is derived in legacy version from
    return this.dataset.higher.index
  };

  async fetchCategoryAggregateData(categoryId) {
    return {
      breaks: this.dataset.lsoa.breaks
    }
  };

  async fetchTableForGeography(tableId, geographyId) {
    return {
      tableId: tableId,
      geographyId: geographyId,
      rows: [
        // { category: 'Female', value: 4801, perc: 0.49 }
      ]
    }
  };

  // ---------------------------------

  _processLegacyDataset() {
    this.dataset.lsoa.data.sort((a, b) => a.perc - b.perc);

    let vals = this.dataset.lsoa.data.map((d) => d.perc);
    let chunks = ckmeans(vals, config.ux.legend_sections);
    this.dataset.lsoa.breaks = this._getBreaks(chunks);

    for (const lsoa of this.dataset.lsoa.data) {
      this.dataset.lsoa.index[lsoa.code] = lsoa
    }

    // aggregate lad data
    for (const lsoa of this.dataset.lsoa.data) {
      let ladCode = lsoaLookup[lsoa.code].parent
      if (!this.dataset.lad.index[ladCode]) {
        this.dataset.lad.index[ladCode] = {
          code: ladCode,
          value: 0,
          count: 0,
        };
      }
      this.dataset.lad.index[ladCode].value += lsoa.value
      this.dataset.lad.index[ladCode].count += lsoa.count
    }

    for (const ladCode of Object.keys(this.dataset.lad.index)) {
      this.dataset.lad.index[ladCode].perc = (this.dataset.lad.index[ladCode].value / this.dataset.lad.index[ladCode].count) * 100;
      this.dataset.lad.data.push(this.dataset.lad.index[ladCode])
    }

    this.dataset.lad.data.sort((a, b) => a.perc - b.perc);


    // aggregate national data
    for (const lsoa of this.dataset.lsoa.data) {
      this.dataset.englandAndWales.value += lsoa.value
      this.dataset.englandAndWales.count += lsoa.count
    }
    this.dataset.englandAndWales.perc = (this.dataset.englandAndWales.value / this.dataset.englandAndWales.count) * 100;

    // 
    this.dataset.higher = this.dataset.lad
    this.dataset.higher.index['ENGLAND_AND_WALES'] = this.dataset.englandAndWales
    this.dataset.higher.data.push(this.dataset.englandAndWales)

    this.dataset.englandAndWales = {
      count: 0,
      value: 0
    }
    this.dataset.lad = {
      data: [],
      index: {}
    }
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

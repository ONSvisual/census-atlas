import { csvParse } from "d3-dsv";
import { ckmeans } from "simple-statistics";
import { lsoaLookup } from "../../geography/geography
import config from "../../../config
import simpleTopicTableCategoryData from "../../../data/simpleTopicTableCategoryData";

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
    const url = `${baseURL}?rows=${geographyId}`
    const response = await fetch(url)
    const string = await response.text()
    csvParse(string, (row, i, cols) => {
      cols.forEach((col) => {
        //write to store as set
      })
    })

  }

  async fetchSelectedDataForGeography(){

  }

  async fetchSelectedDataForMultipleGeographies(){

  }

  async fetchSelectedDataForBoundingBox(){

  }

  async fetchCensusTableStructure() {
    return simpleTopicTableCategoryData;
  }
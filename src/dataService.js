import { csvParse } from "d3-dsv";
import { get } from "svelte/store";

export default class LocalDataService {
  
  getGeographicCodes = async function (url) {
    let response = await fetch(url);
    let string = await response.text();
    return await csvParse(string, (d) => {
      return d["GEOGRAPHY_CODE"];
    });
  };
  
  getCategoryTotals = async function (url) {
    let response = await fetch(url);
    let string = await response.text();
    let data = await csvParse(string, (d) => {
      return d["0"];
    });
    return data;
  };
  
  getNomisData = async function (
    url,
    geographicCodesStore,
    selectedCategoryTotals,
    indicatorCode,
  ) {
    let response = await fetch(url);
    let string = await response.text();
    let geoCodes = get(geographicCodesStore);
    let categoryTotals = get(selectedCategoryTotals);
    return await csvParse(string, (d, index) => {
      return {
        code: geoCodes[index],
        value: +d[indicatorCode],
        count: +categoryTotals[index],
        perc: (+d[indicatorCode] / +categoryTotals[index]) * 100,
      };
    });
  };

}

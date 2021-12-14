import { autoType, csvParse } from "d3-dsv";
import { feature } from "topojson-client";
import config from "./../../../config";

const LAD_AREA_CODE = "AREACD";
const LAD_AREA_NAME = "AREANM";

export default class LegacyGeographyService {
  getLadList = async function () {
    let url = config.legacy.ladtopo.url;
    let layer = config.legacy.ladtopo.layer;
    let response = await fetch(url);
    let topojson = await response.json();
    let bounds = feature(topojson, layer);
    return bounds.features.map((f) => {
      return {
        code: f.properties[LAD_AREA_CODE],
        name: f.properties[LAD_AREA_NAME],
      };
    });
  };

  getLsoaData = async function () {
    let url = config.legacy.lsoadata;
    let response = await fetch(url);
    let string = await response.text();
    return csvParse(string, autoType);
  };
}

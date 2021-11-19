import {autoType, csvParse} from "d3-dsv";
import {feature} from "topojson-client";
import config from '../../config';

export default class LegacyGeographyService {
  getLadBoundaries = async function () {
    let url = config.legacy.ladtopo.url;
    let layer = config.legacy.ladtopo.layer;
    let response = await fetch(url);
    let topojson = await response.json();
    return feature(topojson, layer);
  };
  
  getLsoaData = async function () {
    let url = config.legacy.lsoadata;
    let response = await fetch(url);
    let string = await response.text();
    return csvParse(string, autoType);
  };
}

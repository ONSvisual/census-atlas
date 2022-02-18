import config from "../../../config";
export default class MetadataApiDataService {
  async fetchCensusDataBreaks(geoType, catCode, totalCode, k) {
    const url = `${config.api.baseUrl}${
      config.api.censusDataBreaksEndpoint
    }?cat1=${catCode}&cat2=${totalCode}&geotype=${geoType}&k=${k.toString()}`;
    const response = await fetch(url);
    return await response.json();
  }
  async fetchCensusMetadata() {
    const url = `${config.api.baseUrl}${config.api.censusMetadataEndpoint}?filtertotals=true`;
    const response = await fetch(url);
    return response.json();
  }
}

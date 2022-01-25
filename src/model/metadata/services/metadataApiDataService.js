import config from "../../../config";
export default class MetadataApiDataService {
  async fetchCensusDataBreaks(geoType, cat, k) {
    const url = `${config.api.baseUrl}${
      config.api.censusDataBreaksEndpoint
    }?category=${cat}&geotype=${geoType}&k=${k.toString()}`;
    const response = await fetch(url);
    return await response.json();
  }
  async fetchCensusMetadata() {
    const url = `${config.api.baseUrl}${config.api.censusMetadataEndpoint}`;
    const response = await fetch(url);
    return response.json();
  }
}

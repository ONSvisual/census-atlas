import config from "../../../config";
export default class MetadataApiDataService {
  async fetchCensusDataBreaks(geoType, catCode, totalCode, k) {
    const url = `${config.api.baseUrl}${
      config.api.censusDataBreaksEndpoint
    }?cat1=${catCode}&cat2=${totalCode}&geotype=${geoType}&k=${k.toString()}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.text());
      }
    } catch (err) {
      console.error("Error:" + JSON.parse(err.message).error);
      return null;
    }
  }

  async fetchCensusMetadata() {
    const url = `${config.api.baseUrl}${config.api.censusMetadataEndpoint}?filtertotals=true`;
    const response = await fetch(url);
    return response.json();
  }
}

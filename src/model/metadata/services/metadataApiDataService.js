const baseURL = "https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/";
const censusDataBreaksEndpoint = "ckmeans"

export default class MetadataApiDataService {
    async fetchCensusDataBreaks(geoType, cat, k){
        const url = `${baseURL}${censusDataBreaksEndpoint}?category=${cat}&geotype=${geoType}&k=${k.toString()}`
        const response = await fetch(url);
        const string = await response.json();
        return string
      }
}
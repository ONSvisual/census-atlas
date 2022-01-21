import config from "../../../config";

const censusMetadataUrl = `${config.api.baseUrl}${config.api.censusMetadataEndpoint}`;

export default class MetadataApiDataService {
  async fetchCensusMetadata() {
    const response = await fetch(censusMetadataUrl);
    return response.json();
  }
}

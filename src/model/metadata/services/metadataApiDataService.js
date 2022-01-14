const baseURL = "http://ec2-18-193-78-190.eu-central-1.compute.amazonaws.com:25252/";
const censusMetadataEndpoint = "metadata";

export default class MetadataApiDataService {
  async fetchCensusMetadata(){
    const url = `${baseURL}${censusMetadataEndpoint}`
    const response = await fetch(url)
    return response.string()
  }
}


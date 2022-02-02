import metadata from "../../../data/apiMetadata";

export default class FlatfileMetadataService {
  async fetchCensusMetadata() {
    return metadata;
  }
}

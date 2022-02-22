import metadata from "../../../data/apiMetadata";

export default class FlatfileMetadataService {
  async fetchCensusTableStructure() {
    return metadata;
  }
}

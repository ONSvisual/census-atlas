export default function MockMetadataService(data) {
  this.data = data;
  this.fetchCensusMetadataCalled = 0;
}

MockMetadataService.prototype.fetchCensusMetadata = async function () {
  this.fetchCensusMetadataCalled += 1;
  return this.data;
};

MockMetadataService.prototype.fetchCensusDataBreaks = async function () {
  return this.data;
};

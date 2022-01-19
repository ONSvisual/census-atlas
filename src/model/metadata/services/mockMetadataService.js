export default function MockMetadataService(metadata) {
    this.metadata = metadata
    this.fetchCensusMetadataCalled = 0
}

MockMetadataService.prototype.fetchCensusMetadata = async function () {
    this.fetchCensusMetadataCalled += 1;
    return this.metadata
}

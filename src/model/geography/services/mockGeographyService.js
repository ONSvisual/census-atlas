export default function MockGeographyService(ladList, lsoaData) {
  this.ladList = ladList;
  this.lsoaData = lsoaData;
  this.getLadListCalled = 0;
  this.getLsoaDataCalled = 0;
}
MockGeographyService.prototype.getLadList = async function () {
  this.getLadListCalled += 1;
  return this.ladList;
};
MockGeographyService.prototype.getLsoaData = async function () {
  this.getLsoaDataCalled += 1;
  return this.lsoaData;
};

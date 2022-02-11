import mockMetadata from "../../../data/test/mockMetadata";
import { initialMockData, secondMockData } from "../../../data/test/mockDataByGeography";

export default class MockCensusDataService {
  async fetchCensusTableStructure() {
    return mockMetadata;
  }

  async fetchLsoaCategoryData(categoryId) {}

  async fetchLegendBreakpoints(categoryId) {}

  async fetchHigherGeographyCategoryData(categoryId) {}

  async fetchCategoryAggregateData(categoryId) {}

  async fetchTableForGeography(tableId, geographyCode) {
    return {
      tableId: tableId,
      geographyCode: geographyCode,
      rows: [
        // { category: 'Female', value: 4801, perc: 0.49 }
      ],
    };
  }

  async fetchSelectedDataForGeographyType(geoType, categories) {
    if (categories == "catCode1") {
      return initialMockData;
    }
    return secondMockData;
  }
}

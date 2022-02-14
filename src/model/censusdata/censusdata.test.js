import { get, writable } from "svelte/store";
import { initialMockData, integratedMockMap, secondMockData } from "../../data/test/mockDataByGeography";
import {
  categories,
  censusTableStructureIsLoaded,
  initialiseCensusData,
  reset,
  tables,
  topics,
  fetchSelectedDataForGeoType,
  dataByGeography,
  cachedMapCategories,
} from "./censusdata";
import MockCensusDataService from "./services/mockCensusDataService";
import { totalCatCodeLookup, reverseTotalCatCodeLookup } from "../metadata/metadata";

describe("initialise census", () => {
  beforeEach(() => {
    // reset the stores
    reset();
  });

  it("it initialises the topic-table-category structure", async () => {
    // given
    // a mock for the census service
    let mockCensusService = new MockCensusDataService();

    // when
    // we call initialise census
    await initialiseCensusData(mockCensusService);

    // then
    // it calls functions on the geography service
    expect(Object.keys(topics)).toStrictEqual(["TP1", "TP2"]);
    expect(Object.keys(tables)).toStrictEqual(["TB1", "TB2", "TB3", "TB4"]);
    expect(Object.keys(categories)).toStrictEqual(["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"]);
    expect(tables["TB1"].total).toStrictEqual("TB1-T");
  });

  it("it switches censusTableStructureIsLoaded to true", async () => {
    // given
    // a mock for the census service
    let mockCensusService = new MockCensusDataService();

    // and record changes for censusTableStructureIsLoaded
    var changeHistory = [];
    censusTableStructureIsLoaded.subscribe((value) => {
      changeHistory.push(value);
    });

    // when
    // we call initialise census and await the result
    await initialiseCensusData(mockCensusService);

    // then
    // it switches the value from false to true
    expect(changeHistory).toStrictEqual([false, true]);
  });
});

describe("fetchSelectedDataForGeoType", () => {
  beforeEach(() => {
    get(dataByGeography).clear();
  });
  jest.spyOn(console, "error").mockImplementation(() => {});
  const mockCensusDataService = new MockCensusDataService();
  totalCatCodeLookup.set({ catCode1: "totalCode1", catCode2: "totalCode1" });
  reverseTotalCatCodeLookup.set({
    totalCode1: [
      { code: "catCode1", name: "Cat code 1", slug: "cat-code-1" },
      { code: "catCode2", name: "Cat code 2", slug: "cat-code-2" },
    ],
  });
  const catCodes1 = ["catCode1", "totalCode1"];
  const catCodes2 = ["catCode2", "totalCode1"];
  it("writes data to the dataByGeography and cachedMapCategories stores", async () => {
    const catCodesSet = new Set(catCodes1);

    await fetchSelectedDataForGeoType(mockCensusDataService, "geoType", catCodes1);

    expect(get(dataByGeography)).toEqual(initialMockData);
    expect(get(cachedMapCategories)).toEqual(catCodesSet);
  });
  it("adds new data to existing data in dataByGeography and cachedMapCategories stores", async () => {
    const catCodesSet = new Set([...catCodes1, ...catCodes2]);

    await fetchSelectedDataForGeoType(mockCensusDataService, "geoType", catCodes1);
    await fetchSelectedDataForGeoType(mockCensusDataService, "geoType", catCodes2);

    expect(get(dataByGeography)).toEqual(integratedMockMap);
    expect(get(cachedMapCategories)).toEqual(catCodesSet);
  });
  it("overwrites dataByGeography and cachedMapCategories when overwriteCache=true", async () => {
    const overwriteCache = true;
    const catCodesSet = new Set(catCodes2);
    await fetchSelectedDataForGeoType(mockCensusDataService, "geoType", catCodes1);
    await fetchSelectedDataForGeoType(mockCensusDataService, "geoType", catCodes2, overwriteCache);

    expect(get(dataByGeography)).toEqual(secondMockData);
    expect(get(cachedMapCategories)).toEqual(catCodesSet);
  });
});

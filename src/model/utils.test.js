import {
  getLegendSection,
  writeCsvDataToMapObj,
  areCatAndTotalCodesRequested,
  areDataBreaksFetched,
  isCatDataFetchedForGeoCode,
  isCategoryDataFetched,
} from "./utils";
import { totalCatCodeLookup, reverseTotalCatCodeLookup } from "../model/metadata/metadata";

describe("getLegendSection", () => {
  it("returns the correct dataBreaks index", () => {
    //given
    //a valid data breaks array and value
    const dataBreaks = [1, 2, 3, 4, 5];
    const value = 2.5;

    //when
    //we call getLegendSection
    const legendSection = getLegendSection(value, dataBreaks);

    //then
    //legendSection should be index 2
    expect(legendSection).toEqual(2);
  });
  it("returns the highest data break index if value is above range", () => {
    //given
    //a valid data breaks array and value above range
    const dataBreaks = [1, 2, 3, 4, 5];
    const value = 10;

    //when
    //we call getLegendSection
    const legendSection = getLegendSection(value, dataBreaks);

    //then
    //legendSection should be index 4
    expect(legendSection).toEqual(4);
  });
});

describe("writeCsvDataToMapObj function", () => {
  const geoCode = "geoCode1";
  totalCatCodeLookup.set({ catCode1: "totalCode1", catCode2: "totalCode1" });
  reverseTotalCatCodeLookup.set({
    totalCode1: [
      { code: "catCode1", name: "Cat code 1", slug: "cat-code-1" },
      { code: "catCode2", name: "Cat code 2", slug: "cat-code-2" },
    ],
  });
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  afterEach(() => {
    error.mockReset();
  });
  it("returns correctly structured data given correct inputs and store values", () => {
    const responseStr = `geography_code,catCode1,totalCode1\ngeoCode1,100,200`;
    const data = writeCsvDataToMapObj(responseStr, geoCode);
    const expectedData = new Map([["geoCode1", new Map([["catCode1", { value: 100, total: 200, perc: 50 }]])]]);

    expect(data).toEqual(expectedData);
    //check geography_code column in CSV response is not written to Map
    expect(data.has("geography_code")).toBe(false);
    //check total code is not written to inner Map
    expect(data.get("geoCode1").has("totalCode1")).toBe(false);
  });
  it("returns missing total category error if total category data is not in response string", () => {
    const responseStr = `geography_code,catCode1\ngeoCode1,100`;
    writeCsvDataToMapObj(responseStr, geoCode);

    expect(error).toBeCalledWith("Total category data not found in API response.");
  });
  it("returns missingCatCodes error if data in response is not in front end metadata structure", () => {
    const responseStr = `geography_code,catCode3,totalCode1\ngeoCode1,100,200`;
    writeCsvDataToMapObj(responseStr, geoCode);

    expect(error).toBeCalledWith(
      "The following category codes were received from the API but are not available in the current metadata - catCode3.",
    );
  });
});

describe("areCatAndTotalCodesRequested function", () => {
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  totalCatCodeLookup.set({ catCode1: "totalCode1", catCode2: "totalCode1" });
  reverseTotalCatCodeLookup.set({
    totalCode1: [
      { code: "catCode1", name: "Cat code 1", slug: "cat-code-1" },
      { code: "catCode2", name: "Cat code 2", slug: "cat-code-2" },
    ],
    totalCode2: [{ code: "catCode3", name: "Cat code 3", slug: "cat-code-3" }],
  });
  let requestedCategories = ["totalCode1", "catCode1"];
  afterEach(() => {
    error.mockReset();
  });
  it("returns true and no errors when only related totals and categories are requested", () => {
    expect(areCatAndTotalCodesRequested(requestedCategories)).toEqual(true);
  });
  it("returns false with correct error when a category code is passed without the related total code", () => {
    let requestedCategories = ["catCode1"];
    expect(areCatAndTotalCodesRequested(requestedCategories)).toEqual(false);
    expect(error).toBeCalledWith(
      "The following category codes were requested without requesting a corresponding total code: catCode1",
    );
  });
  it("returns false with correct error when a total code is passed without the related category code", () => {
    let requestedCategories = ["totalCode1"];
    expect(areCatAndTotalCodesRequested(requestedCategories)).toEqual(false);
    expect(error).toBeCalledWith(
      "The following total codes were requested without requesting a corresponding category code: totalCode1",
    );
  });
  it("returns false with correct errors when a total code is passed with an unrelated category code", () => {
    let requestedCategories = ["totalCode2", "catCode1"];
    expect(areCatAndTotalCodesRequested(requestedCategories)).toEqual(false);
    expect(error).toHaveBeenNthCalledWith(
      1,
      "The following category codes were requested without requesting a corresponding total code: catCode1",
    );
    expect(error).toHaveBeenNthCalledWith(
      2,
      "The following total codes were requested without requesting a corresponding category code: totalCode2",
    );
  });
});

describe("areDataBreaksFetched", () => {
  const dataBreaks = new Map([["catCode", { lad: [1, 2, 3, 4, 5] }]]);
  it("returns true if dataBreaks store contains catCode", () => {
    const catCode = "catCode";
    expect(areDataBreaksFetched(dataBreaks, catCode)).toEqual(true);
  });
  it("returns false if dataBreaks store doesn't contains catCode", () => {
    const catCode = "catCode1";
    expect(areDataBreaksFetched(dataBreaks, catCode)).toEqual(false);
  });
  it("returns false if dataBreaks is has initial empty value", () => {
    const dataBreaks = new Map();
    const catCode = "catCode";
    expect(areDataBreaksFetched(dataBreaks, catCode)).toEqual(false);
  });
});

describe("isCategoryDataFetched", () => {
  const cachedMapCategories = new Set(["catCode"]);
  it("returns true given a valid set and catCode", () => {
    const catCode = "catCode";
    expect(isCategoryDataFetched(cachedMapCategories, catCode)).toEqual(true);
  });
  it("returns false if store doesn't contain catCode", () => {
    const catCode = "catCode1";
    expect(isCategoryDataFetched(cachedMapCategories, catCode)).toEqual(false);
  });
  it("returns false if store has initial empty value", () => {
    const cachedMapCategories = new Set();
    const catCode = "catCode";
    expect(isCategoryDataFetched(cachedMapCategories, catCode)).toEqual(false);
  });
});

describe("isCatDataFetchedForGeoCode", () => {
  let dataByGeography = new Map([["geoCode", new Map([["catCode", { test: "test" }]])]]);
  let geoCode = "geoCode";
  let catCode = "catCode";
  it("returns true if geoCode and catCode data are in store", () => {
    expect(isCatDataFetchedForGeoCode(dataByGeography, geoCode, catCode)).toEqual(true);
  });
  it("returns false if store does not contain data for geoCode", () => {
    geoCode = "geoCode1";
    expect(isCatDataFetchedForGeoCode(dataByGeography, geoCode, catCode)).toEqual(false);
  });
  it("returns false if store contains data for relevant geoCode but not for requested category", () => {
    catCode = "catCode1";
    expect(isCatDataFetchedForGeoCode(dataByGeography, geoCode, catCode)).toEqual(false);
  });
  it("returns false if dataByGeography store has initial empty value", () => {
    dataByGeography = new Map();
    expect(isCatDataFetchedForGeoCode(dataByGeography, geoCode, catCode)).toEqual(false);
  });
});

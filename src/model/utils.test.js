import { getLegendSection, writeCsvDataToMapObj } from "./utils";
import { totalCatCodeLookup, reverseTotalCatCodeLookup } from "../model/metadata/metadata";
import { diff } from "jest-diff";

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

describe("writeCsvDataToMapObj", () => {
  //check:
  //1. happy path return
  //2. geography_code catCode
  //3. code is a total
  //4. total data not found in API resp
  //5. missing cat code
  it("returns correctly structured data given correct inputs and store values", () => {
    const responseStr = `geography_code,catCode,totalCode\ngeoCode1,100,200`;
    const geoCode = "geoCode1";
    totalCatCodeLookup.set({ catCode: "totalCode" });
    reverseTotalCatCodeLookup.set({ totalCode: "catCode" });

    const data = writeCsvDataToMapObj(responseStr, geoCode);
    const expectedData = new Map([["geoCode1", new Map([["catCode", { value: 100, total: 200, perc: 50 }]])]]);

    expect(data).toEqual(expectedData);
    //check geography_code column in CSV response is not written to Map
    expect(data.has("geography_code")).toBe(false);
    //check total code is not written to inner Map
    expect(data.get("geoCode1").has("totalCode")).toBe(false);
  });
  // it("");
});

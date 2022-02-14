import { getLegendSection, writeCsvDataToMapObj } from "./utils";
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
  totalCatCodeLookup.set({ catCode: "totalCode" });
  reverseTotalCatCodeLookup.set({ totalCode: "catCode" });
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  it("returns correctly structured data given correct inputs and store values", () => {
    const responseStr = `geography_code,catCode,totalCode\ngeoCode1,100,200`;
    const data = writeCsvDataToMapObj(responseStr, geoCode);
    const expectedData = new Map([["geoCode1", new Map([["catCode", { value: 100, total: 200, perc: 50 }]])]]);

    expect(data).toEqual(expectedData);
    //check geography_code column in CSV response is not written to Map
    expect(data.has("geography_code")).toBe(false);
    //check total code is not written to inner Map
    expect(data.get("geoCode1").has("totalCode")).toBe(false);
  });
  it("returns missing total category error if total category data is not in response string", () => {
    const responseStr = `geography_code,catCode\ngeoCode1,100`;
    writeCsvDataToMapObj(responseStr, geoCode);

    expect(error).toBeCalledWith("Total category data not found in API response.");
    error.mockReset();
  });
  it("returns missingCatCodes error if data in response is not in front end metadata structure", () => {
    const responseStr = `geography_code,catCode2,totalCode\ngeoCode1,100,200`;
    writeCsvDataToMapObj(responseStr, geoCode);

    expect(error).toBeCalledWith(
      "The following category codes were received from the API but are not available in the current metadata - catCode2.",
    );
    error.mockReset();
  });
});

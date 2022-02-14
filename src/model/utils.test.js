import { getLegendSection, writeCsvDataToMapObj, totalCodesRequested } from "./utils";
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

describe("totalCodesRequested function", () => {
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
    expect(totalCodesRequested(requestedCategories)).toEqual(true);
  });
  it("returns false with correct error when a category code is passed without the related total code", () => {
    let requestedCategories = ["catCode1"];
    expect(totalCodesRequested(requestedCategories)).toEqual(false);
    expect(error).toBeCalledWith(
      "The following category codes were requested without requesting a corresponding total code: catCode1",
    );
  });
  it("returns false with correct error when a total code is passed without the related category code", () => {
    let requestedCategories = ["totalCode1"];
    expect(totalCodesRequested(requestedCategories)).toEqual(false);
    expect(error).toBeCalledWith(
      "The following total codes were requested without requesting a corresponding category code: totalCode1",
    );
  });
  it("returns false with correct errors when a total code is passed with an unrelated category code", () => {
    let requestedCategories = ["totalCode2", "catCode1"];
    expect(totalCodesRequested(requestedCategories)).toEqual(false);
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

import { getLegendSection } from "./utils";

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

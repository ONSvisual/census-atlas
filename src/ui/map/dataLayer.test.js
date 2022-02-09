jest.mock("../../model/metadata/metadata", () => ({
  __esModule: true,
  $selectedCategoryBreaks: {
    lad: [10, 20, 30, 45, 50],
    lsoa: [9, 15, 17, 26, 34],
  },
}));
jest.mock("../../model/censusdata/censusdata", () => ({
  __esModule: true,
  $newDataByGeography: true,
  $cachedMapCategories: new Set(["catCode1"]),
  $dataByGeography: new Map([["geoCode1", new Map([["catCode1", { value: 1, perc: 20, total: 5 }]])]]),
}));

import { render } from "@testing-library/svelte";
import DataLayer from "./DataLayer.svelte";

test("setMapGeographyColours", async () => {
  const component = render(DataLayer);
  expect(component.setMapGeographyColours()).toHaveBeenCalled();
  expect(component.legendSection).toEqual(1);
});

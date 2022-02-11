jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => ({
    getLayer: jest.fn(),
    removeLayer: jest.fn(),
    addLayer: jest.fn(),
    setFeatureState: jest.fn(),
  })),
}));

import { render } from "@testing-library/svelte";
import DataLayer from "./DataLayer.svelte";
import MockMap from "./MockMap.svelte";
import { selectedCategoryBreaks } from "../../model/metadata/metadata";
import { dataByGeography, cachedMapCategories, newDataByGeography } from "../../model/censusdata/censusdata";

describe("DataLayer", () => {
  beforeEach(() => {
    dataByGeography.set(new Map([["geoCode1", new Map([["catCode1", { value: 1, perc: 20, total: 5 }]])]]));
    selectedCategoryBreaks.set({
      lad: [10, 20, 30, 45, 50],
      lsoa: [9, 15, 17, 26, 34],
    });
    newDataByGeography.set(true);
    cachedMapCategories.set(new Set(["catCode1"]));
  });

  it("setMapGeographyColours", async () => {
    const { component } = render(MockMap, { props: { Component: DataLayer, catCode: "catCode1" } });
    expect(component.legendSection).toEqual(1);
  });
});

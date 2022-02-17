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
import { dataBreaks } from "../../model/metadata/metadata";
import { dataByGeography, cachedMapCategories, newDataByGeography } from "../../model/censusdata/censusdata";

describe("DataLayer", () => {
  dataBreaks.set({
    lad: [10, 20, 30, 45, 50],
    lsoa: [9, 15, 17, 26, 34],
  });
  newDataByGeography.set(true);
  cachedMapCategories.set(new Set(["catCode1", "catCode2"]));
  it("setMapGeographyColours - returns the colour index of the LAD geography", () => {
    dataByGeography.set(new Map([["LADgeoCode", new Map([["catCode1", { value: 1, perc: 20, total: 5 }]])]]));
    const { component } = render(MockMap, { props: { Component: DataLayer, catCode: "catCode1" } });
    expect(component.legendSection).toEqual(1);
  });
  it("setMapGeographyColours - returns the colour index of the LSOA geography", () => {
    dataByGeography.set(new Map([["E01LSOAgeoCode", new Map([["catCode2", { value: 5, perc: 50, total: 10 }]])]]));
    const { component } = render(MockMap, { props: { Component: DataLayer, catCode: "catCode2" } });
    expect(component.legendSection).toEqual(4);
  });
});

export default {
  legacy: {
    geography: "TYPE298",
    mapstyle: "https://bothness.github.io/ons-basemaps/data/style-omt.json",
    tabledata: "https://bothness.github.io/census-atlas/data/indicators.json",
    ladtopo: {
      url: "https://bothness.github.io/census-atlas/data/lad_boundaries_2020.json",
      layer: "LA2020EW",
      code: "AREACD",
      name: "AREANM",
    },
    lsoabldg: {
      url: "https://cdn.ons.gov.uk/maptiles/buildings/v1/{z}/{x}/{y}.pbf",
      layer: "buildings",
      code: "lsoa11cd",
    },
    lsoabounds: {
      url: "https://cdn.ons.gov.uk/maptiles/administrative/lsoa/v2/boundaries/{z}/{x}/{y}.pbf",
      layer: "lsoa",
      code: "areacd",
    },
    ladvector: {
      url: "https://cdn.ons.gov.uk/maptiles/administrative/authorities/v1/boundaries/{z}/{x}/{y}.pbf",
      layer: "authority",
      code: "areacd",
    },
    lsoadata: "https://bothness.github.io/census-atlas/data/lsoa2011_lad2020.csv",
  },
  ux: {
    default_zoom: 14
  }
}

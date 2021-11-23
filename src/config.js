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
    legend_sections: 5,
    legend_colours: ["#d5f690", "#5bc4b1", "#2e9daa", "#0079a2", "#005583"],
    map: {
      default_zoom: 14,
      max_zoom: 14,
      min_zoom: 9,
      buildings_breakpoint: 12,
      lsoa_breakpoint: 9,
      paint: {
        data: {
          "fill-color": [
            "case",
            ["!=", ["feature-state", "color"], null],
            ["feature-state", "color"],
            "rgba(255, 255, 255, 0)",
          ],
        },
        line: {
          "line-color": ["rgba(192, 192, 192, 1)"],
          "line-width": [0.75],
        },
        interactive: {
          "line-color": [
            "case",
            ["==", ["feature-state", "selected"], true],
            "rgba(0, 0, 0, 1)",
            ["==", ["feature-state", "hovered"], true],
            "rgba(50, 50, 50, 1)",
            "rgba(0, 0, 0, 0)",
          ],
          "line-width": [
            "case",
            ["==", ["feature-state", "selected"], true],
            2,
            ["==", ["feature-state", "hovered"], true],
            2,
            0,
          ],
        },
      },
    },
  },
};

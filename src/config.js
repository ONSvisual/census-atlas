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
    msoabounds: {
      url: "https://cdn.ons.gov.uk/maptiles/administrative/msoa/v2/boundaries/{z}/{x}/{y}.pbf",
      layer: "msoa",
      code: "areacd",
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
  api: {
    baseUrl: "https://cep5lmkia0.execute-api.eu-west-1.amazonaws.com/dev/",
    censusMetadataEndpoint: "metadata/2011",
    censusDataEndpoint: "query/2011",
    censusDataBreaksEndpoint: "ckmeansratio/2011",
  },
  stores: {
    overwrite: false,
  },
  ux: {
    deviceWidth: 500,
    legend_sections: 5,
    legend_colours: ["#d5f690", "#5bc4b1", "#2e9daa", "#0079a2", "#005583"],
    map: {
      englandAndWalesBounds: [2.08, 55.68, -6.59, 48.53],
      outerMapBounds: [-10.5, 47.5, 5.9, 57.8],
      default_zoom: 14,
      max_zoom: 14,
      min_zoom: 9,
      buildings_breakpoint: 12,
      lsoa_breakpoint: 9,
      msoa_boundary_breakpoint: 10,
      lad_boundary_breakpoint: 9,
      filter: ["all", ["==", "lower", "true"], ["in", "country", "E", "W"]],
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
        lad_boundary: {
          "line-color": "#808080",
          "line-width": 2,
        },
        msoa_boundary: {
          "line-color": "#808080",
          "line-width": 0.5,
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
  error: {
    text: "You must enter the name of the local council or city.",
  },
  autosuggestData: "https://raw.githubusercontent.com/ONSdigital/census-atlas/master/src/data/ladList.json",
  eAndWGeoCode: "K04000001",
  suggestions: {
    indexPageSuggestions: [
      {
        text: "Which areas have the highest levels of shared ownership properties?",
        url: "/housing/owned-or-renting/shared-ownership",
      },
      {
        text: "Which areas of the country are the most healthy?",
        url: "/health/general-health/very-good",
      },
      {
        text: "Where are the highest levels of homes without central heating?",
        url: "/housing/heating/no-central-heating",
      },
    ],
  },
};

export const topicSuggestions = [
  {
    topicCode: "QS1",
    topicName: "Population Basics",
    suggestions: [
      {
        text: "Where are the highest numbers of people aged 75+ living on their own?",
        url: "/population-basics/adult-lifestage/age-75-and-over",
      },
      {
        text: "Where are the most deprived areas in England and Wales?",
        url: "/population-basics/households-by-deprivation-dimensions/household-is-deprived-in-4-dimensions",
      },
    ],
  },
  {
    topicCode: "QS2",
    topicName: "Origins and Beliefs",
    suggestions: [
      {
        text: "Where are Jewish communities distributed across England and Wales?",
        url: "/origins-and-beliefs/religion/jewish",
      },
      {
        text: "Where are the largest numbers of native Welsh speakers living outside of Wales?",
        url: "/origins-and-beliefs/main-language/welsh-cymraeg-in-england-only",
      },
    ],
  },
  {
    topicCode: "QS3",
    topicName: "Health",
    suggestions: [
      {
        text: "How does general health differ across England and Wales?",
        url: "/health/general-health/good-health",
      },
      {
        text: "Which areas are home to people who provide the most unpaid care?",
        url: "/health/provision-of-unpaid-care/provides-50-or-more-hours-unpaid-care-a-week",
      },
    ],
  },
  {
    topicCode: "QS4",
    topicName: "Housing",
    suggestions: [
      {
        text: "Where are the highest levels of home ownership?",
        url: "/housing/tenure-households/owned",
      },
      {
        text: "How many households have 4 or more cars or vans?",
        url: "/housing/car-or-van-availability/4-or-more-cars-or-vans-in-household",
      },
    ],
  },
  {
    topicCode: "QS5",
    topicName: "Education",
    suggestions: [
      {
        text: "What is the distribution of degree level qualifications across England and Wales?",
        url: "/education/qualifications-gained/degree",
      },
      {
        text: "What percentage of the population in England and Wales hold no qualifications?",
        url: "/education/highest-level-of-qualifications/no-qualifications",
      },
    ],
  },
  {
    topicCode: "QS6",
    topicName: "Employment",
    suggestions: [
      {
        text: "Where are the highest levels of unemployment?",
        url: "/employment/economic-activity/economically-active",
      },
      {
        text: "What is the distribution of people working in food, beverage and tobacco manufacturing across England and Wales?",
        url: "/employment/industry/c-manufacturing",
      },
    ],
  },
  {
    topicCode: "QS7",
    topicName: "Travel to Work",
    suggestions: [
      {
        text: "Where do people travel the furthest to get to work?",
        url: "/travel-to-work/distance-travelled-to-work/60km-and-over",
      },
      {
        text: "Where are the highest percentage of people commuting to work by train?",
        url: "/travel-to-work/method-of-travel-to-work/train",
      },
    ],
  },
  {
    topicCode: "QS8",
    topicName: "Residency",
    suggestions: [
      {
        text: "What is the distribution of people who became resident in the UK less than 2 years ago?",
        url: "/residency/length-of-residence-in-the-uk/less-than-2-years-ago",
      },
    ],
  },
];

export function areaSelectedTopicSuggestions(locationName, ladCode) {
  const locationQueryParam = ladCode ? `?location=${ladCode}` : "";
  return [
    {
      text: `People with a Level 4 education or above.`,
      url: `/education/highest-level-of-qualification-gained/level-4-qualifications-and-above${locationQueryParam}`,
    },
    {
      text: `${locationName}'s ethnic mix.`,
      url: `/identity/ethnicity/white-english-welsh-scottish-northern-irish-british${locationQueryParam}`,
    },
    {
      text: `Residents general health.`,
      url: `/health/general-health/good${locationQueryParam}`,
    },
    {
      text: `What is the most common household size?`,
      url: `/housing/size-of-household/2-person-household${locationQueryParam}`,
    },
    {
      text: `How people travel to work?`,
      url: `/work/travel-to-work/driving-in-a-car-or-van${locationQueryParam}`,
    },
  ];
}

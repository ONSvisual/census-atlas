export default {
  "version": 8,
  "name": "Positron",
  "metadata": {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "mapbox:groups": {
      "b6371a3f2f5a9932464fa3867530a2e5": {
        "name": "Transportation",
        "collapsed": false
      },
      "a14c9607bc7954ba1df7205bf660433f": {
        "name": "Boundaries"
      },
      "101da9f13b64a08fa4b6ac1168e89e5f": {
        "name": "Places",
        "collapsed": false
      }
    },
    "openmaptiles:version": "3.x",
    "openmaptiles:mapbox:owner": "openmaptiles",
    "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t",
    "maputnik:renderer": "mbgljs"
  },
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "tiles": [
        "https://cdn.ons.gov.uk/maptiles/osm/v2/{z}/{x}/{y}.pbf"
      ],
      "buffer": 0,
      "minzoom": 0,
      "maxzoom": 14,
      "attribution": "<a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>"
    }
  },
  "sprite": "https://bothness.github.io/ons-basemaps/data/sprite",
  "glyphs": "https://cdn.ons.gov.uk/maptiles/osm/fontsv1/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "rgb(242,243,240)"
      }
    },
    {
      "id": "park",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "park",
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(242,243,240)"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(255, 255, 255)",
        "fill-antialias": true
      }
    },
    {
      "id": "landcover_ice_shelf",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "subclass",
          "ice_shelf"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(0, 0%, 98%)",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover_glacier",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "subclass",
          "glacier"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(0, 0%, 98%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              0,
              1
            ],
            [
              8,
              0.5
            ]
          ]
        }
      }
    },
    {
      "id": "landuse_residential",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "maxzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "residential"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(234, 234, 230)",
        "fill-opacity": {
          "base": 0.6,
          "stops": [
            [
              8,
              0.8
            ],
            [
              9,
              0.6
            ]
          ]
        }
      }
    },
    {
      "id": "landcover_wood",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "minzoom": 10,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "wood"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(234, 234, 230)",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              8,
              0
            ],
            [
              12,
              0
            ]
          ]
        }
      }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(100%, 100%, 100%)"
      }
    },
    {
      "id": "water_name",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
        "symbol-spacing": 500,
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": 12
      },
      "paint": {
        "text-color": "rgb(157,169,177)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "building",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 12,
      "paint": {
        "fill-color": "rgb(234, 234, 229)",
        "fill-outline-color": "rgb(219, 219, 218)",
        "fill-antialias": true
      }
    },
    {
      "id": "tunnel_motorway_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "tunnel"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(213, 213, 213)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              5.8,
              0
            ],
            [
              6,
              3
            ],
            [
              20,
              40
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "tunnel_motorway_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "tunnel"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(234,234,234)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "aeroway-taxiway",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "in",
          "class",
          "taxiway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 88%)",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-runway-casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 88%)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              6
            ],
            [
              17,
              55
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-area",
      "type": "fill",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "in",
          "class",
          "runway",
          "taxiway"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              13,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        "fill-color": "rgba(255, 255, 255, 1)"
      }
    },
    {
      "id": "aeroway-runway",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              4
            ],
            [
              17,
              50
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "road_area_pier",
      "type": "fill",
      "metadata": {},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "pier"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(242,243,240)",
        "fill-antialias": true
      }
    },
    {
      "id": "road_pier",
      "type": "line",
      "metadata": {},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "pier"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "rgb(242,243,240)",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1
            ],
            [
              17,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "highway_path",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "path"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(234, 234, 234)",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              13,
              1
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-opacity": 0.9
      }
    },
    {
      "id": "highway_minor",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "minor",
          "service",
          "track"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 88%)",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        },
        "line-opacity": 0.9
      }
    },
    {
      "id": "highway_major_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(213, 213, 213)",
        "line-dasharray": [
          12,
          0
        ],
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              10,
              3
            ],
            [
              20,
              23
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              10,
              2
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major_subtle",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "maxzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 85%, 0.69)",
        "line-width": 2
      }
    },
    {
      "id": "highway_motorway_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(213, 213, 213)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              5.8,
              0
            ],
            [
              6,
              3
            ],
            [
              20,
              40
            ]
          ]
        },
        "line-dasharray": [
          2,
          0
        ],
        "line-opacity": 1
      }
    },
    {
      "id": "highway_motorway_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": {
          "base": 1,
          "stops": [
            [
              5.8,
              "hsla(0, 0%, 85%, 0.53)"
            ],
            [
              6,
              "#fff"
            ]
          ]
        },
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "highway_motorway_subtle",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "maxzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 85%, 0.53)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ]
          ]
        }
      }
    },
    {
      "id": "railway_transit",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddddd",
        "line-width": 3
      }
    },
    {
      "id": "railway_transit_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fafafa",
        "line-width": 2,
        "line-dasharray": [
          3,
          3
        ]
      }
    },
    {
      "id": "railway_service",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddddd",
        "line-width": 3
      }
    },
    {
      "id": "railway_service_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "rail"
        ],
        [
          "has",
          "service"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fafafa",
        "line-width": 2,
        "line-dasharray": [
          3,
          3
        ]
      }
    },
    {
      "id": "railway",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!has",
            "service"
          ],
          [
            "==",
            "class",
            "rail"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddddd",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              16,
              3
            ],
            [
              20,
              7
            ]
          ]
        }
      }
    },
    {
      "id": "railway_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!has",
            "service"
          ],
          [
            "==",
            "class",
            "rail"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fafafa",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              16,
              2
            ],
            [
              20,
              6
            ]
          ]
        },
        "line-dasharray": [
          3,
          3
        ]
      }
    },
    {
      "id": "highway_motorway_bridge_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "bridge"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(213, 213, 213)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              5.8,
              0
            ],
            [
              6,
              5
            ],
            [
              20,
              45
            ]
          ]
        },
        "line-dasharray": [
          2,
          0
        ],
        "line-opacity": 1
      }
    },
    {
      "id": "highway_motorway_bridge_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "bridge"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": {
          "base": 1,
          "stops": [
            [
              5.8,
              "hsla(0, 0%, 85%, 0.53)"
            ],
            [
              6,
              "#fff"
            ]
          ]
        },
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "highway_name_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "!=",
          "class",
          "motorway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "text-size": 10,
        "text-max-angle": 30,
        "text-transform": "none",
        "symbol-spacing": 350,
        "text-font": [
          "Noto Sans Regular"
        ],
        "symbol-placement": "line",
        "visibility": "visible",
        "text-rotation-alignment": "map",
        "text-pitch-alignment": "viewport",
        "text-field": "{name:latin} {name:nonlatin}"
      },
      "paint": {
        "text-color": "#bbb",
        "text-halo-color": "#fff",
        "text-translate": [
          0,
          0
        ],
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "highway_name_motorway",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "text-size": 10,
        "symbol-spacing": 350,
        "text-font": [
          "Noto Sans Regular"
        ],
        "symbol-placement": "line",
        "visibility": "visible",
        "text-rotation-alignment": "viewport",
        "text-pitch-alignment": "viewport",
        "text-field": "{ref}"
      },
      "paint": {
        "text-color": "rgb(117, 129, 145)",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-translate": [
          0,
          2
        ],
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "boundary_state",
      "type": "line",
      "metadata": {
        "mapbox:group": "a14c9607bc7954ba1df7205bf660433f"
      },
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
        "==",
        "admin_level",
        4
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(255, 255, 255)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              15
            ]
          ]
        },
        "line-blur": 0.4,
        "line-dasharray": [
          2,
          2
        ],
        "line-opacity": 1
      }
    },
    {
      "id": "boundary_country",
      "type": "line",
      "metadata": {
        "mapbox:group": "a14c9607bc7954ba1df7205bf660433f"
      },
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
        "==",
        "admin_level",
        2
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "rgb(255, 255, 255)",
        "line-width": {
          "base": 1.1,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              20
            ]
          ]
        },
        "line-blur": {
          "base": 1,
          "stops": [
            [
              0,
              0.4
            ],
            [
              22,
              4
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "place_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "in",
          "class",
          "continent",
          "hamlet",
          "neighbourhood",
          "isolated_dwelling"
        ],
        [
          "==",
          "$type",
          "Point"
        ]
      ],
      "layout": {
        "text-size": 10,
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0
        ],
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_suburb",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "suburb"
        ]
      ],
      "layout": {
        "text-size": 10,
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0
        ],
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_village",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "village"
        ]
      ],
      "layout": {
        "text-size": 10,
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0.2
        ],
        "icon-size": 0.4,
        "text-anchor": "left",
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_town",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "town"
        ]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              8,
              ""
            ]
          ]
        },
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0.2
        ],
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_city",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "all",
          [
            "!=",
            "capital",
            2
          ],
          [
            "==",
            "class",
            "city"
          ],
          [
            ">",
            "rank",
            3
          ]
        ]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              8,
              ""
            ]
          ]
        },
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0.2
        ],
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_capital",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "all",
          [
            "==",
            "capital",
            2
          ],
          [
            "==",
            "class",
            "city"
          ]
        ]
      ],
      "layout": {
        "text-size": 14,
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "star-11"
            ],
            [
              8,
              ""
            ]
          ]
        },
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0.2
        ],
        "icon-size": 1,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_city_large",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "all",
          [
            "!=",
            "capital",
            2
          ],
          [
            "<=",
            "rank",
            3
          ],
          [
            "==",
            "class",
            "city"
          ]
        ]
      ],
      "layout": {
        "text-size": 14,
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              8,
              ""
            ]
          ]
        },
        "text-transform": "none",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [
          0.5,
          0.2
        ],
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}"
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_state",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "state"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-transform": "none",
        "text-size": 10
      },
      "paint": {
        "text-color": "rgb(0, 0, 0)",
        "text-halo-color": "rgb(242,243,240)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_country_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "!has",
          "iso_a2"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name:latin}",
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-transform": "none",
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              9
            ],
            [
              6,
              11
            ]
          ]
        }
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "rgba(236,236,234,0.7)",
        "text-color": {
          "base": 1,
          "stops": [
            [
              3,
              "rgb(157,169,177)"
            ],
            [
              4,
              "rgb(153, 153, 153)"
            ]
          ]
        }
      }
    },
    {
      "id": "place_country_minor",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          ">=",
          "rank",
          2
        ],
        [
          "has",
          "iso_a2"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name:latin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-transform": "none",
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              10
            ],
            [
              6,
              12
            ]
          ]
        }
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "rgba(236,236,234,0.7)",
        "text-color": {
          "base": 1,
          "stops": [
            [
              3,
              "rgb(157,169,177)"
            ],
            [
              4,
              "rgb(153, 153, 153)"
            ]
          ]
        }
      }
    },
    {
      "id": "place_country_major",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          1
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "has",
          "iso_a2"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": "{name:latin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-transform": "none",
        "text-size": {
          "base": 1.4,
          "stops": [
            [
              0,
              10
            ],
            [
              3,
              12
            ],
            [
              4,
              14
            ]
          ]
        },
        "text-anchor": "center"
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "rgba(236,236,234,0.7)",
        "text-color": {
          "base": 1,
          "stops": [
            [
              3,
              "rgb(157,169,177)"
            ],
            [
              4,
              "rgb(153, 153, 153)"
            ]
          ]
        }
      }
    }
  ],
  "id": "positron"
}

<script>
  import { getContext } from "svelte";
  import { getLegendSection, areDataBreaksFetched, isCategoryDataFetched } from "./../../model/utils";
  import config from "./../../config";
  import { dataBreaks, newDataBreaks } from "../../model/metadata/metadata";
  import { dataByGeography, cachedMapCategories, newDataByGeography } from "../../model/censusdata/censusdata";

  export let id;
  export let source = getContext("source");
  export let sourceLayer = getContext("source-layer");
  export let filter = null;
  export let layout = {};
  export let paint = {
    "fill-color": [
      "case",
      ["!=", ["feature-state", "color"], null],
      ["feature-state", "color"],
      "rgba(255, 255, 255, 0)",
    ],
  };
  export let catCode, legendSection;
  export let order = "tunnel_motorway_casing";
  export let maxzoom = getContext("tileset-maxzoom");
  export let minzoom = getContext("tileset-minzoom");

  const { getMap } = getContext("map");
  const map = getMap();

  let selectedPrev = null;
  let highlightedPrev = null;

  // remove map if present
  if (map.getLayer(id)) {
    map.removeLayer(id);
  }

  // map options
  let options = {
    id: id,
    type: "fill",
    source: source,
    paint: paint,
    layout: layout,
  };

  if (filter) {
    options["filter"] = filter;
  }

  if (sourceLayer) {
    options["source-layer"] = sourceLayer;
  }
  if (maxzoom) {
    options["maxzoom"] = maxzoom;
  }
  if (minzoom) {
    options["minzoom"] = minzoom;
  }

  map.addLayer(options, order);

  export function setMapGeographyColours() {
    if ($cachedMapCategories.has(catCode) && $newDataByGeography) {
      $dataByGeography.forEach((geoData, geoCode) => {
        if (geoData.has(catCode) && $dataBreaks.has(catCode)) {
          if ($dataBreaks.get(catCode).lsoa && (geoCode.startsWith("E01") || geoCode.startsWith("W01"))) {
            legendSection = getLegendSection(geoData.get(catCode).perc, $dataBreaks.get(catCode).lsoa);
          } else if ($dataBreaks.get(catCode).lad) {
            legendSection = getLegendSection(geoData.get(catCode).perc, $dataBreaks.get(catCode).lad);
          }
          map.setFeatureState(
            {
              source: source,
              sourceLayer: sourceLayer,
              id: geoCode,
            },
            {
              color: config.ux.legend_colours[legendSection],
            },
          );
        }
      });
    }
  }

  // when data updates colourise the map
  $: $newDataBreaks &&
    areDataBreaksFetched($dataBreaks, catCode) &&
    isCategoryDataFetched($cachedMapCategories, catCode) &&
    $newDataByGeography &&
    setMapGeographyColours();
</script>

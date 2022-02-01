<script>
  import { getContext } from "svelte";
  import { getLegendSection } from "./../../model/utils";
  import config from "./../../config";
  import { selectedCategoryBreaks } from "../../model/metadata/metadata";
  import { dataByGeography, newDataByGeography } from "../../model/censusdata/censusdata";

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
  export let catCode;
  export let order = "tunnel_motorway_casing";
  export let maxzoom = getContext("tileset-maxzoom");
  export let minzoom = getContext("tileset-minzoom");

  console.log(catCode);
  console.log($dataByGeography);

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

  function setMapGeographyColours() {
    $dataByGeography.forEach((geoData, geoCode) => {
      
      geoData.forEach((val, catCode))
    });
    for (const key of Object.keys(data)) {
      let legendSection;
      if (key.startsWith("E01") || key.startsWith("W01")) {
        legendSection = getLegendSection(data[key].perc, $selectedCategoryBreaks.lsoa);
      } else {
        legendSection = getLegendSection(data[key].perc, $selectedCategoryBreaks.lad);
      }
      map.setFeatureState(
        {
          source: source,
          sourceLayer: sourceLayer,
          id: key,
        },
        {
          color: config.ux.legend_colours[legendSection],
        },
      );
    }
  }

  // when data updates colourise the map
  $: $selectedCategoryBreaks, $newDataByGeography && setMapGeographyColours();
</script>

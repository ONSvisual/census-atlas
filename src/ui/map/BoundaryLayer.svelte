<script>
  import { getContext } from "svelte";
  import config from "./../../config";

  export let id;
  export let source = getContext("source");
  export let sourceLayer = getContext("source-layer");
  export let type = "line";
  export let filter = null;
  export let layout = {};
  export let paint = config.ux.map.paint.boundary;
  export let maxzoom = getContext("tileset-maxzoom");
  export let minzoom = getContext("tileset-minzoom");
  export let order = "lad-interactive-layer-interactive-boundaries";

  const { getMap } = getContext("map");
  const map = getMap();

  if (map.getLayer(id)) {
    map.removeLayer(id);
  }

  let options = {
    id: id,
    type: type,
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

  if (map.getLayer(order)) {
    map.addLayer(options, order);
  } else {
    map.addLayer(options);
  }
</script>

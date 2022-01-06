<script>
  import { onMount, setContext } from "svelte";
  import { Map, NavigationControl } from "mapbox-gl";
  import mapstyle from "./../../data/mapstyle";
  import { selectedGeography, getMapBBoxGeoCodes } from "../../model/geography/geography";
  import ladBoundsLookup from "../../data/ladMapBoundsLookup";
  import { mapBBoxCodes } from "../../model/censusdata/stores";
  import { mapZoomBBox } from "../../model/geography/stores";

  export let map = null;
  export let minzoom = 0;
  export let maxzoom = 14;

  export let bounds = [3.2, 55.17, -6.17, 50.38];
  export let zoom = 6;

  let options = {
    bounds: bounds,
    zoom: zoom,
  };

  let container;

  $: if ($mapZoomBBox) {
    mapBBoxCodes.set(getMapBBoxGeoCodes(map));
  }
  $: {
    if (map && $selectedGeography.lad && ladBoundsLookup[$selectedGeography.lad]) {
      bounds = [
        ladBoundsLookup[$selectedGeography.lad].maxX,
        ladBoundsLookup[$selectedGeography.lad].maxY,
        ladBoundsLookup[$selectedGeography.lad].minX,
        ladBoundsLookup[$selectedGeography.lad].minY,
      ];
      map.fitBounds(bounds, { padding: 30 });
    }
  }
  setContext("map", {
    getMap: () => map,
  });

  function getDebouncedMapZoomBBoxStore() {
    var debounceTimer;
    const debounceTimeout = 250;
    return function (map) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        let mapBBox = map.getBounds();
        mapZoomBBox.set({
          swCorner: mapBBox._sw,
          neCorner: mapBBox._ne,
          zoom: map.getZoom(),
        });
      }, debounceTimeout);
    };
  }

  const debouncedMapZoomBBoxStore = getDebouncedMapZoomBBoxStore();

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new Map({
        container,
        style: mapstyle,
        minZoom: minzoom,
        maxZoom: maxzoom,
        ...options,
      });

      map.addControl(new NavigationControl());

      map.fitBounds(bounds, { padding: 20 });

      // Get initial zoom level
      map.on("load", () => {
        debouncedMapZoomBBoxStore(map);
        zoom = map.getZoom();
      });

      // Update zoom level when the view zooms
      map.on("zoom", () => {
        debouncedMapZoomBBoxStore(map);
        zoom = map.getZoom();
      });

      map.on("drag", () => {
        debouncedMapZoomBBoxStore(map);
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>

<style lang="scss">
  @import "./../../../node_modules/@ons/design-system/scss/vars/_index.scss";

  div {
    min-width: 375px;
    min-height: 340px;
    width: 100%;
    height: 100%;
    background: url("/img/background.png") no-repeat center center;
    background-size: cover;
  }
</style>

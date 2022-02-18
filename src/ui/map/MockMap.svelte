<script>
  import { Map } from "mapbox-gl";
  import { setContext } from "svelte";

  export let Component, catCode, setMapGeographyColours, legendSection;

  setContext("map", {
    getMap: () => new Map({}),
  });
</script>

<div><Component {catCode} bind:setMapGeographyColours bind:legendSection /></div>

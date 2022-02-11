<script>
  import { Map } from "mapbox-gl";
  import { setContext } from "svelte";

  export let Component;

  setContext("map", {
    getMap: () => new Map({}),
  });
</script>

<svelte:component this={Component} />

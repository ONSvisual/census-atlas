<script>
  import { setContext } from "svelte";
  import { Map } from "mapbox-gl";

  export let Component;
  export let context_key;
  export let context_value;

  setContext("map", {
    getMap: () => new Map({ container: "container" }),
  });
</script>

<svelte:component this={Component} />

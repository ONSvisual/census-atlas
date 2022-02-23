<script>
  import Map from "./Map.svelte";
  import TileSet from "./TileSet.svelte";
  import InteractiveLayer from "./InteractiveLayer.svelte";
  import BoundaryLayer from "./BoundaryLayer.svelte";
  import DataLayer from "./DataLayer.svelte";

  import config from "../../config";
  import { updateHoveredGeography, updateSelectedGeography, selectedGeography } from "../../model/geography/geography";

  export let category, bounds, showDataLayer, redirectOnSelect;
</script>

<Map maxzoom={14} {bounds}>
  <TileSet
    id="lad"
    type="vector"
    url={config.legacy.ladvector.url}
    layer={config.legacy.ladvector.layer}
    promoteId={config.legacy.ladvector.code}
  >
    {#if category && showDataLayer}
      <DataLayer id="lad-data-zoom" catCode={category.code} maxzoom={config.ux.map.lsoa_breakpoint} />
    {/if}
    <InteractiveLayer
      id="lad-interactive-layer"
      selected={$selectedGeography.lad}
      maxzoom={config.ux.map.buildings_breakpoint}
      onSelect={(code) => {
        updateSelectedGeography(code);
        if (redirectOnSelect) {
          redirectOnSelect(code);
        }
      }}
      onHover={(code) => {
        updateHoveredGeography(code);
      }}
      filter={config.ux.map.filter}
    />
  </TileSet>

  <TileSet
    id="lsoa"
    type="vector"
    url={config.legacy.lsoabounds.url}
    layer={config.legacy.lsoabounds.layer}
    promoteId={config.legacy.lsoabounds.code}
    minzoom={config.ux.map.lsoa_breakpoint}
    maxzoom={config.ux.map.buildings_breakpoint}
  >
    {#if category && showDataLayer}
      <DataLayer id="lsoa-data" catCode={category.code} />
    {/if}
  </TileSet>
  <TileSet
    id="lsoa-building"
    type="vector"
    url={config.legacy.lsoabldg.url}
    layer={config.legacy.lsoabldg.layer}
    promoteId={config.legacy.lsoabldg.code}
    minzoom={config.ux.map.buildings_breakpoint}
  >
    {#if category && showDataLayer}
      <DataLayer id="lsoa-data-zoom" catCode={category.code} />
    {/if}
  </TileSet>

  <TileSet
    id="msoa"
    type="vector"
    url={config.legacy.msoabounds.url}
    layer={config.legacy.msoabounds.layer}
    promoteId={config.legacy.msoabounds.code}
  >
    {#if category && showDataLayer}
      <DataLayer id="msoa-data" catCode={category.code} />
    {/if}
    <BoundaryLayer
      paint={config.ux.map.paint.msoa_boundary}
      minzoom={config.ux.map.msoa_boundary_breakpoint}
      id="msoa-boundary-layer"
    />
  </TileSet>
  <TileSet
    id="lad-boundaries"
    type="vector"
    url={config.legacy.ladvector.url}
    layer={config.legacy.ladvector.layer}
    promoteId={config.legacy.ladvector.code}
  >
    <BoundaryLayer
      minzoom={config.ux.map.lad_boundary_breakpoint}
      maxzoom={config.ux.map.msoa_boundary_breakpoint}
      id="lad-boundary-layer"
    />
  </TileSet>
</Map>

<style lang="scss">
  @import "../../../node_modules/@ons/design-system/scss/vars/_index.scss";
</style>

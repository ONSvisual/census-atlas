<script>
  import BasePage from "./../ui/BasePage.svelte";

  import Header from "./../ui/Header.svelte";
  import Map from "../ui/map/Map.svelte";
  import TopicExplorer from "./../ui/TopicExplorer.svelte";
  import Topic from "../ui/Topic.svelte";
  import Feedback from "./../ui/Feedback.svelte";
  import { appIsInitialised } from "../model/appstate";
  import config from "../config";
  import TileSet from "../ui/map/TileSet.svelte";
  import InteractiveLayer from "../ui/map/InteractiveLayer.svelte";
  import BoundaryLayer from "../ui/map/BoundaryLayer.svelte";
  import {
    getLadName,
    updateSelectedGeography,
    updateHoveredGeography,
    selectedGeography,
  } from "../model/geography/geography";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let englandWalesBounds = [2.08, 55.68, -6.59, 48.53];

  let locationId = $page.query.get("location");
  let locationName;

  $: {
    if ($selectedGeography.lad) {
      $page.query.set("location", $selectedGeography.lad);
      goto(`?${$page.query.toString()}`);
      locationId = $page.query.get("location");
      locationName = getLadName(locationId);
    }
  }

  $: appIsInitialised, $appIsInitialised && initialisePage();

  function initialisePage() {
    if (locationId) {
      locationName = getLadName(locationId);
      updateSelectedGeography(locationId);
    }
  }
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<svelte:head>
  <title>2021 Census Data Atlas Categories</title>
</svelte:head>

<BasePage mobileMap={false} withoutBackground>
  <span slot="header">
    <Header
      showBackLink
      serviceTitle="Choose a data option"
      description="Choose a category and select an option within it to explore {locationName
        ? `${locationName}'s`
        : 'Census'} data."
    />
  </span>

  <span slot="map">
    <Map maxzoom={14}>
      <TileSet
        id="lad"
        type="vector"
        url={config.legacy.ladvector.url}
        layer={config.legacy.ladvector.layer}
        promoteId={config.legacy.ladvector.code}
      >
        <InteractiveLayer
          id="lad-interactive-layer"
          maxzoom={config.ux.map.buildings_breakpoint}
          onSelect={(code) => {
            updateSelectedGeography(code);
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
      />
      <TileSet
        id="lsoa-building"
        type="vector"
        url={config.legacy.lsoabldg.url}
        layer={config.legacy.lsoabldg.layer}
        promoteId={config.legacy.lsoabldg.code}
        minzoom={config.ux.map.buildings_breakpoint}
      />
      <TileSet
        id="lad-boundaries"
        type="vector"
        url={config.legacy.ladvector.url}
        layer={config.legacy.ladvector.layer}
        promoteId={config.legacy.ladvector.code}
      >
        <BoundaryLayer minzoom={config.ux.map.lsoa_breakpoint} id="lad-boundary-layer" />
      </TileSet>
    </Map>
  </span>

  <TopicExplorer {locationId} />

  {#if innerWidth >= 500}
    <Topic topicList={[{ text: "Get Census datasests", url: "#0" }]} cardTitle="Need something specific from Census?">
      Explore correlations between two indicators in <a href="#0">advanced mode</a>.
    </Topic>
  {/if}
  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container">
          <Feedback />
        </div>
      </div>
    </footer>
  </span>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

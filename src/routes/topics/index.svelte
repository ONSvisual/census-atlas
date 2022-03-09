<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import BasePage from "../../ui/BasePage.svelte";
  import MapWrapper from "../../ui/map/MapWrapper.svelte";
  import HeaderWrapper from "../../ui/HeaderWrapper.svelte";
  import config from "../../config";
  import TopicList from "../../ui/TopicList.svelte";

  import { appIsInitialised } from "../../model/appstate";
  import { getLadName, selectedGeography, updateSelectedGeography } from "../../model/geography/geography";

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
      console.log("hello");
      locationName = getLadName(locationId);
      updateSelectedGeography(locationId);
    }
  }
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <meta name="description" content="Explore 2021 census data for England and Wales at a neighbourhood level." />
</svelte:head>

<BasePage mobileMap={false} withoutBackground>
  <span slot="header">
    <HeaderWrapper {locationName} {locationId} />
  </span>

  <TopicList />

  <span slot="map">
    <MapWrapper showDataLayer={false} bounds={config.ux.map.englandAndWalesBounds} />
  </span>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

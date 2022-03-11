<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import BasePage from "../../ui/BasePage.svelte";
  import Return from "../../ui/Return.svelte";
  import { pageUrl } from "../../stores";
  import MapWrapper from "../../ui/map/MapWrapper.svelte";
  import HeaderWrapper from "../../ui/HeaderWrapper.svelte";
  import config from "../../config";
  import TopicList from "../../ui/TopicList.svelte";
  import ExploreSomethingElseNav from "../../ui/ExploreSomethingElseNav/ExploreSomethingElseNav.svelte";

  import { appIsInitialised } from "../../model/appstate";
  import { getLadName, selectedGeography, updateSelectedGeography } from "../../model/geography/geography";

  let locationId = $page.query.get("location");
  let locationName, header;
  let showChangeAreaHeader = false;

  $: {
    locationId = $page.query.get("location");
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
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <meta name="description" content="Explore 2021 census data for England and Wales at a neighbourhood level." />
</svelte:head>

<BasePage mobileMap={false} withoutBackground>
  <span slot="return">
    {#if $pageUrl}
      <Return href={$pageUrl} inverted />
    {/if}
  </span>
  <span slot="header" bind:this={header}>
    <HeaderWrapper
      bind:showChangeAreaHeader
      changeAreaBaseUrl="/topics"
      serviceTitle={`Select a topic to explore census results for ${locationId ? locationName : "England and Wales"}`}
      renderEnglandWalesData={false}
    />
  </span>

  <div class="ons-u-mb-xl">
    <TopicList />
  </div>

  <span slot="map">
    <MapWrapper showDataLayer={false} bounds={config.ux.map.englandAndWalesBounds} />
  </span>

  <div class="ons-u-mb-l">
    <ExploreSomethingElseNav
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeAreaHeader = true), header.scrollIntoView())}
    />
  </div>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

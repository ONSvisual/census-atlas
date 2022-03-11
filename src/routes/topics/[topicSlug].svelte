<script>
  import BasePage from "../../ui/BasePage.svelte";
  import HeaderWrapper from "../../ui/HeaderWrapper.svelte";
  import MapWrapper from "../../ui/map/MapWrapper.svelte";
  import TopicExplorer from "../../ui/TopicExplorer.svelte";
  import Feedback from "../../ui/Feedback.svelte";
  import ExploreSomethingElseNav from "../../ui/ExploreSomethingElseNav/ExploreSomethingElseNav.svelte";
  import { appIsInitialised } from "../../model/appstate";
  import { getLadName, updateSelectedGeography, selectedGeography } from "../../model/geography/geography";
  import { censusTableStructureIsLoaded } from "../../model/censusdata/censusdata";
  import { pageUrl } from "../../stores";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  let locationId = $page.query.get("location");
  let locationName, header;
  let { topicSlug } = $page.params;
  let showChangeAreaHeader = false;

  $: {
    if ($selectedGeography.lad) {
      $page.query.set("location", $selectedGeography.lad);
      goto(`?${$page.query.toString()}`);
      locationId = $page.query.get("location");
      locationName = getLadName(locationId);
      if ($pageUrl.includes("area")) {
        $pageUrl = `area?location=${locationId}`;
      }
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

<svelte:window />
<svelte:head>
  <title>2021 Census Data Atlas Categories</title>
</svelte:head>

<BasePage mobileMap={false} withoutBackground>
  <span slot="header" bind:this={header}>
    <HeaderWrapper
      {locationName}
      {locationId}
      {topicSlug}
      changeAreaBaseUrl="/topics/{topicSlug}"
      bind:showChangeAreaHeader
    />
  </span>

  <span slot="map">
    <MapWrapper showDataLayer={false} />
  </span>

  <p>
    Change to a
    <a href="/topics{locationId ? `?location=${locationId}` : ''}">new topic</a>
  </p>
  <hr />

  {#if $appIsInitialised && $censusTableStructureIsLoaded}
    <TopicExplorer {locationId} selectedTopic={topicSlug} />
  {/if}

  <div class="ons-u-mb-l">
    <ExploreSomethingElseNav
      firstLink={{ text: "New topic", url: locationId ? `/topics?location=${locationId}` : "/topics" }}
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeAreaHeader = true), header.scrollIntoView())}
    />
  </div>

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

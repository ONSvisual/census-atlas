<script>
  import BasePage from "./../../ui/BasePage.svelte";

  import Header from "./../../ui/Header.svelte";
  import MapWrapper from "../../ui/map/MapWrapper.svelte";
  import config from "../../config";
  import TopicExplorer from "./../../ui/TopicExplorer.svelte";
  import Topic from "../../ui/Topic.svelte";
  import Feedback from "./../../ui/Feedback.svelte";
  import { getLadName, updateSelectedGeography, selectedGeography } from "../../model/geography/geography";
  import { appIsInitialised } from "../../model/appstate";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let { topicSlug } = $page.params;
  let locationId = $page.query.get("location");
  let locationName;

  $: {
    if (locationId) {
      locationName = getLadName(locationId);
    }
  }

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
      serviceTitle="Choose a category {locationId ? `for ${locationName}` : ''}"
      description="Choose a category and select an option within it to explore {locationName
        ? `${locationName}'s`
        : 'Census'} data."
    />
  </span>

  <span slot="map">
    <MapWrapper bounds={config.ux.map.englandAndWalesBounds} showDataLayer={false} />
  </span>

  <TopicExplorer selectedTopic={topicSlug} {locationId} />

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

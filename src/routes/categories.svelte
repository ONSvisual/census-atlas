<script>
  import BasePage from "./../ui/BasePage.svelte";

  import Header from "./../ui/Header.svelte";
  import MapWrapper from "../ui/map/MapWrapper.svelte";
  import TopicExplorer from "./../ui/TopicExplorer.svelte";
  import Topic from "../ui/Topic.svelte";
  import Feedback from "./../ui/Feedback.svelte";
  import { appIsInitialised } from "../model/appstate";
  import config from "../config";
  import { getLadName, updateSelectedGeography, selectedGeography } from "../model/geography/geography";
  import { censusTableStructureIsLoaded } from "../model/censusdata/censusdata";
  import { pageUrl } from "../stores";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let locationId = $page.query.get("location");
  let locationName;

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
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<svelte:head>
  <title>2021 Census Data Atlas Categories</title>
</svelte:head>

<BasePage mobileMap={false} withoutBackground>
  <span slot="header">
    <Header
      ONSBacklinkHref={$pageUrl}
      showBackLink
      serviceTitle="Choose a category {locationId ? `for ${locationName}` : ''}"
      description="Choose a category and select an option within it to explore {locationName
        ? `${locationName}'s`
        : 'Census'} data."
    />
  </span>

  <span slot="map">
    <MapWrapper showDataLayer={false} />
  </span>

  {#if $appIsInitialised && $censusTableStructureIsLoaded}
    <TopicExplorer {locationId} />
  {/if}

  {#if innerWidth >= config.ux.conditional_rendering_breakpoints.innerWidth}
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

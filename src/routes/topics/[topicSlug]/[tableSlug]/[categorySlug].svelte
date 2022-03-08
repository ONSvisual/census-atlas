<script>
  import BasePage from "../../../../ui/BasePage.svelte";
  import Header from "../../../../ui/Header.svelte";
  import MapWrapper from "../../../../ui/map/MapWrapper.svelte";
  import TopicExplorer from "../../../../ui/TopicExplorer.svelte";
  import Feedback from "../../../../ui/Feedback.svelte";
  import { appIsInitialised } from "../../../../model/appstate";
  import { getLadName, updateSelectedGeography, selectedGeography } from "../../../../model/geography/geography";
  import { censusTableStructureIsLoaded, getCategoryBySlug } from "../../../../model/censusdata/censusdata";
  import { pageUrl } from "../../../../stores";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  let { topicSlug, tableSlug, categorySlug } = $page.params;
  let locationId = $page.query.get("location");
  let locationName;
  $: category = getCategoryBySlug(tableSlug, categorySlug);
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
    <MapWrapper {category} showDataLayer={true} />
  </span>
  <p>
    Change to a
    <a href="/topics{locationId ? `?location=${locationId}` : ''}">new topic</a>
  </p>
  <hr />
  {#if $appIsInitialised && $censusTableStructureIsLoaded}
    <TopicExplorer {locationId} selectedTopic={topicSlug} visitedTable={tableSlug} />
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
</style>

<script>
  import BasePage from "./../../ui/BasePage.svelte";

  import Header from "./../../ui/Header.svelte";
  import Map from "../../ui/map/Map.svelte";
  import TopicExplorer from "./../../ui/TopicExplorer.svelte";
  import Topic from "../../ui/Topic.svelte";
  import Feedback from "./../../ui/Feedback.svelte";
  import { selectedGeography, getLadName } from "../../model/geography/geography";
  import { page } from "$app/stores";
  let { topicSlug } = $page.params;
  const locationId = $page.query.get("location")
  let locationName

  $: {
    if (locationId){
    locationName = getLadName(locationId)
  }
}

  $: innerWidth = 0;

  let englandWalesBounds = [2.08, 55.68, -6.59, 48.53];
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>2021 Census Data Atlas Categories</title>
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
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
    <Map bounds={englandWalesBounds} />
  </span>

  <TopicExplorer selectedTopic={topicSlug} />

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

<script>
  import BasePage from "../ui/BasePage.svelte";

  import Map from "../ui/Map.svelte";
  import Topic from "../ui/Topic.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import CategorySelector from "../ui/CategorySelector.svelte";
  import CensusTableByLocation from "../ui/CensusTableByLocation.svelte";
  import UseCensusData from "../ui/UseCensusData.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import HeaderData1 from "../ui/HeaderData1.svelte";

  import ONSPhaseBanner from "../ui/ons/ONSPhaseBanner.svelte";

  export let categoryId;
  export let locationId;
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage>
  <span slot="phase-banner">
    <ONSPhaseBanner phase="ALPHA" />
  </span>

  <span slot="header">
    <HeaderData1 indicator={categoryId} region={locationId} />
    <CategorySelector />
  </span>

  <span slot="map">
    <Map />
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  <img src="/img/tmp-table-overview-mockup.png" class="tmp-placeholder" />

  <CensusTableByLocation />

  <Topic cardTitle="General health with other indicators"
    >Explore correlations between two indicators in <a href="#">advanced mode</a>.</Topic
  >

  <UseCensusData location={categoryId} />

  <ONSShare />
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

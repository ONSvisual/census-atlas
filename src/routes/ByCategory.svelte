<script>
  import BasePage from "../ui/BasePage.svelte";

  import Map from "../ui/Map.svelte";
  import ExploreByTopic from "../ui/ExploreByTopic.svelte";
  import ExploreByAreaComponent from "../ui/ExploreByAreaComponent.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import Feedback from "../ui/Feedback.svelte";

  import ONSPhaseBanner from "../ui/ons/ONSPhaseBanner.svelte";

  export let categoryId;
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage serviceTitle="Explore Census by census data" description="You have picked census category {categoryId}">
  <span slot="phase-banner">
    <ONSPhaseBanner phase="ALPHA" />
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

  <ExploreByTopic />
  <hr />
  <ExploreByAreaComponent>Search for an area to find out how it compares to others</ExploreByAreaComponent>

  <ONSShare />
</BasePage>

<style lang="scss" global>
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  /* TODO: Import .SCSS breakpoints */
  /* XXX: Quick fix for now */
  @media only screen and (max-width: 600px) {
    .ons-phase-banner__desc {
      margin-top: 0;
    }

    .ons-header__title {
      margin-bottom: 10px;
    }
  }
</style>

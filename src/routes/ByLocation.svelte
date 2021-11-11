<script>
  import BasePage from "../ui/BasePage.svelte";

  import ExploreByTopic from "../ui/ExploreByTopic.svelte";
  import ExploreByAreaComponent from "../ui/ExploreByAreaComponent.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import Feedback from "../ui/Feedback.svelte";

  import ONSPhaseBanner from "../ui/ons/ONSPhaseBanner.svelte";

  export let locationId;
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage serviceTitle="Explore Census by location" description="You have picked area {locationId}">
  <span slot="phase-banner">
    <ONSPhaseBanner phase="ALPHA" />
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

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

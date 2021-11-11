<script>
  import BasePage from "../ui/BasePage.svelte";

  import ExploreByTopic from "../ui/ExploreByTopic.svelte";
  import ExploreByAreaComponent from "../ui/ExploreByAreaComponent.svelte";
  import ONSExternalHeaderWithDescription from "../ui/ons/ONSExternalHeaderWithDescription.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import Topic from "../ui/Topic.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import ONSPhaseBanner from "../ui/ons/ONSPhaseBanner.svelte";
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage>
  <span slot="phase-banner">
    <ONSPhaseBanner phase="ALPHA" />
  </span>

  <span slot="header">
    <ONSExternalHeaderWithDescription
      serviceTitle="Explore Census"
      description="Here’s a place where we tell users what the Census Atlas is and what it can do for them."
    />
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
  <hr class="component-margin--2" />
  <ExploreByAreaComponent placeholder="Walsall"
    >Search for an area to find out how it compares to others</ExploreByAreaComponent
  >

  <ONSShare url="https://www.google.com/">Share this page</ONSShare>

  <Topic topicList={[{ title: "Get Census datasests", href: "#" }]} cardTitle="Need something specific from Census?">
    Explore correlations between two indicators in <a href="#">advanced mode</a>.
  </Topic>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>

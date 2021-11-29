<script>
  import BasePage from "./../ui/BasePage.svelte";

  import ExploreByTopic from "./../ui/ExploreByTopic.svelte";
  import ExploreByAreaComponent from "./../ui/ExploreByAreaComponent.svelte";
  import ONSShare from "./../ui/ons/ONSShare.svelte";
  import Topic from "./../ui/Topic.svelte";
  import Feedback from "./../ui/Feedback.svelte";
  import ONSShareItem from "./../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "./../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "./../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "./../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "./../ui/ons/svg/ONSEmailIcon.svelte";
  import Map from "./../ui/map/Map.svelte";
  import Header from "../ui/Header.svelte";

  let autosuggestData = "https://raw.githubusercontent.com/ONSdigital/census-atlas/master/src/data/ladList.json";
  let bounds = [2.08, 55.68, -6.59, 48.53];
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <meta name="description" content="Explore 2021 census data for England and Wales at a neighbourhood level." />
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <Header
      serviceTitle="Explore Census"
      description="Here’s a place where we tell users what the Census Atlas is and what it can do for them."
    />
  </span>

  <span slot="map">
    <Map {bounds} />
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  <ExploreByTopic url="/categories" />
  <hr class="component-margin--2" />
  <ExploreByAreaComponent {autosuggestData}
    >Search for an area to find out how it compares to others</ExploreByAreaComponent
  >

  <div class="ons-u-mb-l">
    <ONSShare title="Share this page" pageURL={location.href} pageTitle={document.title} multiRow>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </div>

  <Topic topicList={[{ title: "Get Census datasests", href: "#" }]} cardTitle="Need something specific from Census?">
    Explore correlations between two indicators in <a href="#">advanced mode</a>.
  </Topic>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>

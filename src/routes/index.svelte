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
  import { indexPageSuggestions } from "../config.js";
  import { reverseLadLookup } from "../model/geography/geography";
  import { goto } from "$app/navigation";
  import {fetchSelectedDataForGeoType, mapGeographyData} from "../model/censusdata/censusdata"
  import GeodataApiDataService from "../model/censusdata/services/geodataApiDataService"


  let autosuggestData = "https://raw.githubusercontent.com/ONSdigital/census-atlas/master/src/data/ladList.json";
  let englandWalesBounds = [2.08, 55.68, -6.59, 48.53];
  let userInputValue;
  
  fetchSelectedDataForGeoType(new GeodataApiDataService(), "lad", ["QS802EW0007", "QS802EW0006","QS802EW0005"])
  $: console.log($mapGeographyData)


  function submitFunction(ladInput) {
    if (reverseLadLookup[ladInput]) {
      goto(`/area?location=${reverseLadLookup[ladInput]}`);
    }
  }
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <meta name="description" content="Explore 2021 census data for England and Wales at a neighbourhood level." />
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage mobileMap={false}>
  <span slot="header">
    <Header
      serviceTitle="Explore Census"
      description="Here’s a place where we tell users what the Census Atlas is and what it can do for them."
    />
  </span>

  <span slot="map">
    <Map bounds={englandWalesBounds} />
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  <ExploreByTopic url="/categories" suggestions={indexPageSuggestions} />
  <hr class="component-margin--2" />
  <ExploreByAreaComponent {autosuggestData} bind:userInputValue on:click={() => submitFunction(userInputValue)}
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

  <Topic topicList={[{ text: "Get Census datasests", url: "#0" }]} cardTitle="Need something specific from Census?">
    Explore correlations between two indicators in <a href="#0">advanced mode</a>.
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

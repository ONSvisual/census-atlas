<script>
  import BasePage from "./../ui/BasePage.svelte";

  import SelectTopic from "./../ui/SelectTopic.svelte";
  import SearchByAreaComponent from "./../ui/SearchByAreaComponent.svelte";
  import ONSShare from "./../ui/ons/ONSShare.svelte";
  import Feedback from "./../ui/Feedback.svelte";
  import ONSShareItem from "./../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "./../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "./../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "./../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "./../ui/ons/svg/ONSEmailIcon.svelte";
  import UseCensusData from "./../ui/UseCensusData.svelte";
  import MapWrapper from "./../ui/map/MapWrapper.svelte";
  import config from "../config";
  import { updateSelectedGeography, ladLookup } from "../model/geography/geography";
  import Header from "../ui/Header.svelte";
  import { reverseLadLookup } from "../model/geography/geography";
  import { pageUrl } from "../stores";

  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let userInputValue;
  let renderError = false;

  let locationId = $page.query.get("location");

  onMount(async () => {
    $pageUrl = "";
    if (locationId) {
      updateSelectedGeography(locationId);
    } else {
      updateSelectedGeography("");
    }
  });

  function submitFunction(ladInput) {
    if (reverseLadLookup[ladInput]) {
      goto(`/area?location=${reverseLadLookup[ladInput]}`);
    } else {
      renderError = true;
    }
  }

  function redirectOnSelect(geographyCode) {
    if (ladLookup[geographyCode]) {
      goto(`/area?location=${ladLookup[geographyCode].code}`);
    }
  }
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <meta name="description" content="Explore 2021 census data for England and Wales at a neighbourhood level." />
</svelte:head>

<BasePage mobileMap={false}>
  <span slot="header">
    <Header
      serviceTitle="Explore Census"
      description="Use our interactive map to find out how people in England and Wales answered Census 2021 questions about themselves, their health and how they live and work."
    />
  </span>

  <div class="ons-u-mb-l">
    <SearchByAreaComponent
      labelText="Enter a region, county, local council or city"
      {renderError}
      bind:userInputValue
      on:click={() => submitFunction(userInputValue)}
    />
  </div>
  <hr class="component-margin--2" />

  <span slot="map">
    <MapWrapper showDataLayer={false} bounds={config.ux.map.englandAndWalesBounds} {redirectOnSelect} />
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  <div class="ons-u-mb-xl">
    <SelectTopic suggestions={config.suggestions.indexPageSuggestions} />
  </div>

  <div class="ons-u-mb-l">
    <ONSShare title="Share this page" pageURL={location.href} pageTitle={document.title} multiRow>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </div>

  <div class="ons-u-mb-l">
    <UseCensusData showOnlyGetDataset />
  </div>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>

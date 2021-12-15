<script>
  import BasePage from "../../ui/BasePage.svelte";
  import Map from "../../ui/map/Map.svelte";
  import Topic from "../../ui/Topic.svelte";
  import ONSShare from "../../ui/ons/ONSShare.svelte";
  import UseCensusData from "../../ui/UseCensusData.svelte";
  import Feedback from "../../ui/Feedback.svelte";
  import DataHeader from "../../ui/DataHeader.svelte";
  import Header from "../../ui/Header.svelte";
  import ExploreByAreaComponent from "../../ui/ExploreByAreaComponent.svelte";
  import ONSShareItem from "../../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../../ui/ons/svg/ONSEmailIcon.svelte";
  import { page } from "$app/stores";
  import {
    getLadName,
    updateSelectedGeography,
    updateHoveredGeography,
    reverseLadLookup,
  } from "../../model/geography/geography";
  import { appIsInitialised } from "../../model/appstate";
  import { areaSelectedTopicSuggestions } from "../../config";
  import config from "../../config";
  import TileSet from "../../ui/map/TileSet.svelte";
  import InteractiveLayer from "../../ui/map/InteractiveLayer.svelte";
  import BoundaryLayer from "../../ui/map/BoundaryLayer.svelte";
  import { goto } from "$app/navigation";

  let locationName, locationId;
  let topicSuggestions;

  let autosuggestData = "https://raw.githubusercontent.com/ONSdigital/census-atlas/master/src/data/ladList.json";
  let showChangeAreaHeader = false;
  let userInputValue;
  let renderError = false;
  let invertTextColor = true;
  const toggleChangeAreaHeader = () => {
    showChangeAreaHeader = !showChangeAreaHeader;
  };

  function submitFunction(ladInput) {
    if (reverseLadLookup[ladInput]) {
      goto(`/area?location=${reverseLadLookup[ladInput]}`);
      showChangeAreaHeader = !showChangeAreaHeader;
    } else {
      renderError = true;
      invertTextColor = false;
    }
  }

  function initialisePage() {
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId);
  }

  $: appIsInitialised, $appIsInitialised && initialisePage();

  $: {
    locationId = $page.query.get("location");
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId);
    topicSuggestions = areaSelectedTopicSuggestions(locationName, locationId);
  }
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    {#if showChangeAreaHeader}
      <Header bind:showChangeAreaHeader showBackLink serviceTitle="Choose an area"
        ><ExploreByAreaComponent
          {renderError}
          {invertTextColor}
          {autosuggestData}
          header
          bind:userInputValue
          on:click={() => submitFunction(userInputValue)}
        /></Header
      >
    {:else}
      <DataHeader location={locationName} {locationId} on:click={toggleChangeAreaHeader} />
    {/if}
  </span>

  <span slot="map">
    <Map maxzoom={14}>
      <TileSet
        id="lad"
        type="vector"
        url={config.legacy.ladvector.url}
        layer={config.legacy.ladvector.layer}
        promoteId={config.legacy.ladvector.code}
      >
        <InteractiveLayer
          id="lad-interactive-layer"
          maxzoom={config.ux.map.lsoa_breakpoint}
          onSelect={(code) => {
            updateSelectedGeography(code);
          }}
          onHover={(code) => {
            updateHoveredGeography(code);
          }}
          filter={config.ux.map.filter}
        />
      </TileSet>

      <TileSet
        id="lsoa"
        type="vector"
        url={config.legacy.lsoabounds.url}
        layer={config.legacy.lsoabounds.layer}
        promoteId={config.legacy.lsoabounds.code}
        minzoom={config.ux.map.lsoa_breakpoint}
        maxzoom={config.ux.map.buildings_breakpoint}
      >
        <InteractiveLayer
          id="lsoa-boundaries"
          onSelect={(code) => {
            updateSelectedGeography(code);
          }}
          onHover={(code) => {
            updateHoveredGeography(code);
          }}
        />
      </TileSet>
      <TileSet
        id="lsoa-building"
        type="vector"
        url={config.legacy.lsoabldg.url}
        layer={config.legacy.lsoabldg.layer}
        promoteId={config.legacy.lsoabldg.code}
        minzoom={config.ux.map.buildings_breakpoint}
      />
      <TileSet
        id="lad-boundaries"
        type="vector"
        url={config.legacy.ladvector.url}
        layer={config.legacy.ladvector.layer}
        promoteId={config.legacy.ladvector.code}
      >
        <BoundaryLayer minzoom={config.ux.map.lsoa_breakpoint} id="lad-boundary-layer" />
      </TileSet>
    </Map>
  </span>

  <Topic cardTitle="{locationName}'s Census" topicList={topicSuggestions}>
    The 2021 Census tells us a lot about how people in {locationName} live and work.
    <a href="/categories?location={locationId}">Choose a data option from the full list</a> or explore one of these topics.
  </Topic>

  <div class="ons-u-mb-l">
    <UseCensusData location={locationName} />
  </div>

  <div class="ons-u-mb-l">
    <ONSShare>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </div>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>
</BasePage>

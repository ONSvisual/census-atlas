<script>
  import { afterUpdate, onMount } from "svelte";
  import BasePage from "../../ui/BasePage.svelte";
  import MapWrapper from "../../ui/map/MapWrapper.svelte";
  import Topic from "../../ui/Topic.svelte";
  import ONSShare from "../../ui/ons/ONSShare.svelte";
  import UseCensusData from "../../ui/UseCensusData.svelte";
  import Feedback from "../../ui/Feedback.svelte";
  import HeaderWrapper from "../../ui/HeaderWrapper.svelte";
  import ONSShareItem from "../../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../../ui/ons/svg/ONSEmailIcon.svelte";
  import ExploreSomethingElseNav from "../../ui/ExploreSomethingElseNav/ExploreSomethingElseNav.svelte";
  import { getLadName, updateSelectedGeography, selectedGeography } from "../../model/geography/geography";
  import { appIsInitialised } from "../../model/appstate";
  import { areaSelectedTopicSuggestions } from "../../config";
  import { pageUrl } from "../../stores";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import {
    tables,
    dataByGeography,
    fetchSelectedDataForGeographies,
    getCategoryBySlug,
  } from "../../model/censusdata/censusdata";
  import GeodataApiDataService from "../../model/censusdata/services/geodataApiDataService";
  import config from "../../config";

  let locationName, locationId, header;
  let topicSuggestions;
  let geoCode;
  let allPeopleTotal = "";
  let allHouseholdsTotal = "";
  let loading = false;
  let success = false;
  let housingTable;
  let peopleTable;
  let retries = 0;
  let showChangeAreaHeader = false;

  onMount(async () => {
    $pageUrl = "";
  });

  const fetch = async () => {
    loading = true;
    await fetchSelectedDataForGeographies(
      new GeodataApiDataService(),
      geoCode,
      [...housingTable.categories, ...peopleTable.categories, housingTable.total, peopleTable.total],
      config.stores.overwrite,
    )
      .then(() => (success = true))
      .catch(() => {
        loading = false;
        retries += 1;
      });
  };

  afterUpdate(async () => {
    geoCode = $page.query.get("location");
    const peopleCategory = getCategoryBySlug("ethnicity", "asian-asian-british-indian");
    const housingCategory = getCategoryBySlug("size-of-household", "1-person-household");
    peopleTable = peopleCategory ? tables[peopleCategory.table] : null;
    housingTable = housingCategory ? tables[housingCategory.table] : null;
  });

  $: retries < 3 ? !loading && peopleTable && housingTable && fetch() : (loading = true);

  $: {
    if (geoCode && loading) {
      loading = false;
      success = false;
      peopleTable = undefined;
      housingTable = undefined;
      retries = 0;
    }
  }

  $: if (success && $dataByGeography.has(geoCode)) {
    allHouseholdsTotal = $dataByGeography.get(geoCode).get(housingTable.categories[0])["total"].toLocaleString();
    allPeopleTotal = $dataByGeography.get(geoCode).get(peopleTable.categories[0])["total"].toLocaleString();
  }

  function initialisePage() {
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId);
  }

  $: appIsInitialised, $appIsInitialised && initialisePage();

  $: {
    locationId = $page.query.get("location");
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId) ? getLadName(locationId) : "England and Wales";
    topicSuggestions = areaSelectedTopicSuggestions(locationName, locationId);
  }
  $: {
    if ($selectedGeography.lad) {
      $page.query.set("location", $selectedGeography.lad);
      goto(`?${$page.query.toString()}`);
      locationId = $page.query.get("location");
      locationName = getLadName(locationId);
    }
  }
</script>

<svelte:head>
  <title>2021 Census Data Atlas | {locationName} Census</title>
</svelte:head>

<BasePage>
  <span slot="header" bind:this={header}>
    <HeaderWrapper
      serviceTitle={locationName}
      {locationId}
      bind:showChangeAreaHeader
      changeAreaBaseUrl="/area"
      renderEnglandWalesData={false}
    />
  </span>

  <span slot="map">
    <MapWrapper showDataLayer={false} />
  </span>

  <Topic cardTitle="Explore {locationName}" topicList={topicSuggestions}>
    <div class="ons-grid explore-container">
      <div class="ons-grid__col ons-col-6@m">
        <div class="ons-pl-grid-col">
          <h3 class="ons-u-fs-s explore-sub-title">All people (usual residents)</h3>
          <p class="ons-u-fs-l explore-data">{allPeopleTotal}</p>
        </div>
      </div>
      <div class="ons-grid__col ons-col-6@m">
        <div class="ons-pl-grid-col">
          <h3 class="ons-u-fs-s explore-sub-title">All households</h3>
          <p class="ons-u-fs-l explore-data">{allHouseholdsTotal}</p>
        </div>
      </div>
    </div>
    <p>The 2021 Census tells us a lot about how people in {locationName} live and work.</p>
    <p>
      <a href="/topics{locationId ? `?location=${locationId}` : ''}">Choose a topic from the full list</a> or explore one
      of these suggestions.
    </p>
  </Topic>

  <div class="ons-u-mb-l">
    <UseCensusData />
  </div>

  <div class="ons-u-mb-l">
    <ONSShare>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </div>

  <div class="ons-u-mb-l">
    <ExploreSomethingElseNav
      firstLink={{ text: "Choose a topic", url: locationId ? `/topics?location=${locationId}` : "/topics" }}
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeAreaHeader = true), header.scrollIntoView())}
    />
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

<style>
  .explore-container {
    margin-bottom: 1.6rem;
  }
  .explore-sub-title {
    margin-bottom: unset;
  }
  .explore-data {
    margin-bottom: unset;
  }
</style>

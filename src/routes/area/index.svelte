<script>
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
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

  let locationName, locationId;
  let topicSuggestions;
  let geoCode;
  let allPeopleTotal = "";
  let allHouseholdsTotal = "";
  let loading = true;

  onMount(async () => {
    $pageUrl = $page.path;
  });

  /* Fix reactivity */
  const fetchData = async (geo, codes) => {
    await fetchSelectedDataForGeographies(new GeodataApiDataService(), geo, codes, config.stores.overwrite);
    loading = false;
  };

  afterUpdate(async () => {
    loading = true;
    geoCode = $page.query.get("location");
    const peopleCategory = getCategoryBySlug("sex", "female");
    const peopleTable = peopleCategory ? tables[peopleCategory.table] : null;
    const peopleCatCode = peopleTable?.total;
    const housingCategory = getCategoryBySlug("size-of-household", "1-person-household");
    const housingTable = housingCategory ? tables[housingCategory.table] : null;
    const housingCatCode = housingTable?.total;
    if (loading && peopleTable && housingTable) {
      fetchData(geoCode, [...housingTable.categories, ...peopleTable.categories, housingCatCode, peopleCatCode]);
    }
    if ($dataByGeography.has(geoCode)) {
      console.log($dataByGeography.has(geoCode));
      allHouseholdsTotal = $dataByGeography.get(geoCode).get("QS406EW0002")["total"].toLocaleString();
      allPeopleTotal = $dataByGeography.get(geoCode).get("QS104EW0002")["total"].toLocaleString();
    }
  });

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
  <span slot="header">
    <HeaderWrapper {locationName} {locationId} />
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
      <a href="/categories{locationId ? `?location=${locationId}` : ''}">Choose a category from the full list</a> or explore
      one of these topics.
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

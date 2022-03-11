<script>
  import BasePage from "../../../ui/BasePage.svelte";
  import MapWrapper from "../../../ui/map/MapWrapper.svelte";
  import Topic from "../../../ui/Topic.svelte";
  import ONSShare from "../../../ui/ons/ONSShare.svelte";
  import ONSShareItem from "../../../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../../../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../../../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../../../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../../../ui/ons/svg/ONSEmailIcon.svelte";
  import CategorySelector from "../../../ui/CategorySelector/CategorySelector.svelte";
  import CensusTableByLocation from "../../../ui/CensusTableByLocation.svelte";
  import ExploreSomethingElseNav from "../../../ui/ExploreSomethingElseNav/ExploreSomethingElseNav.svelte";
  import UseCensusData from "../../../ui/UseCensusData.svelte";
  import Feedback from "../../../ui/Feedback.svelte";
  import HeaderWrapper from "../../../ui/HeaderWrapper.svelte";
  import MapKey from "../../../ui/MapKey/MapKey.svelte";
  import Navigation from "../../../ui/Navigation/Navigation.svelte";
  import {
    returnNeighbouringLad,
    fetchMapDataForSelectedCat,
    lazyLoadFullTableMapData,
    updateMap,
    populateSelectedCatAndLocationCard,
  } from "../../../utils";
  import {
    tables,
    getCategoryBySlug,
    fetchSelectedDataForGeographies,
    censusTableStructureIsLoaded,
    englandAndWalesData,
    fetchSelectedDataForWholeBoundingBox,
    dataByGeography,
    newDataByGeography,
  } from "../../../model/censusdata/censusdata";
  import GeodataApiDataService from "../../../model/censusdata/services/geodataApiDataService";
  import { updateSelectedGeography, getLadName, selectedGeography } from "../../../model/geography/geography";
  import config from "../../../config";
  import { appIsInitialised } from "../../../model/appstate";
  import { pageUrl } from "../../../stores";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { beforeUpdate, onMount } from "svelte";
  import { mapZoomBBox } from "../../../model/geography/stores";
  import ChangeLocation from "../../../ui/ChangeLocation/ChangeLocation.svelte";
  import { isCatDataFetchedForGeoCode } from "../../../model/utils";

  let { topicSlug, tableSlug, categorySlug } = $page.params;
  let category = null;
  let table = null;
  let totalCatCode = "";
  let geoCode, neighbouringLad, header;
  let tableDataFetched = false;
  let locationName = "";
  let selectedCatMapDataFetched,
    showChangeAreaHeader = false;
  let showCategorySelector = false;
  let showChangeLocation = false;

  $: innerWidth = 0;

  beforeUpdate(() => {
    showCategorySelector = category && tables[category.table].categoriesArray && innerWidth < config.ux.deviceWidth;
  });
  let cardParas;

  let locationId = $page.query.get("location");

  onMount(async () => {
    $pageUrl = $page.path + (locationId ? `?location=${locationId}` : "");
    if (locationId) {
      updateSelectedGeography(locationId);
      locationName = getLadName(locationId);
    }
  });

  $: {
    locationId = $page.query.get("location");
    geoCode = $page.query.get("location") ? $page.query.get("location") : config.eAndWGeoCode;
    categorySlug = $page.params.categorySlug;
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId);
    $pageUrl = $page.path + (locationId ? `?location=${locationId}` : "");
  }

  $: {
    if ($selectedGeography.lad) {
      $page.query.set("location", $selectedGeography.lad);
      goto(`?${$page.query.toString()}`);
      locationId = $page.query.get("location");
      geoCode = locationId;
      locationName = getLadName(locationId);
    }
  }
  $: category = getCategoryBySlug(tableSlug, categorySlug);

  $: geoCode,
    $appIsInitialised && locationId && (neighbouringLad = returnNeighbouringLad(locationId)),
    fetchSelectedDataset();
  $: categorySlug,
    $appIsInitialised && (updateMap(category), ($pageUrl = $page.path + (locationId ? `?location=${locationId}` : "")));

  // temporary line to load some data
  $: appIsInitialised, $appIsInitialised && $censusTableStructureIsLoaded && (initialisePage(), fetchSelectedDataset());

  $: {
    if ($appIsInitialised && $mapZoomBBox != null && category) {
      fetchSelectedDataForWholeBoundingBox(
        new GeodataApiDataService(),
        "lsoa",
        [category.code, totalCatCode],
        $mapZoomBBox,
      );
    }
  }

  const initialisePage = () => {
    if (locationId != null) {
      neighbouringLad = returnNeighbouringLad(locationId);
    }
    category = getCategoryBySlug(tableSlug, categorySlug);
    table = category ? tables[category.table] : null;
    totalCatCode = table.total;
    fetchMapDataForSelectedCat(category.code, totalCatCode);
    selectedCatMapDataFetched = true;
    locationName = getLadName(locationId);
  };

  $: selectedCatMapDataFetched,
    selectedCatMapDataFetched &&
      $appIsInitialised &&
      (lazyLoadFullTableMapData(category.code, totalCatCode), (selectedCatMapDataFetched = false));

  const fetchSelectedDataset = async () => {
    tableDataFetched = false;
    if (table) {
      if (neighbouringLad) {
        await fetchSelectedDataForGeographies(
          new GeodataApiDataService(),
          [geoCode, neighbouringLad.code],
          [...table.categories, totalCatCode],
          config.stores.overwrite,
        );
      } else {
        await fetchSelectedDataForGeographies(
          new GeodataApiDataService(),
          geoCode,
          [...table.categories, totalCatCode],
          config.stores.overwrite,
        );
      }
      tableDataFetched = true;
    }
  };

  $: $newDataByGeography,
    category &&
      geoCode &&
      table &&
      (cardParas = populateSelectedCatAndLocationCard(geoCode, category, locationName, table));
</script>

<svelte:head>
  <title>2021 Census Data Atlas | {table ? table.name : ""} in {locationName || "England and Wales"}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<BasePage>
  <span slot="header" bind:this={header}>
    {#if !showCategorySelector}
      {#if showChangeLocation}
        <ChangeLocation
          {locationId}
          {categorySlug}
          changeAreaBaseUrl="/{topicSlug}/{tableSlug}/{categorySlug}"
          onClose={() => (showChangeLocation = !showChangeLocation)}
        />
      {:else}
        <!-- new header - ticket 359 -->
        <Navigation
          {locationId}
          {topicSlug}
          {tableSlug}
          {categorySlug}
          onClick={() => (showChangeLocation = !showChangeLocation)}
        />
      {/if}
    {/if}
  </span>

  <span slot="map">
    <!-- Hides the map if the ChangeLocation component is open (only for mobile)-->
    {#if innerWidth < config.ux.deviceWidth && !showChangeLocation}
      <div class="mapkey">
        <MapKey />
      </div>
      <MapWrapper {category} showDataLayer={true} />
    {:else if innerWidth >= config.ux.deviceWidth}
      <div class="mapkey">
        <MapKey />
      </div>
      <MapWrapper {category} showDataLayer={true} />
    {/if}
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  {#if showCategorySelector}
    {#if showChangeLocation}
      <ChangeLocation {locationId} {categorySlug} onClose={() => (showChangeLocation = !showChangeLocation)} isMobile />
    {:else}
      <CategorySelector
        tableName={table ? table.name : null}
        {locationId}
        {topicSlug}
        {tableSlug}
        categories={tables[category.table].categoriesArray}
        selectedCategory={category}
      />
      <Navigation
        {locationId}
        {topicSlug}
        {tableSlug}
        {categorySlug}
        onClick={() => (showChangeLocation = !showChangeLocation)}
        isMobile
      />
    {/if}
  {/if}

  {#if cardParas}
    <Topic cardTitle="{category.name} in {locationName || 'England & Wales'}">
      <p>
        {cardParas.para1}
      </p>
      <p>
        {cardParas.para2}
      </p>
      {#if cardParas.para3}
        <p>
          {cardParas.para3}
        </p>
      {/if}
    </Topic>
  {/if}

  {#if table && tableDataFetched}
    <div class="ons-u-mb-s">
      <CensusTableByLocation {table} {geoCode} {locationId} />
    </div>
  {/if}

  <div class="ons-u-mb-l">
    <hr class="separator separator__top" />
    <UseCensusData displayTitle={false} />
    <hr class="separator separator__bottom" />
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
      firstLink={{
        text: "New category",
        url: locationId
          ? `/topics/${topicSlug}/${tableSlug}/${categorySlug}?location=${locationId}`
          : `/topics/${topicSlug}/${tableSlug}/${categorySlug}`,
      }}
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeLocation = true), console.log(header), header.scrollIntoView())}
    />
  </div>
</BasePage>

<style lang="scss">
  @import "../../../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .current-data {
    background: #e5e5e5;
    padding: 8px 16px;
    margin: 0 -1rem 1rem;
    font-size: 13px;
    line-height: 18px;
    color: #222222;
  }

  .mapkey {
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
    float: right;
    @media (min-width: map-get($grid-bp, s)) {
      bottom: auto;
      top: 120px;
    }
  }

  .separator {
    margin: 0.5rem 0 0.5rem;
  }
  .separator__top {
    border-top: 1px solid #bcbcbd;
  }
  .separator__bottom {
    border-top: 3px solid #222222;
  }
</style>

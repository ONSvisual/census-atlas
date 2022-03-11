<script>
  import BasePage from "../../../ui/BasePage.svelte";
  import MapWrapper from "../../../ui/map/MapWrapper.svelte";
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
  import DataComparison from "../../../ui/DataComparison/DataComparison.svelte";
  import { returnNeighbouringLad, fetchMapDataForSelectedCat, lazyLoadFullTableMapData } from "../../../utils";
  import {
    tables,
    getCategoryBySlug,
    fetchSelectedDataForGeographies,
    fetchSelectedDataForGeoType,
    censusTableStructureIsLoaded,
    englandAndWalesData,
    fetchSelectedDataForWholeBoundingBox,
  } from "../../../model/censusdata/censusdata";
  import GeodataApiDataService from "../../../model/censusdata/services/geodataApiDataService";
  import { updateSelectedGeography, getLadName, selectedGeography } from "../../../model/geography/geography";
  import config from "../../../config";
  import { appIsInitialised } from "../../../model/appstate";
  import { fetchCensusDataBreaks, reverseTotalCatCodeLookup } from "../../../model/metadata/metadata";
  import MetadataApiDataService from "../../../model/metadata/services/metadataApiDataService";
  import { updateMap } from "../../../utils";
  import { pageUrl } from "../../../stores";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { beforeUpdate, onMount } from "svelte";
  import { mapZoomBBox } from "../../../model/geography/stores";

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
  $: innerWidth = 0;

  beforeUpdate(() => {
    showCategorySelector = category && tables[category.table].categoriesArray && innerWidth < config.ux.deviceWidth;
  });

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
</script>

<svelte:head>
  <title>2021 Census Data Atlas | {table ? table.name : ""} in {locationName || "England and Wales"}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<BasePage>
  <span slot="header" bind:this={header}>
    <HeaderWrapper
      {locationName}
      {locationId}
      {topicSlug}
      {tableSlug}
      {categorySlug}
      tableName={table ? table.name : null}
      changeAreaBaseUrl="/{topicSlug}/{tableSlug}/{categorySlug}"
      bind:showChangeAreaHeader
    />
  </span>

  <span slot="map">
    <div class="mapkey">
      <MapKey />
    </div>
    <MapWrapper {category} showDataLayer={true} />
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
    <CategorySelector
      tableName={table ? table.name : null}
      {locationId}
      {topicSlug}
      {tableSlug}
      categories={tables[category.table].categoriesArray}
      selectedCategory={category}
    />
  {/if}

  <div class="current-data">Showing Census 2011 map data.</div>

  {#if geoCode != config.eAndWGeoCode && category}
    <div class="ons-grid">
      {#if tableDataFetched}
        {#if $englandAndWalesData.size > 0}
          <div class="ons-grid__col ons-col-6@xxs">
            <DataComparison comparatorGeoCode={config.eAndWGeoCode} {geoCode} catCode={category.code} />
          </div>
        {/if}
        {#if neighbouringLad}
          <div class="ons-grid__col ons-col-6@xxs">
            <DataComparison
              comparatorGeoCode={neighbouringLad.code}
              comparatorGeoName={neighbouringLad.name}
              {geoCode}
              catCode={category.code}
            />
          </div>
        {/if}
      {/if}
    </div>
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
        url: locationId ? `/topics/${topicSlug}?location=${locationId}` : `/topics/${topicSlug}`,
      }}
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeAreaHeader = true), header.scrollIntoView())}
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

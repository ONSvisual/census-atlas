<script>
  import BasePage from "../../../ui/BasePage.svelte";

  import Map from "../../../ui/map/Map.svelte";
  import Topic from "../../../ui/Topic.svelte";
  import ONSShare from "../../../ui/ons/ONSShare.svelte";
  import ONSShareItem from "../../../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../../../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../../../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../../../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../../../ui/ons/svg/ONSEmailIcon.svelte";
  import CategorySelector from "../../../ui/CategorySelector/CategorySelector.svelte";
  import CensusTableByLocation from "../../../ui/CensusTableByLocation.svelte";
  import UseCensusData from "../../../ui/UseCensusData.svelte";
  import Feedback from "../../../ui/Feedback.svelte";
  import HeaderWrapper from "../../../ui/HeaderWrapper.svelte";
  import MapKey from "../../../ui/MapKey/MapKey.svelte";
  import DataComparison from "../../../ui/DataComparison/DataComparison.svelte";
  import metadata from "../../../data/apiMetadata";
  import { filterSelectedTable, returnNeighbouringLad, populateSelectedCatData } from "../../../utils";

  import {
    categoryDataIsLoaded,
    categoryData,
    fetchCensusData,
    tables,
    getCategoryBySlug,
    populatesSelectedData,
    selectedData,
    dataByGeography,
    fetchSelectedDataForGeographies,
  } from "../../../model/censusdata/censusdata";
  import GeodataApiDataService from "../../../model/censusdata/services/geodataApiDataService";
  import LegacyCensusDataService from "../../../model/censusdata/services/legacyCensusDataService";
  import { updateHoveredGeography, updateSelectedGeography, getLadName } from "../../../model/geography/geography";
  import config from "../../../config";
  import TileSet from "../../../ui/map/TileSet.svelte";
  import InteractiveLayer from "../../../ui/map/InteractiveLayer.svelte";
  import BoundaryLayer from "../../../ui/map/BoundaryLayer.svelte";
  import DataLayer from "../../../ui/map/DataLayer.svelte";
  import { appIsInitialised } from "../../../model/appstate";
  import { fetchCensusDataBreaks } from "../../../model/metadata/metadata";
  import MetadataApiDataService from "../../../model/metadata/services/metadataApiDataService";
  import {
    isNotEmpty,
    dbColumnToCategoryId,
    processData,
    calculateComparisonDiff,
    updateMapAndComparisons,
  } from "../../../utils";
  import { pageUrl } from "../../../stores";

  import { selectedGeography } from "../../../model/geography/geography";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let { topicSlug, tableSlug, categorySlug } = $page.params;
  let category = null;
  let table = null;
  let populateCensusTable = { categories: [] };
  let totalCatCode = "";
  let geoCode, neighbouringLad;
  let comparisons,
    selectedCatData = {};

  let locationName = "";

  let locationId = $page.query.get("location");

  let categoryCodesArr = [];

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

  $: geoCode,
    $appIsInitialised && locationId && (neighbouringLad = returnNeighbouringLad(locationId)),
    fetchSelectedDataset();
  $: categorySlug,
    ((comparisons = updateMapAndComparisons(tableSlug, categorySlug, metadata, geoCode, neighbouringLad)),
    (selectedCatData = populateSelectedCatData(geoCode, totalCatCode, tableSlug, categorySlug))),
    ($pageUrl = $page.path + (locationId ? `?location=${locationId}` : ""));

  // temporary line to load some data
  $: appIsInitialised, $appIsInitialised && initialisePage(), fetchSelectedDataset();

  const initialisePage = async () => {
    if (locationId != null) {
      neighbouringLad = returnNeighbouringLad(locationId);
    }
    category = getCategoryBySlug(tableSlug, categorySlug);
    table = category ? filterSelectedTable(metadata, category) : null;
    populatesSelectedData(table.name, table.categories, category.code, table.total.code);
    fetchCensusData(new LegacyCensusDataService(), dbColumnToCategoryId(category.code), null);
    if (isNotEmpty($selectedData)) {
      totalCatCode = table.total.code;
      categoryCodesArr.push(totalCatCode);
      $selectedData.tableCategories.forEach((category) => {
        populateCensusTable["categories"].push({ code: category.code, name: category.name });
        categoryCodesArr.push(category.code);
      });
    }
    locationName = getLadName(locationId);
    fetchCensusDataBreaks(new MetadataApiDataService(), category.code, totalCatCode, 5);
  };

  const fetchSelectedDataset = async () => {
    if (categoryCodesArr.length > 0) {
      if (neighbouringLad) {
        await fetchSelectedDataForGeographies(
          new GeodataApiDataService(),
          [geoCode, neighbouringLad.code],
          categoryCodesArr,
        );
      } else {
        await fetchSelectedDataForGeographies(new GeodataApiDataService(), geoCode, categoryCodesArr);
      }
    }
    if ($dataByGeography.get(geoCode)) {
      populateCensusTable = processData($dataByGeography.get(geoCode), populateCensusTable, totalCatCode);
      selectedCatData = populateSelectedCatData(geoCode, totalCatCode, tableSlug, categorySlug);
      if (geoCode != config.eAndWGeoCode) {
        comparisons.eAndWDiff = calculateComparisonDiff(geoCode, config.eAndWGeoCode, totalCatCode, category);
        if (neighbouringLad && $dataByGeography.get(neighbouringLad.code)) {
          comparisons.neighbouringLadDiff = calculateComparisonDiff(
            geoCode,
            neighbouringLad.code,
            totalCatCode,
            category,
          );
        }
      }
    }
  };
</script>

<svelte:head>
  <title>2021 Census Data Atlas Category & Location</title>
</svelte:head>

<BasePage>
  <span slot="header">
    <HeaderWrapper
      {locationName}
      {locationId}
      {topicSlug}
      {tableSlug}
      {categorySlug}
      tableName={table ? table.name : null}
    />
  </span>

  <span slot="map">
    <div class="mapkey">
      <MapKey />
    </div>
    <Map maxzoom={14}>
      <TileSet
        id="lad"
        type="vector"
        url={config.legacy.ladvector.url}
        layer={config.legacy.ladvector.layer}
        promoteId={config.legacy.ladvector.code}
      >
        {#if $categoryDataIsLoaded}
          <DataLayer id="lad-data-zoom" data={categoryData} maxzoom={config.ux.map.lsoa_breakpoint} />
        {/if}
        <InteractiveLayer
          id="lad-interactive-layer"
          selected={$selectedGeography.lad}
          maxzoom={config.ux.map.buildings_breakpoint}
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
        {#if $categoryDataIsLoaded}
          <DataLayer id="lsoa-data" data={categoryData} />
        {/if}
      </TileSet>
      <TileSet
        id="lsoa-building"
        type="vector"
        url={config.legacy.lsoabldg.url}
        layer={config.legacy.lsoabldg.layer}
        promoteId={config.legacy.lsoabldg.code}
        minzoom={config.ux.map.buildings_breakpoint}
      >
        {#if $categoryDataIsLoaded}
          <DataLayer id="lsoa-data-zoom" data={categoryData} />
        {/if}
      </TileSet>
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

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  {#if isNotEmpty($selectedData) && selectedCatData}
    <CategorySelector
      {locationId}
      {topicSlug}
      {tableSlug}
      categories={$selectedData.tableCategories}
      selectedCategory={$selectedData.categorySelected}
      {selectedCatData}
    />
  {/if}

  <div class="current-data">Showing Census 2011 map data.</div>

  {#if geoCode != config.eAndWGeoCode}
    <div class="ons-grid">
      <div class="ons-grid__col ons-col-6@xxs">
        <DataComparison difference={comparisons.eAndWDiff} />
      </div>
      {#if neighbouringLad}
        <div class="ons-grid__col ons-col-6@xxs">
          <DataComparison difference={comparisons.neighbouringLadDiff} comparator={neighbouringLad.name} />
        </div>
      {/if}
    </div>
  {/if}

  <CensusTableByLocation {populateCensusTable} {locationId} {totalCatCode} {categoryCodesArr} />

  <Topic cardTitle="General health with other indicators"
    >Explore correlations between two indicators in <a href="#">advanced mode</a>.
  </Topic>

  <div class="ons-u-mb-l">
    <UseCensusData location={categorySlug} />
  </div>

  <div class="ons-u-mb-l">
    <ONSShare>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
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
</style>

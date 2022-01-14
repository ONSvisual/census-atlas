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
  import CategorySelector from "../../../ui/CategorySelector.svelte";
  import CensusTableByLocation from "../../../ui/CensusTableByLocation.svelte";
  import UseCensusData from "../../../ui/UseCensusData.svelte";
  import Feedback from "../../../ui/Feedback.svelte";
  import HeaderWrapper from "../../../ui/HeaderWrapper.svelte";
  import MapLegend from "../../../ui/MapLegend/MapLegend.svelte";

  import {
    categoryDataIsLoaded,
    categoryData,
    fetchCensusData,
    tables,
    getCategoryBySlug,
    populatesSelectedData,
    selectedData,
  } from "../../../model/censusdata/censusdata";
  import LegacyCensusDataService from "../../../model/censusdata/services/legacyCensusDataService";
  import { updateHoveredGeography, updateSelectedGeography, getLadName } from "../../../model/geography/geography";
  import config from "../../../config";
  import TileSet from "../../../ui/map/TileSet.svelte";
  import InteractiveLayer from "../../../ui/map/InteractiveLayer.svelte";
  import BoundaryLayer from "../../../ui/map/BoundaryLayer.svelte";
  import DataLayer from "../../../ui/map/DataLayer.svelte";
  import { appIsInitialised } from "../../../model/appstate";
  import { isNotEmpty, categoryIDToDBColumn, categoryIDToDBTotalsColumn } from "../../../utils";
  import { selectedGeography } from "../../../model/geography/geography";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let { topicSlug, tableSlug, categorySlug } = $page.params;
  let category = null;
  let table = null;
  let populateCensusTable = { categories: [] };
  let totalCatCode = "";

  let locationName = "";

  let locationId = $page.query.get("location");

  //if no location in url, set geoCode to England & Wales
  let geoCode = $page.query.get("location") ? $page.query.get("location") : "K04000001";
  let categoryCodesArr = [];

  onMount(async () => {
    if (locationId) {
      updateSelectedGeography(locationId);
      locationName = getLadName(locationId);
    }
  });

  $: {
    locationId = $page.query.get("location");
    geoCode = $page.query.get("location") ? $page.query.get("location") : "K04000001";
    categorySlug = $page.params.categorySlug;
    updateSelectedGeography(locationId);
    locationName = getLadName(locationId);
  }

  $: {
    if ($selectedGeography.lad) {
      $page.query.set("location", $selectedGeography.lad);
      goto(`?${$page.query.toString()}`);
      locationId = $page.query.get("location");
      locationName = getLadName(locationId);
    }
  }

  // temporary line to load some data
  $: appIsInitialised, $appIsInitialised && initialisePage();

  const initialisePage = () => {
    category = getCategoryBySlug(tableSlug, categorySlug);
    table = category ? tables[category.table] : null;
    populatesSelectedData(table.name, table.categoriesArray, category.code);
    fetchCensusData(new LegacyCensusDataService(), category.code, null);
    if (isNotEmpty($selectedData)) {
      totalCatCode = categoryIDToDBTotalsColumn($selectedData.categorySelected);
      categoryCodesArr = $selectedData.tableCategories.map((category, i) => {
        const dbCategoryCode = categoryIDToDBColumn(category.code);
        populateCensusTable["categories"][i] = { code: dbCategoryCode, name: category.name };
        return dbCategoryCode;
      });
      categoryCodesArr.push(totalCatCode);
    }
    locationName = getLadName(locationId);
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

    {#if isNotEmpty($selectedData)}
      <CategorySelector
        {locationId}
        {topicSlug}
        {tableSlug}
        categories={$selectedData.tableCategories}
        selectedCategory={$selectedData.categorySelected}
      />
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
        {#if $categoryDataIsLoaded}
          <DataLayer id="lad-data-zoom" data={categoryData} maxzoom={config.ux.map.lsoa_breakpoint} />
        {/if}
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
        {#if $categoryDataIsLoaded}
          <DataLayer id="lsoa-data" data={categoryData} />
        {/if}
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

  <div class="map-legend">
    <!-- 
    TODO
    - breaks - API?
    - value - category.value?
    - average: England & Wales only
    -->
    <MapLegend value={34.5} breaks={[0, 1.5, 3.7, 40, 48.4, 94.8]} average={42} />
  </div>

  <CensusTableByLocation {populateCensusTable} {geoCode} {totalCatCode} {categoryCodesArr} />

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

  .map-legend {
    margin-bottom: 24px;
  }

  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

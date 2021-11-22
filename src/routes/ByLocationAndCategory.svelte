<script>
  import BasePage from "../ui/BasePage.svelte";

  import Map from "../ui/map/Map.svelte";
  import Topic from "../ui/Topic.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import CategorySelector from "../ui/CategorySelector.svelte";
  import CensusTableByLocation from "../ui/CensusTableByLocation.svelte";
  import UseCensusData from "../ui/UseCensusData.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import HeaderData1 from "../ui/HeaderData1.svelte";
  import {categoryDataIsLoaded, categoryData, fetchCensusData} from "../model/censusdata/censusdata";
  import {updateHoveredGeography, updateSelectedGeography, loadingGeography} from "../model/geography/geography";
  import config from "../config"
  import TileSet from "../ui/map/TileSet.svelte";
  import InteractiveLayer from "../ui/map/InteractiveLayer.svelte";
  import DataLayer from "../ui/map/DataLayer.svelte";
  import {appIsInitialised} from "../model/appstate";

  export let categoryId;
  export let locationId;

  // temporary line to load some data
  $: appIsInitialised, $appIsInitialised && fetchCensusData("QS119EW005", null)
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <HeaderData1 indicator={categoryId} region={locationId}/>
    <CategorySelector/>
  </span>

  <span slot="map">
    <Map maxzoom={14}>
        <TileSet id="lad"
                 type="vector"
                 url={config.legacy.ladvector.url}
                 layer={config.legacy.ladvector.layer}
                 promoteId={config.legacy.ladvector.code}
                 maxzoom={config.ux.map.lsoa_breakpoint}>
          {#if $categoryDataIsLoaded}
            <DataLayer id="lad-data-zoom" data={categoryData}/>
          {/if}
          <InteractiveLayer id="lad-interactive-layer" maxzoom={config.ux.map.lsoa_breakpoint}
                            onSelect={(code)=>{updateSelectedGeography(code)}}
                            onHover={(code)=>{updateHoveredGeography(code)}}
          />
        </TileSet>
      
        <TileSet id="lsoa" type="vector"
                 url={config.legacy.lsoabounds.url}
                 layer={config.legacy.lsoabounds.layer}
                 promoteId={config.legacy.lsoabounds.code}
                 minzoom={config.ux.map.lsoa_breakpoint}
                 maxzoom={config.ux.map.buildings_breakpoint}>
          
          {#if $categoryDataIsLoaded}
            <DataLayer id="lsoa-data" data={categoryData}/>
          {/if}
          <InteractiveLayer id="lsoa-boundaries"
                            onSelect={(code)=>{updateSelectedGeography(code)}}
                            onHover={(code)=>{updateHoveredGeography(code)}}
          />

        </TileSet>
        <TileSet id="lsoa-building"
                 type="vector"
                 url={config.legacy.lsoabldg.url}
                 layer={config.legacy.lsoabldg.layer}
                 promoteId={config.legacy.lsoabldg.code}
                 minzoom={config.ux.map.buildings_breakpoint}>
          {#if $categoryDataIsLoaded}
            <DataLayer id="lsoa-data-zoom" data={categoryData}/>
          {/if}
        </TileSet>
        
    </Map>
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container"/>
        <Feedback/>
      </div>
    </footer>
  </span>

  <img src="/img/tmp-table-overview-mockup.png" class="tmp-placeholder"/>

  <CensusTableByLocation/>

  <Topic cardTitle="General health with other indicators"
  >Explore correlations between two indicators in <a href="#">advanced mode</a>.
  </Topic
  >

  <UseCensusData location={categoryId}/>

  <ONSShare/>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

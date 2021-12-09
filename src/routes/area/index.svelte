<script>
  import BasePage from "../../ui/BasePage.svelte";
  import Map from "../../ui/map/Map.svelte";
  import Topic from "../../ui/Topic.svelte";
  import ONSShare from "../../ui/ons/ONSShare.svelte";
  import UseCensusData from "../../ui/UseCensusData.svelte";
  import Feedback from "../../ui/Feedback.svelte";
  import DataHeader from "../../ui/DataHeader.svelte";
  import ONSShareItem from "../../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../../ui/ons/svg/ONSEmailIcon.svelte";
  import { page } from "$app/stores";
  import {getLadName} from "../../model/geography/geography"
  import { appIsInitialised } from "../../model/appstate";

  const locationId = $page.query.get("location");
  let locationName

  function initialisePage(){
    locationName = getLadName(locationId)
  }
  
  $: appIsInitialised, $appIsInitialised && initialisePage()
</script>

<svelte:head>
  <title>2021 Census Data Atlas</title>
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <DataHeader location={locationName} />
  </span>

  <span slot="map">
    <Map maxzoom={14} />
  </span>

  <Topic cardTitle="test">
    The 2021 Census tells us a lot about the health of people living in England and Wales live and.
    <a href="#0">Choose a data option from the full list</a> or explore one of these suggestions.
  </Topic>

  <div class="ons-u-mb-l">
    <UseCensusData location={"test"} />
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

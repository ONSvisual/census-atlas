<script>
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
  import { onMount } from "svelte";

  let locationName, locationId, header;
  let topicSuggestions;
  let showChangeAreaHeader = false;

  onMount(async () => {
    $pageUrl = $page.path;
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
  <span slot="header" bind:this={header}>
    <HeaderWrapper {locationName} {locationId} bind:showChangeAreaHeader changeAreaBaseUrl="/area" />
  </span>

  <span slot="map">
    <MapWrapper showDataLayer={false} />
  </span>

  <Topic cardTitle="{locationName}'s Census" topicList={topicSuggestions}>
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

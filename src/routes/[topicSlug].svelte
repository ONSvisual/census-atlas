<script context="module">
  export function load({ page }) {
    return {
      props: {
        topicSlug: page.params.topicSlug,
      },
    };
  }
</script>

<script>
  import BasePage from "../ui/BasePage.svelte";

  import MapWrapper from "../ui/map/MapWrapper.svelte";

  import Topic from "../ui/Topic.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import ONSShareItem from "../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../ui/ons/svg/ONSEmailIcon.svelte";
  import ExploreSomethingElseNav from "../ui/ExploreSomethingElseNav/ExploreSomethingElseNav.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import HeaderWrapper from "../ui/HeaderWrapper.svelte";
  import { topicSuggestions } from "../config";
  import slugify from "slugify";
  import { page } from "$app/stores";
  import { getLadName, selectedGeography } from "../model/geography/geography";

  export let topicSlug;
  let pageTopic = {};
  let showChangeAreaHeader = false;
  let header;
  let locationId = $page.query.get("location");
  let locationName = locationId ? getLadName($page.query.get("location")) : "England and Wales";

  $: {
    if ($selectedGeography.lad) {
      locationId = $page.query.get("location");
      locationName = getLadName($page.query.get("location"));
    }
  }

  topicSuggestions.forEach((topic) => {
    if (slugify(topic.topicName).toLowerCase() == topicSlug.toLowerCase()) {
      pageTopic = topic;
    }
  });
</script>

<svelte:head>
  <title>2021 Census Data Atlas Topic | {pageTopic.topicName}</title>
</svelte:head>

<BasePage>
  <span slot="header" bind:this={header}>
    <HeaderWrapper
      serviceTitle={pageTopic.topicName}
      description={locationName}
      bind:showChangeAreaHeader
      changeAreaBaseUrl="/{topicSlug}"
    />
  </span>

  <span slot="map">
    <MapWrapper showDataLayer={false} />
  </span>

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
        <Feedback />
      </div>
    </footer>
  </span>

  <Topic topicList={pageTopic.suggestions} cardTitle="{pageTopic.topicName} - Census 2021"
    ><p>
      The 2021 Census tells us a lot about the {pageTopic.topicName} of people living in England and Wales live and work.
    </p>
    <p>
      <a href="/categories/{topicSlug}"> Choose a category from the full list</a>
      or explore one of these suggestions.
    </p>
  </Topic>

  <div class="ons-u-mb-l">
    <ONSShare title="Share this page" pageURL={location.href} pageTitle={document.title} multiRow>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </div>

  <div class="ons-u-mb-l">
    <ExploreSomethingElseNav
      firstLink={{ text: "New topic", url: locationId ? `/topics?location=${locationId}` : "/topics" }}
      secondLink={{ text: locationId ? "New location" : "Choose location", url: "" }}
      on:click={() => ((showChangeAreaHeader = true), header.scrollIntoView())}
    />
  </div>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

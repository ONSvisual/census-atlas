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

  import Map from "../ui/map/Map.svelte";
  import TileSet from "../ui/map/TileSet.svelte";
  import InteractiveLayer from "../ui/map/InteractiveLayer.svelte";
  import BoundaryLayer from "../ui/map/BoundaryLayer.svelte";
  import { updateSelectedGeography, updateHoveredGeography } from "../model/geography/geography";
  import config from "../config";
  import Topic from "../ui/Topic.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import ONSShareItem from "../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../ui/ons/svg/ONSEmailIcon.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import DataHeader from "../ui/DataHeader.svelte";
  import { topicSuggestions } from "../config";
  import slugify from "slugify";

  export let topicSlug;
  let pageTopic = {};

  topicSuggestions.forEach((topic) => {
    if (slugify(topic.topicName).toLowerCase() == topicSlug.toLowerCase()) {
      pageTopic = topic;
    }
  });
</script>

<svelte:head>
  <title>2021 Census Data Atlas Topic</title>
</svelte:head>

<BasePage>
  <span slot="header">
    <DataHeader topicPage={pageTopic.topicName} />
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
        <InteractiveLayer
          id="lad-interactive-layer"
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
      />
      <TileSet
        id="lsoa-building"
        type="vector"
        url={config.legacy.lsoabldg.url}
        layer={config.legacy.lsoabldg.layer}
        promoteId={config.legacy.lsoabldg.code}
        minzoom={config.ux.map.buildings_breakpoint}
      />
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

  <Topic topicList={pageTopic.suggestions} cardTitle="{pageTopic.topicName} - Census 2021"
    >The 2021 Census tells us a lot about the {pageTopic.topicName} of people living in England and Wales live and work.
    <a href="/categories/{topicSlug}"> Choose a data option from the full list</a>
    or explore one of these suggestions.
  </Topic>

  <ONSShare title="Share this page" pageURL={location.href} pageTitle={document.title} multiRow>
    <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
    <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
    <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
    <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
  </ONSShare>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

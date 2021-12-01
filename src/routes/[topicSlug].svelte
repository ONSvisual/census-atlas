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
  import Topic from "../ui/Topic.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
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
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <DataHeader tableName={pageTopic.topicName} />
  </span>

  <span slot="map">
    <Map />
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

  <ONSShare url="https://www.google.com/">Share this page</ONSShare>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

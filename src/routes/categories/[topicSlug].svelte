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
  import BasePage from "./../../ui/BasePage.svelte";

  import Header from "./../../ui/Header.svelte";
  import TopicExplorer from "./../../ui/TopicExplorer.svelte";
  import Feedback from "./../../ui/Feedback.svelte";

  let topicSlug;
</script>

<svelte:head>
  <title>2021 Census Data Atlas Categories</title>
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <Header
      showBackLink
      serviceTitle="Choose a data option"
      description="Choose a category and select an option within it to explore Census data."
    />
  </span>

  <TopicExplorer selectedTopic={topicSlug} />

  <span slot="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container">
          <Feedback />
        </div>
      </div>
    </footer>
  </span>
</BasePage>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

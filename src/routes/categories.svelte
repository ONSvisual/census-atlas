<script>
  import BasePage from "./../ui/BasePage.svelte";

  import Header from "./../ui/Header.svelte";
  import TopicExplorer from "./../ui/TopicExplorer.svelte";
  import Feedback from "./../ui/Feedback.svelte";
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <Header
      showBackLink
      serviceTitle="Choose a data option"
      description="Choose a category and select an option within it to explore Census data."
    />
  </span>

  <TopicExplorer />

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

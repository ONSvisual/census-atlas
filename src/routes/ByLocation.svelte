<script>
  import BasePage from "../ui/BasePage.svelte";

  import Map from "../ui/map/Map.svelte";
  import Topic from "../ui/Topic.svelte";
  import DataHeader from "../ui/DataHeader.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import Feedback from "../ui/Feedback.svelte";

  import ONSPhaseBanner from "../ui/ons/ONSPhaseBanner.svelte";

  export let locationId;

  let topicList = [
    { title: "How is Walsall’s general health?", href: "#" },
    { title: "How deprived is Walsall? ", href: "#" },
    { title: "How many students live in Walsall?", href: "#" },
    { title: "How many people living in Walsall are unemployed?", href: "#" },
  ];
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <DataHeader location={locationId} />
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

  <Topic {topicList} cardTitle="Walsall’s Census">
    The 2021 Census tells us a lot about how people in Walsall live and work. <a href="#"
      >Choose a data option from the full list</a
    > or explore one of these topics.
  </Topic>

  <ONSShare url="https://www.google.com/">Share this page</ONSShare>
</BasePage>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

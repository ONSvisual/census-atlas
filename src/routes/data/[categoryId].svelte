<script context="module">
export function load({ page }) {
		return {
			props: {
				topicSlug : page.params.categoryId 
			}
		};
	}

</script>

<script>
  import BasePage from "./../../ui/BasePage.svelte";

  import Map from "./../../ui/map/Map.svelte";
  import Topic from "./../../ui/Topic.svelte";
  import ONSShare from "./../../ui/ons/ONSShare.svelte";
  import Feedback from "./../../ui/Feedback.svelte";
  import DataHeader from "./../../ui/DataHeader.svelte";
  import topicData from "../../data/simpleTopicTableCategoryData";
  import slugify from "slugify"

  export let topicSlug;
  let pageTopic = {};
  
  topicData.forEach((topic) => {
    if (slugify(topic.name).toLowerCase() == topicSlug) {
      pageTopic = topic
    }
  })

  let topicList = [
    { title: "How does general health differ across England and Wales?", href: "#" },
    { title: "Which areas are home to people who provide the most unpaid care?", href: "#" },
    { title: "What can we learn about long-term health issues and/or disability?", href: "#" },
  ];
</script>

<svelte:head>
  <title>2021 Census Data Atlas Category</title>
  <script defer src="https://cdn.ons.gov.uk/sdc/design-system/44.1.2/scripts/main.js"></script>
</svelte:head>

<BasePage>
  <span slot="header">
    <DataHeader tableName={pageTopic.name} />
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

  <Topic {topicList} cardTitle="Health - Census 2021"
    >The 2021 Census tells us a lot about the health of people living in England and Wales live and. <a href="#">
      Choose a data option from the full list</a
    > or explore one of these suggestions.
  </Topic>

  <ONSShare url="https://www.google.com/">Share this page</ONSShare>
</BasePage>

<style lang="scss">
  @import "./../../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @media only screen and (max-width: map-get($grid-bp, s)) {
  }
</style>

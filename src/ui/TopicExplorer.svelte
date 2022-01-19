<script>
  import ONSAccordion from "./../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "./../ui/ons/partials/ONSAccordionPanel.svelte";
  import OnsCollapsible from "./ons/ONSCollapsible.svelte";
  import censusData from "./../data/simpleTopicTableCategoryData";
  import { onMount } from "svelte";
  import slugify from "slugify";

  export let selectedTopic;
  export let locationId;
  let locationQueryParam = locationId ? `?location=${locationId}` : "";

  let topicIndex;

  $: {
    if (selectedTopic) {
      censusData.forEach((topic) => {
        if (slugify(topic.name).toLowerCase() == selectedTopic.toLowerCase()) {
          topicIndex = censusData.indexOf(topic);
        }
      });
    }
  }

  // !!! Temporary solution -  to be removed when we'll be able to import the DS js bundle at a component level
  onMount(() => {
    if (selectedTopic) {
      setTimeout(() => {
        document.querySelector(`#topic-${topicIndex} .ons-btn`).click();
      }, 250);
    }
  });
</script>

<ONSAccordion showAll={false}>
  {#each censusData as topic, i}
    <ONSAccordionPanel id="topic-{i}" title={topic.name} noTopBorder description={topic.code}>
      {#each topic.tables as tableEntry}
        <div>
          <h3 class="ons-related-links__title ons-u-fs-r--b ons-u-mb-xs">
            <a
              href="/{slugify(topic.name).toLowerCase()}/{slugify(tableEntry.name).toLowerCase()}/{slugify(
                tableEntry.categories[0].slug,
              ).toLowerCase()}{locationQueryParam}">{tableEntry.name}</a
            >
          </h3>
          <p class="ons-collapsible__table-description">nomis table description - {tableEntry.code}</p>
        </div>
        <OnsCollapsible title={`Show ${tableEntry.name} options`}>
          <ul class="ons-list ons-list--bare">
            {#each tableEntry.categories as category}
              <li class="ons-list__item">
                <a
                  href="/{slugify(topic.name).toLowerCase()}/{slugify(tableEntry.name).toLowerCase()}/{slugify(
                    category.name,
                  ).toLowerCase()}{locationQueryParam}"
                  class="ons-list__link">{category.name}</a
                >
              </li>
            {/each}
          </ul>
        </OnsCollapsible>
      {/each}
    </ONSAccordionPanel>
    <!-- <OnsCollapsible title={"test test"}/> -->
  {/each}
</ONSAccordion>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  .ons-collapsible__table-description {
    margin: 0 2rem 0 0;
  }
</style>

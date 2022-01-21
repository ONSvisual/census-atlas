<script>
  import ONSAccordion from "./../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "./../ui/ons/partials/ONSAccordionPanel.svelte";
  import CustomCollapsible from "./CustomCollapsible/CustomCollapsible.svelte";
  import censusMetadata from "./../data/apiMetadata";

  import { onMount } from "svelte";

  export let selectedTopic, visitedTable, locationId;
  let topicIndex, tableIndex;

  $: locationQueryParam = locationId ? `?location=${locationId}` : "";

  $: {
    if (selectedTopic) {
      censusMetadata.forEach((topic) => {
        if (visitedTable) {
          topic.tables.forEach((table) => {
            if (table.slug == visitedTable.toLowerCase()) {
              tableIndex = topic.tables.indexOf(table);
            }
          });
        }
        if (topic.slug == selectedTopic.toLowerCase()) {
          topicIndex = censusMetadata.indexOf(topic);
        }
      });
    }
  }

  // !!! Temporary solution -  to be removed when we'll be able to import the DS js bundle at a component level
  onMount(() => {
    if (selectedTopic) {
      setTimeout(() => {
        document.querySelector(`#topic-${topicIndex} .ons-btn`).click();
        if (visitedTable) {
          document.querySelector(`#collapsible-table-${tableIndex}`).click();
        }
      }, 250);
    }
  });
</script>

<ONSAccordion showAll={false}>
  {#each censusMetadata as topic, i}
    <ONSAccordionPanel id="topic-{i}" title={topic.name} noTopBorder description={topic.code}>
      {#each topic.tables as tableEntry, i}
        <div class="table-margin--2">
          <h3 class="ons-related-links__title ons-u-fs-r--b ons-u-mb-xs">
            <a href="/{topic.slug}/{tableEntry.slug}/{tableEntry.categories[0].slug}{locationQueryParam}"
              >{tableEntry.name}</a
            >
          </h3>
          <p class="ons-collapsible__table-description">{tableEntry.desc}</p>
          <CustomCollapsible id="collapsible-table-{i}" title={tableEntry.name}>
            <ul class="ons-list ons-list--bare">
              {#each tableEntry.categories as category}
                <li class="ons-list__item">
                  <a href="/{topic.slug}/{tableEntry.slug}/{category.slug}{locationQueryParam}" class="ons-list__link"
                    >{category.name}</a
                  >
                </li>
              {/each}
            </ul>
          </CustomCollapsible>
        </div>
      {/each}
    </ONSAccordionPanel>
  {/each}
</ONSAccordion>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  .ons-collapsible__table-description {
    margin: 0 2rem 0 0;
  }
  .table-margin--2 {
    margin: 1rem 0 2rem 0;
  }
</style>

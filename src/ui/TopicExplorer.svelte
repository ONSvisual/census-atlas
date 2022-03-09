<script>
  import ONSAccordion from "./../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "./../ui/ons/partials/ONSAccordionPanel.svelte";
  import { censusMetadata } from "../model/metadata/metadata";

  import { onMount } from "svelte";

  export let selectedTopic, visitedTable, locationId;
  let tableIndex;

  $: locationQueryParam = locationId ? `?location=${locationId}` : "";

  $: {
    if (selectedTopic) {
      $censusMetadata.forEach((topic) => {
        if (visitedTable) {
          topic.tables.forEach((table) => {
            if (table.slug == visitedTable.toLowerCase()) {
              tableIndex = topic.tables.indexOf(table);
            }
          });
        }
      });
    }
  }

  // !!! Temporary solution -  to be removed when we'll be able to import the DS js bundle at a component level
  onMount(() => {
    if (visitedTable) {
      setTimeout(() => {
        document.querySelector(`#table-${tableIndex} .ons-btn`).click();
      }, 250);
    }
  });
</script>

{#if selectedTopic}
  <ONSAccordion showAll={false}>
    {#each $censusMetadata as topic}
      {#if topic.slug == selectedTopic.toLowerCase()}
        {#each topic.tables as table, i}
          <ONSAccordionPanel id="table-{i}" title={table.name} noTopBorder description={table.desc}>
            <ul class="ons-list ons-list--bare">
              {#each table.categories as category}
                <li class="ons-list__item">
                  <a href="/{topic.slug}/{table.slug}/{category.slug}{locationQueryParam}" class="ons-list__link"
                    >{category.name}</a
                  >
                </li>
              {/each}
            </ul>
          </ONSAccordionPanel>
        {/each}
      {/if}
    {/each}
  </ONSAccordion>
{/if}

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  a:visited {
    color: $color-indigo-blue;
  }
  .ons-list--bare {
    padding-left: 1.5rem;
  }
</style>

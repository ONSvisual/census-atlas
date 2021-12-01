<script>
  import { getContext } from "svelte";
  import ONSAccordion from "./../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "./../ui/ons/partials/ONSAccordionPanel.svelte";
  import censusData from "./../data/simpleTopicTableCategoryData";

  export let selectedTopic;

  let selectedData = getContext("selectedData");

  function populatesSelectedData(tableName, tableCategories) {
    $selectedData = {};
    $selectedData = { tableName: tableName, tableCategories: tableCategories };
  }

</script>

<ONSAccordion showAll={false}>
  {#each censusData as topic, i}
    <ONSAccordionPanel id="topic-{i}" title={topic.name} noTopBorder>
      {#each topic.tables as tableEntry}
        <h3 class="ons-related-links__title ons-u-fs-r--b ons-u-mb-xs">{tableEntry.name}</h3>
        <ul class="ons-list ons-list--bare">
          {#each tableEntry.categories as category}
            <li class="ons-list__item">
              <a
                href="data/{category.code}"
                class="ons-list__link"
                on:click={() => populatesSelectedData(tableEntry.name, tableEntry.categories)}>{category.name}</a
              >
            </li>
          {/each}
        </ul>
      {/each}
    </ONSAccordionPanel>
  {/each}
</ONSAccordion>

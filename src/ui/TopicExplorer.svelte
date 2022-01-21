<script>
  import ONSAccordion from "./../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "./../ui/ons/partials/ONSAccordionPanel.svelte";
  import censusMetadata from "./../data/apiMetadata";
  import { onMount } from "svelte";

  export let selectedTopic;
  export let locationId;

  $: locationQueryParam = locationId ? `?location=${locationId}` : "";

  let topicIndex;

  $: {
    if (selectedTopic) {
      censusMetadata.forEach((topic) => {
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
      }, 250);
    }
  });
</script>

<ONSAccordion showAll={false}>
  {#each censusMetadata as topic, i}
    <ONSAccordionPanel id="topic-{i}" title={topic.name} noTopBorder>
      {#each topic.tables as tableEntry}
        <h3 class="ons-related-links__title ons-u-fs-r--b ons-u-mb-xs">{tableEntry.name}</h3>
        <ul class="ons-list ons-list--bare">
          {#if tableEntry.categories != null}
            {#each tableEntry.categories as category, i}
              {#if !category.code.endsWith("001")}
                <li class="ons-list__item">
                  <a href="/{topic.slug}/{tableEntry.slug}/{category.slug}{locationQueryParam}" class="ons-list__link"
                    >{category.name}</a
                  >
                </li>
              {/if}
            {/each}
          {/if}
        </ul>
      {/each}
    </ONSAccordionPanel>
  {/each}
</ONSAccordion>

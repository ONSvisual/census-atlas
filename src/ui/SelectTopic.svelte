<script>
  import ONSCollapsible from "./ons/ONSCollapsible.svelte";
  import TopicList from "./TopicList.svelte";
  import config from "../config.js";
  export let suggestions = config.suggestions.indexPageSuggestions;
</script>

<div class="component-margin--2">
  <h2>Select a topic</h2>
  <p>
    We have grouped census information into topics, categories and subjects to help you find what you are looking for.
  </p>
  <div class="ons-u-mb-l">
    <TopicList />
  </div>
  <ONSCollapsible isRegularFontWeightTitle title="Popular topic searches" a11yHeading>
    {#each suggestions as suggestion}
      <p><a href={suggestion.url}>{suggestion.text}</a></p>
    {/each}
  </ONSCollapsible>
</div>

<style>
  .component-margin--2 {
    margin-bottom: 1rem;
  }
</style>

<script>
  import { goto } from "$app/navigation";

  import Header from "./Header.svelte";
  import DataHeader from "./DataHeader.svelte";
  import ExploreByAreaComponent from "./ExploreByAreaComponent.svelte";
  import { reverseLadLookup } from "../model/geography/geography";

  export let locationName, locationId, topicSlug, tableSlug, categorySlug, tableName;

  let showChangeAreaHeader = false;
  let userInputValue;
  let renderError = false;
  let invertTextColor = true;

  const toggleChangeAreaHeader = () => {
    showChangeAreaHeader = !showChangeAreaHeader;
  };

  function submitFunction(ladInput) {
    if (reverseLadLookup[ladInput]) {
      if (topicSlug) {
        goto(`/${topicSlug}/${tableSlug}/${categorySlug}?location=${reverseLadLookup[ladInput]}`);
      } else {
        goto(`/area?location=${reverseLadLookup[ladInput]}`);
      }
      showChangeAreaHeader = !showChangeAreaHeader;
    } else {
      renderError = true;
      invertTextColor = false;
    }
  }

  $: {
    if (!showChangeAreaHeader) {
      renderError = false;
      invertTextColor = true;
      userInputValue = "";
    }
  }
</script>

{#if showChangeAreaHeader}
  <Header bind:showChangeAreaHeader showBackLink serviceTitle="Explore by area">
    <ExploreByAreaComponent
      labelText="Choose an area"
      {renderError}
      {invertTextColor}
      header
      bind:userInputValue
      on:click={() => submitFunction(userInputValue)}
    />
  </Header>
{:else}
  <DataHeader
    {tableName}
    location={locationName}
    {locationId}
    on:click={toggleChangeAreaHeader}
    {topicSlug}
    {categorySlug}
    {tableSlug}
  />
{/if}

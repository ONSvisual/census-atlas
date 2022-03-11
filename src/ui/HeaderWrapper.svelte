<script>
  import { goto } from "$app/navigation";

  import Header from "./Header.svelte";
  import DataHeader from "./DataHeader.svelte";
  import SearchByAreaComponent from "./SearchByAreaComponent.svelte";
  import { reverseLadLookup, updateSelectedGeography } from "../model/geography/geography";

  export let locationName, locationId, topicSlug, tableSlug, categorySlug, tableName, topicPage, changeAreaBaseUrl;

  export let showChangeAreaHeader = false;
  let userInputValue;
  let renderError = false;
  let invertTextColor = true;

  const toggleChangeAreaHeader = () => {
    showChangeAreaHeader = !showChangeAreaHeader;
  };

  function submitFunction(ladInput, baseUrl) {
    if (reverseLadLookup[ladInput]) {
      goto(`${baseUrl}?location=${reverseLadLookup[ladInput]}`);
      updateSelectedGeography(reverseLadLookup[ladInput]);
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
    <SearchByAreaComponent
      labelText="Choose an area"
      {renderError}
      {invertTextColor}
      header
      bind:userInputValue
      on:click={() => submitFunction(userInputValue, changeAreaBaseUrl)}
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
    {topicPage}
  />
{/if}

<script>
  export let id = "search-field";
  export let labelText, userInputValue, autosuggestData, inverted;
  export let hint = "Enter a postcode or a town, city or area";
  export let buttonText = "Choose";
  export let title = "Explore by area";
  import ONSAutosuggest from "./ons/ONSAutosuggest.svelte";
</script>

<div class="component-margin--2">
  {#if !inverted}
    <h2>{title}</h2>
  {/if}
  <div class="ons-field">
    <p><slot /></p>
    <ONSAutosuggest {labelText} {inverted} {id} {hint} {autosuggestData} bind:autosuggestValue={userInputValue} />
    <button type="submit" class="ons-btn ons-u-mt-s ons-btn--small">
      <span class="ons-btn__inner"> {buttonText}</span>
    </button>
  </div>
</div>

<style>
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>

<script>
  import config from "../config";
  export let id = "search-field";
  export let labelText, userInputValue, renderError, invertTextColor;
  export let buttonText = "Choose";
  export let title = "Search by area";
  import ONSAutosuggest from "./ons/ONSAutosuggest.svelte";
  import ONSError from "./ons/partials/ONSError.svelte";
  export let header = false;
  let errorText = config.error.text;
</script>

<div class="component-margin--2">
  {#if !header}
    <h2 class="ons-u-mb-xs">{title}</h2>
  {/if}
  <ONSError {errorText} {id} {renderError}>
    <div class="ons-field">
      <ONSAutosuggest
        {labelText}
        {invertTextColor}
        {id}
        autosuggestData={config.autosuggestData}
        {renderError}
        {header}
        bind:autosuggestValue={userInputValue}
      />
      <button on:click type="submit" class="ons-btn ons-u-mt-s ons-btn--small">
        <span class="ons-btn__inner"> {buttonText}</span>
      </button>
    </div>
  </ONSError>
</div>

<style>
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>

<script>
  export let id = "search-field";
  export let labelText, userInputValue, autosuggestData, renderError, invertTextColor;
  export let hint = "Enter a postcode or a town, city or area";
  export let buttonText = "Choose";
  export let title = "Explore by area";
  import ONSAutosuggest from "./ons/ONSAutosuggest.svelte";
  import ONSError from "./ons/partials/ONSError.svelte";
  export let header = false;
  let errorText = "Not a valid search";
</script>

<div class="component-margin--2">
  {#if !header}
    <h2>{title}</h2>
  {/if}
  <ONSError {errorText} {id} {renderError}>
    <div class="ons-field">
      <p><slot /></p>
      <ONSAutosuggest
        {labelText}
        {invertTextColor}
        {id}
        {hint}
        {autosuggestData}
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

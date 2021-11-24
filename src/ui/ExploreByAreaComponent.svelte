<script>
  export let id = "search-field";
  export let labelText, userInputValue, autosuggestData
  export let hint = "Enter a postcode or a town, city or area";
  export let buttonText = "Choose";
  export let title = "Explore by area";
  export let showTitle = false;
  import ONSAutosuggest from "./ons/ONSAutosuggest.svelte"
</script>

<div class="component-margin--2">
  {#if !showTitle}
    <h2>{title}</h2>
  {/if}
  <div class="ons-field">
    <p><slot /></p>
    <div class="input--with-white-description">
    <ONSAutosuggest
      {id}
      {hint}
      {autosuggestData}
      bind:autosuggestValue={userInputValue}
    />
  </div>
    <button type="submit" class="ons-btn ons-u-mt-s ons-btn--small">
      <span class="ons-btn__inner"> {buttonText}</span>
    </button>
  </div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

   :global(.ons-label__description) {
        color: $color-white;
    }

  .component-margin--2 {
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: map-get($grid-bp, s)) {
    .ons-input--select:not(.ons-input--block):not(.ons-input-search):not([class*="input--w-"]),
    .ons-input--text:not(.ons-input--block):not(.ons-input-search):not([class*="input--w-"]) {
      width: 100%;
    }
  }
</style>

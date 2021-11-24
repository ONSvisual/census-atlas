<script>
  export let id = "search-field";
  export let userInputValue = "";
  export let hint = "Enter a postcode or a town, city or area";
  export let placeholder = "WS3 1PL";
  export let buttonText = "Choose";
  export let title = "Explore by area";
  export let inverted = false;
  let whiteHint = inverted ? "ons-input--with-white-description" : "";
</script>

<div class="component-margin--2">
  {#if !inverted}
    <h2>{title}</h2>
  {/if}
  <div class="ons-field">
    <p><slot /></p>
    {#if hint}
      <span id="description-hint" class="ons-label__description ons-input--with-description {whiteHint}">
        {hint}
      </span>
    {/if}
    <input
      type="search"
      {id}
      class="ons-input ons-input--text ons-input-type__input"
      {placeholder}
      bind:value={userInputValue}
    />
    <button type="submit" class="ons-btn ons-u-mt-s ons-btn--small">
      <span class="ons-btn__inner"> {buttonText}</span>
    </button>
  </div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .ons-input--with-white-description {
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

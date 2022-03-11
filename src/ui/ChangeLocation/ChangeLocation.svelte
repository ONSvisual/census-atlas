<script>
  import { page } from "$app/stores";

  import OnsBacklink from "../ons/ONSBacklink.svelte";
  import SearchByAreaComponent from "../SearchByAreaComponent.svelte";

  export let isMobile, onClose, locationId, topicSlug, tableSlug, categorySlug;
  let userInputValue;
  let renderError = false;
  let invertTextColor = false;

  $: href = $page.path;

  const handleSubmit = (ladInput) => {
    if (reverseLadLookup[ladInput]) {
      if (topicSlug) {
        goto(`/${topicSlug}/${tableSlug}/${categorySlug}?location=${reverseLadLookup[ladInput]}`);
      } else {
        goto(`/area?location=${reverseLadLookup[ladInput]}`);
      }
      openSearch = !openSearch;
    } else {
      renderError = true;
      invertTextColor = false;
    }
  };
</script>

<div class={`ons-grid ons-grid--flex change-container ${isMobile ? "mobile" : ""}`}>
  <div class="ons-container">
    <div class="close-button">
      <a class="close-link" {href} id="close" on:click={onClose}>Close </a>
      <svg
        class="ons-svg-icon"
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.31707 10.5509L18.3902 2.09375L16.258 0.106323L9.31707 6.56194L2.37609 0.106323L0.243897 2.09375L9.31707 10.5509Z"
          fill="white"
        />
        <path
          d="M9.31707 6.44931L0.243896 14.9064L2.37609 16.8939L9.31707 10.4383L16.258 16.8939L18.3902 14.9064L9.31707 6.44931Z"
          fill="white"
        />
      </svg>
    </div>

    <div class="ons-header__title">
      <h1>Search by area</h1>

      <SearchByAreaComponent
        labelText="Enter a region, county, local council or city."
        {renderError}
        {invertTextColor}
        header
        bind:userInputValue
        on:click={() => handleSubmit(userInputValue)}
      />
      {#if locationId}
        <div class="all-link">
          <p>
            <a {href} on:click={onClose}>See data for all England and Wales</a>
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  .change-container {
    position: relative;
    background-color: $color-ocean-blue;
    margin: unset;
    padding-top: 37px;
    box-sizing: border-box;
  }
  /* a {
    color: $color-white;
  } */
  .all-link {
    font-size: 1rem;
    /* padding-bottom: 24px; */
  }
  .mobile {
    margin: 0px -18px;
  }
  .close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -37px;
    right: 0px;
    width: 93px;
    height: 37px;
    background-color: $color-night-blue;
    font-size: 1rem;
  }
  .close-link {
    padding-right: 8px;
  }
</style>

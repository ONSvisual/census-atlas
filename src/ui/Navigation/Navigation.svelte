<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { reverseLadLookup } from "../../model/geography/geography";

  import OnsBacklink from "../ons/ONSBacklink.svelte";
  import SearchByAreaComponent from "../SearchByAreaComponent.svelte";

  export let locationId, topicSlug, tableSlug, categorySlug;
  export let isMobile = false;

  let userInputValue;
  let renderError = false;
  let invertTextColor = true;

  let openSearch = false;

  let locationLink;

  $: href = $page.path;
  $: {
    const locationQueryParam = locationId ? `?location=${locationId}` : "";
    locationLink =
      topicSlug && locationId
        ? `${categorySlug}${locationQueryParam}`
        : topicSlug && !locationId
        ? `${categorySlug}`
        : `area${locationQueryParam}`;
  }

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

<div class={`ons-grid ons-grid--flex navigation-container ${isMobile ? "mobile" : ""}`}>
  {#if openSearch}
    <div class="ons-container search-container">
      <OnsBacklink {href} inverted on:click={() => (openSearch = !openSearch)} />
      <div class="ons-header__title">
        <h1>Search by area</h1>
      </div>
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
            <a {href} on:click={() => (openSearch = !openSearch)}>See data for all England and Wales</a>
          </p>
        </div>
      {/if}
    </div>
  {:else}
    <div class="ons-grid__col ons-col-auto ons-grid__col--flex divider">
      <div class="ons-pl-grid-col"><a href={`/topics/${topicSlug}`}>New category</a></div>
    </div>
    <div class="ons-grid__col ons-col-auto ons-grid__col--flex divider">
      <div class="ons-pl-grid-col">
        <a
          href={locationLink}
          on:click={() => {
            openSearch = !openSearch;
          }}
        >
          New location
        </a>
      </div>
    </div>
    <div class="ons-grid__col ons-col-auto ons-grid__col--flex">
      <div class="ons-pl-grid-col"><a href="/">Back to start</a></div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .navigation-container {
    min-height: 46px;
    background-color: $color-ocean-blue;
    margin: unset;
    padding: 6px 0px;
  }
  .mobile {
    margin: 0px -18px;
  }
  a {
    color: $color-white;
  }
  .divider {
    border-right: 0.25px solid $color-white;
  }
  .ons-grid__col {
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    padding: unset;
  }
  .all-link {
    font-size: 1rem;
    padding-bottom: 24px;
  }
</style>

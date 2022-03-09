<script>
  import slugify from "slugify";

  export let tableName, location, topicPage, topicSlug, tableSlug, categorySlug, locationId;

  let locationQueryParam, href;
  $: {
    locationQueryParam = locationId ? `?location=${locationId}` : "";
    href =
      topicSlug && locationId
        ? `${categorySlug}${locationQueryParam}`
        : topicSlug && !locationId
        ? `${categorySlug}`
        : `area${locationQueryParam}`;
  }
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
        {#if tableName || topicPage}
          <div class="ons-header__title header__title--with-description data-header-1__title">
            <h1>
              {tableName
                ? tableName.charAt(0).toUpperCase() + tableName.slice(1).toLowerCase()
                : topicPage
                ? `Explore ${topicPage.toLowerCase()}`
                : ""}
            </h1>
          </div>
          <a href="/topics/{topicSlug}/{tableSlug}/{categorySlug}{locationQueryParam}">Change</a>
        {:else}
          <div class="ons-header__title" id="header-data-2__title">
            <a class="census-atlas-header-2__link" href="/categories{locationQueryParam}">Choose a category</a>
          </div>
        {/if}
      </div>
      <hr />
      {#if topicPage}
        <div class="ons-header__title" id="header-data-2__title">
          <a class="census-atlas-header-2__link" href="/categories/{slugify(topicPage).toLowerCase()}"
            >Choose an option within {topicPage.toLowerCase()}</a
          >
        </div>
      {:else if location}
        <div class="ons-grid--flex ons-grid--between">
          <h2 class="ons-header__title" id="header-data-2__location">In {location}</h2>
          <a {href} on:click>Change</a>
        </div>
      {:else}
        <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
          <h2 class="ons-header__desc">In England & Wales</h2>
          <a {href} on:click>Change</a>
        </div>
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";

  a {
    color: $color-white;
    font-size: 13px;
    line-height: 18px;
    @media (min-width: map-get($grid-bp, s)) {
      font-size: 16px;
      line-height: 22px;
    }
  }
  a:hover {
    color: $color-white;
    text-decoration: underline solid $color-white 2px;
  }
  a:focus {
    background-color: $color-sun-yellow;
    -webkit-box-shadow: 0 -2px $color-sun-yellow, 0 4px $color-black;
    box-shadow: 0 -2px $color-sun-yellow, 0 4px $color-black;
    color: $color-black;
    outline: 3px solid transparent;
    text-decoration: none;
  }

  hr {
    border: 0.5px solid $color-grey-35;
    margin: 0.5rem 0;
  }
  .data-header-1__title {
    max-width: 80%;
  }
  .data-header-1__title h1 {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    @media (min-width: map-get($grid-bp, s)) {
      font-size: 26px;
      line-height: 25px;
    }
  }

  h2#header-data-2__location {
    font-size: 16px;
    line-height: 25px;
    margin: 0;
    @media (min-width: map-get($grid-bp, s)) {
      font-size: 20px;
      line-height: 25px;
    }
  }

  #header-data-2__title {
    margin: 0.3rem 0;
  }
  .census-atlas-header-2__link {
    display: block;
    margin: 0 0 1rem;
    font-weight: 200;
  }
</style>

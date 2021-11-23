<script>
  export let tableName;
  export let location;
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
        {#if tableName}
          <div class="ons-header__title header__title--with-description data-header-1__title">
            <h2>{tableName}</h2>
          </div>
          <a href="/categories">Change</a>
        {:else}
          <div class="ons-header__title" id="header-data-2__title">
            <a href="/categories"><h2 id="census-atlas-header-2__title">Choose a data option</h2></a>
          </div>
        {/if}
      </div>
      <hr />
      {#if location}
        <div class="ons-grid--flex ons-grid--between">
          <h2 class="ons-header__title" id="header-data-2__location">In {location}</h2>
          <a href="#">Change</a>
        </div>
      {:else}
        <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
          <h3 class="ons-header__desc">In England & Wales</h3>
          <a href="#">Change</a>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  a {
    color: #fff;
  }

  hr {
    border: 0.5px solid #bcbcbd;
    margin: 0.5rem 0;
  }

  h2,
  h3 {
    margin: 0;
  }

  .data-header-1__title {
    margin: 0;
  }
  #header-data-2__location {
    font-size: 1.33333rem;
  }
  @media (max-width: 736px) {
    #header-data-2__location {
      font-size: 1.11111rem;
    }
  }
  #header-data-2__title {
    margin: 0.3rem 0;
  }
  #census-atlas-header-2__title {
    font-size: 1.11111rem;
    font-weight: 200;
  }
</style>

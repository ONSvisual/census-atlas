<script>
  import ONSBacklink from "./ons/ONSBacklink.svelte";
  export let serviceTitle, description;
  export let showBackLink = false;
  export let chooseArea = false;
  export let href = "#0";
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      {#if showBackLink}
        <ONSBacklink inverted />
      {/if}
      <div
        class="ons-grid ons-grid--gutterless ons-grid--flex ons-grid--between ons-grid--vertical-center ons-grid--no-wrap"
      >
        <div class="ons-grid__col ons-col-auto ons-u-flex-shrink">
          <div class="ons-header__title header__title--with-description"><h2>{serviceTitle}</h2></div>
          {#if chooseArea}
            <slot />
            <p><a {href}>See data for all England and Wales</a></p>
          {/if}
        </div>
      </div>
      <p class="ons-header__desc">{description}</p>
    </div>
  </div>
</header>

<style>
  h2 {
    font-size: 1.33333rem;
    margin: 0.5rem 0;
  }
  .ons-container {
    padding: 0 1rem;
  }

  .ons-header__desc {
    margin: -0.2rem 0 0 0;
  }

  .ons-header__main {
    padding: 1rem 0;
  }
  a {
    color: #fff;
  }
  a:hover {
    color: #fff;
    text-decoration: underline solid #fff 2px;
  }
  a:focus {
    background-color: #fbc900;
    -webkit-box-shadow: 0 -2px #fbc900, 0 4px #222;
    box-shadow: 0 -2px #fbc900, 0 4px #222;
    color: #222;
    outline: 3px solid transparent;
    text-decoration: none;
  }
</style>

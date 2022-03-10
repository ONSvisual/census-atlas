<script>
  import ONSHeaderLogoLarge from "./ons/svg/ONSHeaderLogoLarge.svelte";
  import ONSHeaderLogoSmall from "./ons/svg/ONSHeaderLogoSmall.svelte";
  import ONSPhaseBanner from "./ons/ONSPhaseBanner.svelte";
  import config from "../config";

  export let mobileMap = true;
  export let withoutBackground = false;

  let contentHeight, phaseHeight, headerHeight, footerHeight;
  $: maxHeight = contentHeight - 1 + phaseHeight + headerHeight + footerHeight;

  $: innerWidth = 0;
  let hasMap =
    ($$slots.map && mobileMap) || ($$slots.map && !mobileMap && withoutBackground) ? "ons-page--has-map" : "";
</script>

<svelte:window bind:innerWidth />

<div class="ons-page {hasMap}">
  <div class="ons-page__content">
    <a bind:clientHeight={contentHeight} class="ons-skip-link" href="#main-content">Skip to main content</a>
    <div bind:clientHeight={phaseHeight}><ONSPhaseBanner phase="ALPHA" /></div>
    <header bind:clientHeight={headerHeight} class="ons-header ons-header--hero" role="banner">
      <div class="ons-header__top">
        <div class="ons-container">
          <div
            class="ons-header__grid-top ons-grid ons-grid--gutterless ons-grid--flex ons-grid--between ons-grid--vertical-center ons-grid--no-wrap "
          >
            <div class="ons-grid__col ons-col-auto">
              <div class="ons-header__logo--large">
                <a class="ons-header__logo-link" href="/">
                  <ONSHeaderLogoLarge />
                </a>
              </div>
              <div class="ons-header__logo--small">
                <a class="ons-header__logo-link" href="/">
                  <ONSHeaderLogoSmall />
                </a>
              </div>
            </div>
            <div class="ons-header__links grid__col col-auto">
              <div class="ons-grid__col ons-col-auto">
                <ul class="ons-language-links">
                  <li class="ons-language-links__item">
                    <a href="#0" lang="cy">Cymraeg</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="wrapper" style="--max-height: {maxHeight}px">
      <!-- // XXX This .header should really be part of <header/> semantically speaking; might need to move it back in there, and reset max-width on the -->
      {#if innerWidth < config.ux.deviceWidth}
        <div class="header">
          <slot name="header" />
        </div>
      {/if}
      {#if innerWidth < config.ux.deviceWidth}
        {#if mobileMap && $$slots.map}
          <div class="map">
            <slot name="map" />
          </div>
        {/if}
      {/if}
      <div class="body">
        <slot name="body">
          {#if innerWidth >= config.ux.deviceWidth}
            <div class="header">
              <slot name="header" />
            </div>
          {/if}
          <div class="ons-page__container ons-container ">
            <main id="main-content" class="ons-page__main ">
              <slot />
            </main>
          </div>
        </slot>
      </div>
      {#if innerWidth >= config.ux.deviceWidth}
        <div class="map">
          <slot name="map" />
        </div>
      {/if}
    </div>
  </div>
  <div bind:clientHeight={footerHeight}>
    <slot name="footer">
      <footer class="ons-footer">
        <div class="ons-footer__body ons-page__footer" data-analytics="footer">
          <div class="ons-container" />
        </div>
      </footer>
    </slot>
  </div>
</div>

<style lang="scss" global>
  @import "./../../node_modules/@ons/design-system/scss/vars/_index.scss";
  .ons-page .ons-container {
    max-width: 100%;
  }
  .ons-page__main {
    margin: 0;
  }

  .wrapper {
    background: $color-grey-15;
    display: flex;
    flex-flow: column;
    position: relative;
  }

  .body {
    background: $color-white;
  }

  .ons-footer {
    background: transparent;
  }
  .ons-footer__body {
    background: transparent;
    margin: 0 20px;
    padding: 0;
  }

  .map {
    position: relative;
  }

  @media (max-width: map-get($grid-bp, s)) {
    .ons-page {
      background: url("/img/background.png") no-repeat center center;
      background-size: cover;
    }
    .ons-page--has-map {
      background: none;
    }

    .wrapper {
      margin: 20px;
      background: #c4c4c4;
      width: calc(100% - 40px);
    }
    .ons-page--has-map .wrapper {
      margin: 0;
      width: 100%;
    }
    .body {
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }

  @media (min-width: map-get($grid-bp, s)) {
    .header,
    .body {
      max-width: 489px;
    }
    .body {
      padding-bottom: 18px;
      overflow-y: scroll;
      height: 100%;
    }
    .ons-page__container {
      padding-top: 18px;
    }
    .wrapper {
      height: 100vh;
      max-height: calc(100vh - var(--max-height));
    }
    .map {
      position: absolute;
      left: 489px;
      width: calc(100% - 489px);
      height: 100%;
    }
    .ons-footer__body {
      margin: 0;
    }
  }
</style>

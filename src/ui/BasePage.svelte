<script>
  import ONSHeaderLogoLarge from "./ons/svg/ONSHeaderLogoLarge.svelte";
  import ONSHeaderLogoSmall from "./ons/svg/ONSHeaderLogoSmall.svelte";
  import ONSExternalHeaderWithDescription from "./ons/ONSExternalHeaderWithDescription.svelte";
  export let serviceTitle = "";
  export let description = "";

  let hasMap = $$slots.map ? "ons-page--has-map" : "";
</script>

<div class="ons-page {hasMap}">
  <div class="ons-page__content">
    <a class="ons-skip-link" href="#main-content">Skip to main content</a>
    <slot name="phase-banner">
      <div class="ons-phase-banner">
        <div class="ons-container">
          <div class="ons-grid ons-grid--flex ons-grid--gutterless ons-grid--vertical-top ons-grid--no-wrap">
            <div class="ons-grid__col ons-col-auto ons-u-`flex-no-grow ons-u-flex-no-shrink">
              <h3 class="ons-phase-banner__badge">ALPHA</h3>
            </div>
            <div class="ons-grid__col ons-col-auto ons-u-flex-shrink">
              <p class="ons-phase-banner__desc ons-u-fs-s ons-u-mb-no">
                This is a new service – your <a href="#feedback">feedback</a> will help us improve it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <header class="ons-header ons-header--hero" role="banner">
      <div class="ons-header__top">
        <div class="ons-container">
          <div
            class="ons-header__grid-top ons-grid ons-grid--gutterless ons-grid--flex ons-grid--between ons-grid--vertical-center ons-grid--no-wrap "
          >
            <div class="ons-grid__col ons-col-auto">
              <div class="ons-header__logo--large">
                <a class="ons-header__logo-link" href="#0">
                  <ONSHeaderLogoLarge />
                </a>
              </div>
              <div class="ons-header__logo--small">
                <a class="ons-header__logo-link" href="#0">
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
    <div class="wrapper">
      <!-- // XXX This .header should really be part of <header/> semantically speaking; might need to move it back in there, and reset max-width on the -->
      <div class="header">
        <slot name="header">
          <ONSExternalHeaderWithDescription {serviceTitle} {description} />
        </slot>
      </div>
      {#if $$slots.map}
        <div class="map">
          <slot name="map" />
        </div>
      {/if}
      <div class="body">
        <slot name="body">
          <div class="ons-page__container ons-container ">
            <main id="main-content" class="ons-page__main ">
              <slot />
            </main>
          </div>
        </slot>
      </div>
    </div>
  </div>
  <slot name="footer">
    <footer class="ons-footer">
      <div class="ons-footer__body ons-page__footer" data-analytics="footer">
        <div class="ons-container" />
      </div>
    </footer>
  </slot>
</div>

<style lang="scss" global>
  @import "../../node_modules/@ons/design-system/css/main";
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

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

  @media only screen and (max-width: map-get($grid-bp, s)) {
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

  @media only screen and (min-width: map-get($grid-bp, s)) {
    .wrapper .ons-container {
      padding: 0 45px;
    }
    .header,
    .body {
      width: 489px;
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

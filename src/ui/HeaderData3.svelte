<script>
    export let serviceTitle = "";
    export let description = "";
    import ONSBacklink from "./ons/ONSBacklink.svelte"
  </script>
  
  <header class="ons-header ons-header--hero" role="banner">
    <div class="ons-header__main ons-header__main--with-description">
      <div class="ons-container">
        <nav class="ons-breadcrumb" aria-label="Back">
            <ol class="ons-breadcrumb__items ons-u-fs-s">
              <li class="ons-breadcrumb__item ons-breadcrumb__link-white">
                <a href="#" id="back" class="ons-breadcrumb__link-white" data-attribute="Example attribute">Back</a>
                <span>&#62;&#160;</span>
              </li>
            </ol>
          </nav>
        <div
          class="ons-grid ons-grid--gutterless ons-grid--flex ons-grid--between ons-grid--vertical-center ons-grid--no-wrap"
        >
          <div class="ons-grid__col ons-col-auto ons-u-flex-shrink">
            <a class="ons-header__title-link" href="#0">
              <div class="ons-header__title header__title--with-description"><h2>{serviceTitle}</h2></div>
            </a>
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

      .ons-breadcrumb__link-white {
        color: #fff;
      }

      .ons-breadcrumb {
          padding: 0;
          margin: 0 0 .7rem 0;
      }

      .ons-container {
          padding: 0 1rem;
      }

      .ons-header__desc {
          margin: -.2rem 0 0 0;
      }

      .ons-header__main {
          padding: 1rem 0;
      }
  </style>
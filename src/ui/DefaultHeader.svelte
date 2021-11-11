<script>
  export let serviceTitle = "";
  export let description = "";
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div
        class="ons-grid ons-grid--gutterless ons-grid--flex ons-grid--between ons-grid--vertical-center ons-grid--no-wrap"
      >
        <div class="ons-grid__col ons-col-auto ons-u-flex-shrink">
          <a class="ons-header__title-link" href="#0">
            <div class="ons-header__title header__title--with-description">{serviceTitle}</div>
          </a>
        </div>
      </div>
      <p class="ons-header__desc">{description}</p>
    </div>
  </div>
</header>

<style>
  @media (min-width: 500px) {
    .ons-container {
      padding: 0 1rem;
    }
  }

  @media (min-width: 740px) {
    .ons-header__title {
      margin: 0.2rem 0 0.8rem 0;
    }
  }
  .ons-header__title {
    margin: 0 0 0.3rem 0;
  }

  .ons-header__desc {
    margin: 0;
  }
</style>

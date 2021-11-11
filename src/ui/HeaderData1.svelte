<script>
  export let indicator = "";
  export let region = "";
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
        <div class="ons-header__title header__title--with-description data-header-1__title">
          <h2>{indicator}</h2>
        </div>
        <a href="#">Change</a>
      </div>
      <hr />
      <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
        <h3 class="ons-header__desc">In {region}</h3>
        <a href="#">Change</a>
      </div>
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
</style>

<script>
  export let indicator = "General health";
  export let region = "England & Wales";
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div
        class=""
      >
        <div class="ons-grid--flex ons-grid--between">
          <div class="ons-header__title header__title--with-description">{indicator}</div>
          <a href="#">Change</a>
        </div>
      </div>
      <hr/>
      <div class="ons-grid--flex ons-grid--between">
      <p class="ons-header__desc">{region}</p>
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
        border: 1px solid #bcbcbd;
    }
</style>
<script>
  export let region = "";
</script>

<header class="ons-header ons-header--hero" role="banner">
  <div class="ons-header__main ons-header__main--with-description">
    <div class="ons-container">
      <div class="ons-header__title" id="header-data-2__title">
        <a href="#"><h2>Choose a data option</h2></a>
      </div>
      <hr />
      <div class="ons-grid--flex ons-grid--between">
        <h3 class="ons-header__title header-data-2__region">In {region}</h3>
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

  h2 {
    font-size: 1.11111rem;
    font-weight: 200;
  }

  .header-data-2__region {
    font-size: 1.33333rem;
  }
  @media (max-width: 736px) {
    .header-data-2__region {
      font-size: 1.11111rem;
    }
  }
  #header-data-2__title {
    margin: 0.3rem 0;
  }
</style>

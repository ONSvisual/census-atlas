<script>
  export let difference;
  export let comparisonGeography = "England and Wales";
</script>

<div class="data-comparison-container">
  <div class="data-display">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M24 22h-24l12-20z" />
    </svg>
  </div>

  <div class="data-comparison-text">
    <p>Than in {comparisonGeography}</p>
  </div>
</div>

<style lang="scss">
  @import "../node_modules/@ons/design-system/scss/vars/_index.scss";

  .data-comparison-container {
    height: 100%;
  }

  .data-display,
  .data-comparison-text {
    position: relative;
    width: 100%;
    height: 50%;
  }

  .data-display {
    background-color: $color-night-blue;
  }

  .data-comparison-text {
    background-color: $color-white;
  }
</style>

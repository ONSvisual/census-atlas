<script>
  export let difference = 0.5;
  export let comparisonGeography = "England and Wales";

  function populateComparisonString(difference) {
    if (difference > 0) {
      return `${difference.toString()}% higher`;
    } else if (difference < 0) {
      return `${difference.toString()}% lower`;
    }
    return "The same as";
  }

  const comparisonString = populateComparisonString(difference);
</script>

<div class="data-comparison-container">
  <div class="data-display-panel">
      <div class="ons-grid--flex ons-grid--between ons-grid--vertical-center">
        <span>
            <svg fill="#ffffff" class="data-comparison-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 22h-24l12-20z" />
            </svg>
            <p class="data-comparison-graphic-text">{comparisonString}</p>
          </span>
      </div>
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

  .data-display-panel,
  .data-comparison-text {
    position: relative;
    width: 100%;
    height: 50%;
  }

  .data-display-panel {
    background-color: $color-night-blue;
  }

  .data-comparison-text {
    background-color: $color-white;
  }

  .data-comparison-icon, .data-comparison-graphic-text {
    display: inline-block;
  }

  .data-comparison-graphic-text {
      color: $color-white;
      font-weight: bold;
  }
</style>

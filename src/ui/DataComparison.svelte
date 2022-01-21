<script>
  export let difference = 0.5;
  export let comparisonGeography = "England and Wales";

  function populateComparisonString(difference) {
    if (difference > 0) {
      return {
        percentage: difference.toString(),
        comparative: "% higher"
      };
    } else if (difference < 0) {
      return {
        percentage: Math.abs(difference).toString(),
        comparative: "% lower"
      };;
    }
    return {
      percentage: null,
      comparative: "The same as",
    };
  }

  const comparisonObj = populateComparisonString(difference);
</script>

<div class="data-comparison-container">
  <div class="data-display-panel">
      <div class="ons-grid--flex ons-grid--align-mid">
        <div class="data-comparison-icon">
          <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 22h-24l12-20z" />
          </svg>
        </div>

            <p class="ons-u-fs-xl data-comparison-graphic-text">{comparisonObj.percentage}</p><p class="ons-u-fs-m data-comparison-graphic-text
            data-comparison-graphic-text--small">{comparisonObj.comparative}</p>
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
    padding: 0.4rem 1rem;
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

  .data-comparison-icon {
    margin: 0 .7rem .35rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .data-comparison-graphic-text {
      color: $color-white;
      font-weight: bold;
      margin: 0;

      &--small {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin: 0 0 .1rem 0;
      }
  }

  @media only screen and (max-width: map-get($grid-bp, m)) {
    .data-comparison-graphic-text--small {
      margin: 0 0 .15rem 0;
    }
  }
</style>

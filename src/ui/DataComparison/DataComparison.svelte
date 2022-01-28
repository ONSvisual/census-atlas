<script>
  export let difference = 0;
  export let comparator = "England and Wales";

  $: comparatorStr = comparator == "England and Wales" ? comparator : `nearby ${comparator}`;

  function populateComparisonString(difference, comparatorStr) {
    if (difference > 0) {
      return {
        percentage: difference.toString(),
        comparative: "% higher",
        comparison: `Than in ${comparatorStr}`,
      };
    } else if (difference < 0) {
      return {
        percentage: Math.abs(difference).toString(),
        comparative: "% lower",
        comparison: `Than in ${comparatorStr}`,
      };
    }
    return {
      percentage: null,
      comparative: "The same as",
      comparison: `The value is the same as in ${comparatorStr}`,
    };
  }

  $: comparisonObj = populateComparisonString(difference, comparatorStr);
</script>

<div class="data-comparison-container">
  <div
    class="data-display-panel {difference > 0
      ? 'data-display-panel--blue'
      : difference < 0
      ? 'data-display-panel--green'
      : 'data-display-panel--teal'}"
  >
    <div class={difference > 0 ? "text-white" : "text-black"}>
      <div class="data-comparison-icon">
        {#if difference == 0}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="22px"
            height="22px"
            viewBox="0 0 22.354 22.354"
            style="enable-background:new 0 0 22.354 22.354;"
            xml:space="preserve"
          >
            <g>
              <g>
                <rect y="3.78" width="22.354" height="5.132" />
                <rect y="13.441" width="22.354" height="5.133" />
              </g>
            </g>
          </svg>
        {:else}
          <svg
            class={difference < 0 ? "upside-down-icon" : ""}
            fill={difference < 0 ? "#222222" : "#ffffff"}
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
        {/if}
      </div>
      {#if comparisonObj.percentage != null}
        <p class="data-comparison-graphic-text">
          <b>{comparisonObj.percentage}</b>{comparisonObj.comparative}
        </p>
      {/if}
    </div>
  </div>

  <div class="data-comparison-text">
    <p>{comparisonObj.comparison}</p>
  </div>
</div>

<style lang="scss">
  @import "../node_modules/@ons/design-system/scss/vars/_index.scss";

  .data-display-panel {
    padding: 2px 8px;
  }

  .data-display-panel--blue {
    background-color: #005583;
  }

  .data-display-panel--green {
    background-color: #d5f690;
  }

  .data-display-panel--grey {
    background-color: $color-grey-35;
  }

  .data-display-panel--teal {
    background-color: #2e9daa;
  }

  .data-comparison-icon svg {
    margin: 5px 4px -5px 0;
    width: 18px;
    @media (min-width: map-get($grid-bp, s)) {
      margin-top: 4px;
      margin-bottom: -4px;
      width: 20px;
    }
  }

  .data-comparison-text {
    background-color: $color-white;
    font-size: 13px;
    line-height: 18px;
    margin-top: 4px;
    @media (min-width: map-get($grid-bp, s)) {
      font-size: 16px;
      line-height: 22px;
    }
  }

  .data-comparison-icon,
  .data-comparison-graphic-text {
    display: inline-block;
  }

  .upside-down-icon {
    transform: rotate(180deg);
  }

  .data-comparison-graphic-text {
    margin: 0;
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
    & b {
      font-size: 18px;
      @media (min-width: map-get($grid-bp, s)) {
        font-size: 20px;
      }
    }
  }

  .text-white {
    color: $color-white;
  }

  .text-black {
    color: $color-black;
  }
</style>

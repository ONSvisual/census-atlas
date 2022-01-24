<script>
  export let difference = 0;
  export let comparator = "England and Wales";

  function populateComparisonString(difference, comparator) {
    if (difference > 0) {
      return {
        percentage: difference.toString(),
        comparative: "% higher",
        comparison: `Than in ${comparator}`,
      };
    } else if (difference < 0) {
      return {
        percentage: Math.abs(difference).toString(),
        comparative: "% lower",
        comparison: `Than in ${comparator}`,
      };
    }
    return {
      percentage: null,
      comparative: "The same as",
      comparison: `The value is the same as in ${comparator}`,
    };
  }

  $: comparisonObj = populateComparisonString(difference, comparator);
</script>

<div class="data-comparison-container">
  <div
    class={difference > 0
      ? "data-display-panel-blue"
      : difference < 0
      ? "data-display-panel-green"
      : "data-display-panel-teal"}
  >
    <div class={difference > 0 ? "text-white" : "text-black"}>
      <div class="ons-grid--flex ons-grid--align-mid">
        <div class="data-comparison-icon">
          {#if difference == 0}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="22.354px"
              height="22.354px"
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
              width="26"
              height="26"
              viewBox="0 0 24 24"
            >
              <path d="M24 22h-24l12-20z" />
            </svg>
          {/if}
        </div>
        {#if comparisonObj.percentage != null}
          <p class="ons-u-fs-xl data-comparison-graphic-text">{comparisonObj.percentage}</p>
        {/if}
        <p
          class="ons-u-fs-m data-comparison-graphic-text
            data-comparison-graphic-text--small"
        >
          {comparisonObj.comparative}
        </p>
      </div>
    </div>
  </div>

  <div class="data-comparison-text">
    <p>{comparisonObj.comparison}</p>
  </div>
</div>

<style lang="scss">
  @import "../node_modules/@ons/design-system/scss/vars/_index.scss";

  .data-comparison-container {
    height: 100%;
  }

  .data-display-panel-blue,
  .data-display-panel-green,
  .data-display-panel-grey,
  .data-display-panel-teal,
  .data-comparison-text {
    position: relative;
    width: 100%;
    height: 50%;
    padding: 0.4rem 1rem;
  }

  .data-display-panel-blue {
    background-color: #005583;
  }

  .data-display-panel-green {
    background-color: #d5f690;
  }

  .data-display-panel-grey {
    background-color: $color-grey-35;
  }

  .data-display-panel-teal {
    background-color: #2e9daa;
  }

  .data-comparison-text {
    background-color: $color-white;
  }

  .data-comparison-icon,
  .data-comparison-graphic-text {
    display: inline-block;
  }

  .data-comparison-icon {
    margin: 0 0.7rem 0.35rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .upside-down-icon {
    transform: rotate(180deg);
  }

  .data-comparison-graphic-text {
    margin: 0;

    &--small {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin: 0 0 0.1rem 0;
    }
  }

  @media only screen and (max-width: map-get($grid-bp, m)) {
    .data-comparison-graphic-text--small {
      margin: 0 0 0.15rem 0;
    }
  }

  .text-white {
    color: $color-white;
  }

  .text-black {
    color: $color-black;
  }
</style>

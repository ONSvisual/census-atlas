<script>
  import { dataBreaks, newDataBreaks } from "../../model/metadata/metadata";
  import config from "../../config";
  import { getLegendSection, dataBreaksAreFetched } from "../../model/utils";
  import { populateSelectedCatData } from "../../utils";
  export let locationId, category;

  let selectedCatData = null;
  let backgroundColour, legendSection, textColour;

  $: geoCode = locationId ? locationId : config.eAndWGeoCode;
  $: category, $newDataBreaks, dataBreaksAreFetched($dataBreaks, category.code) && initialiseComponent();

  function initialiseComponent() {
    selectedCatData = populateSelectedCatData(geoCode, category);
    if ($dataBreaks.has(category.code) && ($dataBreaks.get(category.code).lad || $dataBreaks.get(category.code).lsoa)) {
      updateBackgroundColour();
      textColour = legendSection > 2 ? "#ffffff" : "#000000";
    }
    newDataBreaks.setFalse();
  }

  function updateBackgroundColour() {
    if (selectedCatData) {
      if (selectedCatData.geoCode.startsWith("E01") || selectedCatData.geoCode.startsWith("W01")) {
        legendSection = getLegendSection(selectedCatData.perc, $dataBreaks.get(category.code).lsoa);
      } else {
        legendSection = getLegendSection(selectedCatData.perc, $dataBreaks.get(category.code).lad);
      }
      backgroundColour = config.ux.legend_colours[legendSection];
    }
  }
</script>

{#if selectedCatData}
  <div class="category-figures" style="background-color: {backgroundColour}">
    <p class="category-figures__percentage" style="color: {textColour}">
      {(Math.round(selectedCatData.perc * 10) / 10).toFixed(1)}<span>%</span>
    </p>
    <p class="category-figures__totals" style="color: {textColour}">
      {selectedCatData.val} of {selectedCatData.total}
      {selectedCatData.unit.toLowerCase()}
    </p>
  </div>
{/if}

<style lang="scss">
  @import "../../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .category-figures {
    padding: 8px;
    &__percentage {
      font-size: 22px;
      line-height: 25px;
      font-weight: bold;
      margin: 0;
      @media (min-width: map-get($grid-bp, s)) {
        font-size: 28px;
        line-height: 35px;
      }
      & span {
        font-size: 16px;
        font-weight: normal;
        @media (min-width: map-get($grid-bp, s)) {
          font-size: 22px;
        }
      }
    }
    &__totals {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.02px;
      margin: 0;
      @media (min-width: map-get($grid-bp, s)) {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
</style>

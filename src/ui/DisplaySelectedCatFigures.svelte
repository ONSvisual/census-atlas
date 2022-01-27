<script>
  import { selectedCategoryBreaks } from "../model/metadata/metadata";
  import config from "../config";
  import { getLegendSection } from "../model/utils";
  export let selectedCatData = {};
  let backgroundColour, legendSection, textColour;
  $: selectedCatData, backgroundColour;

  function updateBackgroundColour() {
    if (selectedCatData.geoCode.startsWith("E01") || selectedCatData.geoCode.startsWith("W01")) {
      legendSection = getLegendSection(selectedCatData.perc, $selectedCategoryBreaks.lsoa);
      backgroundColour = config.ux.legend_colours[legendSection];
    } else {
      legendSection = getLegendSection(selectedCatData.perc, $selectedCategoryBreaks.lad);
      backgroundColour = config.ux.legend_colours[legendSection];
    }
  }

  $: {
    if ($selectedCategoryBreaks.lad || $selectedCategoryBreaks.lsoa) {
      updateBackgroundColour();
      textColour = legendSection > 2 ? "#ffffff" : "#000000";
    }
  }
</script>

<div style="background-color: {backgroundColour}">
  <p style="color: {textColour}">{selectedCatData.perc}%</p>
  <p style="color: {textColour}">
    {selectedCatData.val} of {selectedCatData.total}
    {selectedCatData.unit.toLowerCase()}
  </p>
</div>

<style lang="scss">
</style>

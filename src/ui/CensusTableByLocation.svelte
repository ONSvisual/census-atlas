<script>
  import { beforeUpdate } from "svelte";
  import { selectedData } from "../model/censusdata/censusdata";
  import { dataByGeography, newDataByGeography } from "../model/censusdata/censusdata";
  import { processData } from "../utils";
  import MapLegend from "../ui/MapLegend/MapLegend.svelte";

  export let geoCode, populateCensusTable, totalCatCode;

  $: {
    $newDataByGeography;
    if ($dataByGeography.get(geoCode)) {
      //reassign variable to trigger reactivity
      populateCensusTable = processData($dataByGeography.get(geoCode), populateCensusTable, totalCatCode);
    }
  }

  beforeUpdate(async () => {
    let breaks = await populateCensusTable.categories.map((cat) => cat.percentage);
    console.log(breaks);
  });
</script>

{#if $selectedData}
  <div class="map-legend">
    <!-- 
    TODO
    value: category.value
    breaks: each populateCensusTable.categories value
    average: England & Wales meanSimple (via simple-statistics)
    -->

    <MapLegend value={34.5} breaks={[0, 1.5, 3.7, 94.8]} average={50} />
  </div>

  <table class="ons-table">
    <thead class="ons-table__head">
      <tr class="ons-table__row">
        <th scope="col" class="ons-table__header">
          <span>{$selectedData.tableName}</span>
        </th>
        <th scope="col" class="ons-table__header ons-table__header--numeric">
          <span>People</span>
        </th>
        <th scope="col" class="ons-table__header ons-table__header--numeric">
          <span>Percentage</span>
        </th>
      </tr>
    </thead>
    <tbody class="ons-table__body">
      {#each populateCensusTable.categories as category}
        <tr class="ons-table__row">
          <td class="ons-table__cell ">{category.name}</td>
          <td class="ons-table__cell  ons-table__cell--numeric">{category.value}</td>
          <td class="ons-table__cell  ons-table__cell--numeric ons-table__cell--key"
            >{category.percentage}<span>%</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  .map-legend {
    margin-bottom: 24px;
  }

  .ons-table__header {
    border-bottom: 0;
    color: #222222;
  }
  th {
    font-weight: normal;
  }
  .ons-table__cell {
    border-bottom: 0;
    color: #595959;
  }

  .ons-table__cell--key {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    color: #222222;
  }
  .ons-table__cell--key span {
    font-size: 20px;
    line-height: 24px;
    font-weight: normal;
  }
</style>

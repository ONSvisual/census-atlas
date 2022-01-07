<script>
  import { selectedData } from "../model/censusdata/censusdata";
  import { isEmpty } from "../utils";
  import { csvParse, autoType } from "d3-dsv";
  export let locationId;
  import {dataByGeography, newDataByGeography} from "../model/censusdata/censusdata"

  let populateCensusTable = { categories: [] };

  let tableData
  $: $newDataByGeography, tableData = $dataByGeography.get(locationId)

  $: console.log(tableData)

  function processData(data) {
    if (data[0][populateCensusTable.total.code]) {
      populateCensusTable.total.value = data[0][populateCensusTable.total.code];
    }
    populateCensusTable["categories"].forEach((category) => {
      if (data[0][category.code]) {
        category["value"] = data[0][category.code];
        category["percentage"] = (
          Math.round((category.value / populateCensusTable.total.value) * 100 * 10) / 10
        ).toFixed(1);
        category["value"] = category["value"].toLocaleString();
      }
    });
  }
</script>

{#if $selectedData}
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
          <td class="ons-table__cell  ons-table__cell--numeric">{category.percentage}% </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  .ons-table__header {
    border-bottom: 0;
  }
  th {
    font-weight: normal;
  }
  .ons-table__cell {
    border-bottom: 0;
    color: #414042;
  }
</style>

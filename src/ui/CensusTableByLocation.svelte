<script>
  import { selectedData } from "../model/censusdata/censusdata";
  import { dataByGeography, newDataByGeography } from "../model/censusdata/censusdata";
  import { processData } from "../utils";
  export let locationId, populateCensusTable;

  $: {
    $newDataByGeography;
    if ($dataByGeography.get(locationId)) {
      //reassign variable to trigger reactivity
      populateCensusTable = processData($dataByGeography.get(locationId), populateCensusTable);
    }
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

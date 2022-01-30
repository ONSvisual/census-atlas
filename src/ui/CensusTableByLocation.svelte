<script>
  import { selectedData } from "../model/censusdata/censusdata";
  export let populateCensusTable;
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
          <td class="ons-table__cell  ons-table__cell--numeric ons-table__cell--key"
            >{category.percentage}<span>%</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  .ons-table__header {
    border-bottom: 0;
    color: #222222;
  }
  th {
    font-weight: normal;
  }
  .ons-table__cell {
    font-size: 16px;
    line-height: 24px;
    border-bottom: 0;
    color: #595959;
    overflow-wrap: anywhere;
  }

  .ons-table__cell--numeric {
    overflow-wrap: initial;
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

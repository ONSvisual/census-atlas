<script>
  import { selectedData } from "../model/censusdata/censusdata";
  export let locationId;

  console.log("inside table location:", locationId)
  console.log($selectedData);
  let queryParams = {}

  if ($selectedData) {
    retrieveTableData($selectedData)
  }

  async function retrieveTableData($selectedData){
    queryParams['totalsCode'] = categoryIDToDBTotalsColumn($selectedData.categorySelected)
    const categoryCodesArr = $selectedData.tableCategories.map((category) => {
      return categoryIDToDBColumn(category.code)
    })
    queryParams['categoryCodes'] = categoryCodesArr.toString()
    console.log("queryParams", queryParams)
    await fetchTableData(queryParams)
  }

  async function fetchTableData(queryParams) {
    const url = `https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/skinny?rows=${locationId}&cols=${queryParams.totalsCode},${queryParams.categoryCodes}`
    console.log("url", url)
    const response = await fetch(url)
    console.log(await response.text())
    // const data = await response.json()
    // console.log("data", data)
    // return data
  } 

  //-------------------------------**plan**-------------------------

  //change the category code
  //make a fetch request
  //handle the data to be consumed(calculate percentages)

  //---------------------------------------------------------------

  function decomposeCategoryId(categoryId) {
    const digitsSuffix = categoryId.match(/\d+$/)[0];
    return {
      digitsSuffix: digitsSuffix,
      prefix: categoryId.substring(categoryId.lastIndexOf(digitsSuffix), 0),
    };
  }

  // adjust for 1-based (nomis bulk, in the db) vs 0-based (nomis api) categories: QS101EW001 -> QS101EW0002
  function categoryIDToDBColumn(categoryId) {
    const categoryIdParts = decomposeCategoryId(categoryId);
    const adjustedSuffix = (parseInt(categoryIdParts.digitsSuffix) + 1).toString().padStart(4, "0");
    return categoryIdParts.prefix + adjustedSuffix;
  }

  // get totals column (1-based, in the db) from category ID: QS101EW010 -> QS101EW0001
  function categoryIDToDBTotalsColumn(categoryId) {
    const categoryIdParts = decomposeCategoryId(categoryId);
    return categoryIdParts.prefix + "0001";
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
      {#each $selectedData.tableCategories as category}
        <tr class="ons-table__row">
          <td class="ons-table__cell ">{category.name}</td>
          <td class="ons-table__cell  ons-table__cell--numeric">data to add</td>
          <td class="ons-table__cell  ons-table__cell--numeric">data to add </td>
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

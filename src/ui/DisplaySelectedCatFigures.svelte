<script>
  export let selectedCatData = {};
  //unit
  $: selectedCatData;
</script>

<div>
  <p>{selectedCatData.perc}%</p>
  <p>{selectedCatData.val} of {selectedCatData.total} {selectedCatData.unit.toLowerCase()}</p>
</div>

<style>
</style>

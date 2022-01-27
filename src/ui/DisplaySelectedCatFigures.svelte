<script>
  export let selectedCatData = {};
  //unit
  $: selectedCatData;
</script>

<div>
  <p>{selectedCatData.perc}%</p>
  <p>{selectedCatData.val} of {selectedCatData.total} households</p>
</div>

<style>
</style>

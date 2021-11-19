<script>
  export let censusAtlasSharePage;
</script>

{#if censusAtlasSharePage}
  <div class="ons-grid__col ons-col-6@m ">
    <div class="ons-pl-grid-col">
      <slot />
    </div>
  </div>
{:else}
  <slot />
{/if}

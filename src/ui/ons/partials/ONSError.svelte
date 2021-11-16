<script>
  export let message, id;
  export let renderErrorMsg = false;
</script>

{#if renderErrorMsg}
  <div class="ons-panel ons-panel--error ons-panel--no-title ons-u-mb-s" id="{id}-error">
    <span class="ons-u-vh">Error: </span>
    <div class="ons-panel__body">
      <p class="ons-panel__error">
        <strong>{message}</strong>
      </p>
      <slot />
    </div>
  </div>
{:else}
  <slot />
{/if}

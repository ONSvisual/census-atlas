<script>
  export let id, onChange, textAreaValue;
  export let name = "";
  export let rows = 8;
  export let hint = "";
</script>

<div class="ons-field">
  <label class="ons-label  ons-label--with-description " for={id}>
    <slot />
  </label>
  {#if hint}
    <span id="{id}-description-hint" class="ons-label__description  ons-input--with-description">
      {hint}
    </span>
  {/if}
  <textarea
    bind:value={textAreaValue}
    {id}
    class="ons-input ons-input--textarea"
    name={name ? name : id}
    {rows}
    on:change={() => onChange(textAreaValue)}
  />
</div>

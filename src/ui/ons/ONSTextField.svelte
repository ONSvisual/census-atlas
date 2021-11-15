<script>
  export let id;
  export let textFieldValue;
  export let hint = "";
  export let onChange;
</script>

<div class="ons-field">
  <label class="ons-label" for={id}><slot /></label>
  {#if hint}
    <span id="description-hint" class="ons-label__description  ons-input--with-description">
      {hint}
    </span>
  {/if}
  <input
    type="type"
    {id}
    class="ons-input ons-input--text ons-input-type__input"
    bind:value={textFieldValue}
    on:input={() => onChange(textFieldValue)}
  />
</div>

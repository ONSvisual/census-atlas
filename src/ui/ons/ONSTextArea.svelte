<script>
  export let id, onChange, textAreaValue, onInput, placeholderText;
  export let name = "";
  export let rows = 8;
  export let hint = "";
  export let labelText = "";
</script>

<div class="ons-field">
  <label class="ons-label  {hint ? 'ons-label--with-description' : ''}" for={id}>
    {labelText}
  </label>
  {#if hint}
    <span id="{id}-description-hint" class="ons-label__description  ons-input--with-description">
      {hint}
    </span>
  {/if}
  <textarea
    bind:value={textAreaValue}
    {id}
    placeholder={placeholderText}
    class="ons-input ons-input--textarea"
    name={name ? name : id}
    {rows}
    on:change={() => onChange(textAreaValue)}
    on:input={() => onInput(textAreaValue)}
  />
</div>

<script>
  import ONSError from "./partials/ONSError.svelte";
  export let id, type, textFieldValue, onInput, onChange, renderErrorMsg;
  export let hint = "";
  export let inputLabel = "";
  export let showPlaceholder = false;
  export let errorMessage = "Custom error message";
  function typeAction(node) {
    node.type = type;
  }
</script>

<ONSError message={errorMessage} {id} {renderErrorMsg}>
  <div class="ons-field">
    <label class="ons-label {showPlaceholder ? 'ons-label--placeholder' : ''}" for={id}>{inputLabel}</label>
    {#if hint}
      <span id="description-hint" class="ons-label__description  ons-input--with-description">
        {hint}
      </span>
    {/if}
    <input
      {id}
      class="ons-input ons-input--text ons-input-type__input {showPlaceholder ? 'ons-input--placeholder' : ''}"
      placeholder={showPlaceholder ? inputLabel : ""}
      bind:value={textFieldValue}
      on:input={() => onInput(textFieldValue)}
      on:change={() => onChange(textFieldValue)}
      use:typeAction
    />
  </div>
</ONSError>

<script>
  export let id;
  export let textFieldValue;
  export let hint = "";
  export let inputLabel = "";
  export let showPlaceholder = false;
  export let onChange;
  export let errorMessage = "Placeholder error message placeholder";
  export let renderErrorMsg = false;
</script>

{#if renderErrorMsg}
  <div class="ons-panel ons-panel--error ons-panel--no-title ons-u-mb-s" id="{id}-error">
    <span class="ons-u-vh">Error: </span>
    <div class="ons-panel__body">
      <p class="ons-panel__error">
        <strong>{errorMessage}</strong>
      </p>
      <div class="ons-field">
        <label class="ons-label {showPlaceholder ? 'ons-label--placeholder' : ''}" for={id}>{inputLabel}</label>
        {#if hint}
          <span id="description-hint" class="ons-label__description  ons-input--with-description">
            {hint}
          </span>
        {/if}
        <input
          type="type"
          {id}
          class="ons-input ons-input--text ons-input-type__input {showPlaceholder ? 'ons-input--placeholder' : ''}"
          placeholder={showPlaceholder ? inputLabel : ""}
          bind:value={textFieldValue}
          on:input={() => onChange(textFieldValue)}
        />
      </div>
    </div>
  </div>
{:else}
  <div class="ons-field">
    <label class="ons-label {showPlaceholder ? 'ons-label--placeholder' : ''}" for={id}>{inputLabel}</label>
    {#if hint}
      <span id="description-hint" class="ons-label__description  ons-input--with-description">
        {hint}
      </span>
    {/if}
    <input
      type="type"
      {id}
      class="ons-input ons-input--text ons-input-type__input {showPlaceholder ? 'ons-input--placeholder' : ''}"
      placeholder={showPlaceholder ? inputLabel : ""}
      bind:value={textFieldValue}
      on:input={() => onChange(textFieldValue)}
    />
  </div>
{/if}

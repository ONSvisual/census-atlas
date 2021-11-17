<script>
  export let checkboxesLabel, title, id;
  export let legendIsQuestionTitle = false;
</script>

<div class="ons-question ons-u-mt-no">
  <fieldset class="ons-fieldset">
    {#if legendIsQuestionTitle}
      <legend class="ons-fieldset__legend">
        <h1 {id} class="ons-fieldset__legend-title ">{title}</h1>
      </legend>
    {/if}
    <div class="ons-input-items">
      <p class="ons-checkboxes__label">{checkboxesLabel}</p>
      <div class="ons-checkboxes__items">
        <slot />
      </div>
    </div>
  </fieldset>
</div>

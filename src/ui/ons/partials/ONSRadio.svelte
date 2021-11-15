<script>
  import { getContext } from "svelte";

  export let id, value, radioValue, onChange;
  let name = getContext("name");
  let userSelection;
</script>

<p class="ons-radios__item">
  <span class="ons-radio">
    <input
      type="radio"
      {id}
      class="ons-radio__input ons-js-radio"
      {value}
      bind:group={userSelection}
      {name}
      on:change={() => {
        radioValue = userSelection;
        onChange(radioValue);
      }}
    />
    <label class="ons-radio__label" for={id} id="{id}-label">
      <slot />
    </label>
  </span>
</p>

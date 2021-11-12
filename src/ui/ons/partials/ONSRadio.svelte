<script>
  import { getContext } from "svelte";

  export let id;
  export let value = id;
  export let checked = false;
  let name = getContext("name");
  let group = getContext("group");
  let onchange = getContext("onchange");
</script>

<p class="ons-radios__item">
  <span class="ons-radio">
    <input type=radio {id} class="ons-radio__input ons-js-radio" {value} bind:group={group} {name} on:change={() => onchange(value)} />
    <label class="ons-radio__label" for={id} id="{id}-label">
      <slot />
    </label>
  </span>
</p>

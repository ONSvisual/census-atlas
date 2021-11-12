<script>
  import { setContext } from "svelte";

  export let name;
  export let value = null;
  export let onchange = (value)=>{}
  
  setContext("name", name);
  setContext("group", value);
  setContext("onchange", (radioValue) => value=radioValue)
  
  $: value, onchange(value)
</script>

<div class="ons-input-items">
  <div class="ons-radios__items">
    <slot />
  </div>
</div>

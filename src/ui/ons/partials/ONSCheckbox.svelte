<script>
  export let id, value, name, labelText;
  export let checked = false;
</script>

<span class="ons-checkboxes__item">
  <span class="ons-checkbox ">
    <input type="checkbox" {id} class="ons-checkbox__input ons-js-checkbox " {value} {name} />
    <label class="ons-checkbox__label  " for={id} id="{id}-label">{labelText} </label>
  </span>
</span>
<br />

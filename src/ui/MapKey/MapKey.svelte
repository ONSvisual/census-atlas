<script>
  import config from "../../config";
  let colours = config.ux.legend_colours;

  colours = colours.reverse();

  export let breaks;
</script>

<div class="mapkey">
  <div class="mapkey__label mapkey__label--high" style="background-color: {colours[0]}">High</div>
  <div class="mapkey__blocks">
    {#each breaks.slice(1) as brk, i}
      <div
        class="mapkey__block"
        style="height: {100 / (breaks.length - 1)}%; top: {i *
          (100 / (breaks.length - 1))}%; background-color: {colours[i]};"
      />
    {/each}
  </div>
  <div class="mapkey__label mapkey__label--low" style="background-color: {colours[colours.length - 1]}">Low</div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .mapkey {
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.8);
    @media (min-width: map-get($grid-bp, s)) {
      padding: 5px 10px;
    }
  }
  .mapkey__blocks {
    position: relative;
    height: 100px;
    @media (min-width: map-get($grid-bp, s)) {
      height: 200px;
    }
  }
  .mapkey__block {
    position: absolute;
    right: 0;
    width: 20px;
    @media (min-width: map-get($grid-bp, s)) {
      width: 30px;
    }
  }
  .mapkey__label {
    font-size: 13px;
    margin: 4px 0;
    padding: 0 2px;
    @media (min-width: map-get($grid-bp, s)) {
      font-size: 14px;
      margin: 5px 0;
      padding: 1px 4px;
    }
  }
  .mapkey__label--high {
    color: $color-white;
  }
</style>

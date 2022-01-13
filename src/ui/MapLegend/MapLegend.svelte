<script>
  import config from "../../config";
  const colours = config.ux.legend_colours;

  export let value;
  export let breaks;
  export let average;

  const pos = (val) => {
    let i = 0;
    while (val > breaks[i + 1]) i += 1;
    let unit = 100 / (breaks.length - 1);
    let offset = (val - breaks[i]) / (breaks[i + 1] - breaks[i]);
    return (i + offset) * unit;
  };
</script>

<div class="maplegend">
  {#each breaks.slice(1) as brk, i}
    <div
      class="block"
      style="width: {100 / (breaks.length - 1)}%; left: {i * (100 / (breaks.length - 1))}%; background-color: {colours[
        i
      ]};"
    />
    <!-- <div class="line" style="left: {i * (100 / (breaks.length - 1))}%;" />
    <div class="tick" style="left: {i * (100 / (breaks.length - 1))}%;">{breaks[i]}</div> -->
  {/each}
  <!-- <div class="line" style="left: 100%;" />
  <div class="tick" style="left: 100%;">{breaks[breaks.length - 1]}</div> -->
  <div class="average-marker" style="left: calc({pos(average)}% - 10px);" />
  <div class="value">{value}%</div>
</div>

<div class="labels">
  <div class="label-lowest">Lowest</div>
  <div class="label-average">Average <span class="average-value">{average}%</span></div>
  <div class="label-highest">Highest</div>
</div>

<style>
  .maplegend {
    margin: 40px 0 4px;
    box-sizing: border-box;
    position: relative;
    height: 20px;
    width: 100%;
  }
  .block {
    position: absolute;
    top: 0;
    height: 100%;
  }
  /* .line {
    position: absolute;
    top: 0;
    height: 100%;
  }
  .tick {
    position: absolute;
    z-index: 1;
    top: -4px;
    text-align: center;
    transform: translateX(-50%);
  } */
  .average-marker {
    position: absolute;
    width: 20px;
    border-radius: 10px;
    z-index: 2;
    height: 100%;
    border: 2px solid #fff;
    background-color: #000;
  }
  .value {
    position: absolute;
    top: -40px;
    font-size: 24px;
    font-weight: bold;
  }
  .labels {
    display: flex;
    font-size: 16px;
  }
  .labels > div {
    flex: 1;
  }
  .label-average {
    text-align: center;
  }
  .label-average .average-value {
    font-weight: bold;
  }
  .label-highest {
    text-align: right;
  }
</style>

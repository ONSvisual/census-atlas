<script>
  import { LayerCake, Svg, flatten } from "layercake";
  import { stack } from "d3-shape";
  import { scaleBand, scaleOrdinal } from "d3-scale";

  import config from "../../config";
  import Bar from "./Bar.svelte";

  const data = [{ foo: 12, bar: 15, baz: 33 }];
  const colours = config.ux.legend_colours.reverse();

  const xKey = [0, 1];
  const yKey = "year";
  const zKey = "key";

  const seriesNames = Object.keys(data[0]).filter((d) => d !== yKey);

  data.forEach((d) => {
    seriesNames.forEach((name) => {
      d[name] = +d[name];
    });
  });

  const stackData = stack().keys(seriesNames);

  const series = stackData(data);
</script>

<div class="chart-container">
  <span class="category-percentage" />
  <LayerCake
    padding={{ top: 0, bottom: 30, left: 0 }}
    x={xKey}
    y={(d) => d.data[yKey]}
    z={zKey}
    yScale={scaleBand().paddingInner([0.1]).round(true)}
    zScale={scaleOrdinal()}
    zDomain={seriesNames}
    zRange={colours}
    flatData={flatten(series)}
    data={series}
  >
    <Svg>
      <Bar />
      <text x="0" y="100%" class="lowest">Lowest</text>
      <text x="50%" y="100%" text-anchor="middle" class="average">Average</text>
      <text x="100%" y="100%" text-anchor="end" class="highest">Highest</text>
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .lowest {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .heavy {
    font: bold 30px sans-serif;
  }

  /* Note that the color of the text is set with the    *
         * fill property, the color property is for HTML only */
  .Rrrrr {
    font: italic 40px serif;
    fill: red;
  }
</style>

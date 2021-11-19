<script>
  import MapSource from "../../MapSource.svelte";
  import MapLayer from "../../MapLayer.svelte";
  import config from '../../model/config';
</script>

<MapSource id="lad" type="vector" url={config.legacy.ladvector.url} 
           layer={config.legacy.ladvector.layer} promoteId={config.legacy.ladvector.code}>
  <MapLayer
    id="lad"
    source="lad"
    sourceLayer={config.legacy.ladvector.layer}
    type="line"
    filter={["all", ["==", "lower", "true"], ["in", "country", "E", "W"]]}
    paint={{
            "line-color": [
              "case",
              ["==", ["feature-state", "selected"], true],
              "#27A0CC",
              ["==", ["feature-state", "hovered"], true],
              "#27A0CC",
              ["==", ["feature-state", "highlighted"], true],
              "#27A0CC",
              "rgba(192, 192, 192, 1)",
            ],
            "line-width": [
              "case",
              ["==", ["feature-state", "selected"], true],
              2,
              ["==", ["feature-state", "hovered"], true],
              2,
              ["==", ["feature-state", "highlighted"], true],
              2,
              0.75,
            ],
          }}
    order="place_other"
  />
  <MapLayer
    id="lad-fill"
    source="lad"
    sourceLayer={config.legacy.ladvector.layer}
    type="fill"
    filter={["all", ["==", "lower", "true"], ["in", "country", "E", "W"]]}
    paint={{ "fill-color": "rgba(255, 255, 255, 0)" }}
    hover={true}
    click={true}
    maxzoom={8.99}
  />
</MapSource>

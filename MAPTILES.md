# HOW TO MAKE CUSTOM MAP TILESETS FOR CENSUS GEOGRAPHIES

How to make a new map tileset from census geographic boundary geojson files, for use in the atlas. Most of this was taken from Ahmad Barclay's [Guide to Vector Map Tiles](https://docs.google.com/document/d/1d0Jluy8sE8sKHRPdny_n2D8L08qa4HS3jweplfcdiX0/edit#)

1. Install [tippecanoe](https://github.com/mapbox/tippecanoe), a tileset-generating tool made by Mapbox (on mac, `brew install tippecanoe` works fine)

2. Download the geojson file you are interested in from the [ONS geoportal site](https://geoportal.statistics.gov.uk/). Some examples for useful ones for 2011 census geographies:

   - OA 2011, full-extend, clipped to the coastline: https://geoportal.statistics.gov.uk/datasets/output-areas-december-2011-boundaries-ew-bfc
   - LSOA 2011, full-extent, clipped to the coastline: https://geoportal.statistics.gov.uk/datasets/lower-layer-super-output-areas-december-2011-boundaries-full-clipped-bfc-ew-v3
   - MSOA 2011, full-extent, clipped to the coastline: https://geoportal.statistics.gov.uk/datasets/middle-layer-super-output-areas-december-2011-boundaries-full-clipped-bfc-ew-v3
   - LAD 2011, full-extent, clipped to the coastline: https://geoportal.statistics.gov.uk/datasets/local-authority-districts-december-2011-boundaries-ew-bfc

3. Use tippecanoe to create a map tileset from your geojson. For example, to create a tileset for the LADs in the file above:

   ```shell
   tippecanoe \
       --detect-shared-borders \
       --coalesce-densest-as-needed \
       --no-tile-compression \
       --output-to-directory="authorities-2011/v1" \
       --maximum-zoom=g \
       --layer=lad \
       "Local_Authority_Districts_(December_2011)_Boundaries_EW_BFC.geojson"
   ```

   Explained:

   ```
   tippecanoe \ <- NB use '\' for multiline shell commands (apologies if telling you how to suck eggs)
        --detect-shared-borders \ <- optimise by only keeping one side of shared borders between the boundaries
        --coalesce-densest-as-needed \ <- automatically reduce feature complexity when zoomed out
        --no-tile-compression \ <- do NOT gzip tileset (gzip is apparently normal, but our map does not like it)
        --output-to-directory="authorities-2011/v1" \ <- create the tileset in this folder (might need to make the folder first)
        --maximum-zoom=g \ <- estimate optimal zoom levels appropriate to the complexity of the geometries (NB more zoom levels = more tiles)
        --layer=lad \ <- the name the map layer in the tileset will have
        "Local_Authority_Districts*(December_2011)\_Boundaries_EW_BFC.geojson" <- the geojson file to use
   ```

4. This will create a nested directory structure containing the .pbf files. The directory structure is nested by zoom level, then by X position, then by Y position. This is why you see the URLS have this structure: https://cdn.ons.gov.uk/maptiles/administrative/authorities/v1/boundaries/{z}/{x}/{y}.pbf.

5. Make the maptiles servable. This can be done by adding them to the ONS cdn (basically an S3 bucket, Eleanor Deal can help with this), OR by checking in the maptiles directory, pushing it to github, and accessing it using [jsdelivr](https://www.jsdelivr.com/), a super-simple free cdn (with some caveats). Once the maptiles are uploaded to a public github repo, accessing them via jsdelivr is as simple as using this url in the atlas:
   ```
   https://cdn.jsdelivr.net/gh/<github user or org>/<path>/<to>/<maptiles>/{z}/{x}/{y}.pbf
   ```
   e.g. if you'd made your tileset in a directory called 'mytileset/v1', in this directory of this repo, the jsdelivr url would be:
   ```
   https://cdn.jsdelivr.net/gh/ONSdigital/maptiles/mytileset/v1/{z}/{x}/{y}.pbf
   ```
   NB - the 'v1' part of the filepath is useful, as one drawback of jsdelivr is **you cannot undo having your tiles served there**! They will be cached into an s3 bucket and will **NOT** be updated, even if you update the original files on github. The only choice (for now) if you need to change a tileset if to check in and upload a new version, under a new path (e.g. mytileset/v2).

## Utilities

- [Vector Inspector](https://stevage.github.io/vector-inspector) allows you to see the contents of a given map tile (useful for checking your work). You need to supply it with a url that has the Z, Y, X values filled in!
- [Vector Tiles Viewer](https://observablehq.com/@kotelnikov/vector-tiles-viewer) allows you to see your tiles as they are served to the atlas. You cannot inspect the features etc as you can with the Vector Inspector, but you _can_ give it the `{z}/{x}/{y}` templated URL and it will pull tiles as you navigate the map, which is also useful to check.

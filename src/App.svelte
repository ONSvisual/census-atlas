<script>
  import CensusAtlas from "./routes/CensusAtlas.svelte";
  import CensusAtlasV2 from "./routes/CensusAtlasV2.svelte";
  import Components from "./routes/Components.svelte";
  import DesignSystemApp from "./routes/DesignSystemApp.svelte";
  import SelectAreaOrVariable from "./routes/SelectAreaOrVariable.svelte";
  import ByLocationAndCategory from "./routes/ByLocationAndCategory.svelte";
  import ByLocation from "./routes/ByLocation.svelte";
  import ByCategory from "./routes/ByCategory.svelte";
  import { Router, Link, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/" component={CensusAtlas} />
    <Route path="/census-atlas" component={CensusAtlasV2} />
    <Route path="/components" component={Components} />
    <Route path="/design-system" component={DesignSystemApp} />
    <Route path="/select-area" component={SelectAreaOrVariable} />
    <Route path="/data/:categoryId/locations/:locationId" component={ByLocationAndCategory} />
    <Route path="/data/:categoryId" component={ByCategory} />
    <Route path="/locations/:locationId" component={ByLocation} />
  </div>
  <nav style="position: relative; z-index: 99999">
    <Link to="/">Census Atlas (Legacy)</Link>
    <Link to="/census-atlas">Census Atlas (V2)</Link>
    <Link to="/components">Components</Link>
    <Link to="/design-system">Design System</Link>
    <Link to="/select-area">(Step 1) Select Area or Variable</Link>
    <Link to="/category">(Step 1) Select Area or Variable</Link>
  </nav>
</Router>

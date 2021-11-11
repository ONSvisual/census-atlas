<script>
  import CensusAtlas from "./routes/CensusAtlas.svelte";
  import ExploreCensus from "./routes/ExploreCensus.svelte";
  import Components from "./routes/Components.svelte";
  import DesignSystemApp from "./routes/DesignSystemApp.svelte";
  import ByLocationAndCategory from "./routes/ByLocationAndCategory.svelte";
  import ByLocation from "./routes/ByLocation.svelte";
  import ByCategory from "./routes/ByCategory.svelte";
  import { Router, Link, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/" component={ExploreCensus} />
    <Route path="/components" component={Components} />
    <Route path="/design-system" component={DesignSystemApp} />
    <Route path="/data/:categoryId/locations/:locationId" component={ByLocationAndCategory} />
    <Route path="/data/:categoryId" component={ByCategory} />
    <Route path="/locations/:locationId" component={ByLocation} />
    <Route path="/legacy" component={CensusAtlas} />
  </div>
  <nav style="position: relative; z-index: 99999">
    <Link to="/components">Components</Link>
    <Link to="/design-system">Design System</Link>
    <Link to="/">Explore Census</Link>
    <Link to="/data/Health">Explore by Topic (Health)</Link>
    <Link to="/locations/Walsall">Explore by Location (Walsall)</Link>
    <Link to="/legacy">Legacy version</Link>
  </nav>
</Router>

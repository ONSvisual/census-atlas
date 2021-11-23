<script>
  import CensusAtlas from "./routes/CensusAtlas.svelte";
  import ExploreCensus from "./routes/ExploreCensus.svelte";
  import Components from "./routes/Components.svelte";
  import DesignSystemApp from "./routes/DesignSystemApp.svelte";
  import ByLocationAndCategory from "./routes/ByLocationAndCategory.svelte";
  import ByLocation from "./routes/ByLocation.svelte";
  import ByCategory from "./routes/ByCategory.svelte";
  import CensusCategories from "./routes/CensusCategories.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { initialiseGeography } from "./model/geography/geography";
  import LegacyGeographyService from "./model/geography/services/legacyGeographyService";
  import { initialiseCensusData } from "./model/censusdata/censusdata";
  import LegacyCensusDataService from "./model/censusdata/services/legacyCensusDataService";
  import { setInitialised } from "./model/appstate";

  export let url = "";

  initialiseGeography(new LegacyGeographyService()).then(() => {
    initialiseCensusData(new LegacyCensusDataService());
    setInitialised();
  });
</script>

<Router {url}>
  <div>
    <Route path="/" component={ExploreCensus} />
    <Route path="/components" component={Components} />
    <Route path="/design-system" component={DesignSystemApp} />
    <Route path="/data/:categoryId/locations/:locationId" component={ByLocationAndCategory} />
    <Route path="/data/:categoryId" component={ByCategory} />
    <Route path="/locations/:locationId" component={ByLocation} />
    <Route path="/categories" component={CensusCategories} />
    <Route path="/original" component={CensusAtlas} />
  </div>
  <nav
    style="position: relative; z-index: 99999; background: #e2e2e3; padding: 20px;"
    class="ons-related-links__navigation"
    aria-labelledby="related-links"
  >
    <ul class="ons-list ons-list--bare">
      <li class="ons-list__item">
        <Link to="/components">Components</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/design-system">Design System</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/">Explore Census</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/data/Health">Explore by Category (Health)</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/locations/Walsall">Explore by Location (Walsall)</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/data/General health/locations/England & Wales">Explore by Category & Location</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/categories">Explore Census Categories</Link>
      </li>
      <li class="ons-list__item">
        <Link to="/original">Original census atlas version</Link>
      </li>
    </ul>
  </nav>
</Router>

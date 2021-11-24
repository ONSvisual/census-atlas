<script>
  import { initialiseGeography } from "./../model/geography/geography";
  import LegacyGeographyService from "./../model/geography/services/legacyGeographyService";
  import { initialiseCensusData } from "./../model/censusdata/censusdata";
  import LegacyCensusDataService from "./../model/censusdata/services/legacyCensusDataService";
  import { setInitialised } from "./../model/appstate";

  initialiseGeography(new LegacyGeographyService()).then(() => {
    initialiseCensusData(new LegacyCensusDataService());
    setInitialised();
  });
</script>

<slot />
<nav
  style="position: relative; z-index: 99999; background: #e2e2e3; padding: 20px"
  class="ons-related-links__navigation"
  aria-labelledby="related-links"
>
  <ul class="ons-list ons-list--bare">
    <li class="ons-list__item">
      <a href="/components">Components</a>
    </li>
    <li class="ons-list__item">
      <a href="/design-system">Design System</a>
    </li>
    <li class="ons-list__item">
      <a href="/">Explore Census</a>
    </li>
    <li class="ons-list__item">
      <a href="/data/Health">Explore by Category (Health)</a>
    </li>
    <li class="ons-list__item">
      <a href="/locations/Walsall">Explore by Location (Walsall)</a>
    </li>
    <li class="ons-list__item">
      <a href="/data/General health/locations/England & Wales">Explore by Category & Location</a>
    </li>
    <li class="ons-list__item">
      <a href="/categories">Explore Census Categories</a>
    </li>
    <li class="ons-list__item">
      <a href="/original">Original census atlas version</a>
    </li>
  </ul>
</nav>

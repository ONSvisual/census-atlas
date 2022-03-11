<script>
  import { getCategoryBySlug } from "../model/censusdata/censusdata";

  export let href;
  export let inverted = false;

  let categorySlug, category;

  $: {
    if (href) {
      let slugArr = href.split("/");
      let tableSlug = slugArr[2];
      if (slugArr[slugArr.length - 1].includes("location")) {
        let catSlugArr = slugArr[slugArr.length - 1].split("?");
        categorySlug = catSlugArr[0];
      } else {
        categorySlug = slugArr[slugArr.length - 1];
      }
      category = getCategoryBySlug(tableSlug, categorySlug);
    }
  }
  let renderWhite = inverted ? "ons-breadcrumb__link--white" : "";
</script>

{#if category && href}
  <nav class="ons-breadcrumb" aria-label="Back">
    <ol class="ons-breadcrumb__items ons-u-fs-s">
      <li class="ons-breadcrumb__item">
        <a class="ons-breadcrumb__link {renderWhite}" {href} id="back" data-attribute="Example attribute" on:click
          >Return to {category.name}</a
        >
        <svg
          class="ons-svg-icon "
          viewBox="0 0 8 13"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          fill={inverted ? "#fff" : "currentColor"}
        >
          <path
            d="M5.74,14.28l-.57-.56a.5.5,0,0,1,0-.71h0l5-5-5-5a.5.5,0,0,1,0-.71h0l.57-.56a.5.5,0,0,1,.71,0h0l5.93,5.93a.5.5,0,0,1,0,.7L6.45,14.28a.5.5,0,0,1-.71,0Z"
            transform="translate(-5.02 -1.59)"
          />
        </svg>
      </li>
    </ol>
  </nav>
{/if}

<style>
  .ons-breadcrumb__link--white {
    color: #fff;
  }
  .ons-breadcrumb {
    height: 32px;
    background-color: #003c57;
  }
  .ons-breadcrumb__item {
    margin-left: 12px;
    margin-bottom: 0;
  }
</style>

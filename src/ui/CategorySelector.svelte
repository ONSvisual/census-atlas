<script>
  import slugify from "slugify";
  export let topicSlug, tableSlug;
  export let categories = [
    {
      code: "QS302EW001",
      name: "Very good health",
    },
    {
      code: "QS302EW002",
      name: "Good health",
    },
    {
      code: "QS302EW003",
      name: "Fair health",
    },
    {
      code: "QS302EW004",
      name: "Bad health",
    },
    {
      code: "QS302EW005",
      name: "Very bad health",
    },
  ];
  export let selectedCode = "QS302EW002";
  export let selectedCatIndex = 0;

  if (selectedCode) {
    categories.forEach((category, index) => {
      if (category.code == selectedCode) {
        selectedCatIndex = index;
      }
    });
  }
</script>

<div class="category-selector ons-grid--flex ons-grid--vertical-center">
  <div class="ons-grid__col ons-col-4@m selector-col ">
    <div class="ons-pl-grid-col ons-grid--flex ons-grid__col--flex" style="justify-content:left">
      <span>&#60;&#160;</span>
      {#if selectedCatIndex > 0}
        <a
          class="category-selector__button"
          href="/{topicSlug}/{tableSlug}/{slugify(
            categories[selectedCatIndex - 1].name,
          ).toLowerCase()}?location=E08000012"
          on:click={() => selectedCatIndex--}
        >
          {categories[selectedCatIndex - 1].name}
        </a>
      {:else}
        <a
          class="category-selector__button"
          href="/{topicSlug}/{tableSlug}/{slugify(
            categories[categories.length - 1].name,
          ).toLowerCase()}?location=E08000012"
          on:click={() => (selectedCatIndex = categories.length - 1)}
        >
          {categories[categories.length - 1].name}
        </a>
      {/if}
    </div>
  </div>
  <div class="ons-grid__col ons-col-4@m selector-col ons-grid--flex">
    <div class="ons-pl-grid-col">
      <p>{categories[selectedCatIndex].name}</p>
    </div>
  </div>
  <div class="ons-grid__col ons-col-4@m selector-col">
    <div class="ons-pl-grid-col ons-grid--flex" style="justify-content:right">
      {#if selectedCatIndex < categories.length - 1}
        <a
          class="category-selector__button category-selector__button__left"
          href="/{topicSlug}/{tableSlug}/{slugify(
            categories[selectedCatIndex + 1].name,
          ).toLowerCase()}?location=E08000012"
          on:click={() => selectedCatIndex++}
        >
          {categories[selectedCatIndex + 1].name}
        </a>
      {:else}
        <a
          class="category-selector__button category-selector__button__left"
          href="/{topicSlug}/{tableSlug}/{slugify(categories[0].name).toLowerCase()}?location=E08000012"
          on:click={() => (selectedCatIndex = 0)}
        >
          {categories[0].name}
        </a>
      {/if}
      <span>&#160;&#62;</span>
    </div>
  </div>
</div>

<style>
  .category-selector {
    background-color: #003c57;
    color: #fff;
    padding: 10px 15px 10px;
  }
  .category-selector__button {
    color: #fff;
    font-size: 1rem;
    font-weight: normal;
  }

  .category-selector__button__left {
    text-align: right;
  }
  @media (max-width: 400px) {
    .category-selector__button,
    span {
      font-size: 0.8em;
    }
  }
  .category-selector__button {
    text-decoration: underline;
    text-underline-position: unset;
  }
  .selector-col {
    max-width: 33.33333%;
    width: 33.33333%;
    padding-left: 0;
  }
  p {
    text-align: center;
    margin-bottom: 0;
    font-size: 1.3em;
    font-weight: bold;
  }
  .ons-grid--flex {
    flex-wrap: nowrap;
    align-items: center;
  }

  @media (max-width: 400px) {
    p {
      font-size: 1em;
    }
  }
</style>
